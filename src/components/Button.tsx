import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode,
  title?: React.ReactNode
}

const Button = ({ title, children, ...props }: ButtonProps) => {
  return (
    <button className='py-2 px-3 bg-slate-300 rounded' {...props}>
      {title ?? children}
    </button>
  )
}

export default Button