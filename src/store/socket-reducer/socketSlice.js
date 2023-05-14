import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload
    },
  },
})

export const { setSocket } = socketSlice.actions

export default socketSlice.reducer
