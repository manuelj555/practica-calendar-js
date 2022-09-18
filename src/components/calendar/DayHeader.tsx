
import React from 'react'

type DayProps = {
  children: React.ReactNode,
}

const DayHeader = ({ children }: DayProps) => {
  return (
    <span className='bg-green-700 font-semibold text-gray-50 py-4 px-4 text-center'>
      {children}
    </span>
  )
}

export default DayHeader