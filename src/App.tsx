import moment from 'moment'
import { useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './App.css'
import Button from './components/Button'
import Calendar from './components/calendar'

const showMonthName = (month: number): string => {
  return moment().month(month).format('MMMM')
}

const a = <a className=''></a>

function App() {
  const [month, setMonth] = useState<number>(() => moment().month() + 1)
  const [previousMonth, setPreviousMonth] = useState<number>(() => month)

  return (
    <div className='grid gap-2 items-start justify-center min-h-screen pt-2'>

      <div className='flex justify-between mb-4 self-end items-center'>
        <Button onClick={() => setMonth(m => m - 1)}>{showMonthName(month - 1)}</Button>

        <span className='text-2xl font-semibold'>{showMonthName(month)}</span>

        <Button
          title={showMonthName(month + 1)}
          onClick={() => setMonth(m => m + 1)} />
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
            <Calendar month={month} />
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default App
