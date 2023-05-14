import { axiosPrivate } from '../configHttp'

export const getAllBoard = async (userId) => {
  return await axiosPrivate.get(`/boards?userId=${userId}`)
}

export const createBoard = async () => {
  return await axiosPrivate.post('/boards')
}

export const getDetailBoard = async (id) => {
  return await axiosPrivate.get('/boards/' + id)
}

export const updateBoard = async (boardId, data) => {
  return await axiosPrivate.patch('/boards/' + boardId, data)
}

export const deleteBoard = async (boardId) => {
  return await axiosPrivate.delete('/boards/' + boardId)
}

export const inviteUserToBoard = async (data) => {
  return await axiosPrivate.post('/boards/invite-user-board', data)
}