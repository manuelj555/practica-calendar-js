import Day from './Day'
import DayHeader from './DayHeader'
import moment from 'moment'
import { useMemo } from 'react'

type CalendarProps = {
  month?: number,
}

type DayItem = {
  id: string,
  month: number,
  day: number,
  isCurrentMonth: boolean,
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

const Calendar = ({ month }: CalendarProps) => {
  const {
    currentMonth,
    days,
  } = useMemo(() => {
    const currentMonth: number = month ?? moment().month() + 1
    const firstDayOfMonthInWeek: number = moment().month(currentMonth - 1).date(1).day()
    const initialDateToShow: string = moment()
      .month(currentMonth - 1)
      .date(1)
      .subtract(firstDayOfMonthInWeek, 'days')
      .format()

    console.log({ currentMonth, initialDateToShow })

    const days = Array.from(new Array(42).keys()).map(day => {
      const dateMoment = moment(initialDateToShow).add(day, 'days')
      const date = dateMoment.toObject()
      return {
        id: dateMoment.format(),
        month: date.months,
        day: date.date,
        isCurrentMonth: date.months === (currentMonth - 1),
      } as DayItem
    })

    return {
      currentMonth,
      days,
    }
  }, [month])

  return (
    <div className='grid grid-cols-7 gap-2'>
      {week.map(title => (
        <DayHeader key={title}>{title}</DayHeader>
      ))}

      {days.map((day: DayItem) => (
        <Day disabled={!day.isCurrentMonth} key={day.id}>
          {day.day}
        </Day>
      ))}
    </div>
  )
}

export default Calendar