import React from 'react'
import Label from './Label'

const ControlRow = ({
  label,
  children
}) => {
  return (
    <div className='flex gap-2 items-center'>
      <Label>{label}</Label>
      <div className='flex-grow'>
        {children}
      </div>
    </div>
  )
}

export default ControlRow