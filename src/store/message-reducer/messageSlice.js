import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllConversation, getListMessageChat } from '~/apis/chat/chat.api'

export const fetchAllConversation = createAsyncThunk('chats/getAllConversation', (userIdLocal) =>
  getAllConversation(userIdLocal).then((res) => res.data),
)

export const fetchAllMessageChat = createAsyncThunk('chats/getAllMessageChat', (userId) =>
  getListMessageChat(userId).then((res) => res.data),
)

const initialState = {
  conversation: {},
  allConversation: [],
  messageChat: [],
}

export const messageSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectConversation: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.conversation = action.payload
    },
    sendMessageChat: (state, action) => {
      state.messageChat.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllConversation.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.allConversation = action.payload
    })
    builder.addCase(fetchAllMessageChat.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.messageChat = action.payload
    })
  },
})

export const { selectConversation, sendMessageChat } = messageSlice.actions

export default messageSlice.reducer
