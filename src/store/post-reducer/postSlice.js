import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllPost } from '~/apis/post/post.api'
import { getAllPostUserId } from '~/apis/user/user.api'

export const fetchAllPost = createAsyncThunk('posts/getAllPosts', () =>
  getAllPost().then((res) => res.data),
)
export const getAllPostUser = createAsyncThunk('posts/getAllPostUser', (userId) =>
  getAllPostUserId(userId).then((res) => res.data),
)

export const loadMorePost = createAsyncThunk('posts/loadMorePosts', (page) =>
  getAllPost(page).then((res) => res.data),
)

const initialState = {
  posts: [],
  postUser: [],
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    likePostHome: (state, action) => {
      const { postId, userInfo } = action.payload
      const postFind = state.posts.find(item => item._id === postId)
      const likesArray = postFind.likes.flatMap(item => item.userLike._id)
      
      if (!likesArray.includes(userInfo._id)) {
        const dataPush = {
          userLike: userInfo
        }
        postFind.likes.push(dataPush)
      } else {
        const index = likesArray.indexOf(userInfo._id);

        postFind.likes.splice(index, 1);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPost.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload
    })
    builder.addCase(loadMorePost.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = [...state.posts, ...action.payload]
    })
    builder.addCase(getAllPostUser.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.postUser = action.payload
    })
  },
})

export const { setSocket, likePostHome } = postSlice.actions

export default postSlice.reducer
