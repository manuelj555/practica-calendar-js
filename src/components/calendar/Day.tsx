
import React from 'react'

type DayProps = {
  children?: React.ReactNode,
  disabled?: boolean,
}

const Day = ({ children, disabled = false }: DayProps) => {
  return (
    <span className={` font-semibold aspect-square flex ${disabled
      ? 'bg-green-100 text-blue-500'
      : 'bg-green-300 text-blue-700 hover:bg-green-400'
      }`}>
      <span className='text-xl p-2 self-end justify-self-end'>
        {children}
      </span>
    </span>
  )
}

export default Day