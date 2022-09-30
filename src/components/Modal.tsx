import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { CSSTransition, Transition } from 'react-transition-group'

type ModalProps = {
  show: boolean,
  onHide: Function,
  children: React.ReactNode,
}

export const Modal = ({ show, onHide, children }: ModalProps) => {
  const $ref = useRef(null)

  const handleOverlayClick = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    if (event.target !== $ref.current) return

    onHide()
  }

  return (
    <CSSTransition
      in={show}
      timeout={300}
      unmountOnExit
      classNames='modal-effect'
      nodeRef={$ref}
    >
      <dialog
        ref={$ref}
        className='block fixed top-0 w-screen h-screen bg-gray-700 bg-opacity-20 z-40'
        onClick={handleOverlayClick}
      >
        <div
          className='dialog-content p-4 mx-auto max-w-xl bg-gray-100 z-50 rounded mt-10 shadow-xl'
        >
          {children}
        </div>
      </dialog>
    </CSSTransition>
  )
}