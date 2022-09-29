import Day, { DayItem } from './Day'
import DayHeader from './DayHeader'
import moment from 'moment'
import { useMemo } from 'react'
import { CalendarEvent } from './Event'

type CalendarProps = {
  month?: number,
  year?: number,
  events?: Array<CalendarEvent>,
}

const week = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
  'Domingo',
]

const getValidEvents = (day: DayItem, events: Array<CalendarEvent>): Array<CalendarEvent> => {
  return events.filter(event => (
    day.date.isBetween(event.startDate, event.endDate, 'day', '[]')
  ))
}

const Calendar = ({ month, year, events }: CalendarProps) => {
  const {
    currentMonth,
    days,
  } = useMemo(() => {
    const currentMonth: number = month ?? moment().month()
    const currentYear: number = year ?? moment().year()
    const firstDayOfMonthInWeek: number = moment().year(currentYear).month(currentMonth).date(1).day() - 1
    const initialDateToShow: string = moment()
      .year(currentYear)
      .month(currentMonth)
      .date(1)
      .subtract(firstDayOfMonthInWeek, 'days')
      .format()

    const days = Array.from(new Array(42).keys()).map(day => {
      const dateMoment = moment(initialDateToShow).add(day, 'days')
      const date = dateMoment.toObject()
      return {
        id: dateMoment.format(),
        date: dateMoment,
        isCurrentMonth: date.months === (currentMonth) && date.years === year,
      } as DayItem
    })

    return {
      currentMonth,
      days,
    }
  }, [month, year])

  return (
    <div className='grid grid-cols-7'>
      {week.map(title => (
        <DayHeader key={title}>{title}</DayHeader>
      ))}

      {days.map((day: DayItem) => (
        <Day
          key={day.id}
          day={day}
          events={getValidEvents(day, events ?? [])}
        />
      ))}
    </div>
  )
}

export default Calendar