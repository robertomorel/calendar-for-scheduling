import React, { useCallback, useRef, ChangeEvent, useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { FiPenTool, FiPlusCircle, FiCalendar, FiCloudRain } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { Form } from '@unform/web'
import { formatISO, format } from 'date-fns'
import { uuid } from 'uuidv4'

import Button from '../../components/Button'
import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationErrors'
import {
  selectSchedule,
  actionCreateNewReminder,
  useActionDispatch,
  selectReminder,
  actionUpdateAReminder,
} from '../../store'
//import { formatToLocaleDateString } from '../../utils/date'

import { Container, Content, InputComponent } from './styles'
import { ReminderProps, actionDesactivateReminderUpdate } from '../../store/slices'
import { getWeatherInfoByCity } from '../../services/weatherMapAPI'

interface ProfileFormData {
  title: string
  description: string
  city: string
  datetime: Date
  color: string
}

export const ScheduleForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  //const history = useHistory()
  const { scheduleDate, error } = useSelector(selectSchedule)
  const { isUpdateWithId, reminder } = useSelector(selectReminder)
  const dispatch = useActionDispatch()
  //const [initialData, setInitialData] = useState<ProfileFormData>({})

  useEffect(() => {
    //console.log('TEST: ', isUpdateWithId)
    if (reminder && isUpdateWithId) {
      const reminderTemp = reminder.find(r => r.id === isUpdateWithId)
      formRef.current?.setData({
        schedule: reminderTemp?.schedule,
        title: reminderTemp?.title,
        description: reminderTemp?.description,
        city: reminderTemp?.city,
        color: reminderTemp?.color,
      })
    }
  }, [isUpdateWithId, reminder])

  useEffect(() => {
    if (scheduleDate) {
      formRef.current?.setData({
        datetime: scheduleDate && format(scheduleDate, 'yyyy-MM-dd hh:mm').replace(' ', 'T'), //scheduleDate.toISOString(),
      })
    } else {
      formRef.current?.setData({
        datetime: format(new Date(), 'yyyy-MM-dd hh:mm').replace(' ', 'T'),
      })
    }
  }, [scheduleDate])

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          title: Yup.string().required('The title is required!'),
          description: Yup.string().required('The description is required!'),
          city: Yup.string().required('The city is required!'),
          datetime: Yup.date().required('The date is required!'),
          color: Yup.string().required('The color is required!'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        let weather = null
        try {
          weather = await getWeatherInfoByCity(data.city)
        } catch (err) {
          alert('Something is wrong with the Weather Map API! Check the params again.')
        }

        const { title, description, city, color } = data
        const reminder: ReminderProps = {
          id: uuid(),
          schedule: data.datetime,
          title,
          description,
          city,
          color,
          weather:
            weather && weather.weather && weather.weather.length > 0
              ? `${weather.weather[0].main.toUpperCase()} - ${weather.weather[0].description.toUpperCase()}`
              : undefined,
        }

        if (isUpdateWithId) {
          await dispatch(actionUpdateAReminder(reminder))
          await dispatch(actionDesactivateReminderUpdate())
        } else {
          await dispatch(actionCreateNewReminder(reminder))
        }

        if (error) {
          addToast({
            type: 'error',
            title: 'Failure',
            description: 'Some unknown error occurred during this reminder creation.',
          })
        } else {
          addToast({
            type: 'success',
            title: 'Reminder created',
            description: 'One new reminder was created successfully.',
          })
          formRef.current?.setData({
            schedule: null,
            title: null,
            description: null,
            city: null,
            color: null,
          })
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)

          addToast({
            type: 'error',
            title: 'Failure',
            description: err.message,
          })

          return
        }
      }
    },
    [addToast, dispatch, error, isUpdateWithId],
  )

  return (
    <Container>
      <Content>
        <Form ref={formRef} /*initialData={initialData}*/ onSubmit={handleSubmit}>
          <div>
            <InputComponent name="title" icon={FiPenTool} placeholder="Title" maxLength={10} size={12} />
            <InputComponent name="description" icon={FiPenTool} placeholder="Description" maxLength={30} size={25} />
          </div>

          <div>
            <InputComponent name="city" icon={FiPlusCircle} placeholder="City" size={14} />
            <InputComponent
              name="datetime"
              icon={FiCalendar}
              placeholder="mm/dd/yyyy hh:mm"
              maxLength={9}
              size={13}
              type="datetime-local"
            />
            <InputComponent
              name="color"
              icon={FiCloudRain}
              placeholder="Color"
              maxLength={5}
              size={6}
              type="color"
              alt="Color"
            />
          </div>

          <Button name="confirm" type="submit">
            Confirm Scheduler
          </Button>
        </Form>
      </Content>
    </Container>
  )
}
