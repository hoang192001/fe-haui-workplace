import { useEffect, useState } from 'react'

export const useCheckAdmin = (arrayListUser) => {
  const userIdLocalStorage = localStorage.getItem('userId')
  const [userClient, setUserClient] = useState()

  useEffect(() => {
    const findUser = arrayListUser?.find((item) => item._id !== userIdLocalStorage)
    setUserClient(findUser)
  }, [arrayListUser, userIdLocalStorage])

  return {
    userClient,
  }
}
