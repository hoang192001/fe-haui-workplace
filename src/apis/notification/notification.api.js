import { axiosPrivate } from '../configHttp'

export const getAllNotification = async () => {
  return await axiosPrivate.get('/notifications')
}

export const getCountNotification = async () => {
  return await axiosPrivate.get('/notifications/count')
}

export const seeAllNotifi = async () => {
  return await axiosPrivate.post('/notifications/see-all')
}
