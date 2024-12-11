import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosSecure from '../../utilis/axiosSecure'
// import axios from '../../utilis/axios'

const initialState = {
    applications:[],
    applicants:[],
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
    getJobApplicantsLoading:false,
    getJobApplicantsSuccess:false,
    getJobApplicantsError:false,
    updateApplicationMessageLoading:false,
    updateApplicationMessageSuccess:false,
    updateApplicationMessageError:false,
    updateApplicationStatusLoading:false,
    updateApplicationStatusSuccess:false,
    updateApplicationStatusError:false,
}

export const createApplication = createAsyncThunk('createApplication',async data=>{
    const response = await axiosSecure.post('/app/create-app',data)
    return response.data.data
})

export const getMyApplications = createAsyncThunk('getMyApplications',async()=>{
    const response = await axiosSecure.get('/app/my-applications')
    return response.data.data
})

export const getJobApplicants = createAsyncThunk('getJobApplicants',async(id)=>{
    const response = await axiosSecure.get(`/app/get-applicants/${id}`)
    return response.data.data
})

export const updateApplicationMessage = createAsyncThunk('updateApplicationMessage',async({id,data})=>{
    const response = await axiosSecure.put(`/app/add-message/${id}`,data)
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
            state.getJobApplicantsLoading=false
            state.getJobApplicantsSuccess=false
            state.getJobApplicantsError=false
            state.updateApplicationStatusLoading=false
            state.updateApplicationStatusSuccess=false
            state.updateApplicationStatusError=false
            state.updateApplicationMessageLoading=false
            state.updateApplicationMessageSuccess=false
            state.updateApplicationMessageError=false
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
        .addCase(getJobApplicants.pending, (state) => {
            state.getJobApplicantsLoading = true
            state.getJobApplicantsSuccess = false
            state.getJobApplicantsError = false
        })
        .addCase(getJobApplicants.fulfilled, (state, action) => {
            state.getJobApplicantsLoading = false
            state.getJobApplicantsSuccess = true
            state.getJobApplicantsError = false
            state.applicants = action.payload
        })
        .addCase(getJobApplicants.rejected, (state) => {
            state.getJobApplicantsLoading = false
            state.getJobApplicantsSuccess = false
            state.getJobApplicantsError = true
        })
        .addCase(updateApplicationMessage.pending, (state) => {
            state.updateApplicationMessageLoading = true
            state.updateApplicationMessageSuccess = false
            state.updateApplicationMessageError = false
        })
        .addCase(updateApplicationMessage.fulfilled, (state,action) => {
            state.updateApplicationMessageLoading = false
            state.updateApplicationMessageSuccess = true
            state.updateApplicationMessageError = false
            state.singleApplication = action.payload
        })
        .addCase(updateApplicationMessage.rejected, (state) => {
            state.updateApplicationMessageLoading = false
            state.updateApplicationMessageSuccess = false
            state.updateApplicationMessageError = true
        })
    }
})

export const {reset,setSingleApplication,setSingleApplicationNull} = applicationSlice.actions

export default applicationSlice.reducer