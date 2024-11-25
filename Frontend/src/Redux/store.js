import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import educationSlice from './Slices/educationSlice'
import jobSlice from './Slices/jobSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    educations: educationSlice,
    job:jobSlice
  },
})

export default store;