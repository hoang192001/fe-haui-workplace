import { axiosPrivate } from '../configHttp'

export const createSection = async (boardId) => {
  return await axiosPrivate.post(`/sections/${boardId}`)
}

export const updatePositionSection = async (boardId, data) => {
  return await axiosPrivate.post(`/sections/update-position/${boardId}`, data)
}

export const updateSection = async (sectionId, data) => {
  return await axiosPrivate.patch('/sections/' + sectionId, data)
}

export const deleteSection = async (sectionId) => {
  return await axiosPrivate.delete('/sections/' + sectionId)
}