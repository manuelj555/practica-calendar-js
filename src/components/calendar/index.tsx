import Day, { DayItem } from './Day'
import DayHeader from './DayHeader'
import moment from 'moment'
import { useMemo, useState } from 'react'
import { CalendarEvent } from './Event'
import { Modal } from '../Modal'
import useModal from '../../hooks/useModal'
import EventConfig from './EventConfig'

type CalendarProps = {
  month?: number,
  year?: number,
  events?: Array<CalendarEvent>,
  handleAddEvent: (event: CalendarEvent) => void,
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

const Calendar = ({ month, year, events, handleAddEvent }: CalendarProps) => {
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

  const eventModal = useModal()
  const [selectedDay, setSelectedDay] = useState<DayItem | null>(null)

  const handleSelectDay = (item: DayItem) => {
    setSelectedDay(item)
    eventModal.show()
  }

  const handleAdd = (event: CalendarEvent) => {
    handleAddEvent(event)
    setSelectedDay(null)
    eventModal.hide()
  }

  return (
    <div>
      <div className='grid grid-cols-7'>
        {week.map(title => (
          <DayHeader key={title}>{title}</DayHeader>
        ))}

        {days.map((day: DayItem) => (
          <Day
            key={day.id}
            day={day}
            events={getValidEvents(day, events ?? [])}
            handleAddEvent={handleSelectDay}
          />
        ))}
      </div>

      <Modal show={eventModal.visible} onHide={eventModal.hide}>
        <EventConfig
          handleAdd={handleAdd}
          startDate={selectedDay?.date}
        />
      </Modal>
    </div>
  )
}

export default Calendar