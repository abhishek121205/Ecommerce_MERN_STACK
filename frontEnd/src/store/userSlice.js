import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  verified: {
    isVerified: false,
    verifiedEmail: ""
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload
    },
    setVerified: (state, action) => {
      state.verified.isVerified = action.payload
    },
    setVerifiedEmail: (state, action) => {      
      state.verified.verifiedEmail = action.payload.email
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails, setVerified, setVerifiedEmail } = userSlice.actions

export default userSlice.reducer