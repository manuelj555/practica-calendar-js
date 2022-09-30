import { useState } from 'react'

export default function useModal(initialVisible: boolean = false) {
  const [visible, setVisible] = useState<boolean>(initialVisible)

  const hide = () => setVisible(false)
  const show = () => setVisible(true)

  return {
    visible,
    show,
    hide,
  }
}
