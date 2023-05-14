import { axiosPrivate } from '../configHttp'

export const createEvent = async (data) => {
  return await axiosPrivate.post(`/calendars`, data)
}

export const getAllEvents = async (userId) => {
  return await axiosPrivate.get(`/calendars?userId=${userId}`)
}

export const changeEvent = async (eventId, data) => {
  return await axiosPrivate.patch(`/calendars/${eventId}`, data)
}

export const deleteEvent = async (eventId) => {
  return await axiosPrivate.delete(`/calendars/${eventId}`)
}
