import { axiosPrivate } from '../configHttp'

export const updatePositionTask = async (boardId, data) => {
  return await axiosPrivate.post(`/tasks/update-position/${boardId}`, data)
}

export const createTaskSection = async (sectionId) => {
  return await axiosPrivate.post(`/tasks`, { sectionId: sectionId })
}

export const updateTaskWork = async (taskId, data) => {
  return await axiosPrivate.patch(`/tasks/${taskId}`, data)
}

export const deleteTask = async (taskId) => {
  return await axiosPrivate.delete(`/tasks/${taskId}`)
}
