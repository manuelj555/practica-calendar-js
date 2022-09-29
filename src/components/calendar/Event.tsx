import moment from 'moment'
import { useEffect, useMemo, useRef } from 'react'
import { DayItem } from './Day'

type EventProps = {
  event: CalendarEvent,
  day: DayItem,
  order: number,
}

export type CalendarEvent = {
  id: string,
  title: string,
  startDate: Date,
  endDate: Date,
}

const eventColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-yellow-400',
]


const Event = ({ day, event, order }: EventProps) => {
  const { isStart, isEnd, isOneDay } = useMemo(() => {
    const startDateMoment = moment(event.startDate)
    const endDateMoment = moment(event.endDate)
    const isStart: boolean = startDateMoment.isSame(day.date, 'day')
    const isEnd: boolean = endDateMoment.isSame(day.date, 'day')

    return {
      isStart,
      isEnd,
      isOneDay: isStart && isEnd,
    }
  }, [event, day])

  const $eventDiv = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!$eventDiv.current) return

    if (isStart) {
      $eventDiv.current.style.top = order * 20 + 'px'
      $eventDiv.current.dataset.event = event.id
      $eventDiv.current.dataset.top = order * 20 + 'px'
    } else {
      const $eventStart = document.querySelector(`[data-top][data-event='${event.id}']`) as HTMLDivElement | null
      if (!$eventStart) return

      $eventDiv.current.style.top = $eventStart.style.top ?? '0px'
    }
  }, [$eventDiv, isStart, order])

  return (
    <div
      ref={$eventDiv}
      className={`py-2 ${eventColors[0]} mb-1 absolute ${isOneDay
        ? 'w-11/12 rounded-lg'
        : (isStart ? 'w-2/3 self-end rounded-l-lg'
          : (isEnd
            ? 'w-2/3 rounded-r-lg'
            : 'w-full'))}`}
    // style={{ order: order + 1 }}
    />
  )
}

export default Event