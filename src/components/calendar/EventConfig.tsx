import moment, { Moment } from 'moment'
import React, { useState } from 'react'
import Button from '../Button'
import ControlRow from '../control/ControlRow'
import Input from '../control/Input'
import { CalendarEvent } from './Event'

type EventConfigProps = {
  handleAdd: (event: CalendarEvent) => void,
  startDate?: Moment,
}

const createEmptyEvent = (startDate: Date = new Date()): CalendarEvent => ({
  id: Date.now().toString(),
  title: '',
  startDate,
  endDate: startDate,
})

const EventConfig = ({ handleAdd, startDate }: EventConfigProps) => {
  const [data, setData] = useState<CalendarEvent>(() => {
    return createEmptyEvent(startDate?.toDate())
  })

  const updateData = (newData: CalendarEvent): void => {
    setData({ ...data, ...newData })
  }

  const onSubmit = () => {
    handleAdd(data)
  }

  return (
    <div>
      <h3>Titulo</h3>

      <ControlRow label='Title'>
        <Input
          value={data.title}
          onChange={(e) => updateData({ title: e.target.value } as CalendarEvent)}
        />
      </ControlRow>
      <ControlRow label='Start Date'>
        <Input
          value={data.startDate.toLocaleDateString('en-CA')}
          onChange={(e) => updateData({ startDate: moment(e.target.value).toDate() } as CalendarEvent)}
          type='date'
        />
      </ControlRow>
      <ControlRow label='End Date'>
        <Input
          value={data.endDate.toLocaleDateString('en-CA')}
          onChange={(e) => updateData({ endDate: moment(e.target.value).toDate() } as CalendarEvent)}
          type='date'
        />
      </ControlRow>
      <div className='text-right border-t pt-2 mt-2'>
        <Button onClick={onSubmit} type='button'>Enviar</Button>
      </div>
    </div>
  )
}

export default EventConfig