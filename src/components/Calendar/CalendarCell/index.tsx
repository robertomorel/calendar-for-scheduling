import React, { useState } from 'react'
import dateFns from 'date-fns'

interface CalendarDayProps {
  currentMonth: Date
}

const CalendarCell: React.FC<CalendarDayProps> = ({ currentMonth }) => {
  //const { currentMonth, selectedDate } = this.state
  /*
  const monthStart = dateFns.startOfMonth(currentMonth)
  const monthEnd = dateFns.endOfMonth(monthStart)
  const startDate = dateFns.startOfWeek(monthStart)
  const endDate = dateFns.endOfWeek(monthEnd)

  const dateFormat = 'D'
  const rows = []

  let days = []
  let day = startDate
  let formattedDate = ''

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = dateFns.format(day, dateFormat)
      const cloneDay = day

      days.push(
        <div
          className={`col cell ${
            !dateFns.isSameMonth(day, monthStart) ? 'disabled' : dateFns.isSameDay(day, selectedDate) ? 'selected' : ''
          }`}
          key={day.toDateString()}
          onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
        >
          <span className="number">{formattedDate}</span>
          <span className="bg">{formattedDate}</span>
        </div>,
      )
      day = dateFns.addDays(day, 1)
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>,
    )
    days = []
  }
  return <div className="body">{rows}</div>
  */
  return <div></div>
}

export default CalendarCell
