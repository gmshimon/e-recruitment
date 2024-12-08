import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosSecure from '../../utilis/axiosSecure'
// import axios from '../../utilis/axios'

const initialState = {
    applications:[],
    singleApplication:null,
    createApplicationLoading:false,
    createApplicationSuccess:false,
    createApplicationError:false,
    getApplicationsLoading:false,
    getApplicationsSuccess:false,
    getApplicationsError:false,
    getMyApplicationsLoading:false,
    getMyApplicationsSuccess:false,
    getMyApplicationsError:false,
}

export const createApplication = createAsyncThunk('createApplication',async data=>{
    const response = await axiosSecure.post('/app/create-app',data)
    return response.data.data
})

export const getMyApplications = createAsyncThunk('getMyApplications',async()=>{
    const response = await axiosSecure.get('/app/my-applications')
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
            state.getMyApplicationsLoading=false
            state.getMyApplicationsSuccess=false
            state.getMyApplicationsError=false
        },
        setSingleApplication:(state,action)=>{
            state.singleApplication = action.payload
        },
        setSingleApplicationNull:(state)=>{
            state.singleApplication = null
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
        .addCase(getMyApplications.pending, (state) => {
            state.getMyApplicationsLoading = true
            state.getMyApplicationsSuccess = false
            state.getMyApplicationsError = false
        })
        .addCase(getMyApplications.fulfilled, (state, action) => {
            state.getMyApplicationsLoading = false
            state.getMyApplicationsSuccess = true
            state.getMyApplicationsError = false
            state.applications = action.payload
        })
        .addCase(getMyApplications.rejected, (state) => {
            state.getMyApplicationsLoading = false
            state.getMyApplicationsSuccess = false
            state.getMyApplicationsError = true
        })
    }
})

export const {reset,setSingleApplication,setSingleApplicationNull} = applicationSlice.actions

export default applicationSlice.reducer