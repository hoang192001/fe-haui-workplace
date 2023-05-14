import { useEffect, useState } from 'react'

export const useAdminGroup = (objectMessage) => {
  const userIdLocalStorage = localStorage.getItem('userId')
  const [isAdminGroup, setIsAdminGroup] = useState(false)

  useEffect(() => {
    const isAdmin = userIdLocalStorage === objectMessage.from || objectMessage?.typeConversation === 'private'
    setIsAdminGroup(isAdmin)
  }, [objectMessage.from, objectMessage?.typeConversation, userIdLocalStorage])

  return {
    isAdminGroup,
  }
}
