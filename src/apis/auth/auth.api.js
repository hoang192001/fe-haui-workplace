import { axiosPrivate } from '../configHttp'

export const login = async (data) => {
  return await axiosPrivate.post('/auth/login', data)
}

export const register = async (data) => {
  return await axiosPrivate.post('/auth/register', data)
}

export const sendCodeMail = async (data) => {
  return await axiosPrivate.post('/auth/sendCodeMail', data)
}

export const changePassword = async (data) => {
  return await axiosPrivate.post('/auth/forgot-password', data)
}
