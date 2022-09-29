import moment from 'moment'
import { useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './App.css'
import Button from './components/Button'
import Calendar from './components/calendar'
import { CalendarEvent } from './components/calendar/Event'

const showMonthName = (month: number): string => {
  return moment().month(month).format('MMMM')
}

const events: Array<CalendarEvent> = [
  { id: '3', title: 'Tercer Evento', startDate: new Date('2022/09/14'), endDate: new Date('2022/09/17') },
  { id: '1', title: 'Primer Evento', startDate: new Date('2022/09/17'), endDate: new Date('2022/09/20') },
  { id: '2', title: 'Segundo Evento', startDate: new Date('2022/09/20'), endDate: new Date('2022/09/20') },
  { id: '4', title: 'Cuarto Evento', startDate: new Date('2022/09/16'), endDate: new Date('2022/09/17') },
]

function App() {
  const [month, setMonth] = useState<number>(() => moment().month())
  const [year, setYear] = useState<number>(() => moment().year())
  const [previousMonth, setPreviousMonth] = useState<number>(() => month)

  const changeMonth = (newMonth: number): void => {
    if (newMonth > 11) {
      setMonth(0)
      setPreviousMonth(-1)
      setYear(y => y + 1)
    } else if (newMonth < 0) {
      setMonth(11)
      setPreviousMonth(12)
      setYear(y => y - 1)
    } else {
      setMonth(newMonth)
    }
  }

  return (
    <div className='grid gap-2 items-start justify-center min-h-screen pt-2'>

      <div className='flex justify-between mb-4 self-end items-center'>
        <Button onClick={() => changeMonth(month - 1)}>{showMonthName(month - 1)}</Button>

        <span className='text-2xl font-semibold'>
          {showMonthName(month)} - {year}
        </span>

        <Button
          title={showMonthName(month + 1)}
          onClick={() => changeMonth(month + 1)} />
      </div>

      <TransitionGroup className={`flex relative ${previousMonth < month ? 'reverse' : ''}`}>
        <CSSTransition
          key={month}
          timeout={300}
          classNames='calendar-transition'
          unmountOnExit
          onEntered={() => setPreviousMonth(month)}
        >
          <div>
            <Calendar
              month={month}
              year={year}
              events={events}
            />
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default App
