import React, { useState } from 'react'
import dateFns from 'date-fns'

interface CalendarDayProps {
  currentMonth: Date
}

const CalendarDay: React.FC<CalendarDayProps> = ({ currentMonth }) => {
  const dateFormat = 'dddd'
  const days = []
  const startDate = dateFns.startOfWeek(currentMonth)

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col col-center" key={i}>
        {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
      </div>,
    )
  }

  return <div className="days row">{days}</div>
}

export default CalendarDay
