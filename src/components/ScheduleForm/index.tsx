import React, { useCallback, useRef, ChangeEvent, useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import {
  FiMail,
  FiLock,
  FiUser,
  FiCamera,
  FiArrowLeft,
  FiPenTool,
  FiPlusCircle,
  FiCalendar,
  FiCloudRain,
} from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { Form } from '@unform/web'
import { formatISO, format } from 'date-fns'
import { uuid } from 'uuidv4'

import Button from '../../components/Button'
import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationErrors'
import { selectSchedule, actionCreateNewReminder, useActionDispatch } from '../../store'
//import { formatToLocaleDateString } from '../../utils/date'

import { Container, Content, InputComponent } from './styles'
import { ReminderProps } from '../../store/slices'

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
  const dispatch = useActionDispatch()
  //const [initialData, setInitialData] = useState<ProfileFormData>({})

  useEffect(() => {
    if (scheduleDate) {
      formRef.current?.setData({
        datetime: scheduleDate && format(scheduleDate, 'yyyy-MM-dd hh:mm').replace(' ', 'T'), //scheduleDate.toISOString(),
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

        const { title, description, city, color } = data
        const reminder: ReminderProps = {
          id: uuid(),
          schedule: data.datetime,
          title,
          description,
          city,
          color,
        }
        await dispatch(actionCreateNewReminder(reminder))

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
    [addToast, dispatch, error],
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
              value="#fff"
              alt="Color"
            />
          </div>

          <Button type="submit">Confirm Scheduler</Button>
        </Form>
      </Content>
    </Container>
  )
}
