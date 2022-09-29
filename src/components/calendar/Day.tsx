
import { Moment } from 'moment'
import React from 'react'
import Event, { CalendarEvent } from './Event'
import MissingEvent from './MissingEvent'

type DayProps = {
  day: DayItem,
  events?: Array<CalendarEvent>,
}

export type DayItem = {
  id: string,
  date: Moment,
  month: number,
  day: number,
  isCurrentMonth: boolean,
}

const buildEventsToShow = (events: CalendarEvent[]): CalendarEvent[] => {
  const eventsToShow = events.slice(0, 3)

  eventsToShow.sort((eventA: CalendarEvent, eventB: CalendarEvent): number => {
    return eventA.endDate.getDate() - eventB.endDate.getDate()
  })

  return eventsToShow
}


const Day = ({ day, events = [] }: DayProps) => {
  const eventsToShow = buildEventsToShow(events)
  const emptyEvents = new Array(3 - eventsToShow.length).fill(null)

  return (
    <div className={`border border-gray-100 font-semibold aspect-square ${!day.isCurrentMonth
      ? 'bg-green-100 text-blue-500'
      : 'bg-green-300 text-blue-700 hover:bg-green-400'
      }`}>
      <div className='text-lg px-1'>
        {day.date.date()}
      </div>

      <div className='flex flex-col items-start relative'>
        {eventsToShow.map((event, index) => (
          <Event key={event.id} day={day} event={event} order={index} />
        ))}
        {emptyEvents.map((e, index) => (
          <MissingEvent key={index} />
        ))}
      </div>
    </div>
  )
}

export default Day