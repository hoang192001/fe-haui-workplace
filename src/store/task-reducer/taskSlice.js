import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllBoard } from '~/apis/task-work/board.api'

export const fetchAllBoard = createAsyncThunk('posts/fetchAllBoard', () =>
  getAllBoard().then((res) => res.data),
)

const initialState = {
  boards: [],
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllBoard.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.boards = action.payload
    })
  },
})

export const { setSocket } = taskSlice.actions

export default taskSlice.reducer
