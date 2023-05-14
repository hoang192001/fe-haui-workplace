import React, { createContext, useState } from 'react'

export const PostContext = createContext()

const PostProvider = ({ children }) => {
  const [postDetail, setPostDetail] = useState()
  return (
    <PostContext.Provider value={{ postDetail, setPostDetail }}>{children}</PostContext.Provider>
  )
}

export default PostProvider
