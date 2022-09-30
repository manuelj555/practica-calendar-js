import React, { LabelHTMLAttributes } from 'react'

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {

}

const Label = ({ className, children, ...props }: LabelProps) => {
  return (
    <label
      className={`${className} w-1/3 inline-block md:w-1/3`}
      {...props}
    >
      {children}
    </label>
  )
}

export default Label