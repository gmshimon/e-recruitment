/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth'
import axios from '../../utilis/axios'
import axiosSecure from '../../utilis/axiosSecure'
import auth from '../../Firebase/firebase.config'

const initialState = {
  userDetails: null,
  adminDetails: null,
  user: null,
  users: [],
  isLoading: true,
  isLoginLoading: false,
  isLoginError: false,
  isLoginSuccess: false,
  isCreateUserLoading: false,
  isCreateUserError: false,
  isCreateUserSuccess: false,
  isGetUserDataLoading: false,
  isGetUserDataSuccess: false,
  isGetUserDataError: false,
  isGetUsersLoading: false,
  isGetUsersSuccess: false,
  isGetUsersError: false,
  isAdminDataLoading: false,
  isAdminDataSuccess: false,
  isAdminDataError: false
}

export const saveUserData = async userData => {
  const response = await axios.post('/user', userData)
  const data = response.data.data
  const tokenExpiration = new Date().getTime() + 3 * 60 * 60 * 1000 // 8 hours from now
  localStorage.setItem(
    'userToken',
    JSON.stringify({
      access_token: response.data.token,
      expiration: tokenExpiration
    })
  )
  return data
}

export const fetchUser = createAsyncThunk('fetchUser', async email => {
  const response = await axios.post(`/user/get-user`, { email: email })
  return response.data.data
})

export const loginUser = createAsyncThunk(
  'loginUser',
  async ({ email, password }) => {
    const res = await signInWithEmailAndPassword(auth, email, password)
    const data = await saveUserData({
      name: res?.user?.displayName,
      email: res?.user?.email
    })
    return data
  }
)

export const createUser = createAsyncThunk(
  'createUser',
  async ({ name, email, phone, password }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const result = updateProfile(auth.currentUser, {
      displayName: name
    })
    const data = await saveUserData({
      name: name,
      email: email,
      phone: phone,
      password: password
    })
    return data
  }
)

export const logOut = createAsyncThunk('logOut', async () => {
  const response = await signOut(auth)
  localStorage.removeItem('userToken')
  return response
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: state => {
      state.userDetails = null
      state.adminDetails = null
      state.isLoading = true
      state.isLoginLoading = false
      state.isLoginError = false
      state.isLoginSuccess = false
      state.isCreateUserLoading = false
      state.isCreateUserError = false
      state.isCreateUserSuccess = false
      state.isGetUserDataLoading = false
      state.isGetUserDataSuccess = false
      state.isGetUserDataError = false
      state.isGetUsersLoading = false
      state.isGetUsersSuccess = false
      state.isGetUsersError = false
      state.isAdminDataLoading = false
      state.isAdminDataSuccess = false
      state.isAdminDataError = false
    },
    startLoading: (state, action) => {
      state.isLoading = true
    },
    setUsers: (state, action) => {
      state.isLoading = false
      state.users = action.payload
    },
    logout: async (state, action) => {
      signOut(auth).then(() => {
        state.user = null
        localStorage.removeItem('userToken')
      })
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoginLoading = true
        state.isLoginError = false
        state.isLoginSuccess = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoginLoading = false
        state.isLoginSuccess = true
        state.isLoginError = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginLoading = false
        state.isLoginError = true
        state.isLoginSuccess = false
      })
      .addCase(createUser.pending, state => {
        state.isCreateUserLoading = true
        state.isCreateUserError = false
        state.isCreateUserSuccess = false
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isCreateUserError = false
        state.isCreateUserSuccess = true
        state.isCreateUserLoading = false
        state.user = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isCreateUserLoading = false
        state.isCreateUserError = true
        state.isCreateUserSuccess = false
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = null
      })
      .addCase(logOut.rejected, (state, action) => {})
  }
})

export const { reset, setUser, logout, startLoading } = userSlice.actions
export default userSlice.reducer
