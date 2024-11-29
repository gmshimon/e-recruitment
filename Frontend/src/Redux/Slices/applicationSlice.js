import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosSecure from '../../utilis/axiosSecure'
// import axios from '../../utilis/axios'

const initialState = {
    applications:[],
    createApplicationLoading:false,
    createApplicationSuccess:false,
    createApplicationError:false,
    getApplicationsLoading:false,
    getApplicationsSuccess:false,
    getApplicationsError:false,
}

export const createApplication = createAsyncThunk('createApplication',async data=>{
    const response = await axiosSecure.post('/app/create-app',data)
    return response.data.data
})

const applicationSlice = createSlice({
    name:'application',
    initialState,
    reducers:{
        reset:state=>{
            state.createApplicationLoading = false
            state.createApplicationSuccess = false
            state.createApplicationError = false
            state.getApplicationsLoading = false
            state.getApplicationsSuccess = false
            state.getApplicationsError = false
        }
    },
    extraReducers:builder => {
        builder
        .addCase(createApplication.pending, (state) => {
            state.createApplicationLoading = true
            state.createApplicationSuccess = false
            state.createApplicationError = false
        })
        .addCase(createApplication.fulfilled, (state) => {
            state.createApplicationLoading = false
            state.createApplicationSuccess = true
            state.createApplicationError = false
        })
        .addCase(createApplication.rejected, (state) => {
            state.createApplicationLoading = false
            state.createApplicationSuccess = false
            state.createApplicationError = true
        })
    }
})

export const {reset} = applicationSlice.actions

export default applicationSlice.reducer