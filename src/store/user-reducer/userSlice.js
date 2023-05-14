import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload
    },
  },
})

export const { setToken } = userSlice.actions

export default userSlice.reducer
