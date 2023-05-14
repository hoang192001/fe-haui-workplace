import { axiosFormData, axiosPrivate } from '../configHttp'

export const getAllConversation = async (userId) => {
  return await axiosPrivate.get(`/messages?userId=${userId}`)
}

export const getListMessageChat = async (userId) => {
  return await axiosPrivate.get(`/messages/${userId}`)
}

export const getConversationById = async (conversationId) => {
  return await axiosPrivate.get(`/messages/conversation/${conversationId}`)
}

export const createCoversation = async (data) => {
  return await axiosPrivate.post(`/messages`, data)
}

export const deleteOrAddUserGroupChat = async (conversationId, data) => {
  return await axiosPrivate.post(`/messages/delete-add-user/${conversationId}`, data)
}

export const deleteConversation = async (conversationId) => {
  return await axiosPrivate.delete(`/messages/conversation/${conversationId}`)
}

export const changeConversation = async (conversationId, data) => {
  const bodyFormData = new FormData()
  bodyFormData.append('nameGroup', data.nameGroup)
  bodyFormData.append('file', data.selectedFile)
  // bodyFormData.append('userId', data.userId)
  return await axiosFormData.patch(`/messages/conversation/${conversationId}`, bodyFormData)
}
