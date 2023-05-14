import { axiosFormData, axiosPrivate } from '../configHttp'

export const createGroupNew = async (data) => {
  const bodyFormData = new FormData()
  bodyFormData.append('nameGroup', data.nameGroup)
  bodyFormData.append('file', data.file)
  bodyFormData.append('userId', data.userId)
  return await axiosFormData.post('/groups', bodyFormData)
}

export const getAllGroup = async () => {
  return await axiosFormData.get('/groups')
}

export const getAllGroupNotJoin = async (data) => {
  return await axiosPrivate.get('/groups/groups-not-join', {
    params: {
      nameGroup: data,
    },
  })
}

export const getGroupDetailById = async (id) => {
  return await axiosFormData.get('/groups/' + id)
}

export const createPostGroup = async (data) => {
  const bodyFormData = new FormData()
  bodyFormData.append('content', data.content)
  bodyFormData.append('userId', data.userId)
  bodyFormData.append('groupId', data.groupId)

  if (data.file.length === 1) {
    bodyFormData.append('file', data.file[0])
  } else {
    for (let i = 0; i < data.file.length; i++) {
      bodyFormData.append('file', data.file[i])
    }
  }
  return await axiosFormData.post('/posts/post-group', bodyFormData)
}

export const joinGroup = async (groupId) => {
  return await axiosPrivate.post('/groups/join-group/' + groupId)
}
