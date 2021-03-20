import React, { useState, useMemo, useCallback } from 'react'
import dateFns from 'date-fns'

interface CalendarHeaderProps {
  currentMonth: Date
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentMonth }) => {
  const [currentMonth1, setCurrentMonth1] = useState(new Date())

  const nextMonth = useCallback(() => {
    setCurrentMonth1(dateFns.addMonths(currentMonth, 1))
  }, [currentMonth])

  const prevMonth = useCallback(() => {
    setCurrentMonth1(dateFns.subMonths(currentMonth, 1))
  }, [currentMonth])

  const formattedDate = useMemo(() => {
    return dateFns.format(currentMonth, 'MMMM YYYY')
  }, [currentMonth])

  return (
    <div className="header row flex-middle">
      <div className="col col-start">
        <div className="icon" onClick={prevMonth}>
          chevron_left
        </div>
      </div>
      <div className="col col-center">
        <span>{formattedDate}</span>
      </div>
      <div className="col col-end" onClick={nextMonth}>
        <div className="icon">chevron_right</div>
      </div>
    </div>
  )
}

export default CalendarHeader
