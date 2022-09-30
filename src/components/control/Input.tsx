import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {

}

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={`${className} p-2 mb-2 w-full`}
      {...props}
    />
  )
}

export default Input