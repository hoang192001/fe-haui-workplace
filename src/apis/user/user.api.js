import { axiosFormData, axiosPrivate } from '../configHttp'

export const getAllUser = async (dataSearch) => {
  return await axiosPrivate.get('/users', {
    params: {
      fullName: dataSearch,
    },
  })
}

export const getUserById = async (userId) => {
  return await axiosPrivate.get('/users/' + userId)
}

export const getAllPostUserId = async (userId) => {
  return await axiosPrivate.get('/users/post/' + userId)
}

export const followUser = async (dataUser) => {
  return await axiosPrivate.post('/users/follow', dataUser)
}

export const changeInfoUser = async (userId, data) => {
  const bodyFormData = new FormData()
  for (let index = 0; index < Object.keys(data).length; index++) {
    const elementKey = Object.keys(data)[index]
    if (Object.keys(data)[index] === 'avatar') {
      bodyFormData.append('avatar', data.avatar)
    } else {
      bodyFormData.append(Object.keys(data)[index], data[elementKey])
    }
  }
  bodyFormData.delete('followers')
  bodyFormData.delete('following')
  bodyFormData.delete('posts')
  return await axiosFormData.patch('/users/' + userId, bodyFormData)
}
