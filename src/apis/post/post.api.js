import { axiosPrivate, axiosFormData } from '../configHttp'

export const getAllPost = async (pageNumber) => {
  return await axiosPrivate.get('/posts', {
    params: {
      page: pageNumber
    }
  })
}

export const getPostById = async (postId) => {
  return await axiosPrivate.get('/posts/' + postId)
}

export const createPostApi = async (data) => {
  const bodyFormData = new FormData()
  bodyFormData.append('content', data.content)
  bodyFormData.append('userId', data.userId)

  if (data.file.length === 1) {
    bodyFormData.append('file', data.file[0])
  } else {
    for (let i = 0; i < data.file.length; i++) {
      bodyFormData.append('file', data.file[i])
    }
  }

  return await axiosFormData.post('/posts', bodyFormData)
}

export const actionLikePost = async (postId, data) => {
  return await axiosPrivate.post('/posts/like/' + postId, data)
}

export const deletePost = async (postId) => {
  return await axiosPrivate.delete('/posts/' + postId)
}

export const changePost = async (postId, data) => {
  const bodyFormData = new FormData()
  bodyFormData.append('content', data.content)
  bodyFormData.append('file', data.file)

  return await axiosFormData.patch('/posts/' + postId, bodyFormData)
}
