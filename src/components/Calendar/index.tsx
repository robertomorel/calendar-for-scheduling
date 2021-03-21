import React, { useState, useCallback } from 'react'
import {
  addMonths,
  subMonths,
  format,
  startOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  endOfWeek,
} from 'date-fns'

import { actionRequestSchedule, useActionDispatch } from '../../store'

import {
  Container,
  Header,
  ArrowIcon,
  MonthYearContent,
  ColCenter,
  DaysRow,
  CalendarCel,
  CelNumber,
  CelBg,
  BodyRow,
  Row,
} from './styles'

export const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const dispatch = useActionDispatch()

  const nextMonth = useCallback(() => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }, [currentMonth])

  const prevMonth = useCallback(() => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }, [currentMonth])

  const handleDateClick = useCallback(
    (day: Date) => {
      const scheduleRequest = async (day: Date): Promise<void> => {
        setSelectedDate(day)
        await dispatch(actionRequestSchedule(day))
      }

      scheduleRequest(day)
    },
    [dispatch],
  )

  const CalendarHeader = () => (
    <Header>
      <ArrowIcon onClick={prevMonth}>chevron_left</ArrowIcon>
      <MonthYearContent>{format(currentMonth, 'MMMM yyyy')}</MonthYearContent>
      <ArrowIcon onClick={nextMonth}>chevron_right</ArrowIcon>
    </Header>
  )

  const CalendarDay = () => {
    const days = []
    const startDate = startOfWeek(currentMonth)

    for (let i = 0; i < 7; i++) {
      days.push(<ColCenter key={i}>{format(addDays(startDate, i), 'eeee')}</ColCenter>)
    }

    return <DaysRow>{days}</DaysRow>
  }

  const CalendarCell = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const rows = []

    let days = []
    let day = startDate
    let formattedDate = ''

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd')
        const cloneDay = day
        days.push(
          <CalendarCel
            isDisabled={!isSameMonth(day, monthStart)}
            isSelected={isSameDay(day, selectedDate)}
            key={day.toDateString()}
            onClick={() => handleDateClick(cloneDay /*parse(cloneDay)*/)}
          >
            <CelNumber>{formattedDate}</CelNumber>
            <CelBg isSelected={isSameDay(day, selectedDate)}>{formattedDate}</CelBg>
          </CalendarCel>,
        )
        day = addDays(day, 1)
      }
      rows.push(<Row key={day.toDateString()}>{days}</Row>)
      days = []
    }
    return <BodyRow>{rows}</BodyRow>
  }

  return (
    <Container>
      <CalendarHeader />
      <CalendarDay />
      <CalendarCell />
    </Container>
  )
}
