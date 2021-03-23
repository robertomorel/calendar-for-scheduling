import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { differenceInCalendarDays } from 'date-fns'
import { FiTrash } from 'react-icons/fi'

import { selectReminder, useActionDispatch, selectSchedule, actionDeleteAllReminder } from '../../store'
import { ReminderProps } from '../../store/slices'

import { Header, Container, Content, Accordion, AccordionContent, Footer } from './styles'

export const Reminder: React.FC = () => {
  const { reminder, error } = useSelector(selectReminder)
  const { scheduleDate } = useSelector(selectSchedule)
  const dispatch = useActionDispatch()
  const [reminderList, setReminderList] = useState<ReminderProps[]>()

  useEffect(() => {
    if (reminder && scheduleDate) {
      const newList = reminder
        .filter(r => differenceInCalendarDays(new Date(scheduleDate), new Date(r.schedule)) === 0)
        .sort((a: ReminderProps, b: ReminderProps) => {
          return new Date(a.schedule).getTime() - new Date(b.schedule).getTime()
        })
      setReminderList(newList)
    }
  }, [reminder, scheduleDate])

  const handleDeleteReminders = useCallback(
    async (datetime: Date | undefined) => {
      if (datetime) await dispatch(actionDeleteAllReminder(datetime))
    },
    [dispatch],
  )

  return (
    <Container>
      <Content>
        <Header>
          <div>
            <span>Reminders</span>
          </div>
        </Header>
        {reminderList &&
          reminderList.map(reminder => (
            <AccordionContent key={reminder.id}>
              <Accordion
                uuid={reminder.id}
                title={reminder.title}
                description={reminder.description}
                color={reminder.color}
                datetime={reminder.schedule}
                city={reminder.city}
                weather={reminder.weather}
              />
            </AccordionContent>
          ))}
        <Footer>
          <div>
            <FiTrash size={21} onClick={() => handleDeleteReminders(scheduleDate)} />
          </div>
        </Footer>
      </Content>
    </Container>
  )
}
