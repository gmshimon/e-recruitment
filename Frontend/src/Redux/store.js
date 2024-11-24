import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import educationSlice from './Slices/educationSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    educations: educationSlice
  },
})

export default store;