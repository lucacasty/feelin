import { createSlice } from '@reduxjs/toolkit'

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    page: 1,
    showWelcome: true,
    firstMessage: "",
  },
  reducers: {
    changePage: (state, value) => {
      state.page = value.payload
    },
    showHideWelcome: (state, value) => {
      state.showWelcome = value.payload
    },
    setMessage:(state, value) => {
      state.firstMessage = value.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { changePage, showHideWelcome, setMessage} = generalSlice.actions

export default generalSlice.reducer