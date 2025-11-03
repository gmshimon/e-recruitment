import { useEffect, useMemo, useState } from 'react'
import {
  MdDeleteOutline,
  MdOutlineModeEditOutline,
  MdOutlineWorkOutline
} from 'react-icons/md'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
  deleteJob,
  getMyJob,
  reset,
  resetDetails
} from '../../../Redux/Slices/jobSlice'
import ResponsivePaginationComponent from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'

const MyJobs = () => {
  const { jobs, updateJobSuccess, deleteJobSuccess, deleteJobError } =
    useSelector(state => state.job)
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyJob())
  }, [dispatch])

  useEffect(() => {
    if (updateJobSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Job Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
      dispatch(resetDetails())
    }
    if (deleteJobSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Job deleted Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
      dispatch(resetDetails())
    }
    if (deleteJobError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Job delete failed',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
      dispatch(resetDetails())
    }
  }, [updateJobSuccess, deleteJobError, dispatch, deleteJobSuccess])

  const handledeleteJob = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deleteJob({ id: id }))
      }
    })
  }
  const handleEditJobs = id => {
    navigate(`/dashboard/my-jobs/${id}`)
  }

  const itemsPerPage = 5 // Number of items to show per page
  const totalPages = Math.max(1, Math.ceil((jobs?.length || 0) / itemsPerPage))
  const handlePageChange = page => {
    setCurrentPage(page)
  }
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const items = useMemo(
    () => jobs?.slice(indexOfFirstItem, indexOfLastItem) ?? [],
    [jobs, indexOfFirstItem, indexOfLastItem]
  )

  const hasJobs = items.length > 0

  const statusVariants = {
    draft: 'bg-slate-100 text-slate-600',
    active: 'bg-emerald-100 text-emerald-700',
    closed: 'bg-rose-100 text-rose-700'
  }

  const getStatusStyle = status => {
    if (!status) return statusVariants.draft
    const normalized = status.toLowerCase()
    if (statusVariants[normalized]) return statusVariants[normalized]
    return statusVariants.draft
  }

  const getJobTypePill = jobType => {
    if (!jobType) return 'bg-slate-100 text-slate-600'
    return jobType === 'Full Time'
      ? 'bg-blue-100 text-blue-600'
      : 'bg-emerald-100 text-emerald-600'
  }

  return (
    <section className='min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8'>
      <div className='w-full  px-4 sm:px-6 lg:px-8'>
        <header className='flex flex-col gap-3 sm:items-center sm:justify-between sm:flex-row'>
          <div>
            <h1 className='text-3xl font-semibold text-slate-900'>My Jobs</h1>
            <p className='mt-1 text-sm text-slate-500'>
              Track, edit, and manage your active listings.
            </p>
          </div>
          <button
            type='button'
            onClick={() => navigate('/dashboard/post-job')}
            className='inline-flex items-center gap-2 rounded-full border border-transparent bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg'
          >
            <HiOutlineDocumentText className='h-4 w-4' />
            Post new job
          </button>
        </header>

        <div className='mt-8 rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur'>
          <div className='flex items-center justify-between border-b border-slate-200 px-6 py-4'>
            <div className='flex items-center gap-3 text-sm text-slate-500'>
              <span className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600'>
                <MdOutlineWorkOutline className='h-5 w-5' />
              </span>
              <div>
                <p className='font-medium text-slate-900'>Job listings</p>
                <p>
                  {jobs?.length > 0
                    ? `${jobs.length} total`
                    : 'No jobs published yet'}
                </p>
              </div>
            </div>
            <div className='hidden text-xs font-medium uppercase tracking-wide text-slate-400 sm:flex'>
              <span className='w-48 px-2'>Status</span>
              <span className='w-48 px-2'>Type</span>
              <span className='w-48 px-2'>Salary & Location</span>
              <span className='w-32 px-2 text-right'>Actions</span>
            </div>
          </div>

          {hasJobs ? (
            <ul className='divide-y divide-slate-100'>
              {items.map(job => {
                const jobStatus = job?.status || 'Draft'
                const createdDate = job?.createdAt
                  ? new Date(job.createdAt).toLocaleDateString()
                  : '—'

                return (
                  <li
                    key={job?._id}
                    className='flex flex-col gap-4 px-6 py-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between'
                  >
                    <div className='flex flex-1 flex-col gap-4 sm:flex-row sm:items-center'>
                      <div>
                        <p className='text-base font-semibold text-slate-900'>
                          {job?.title || 'Untitled role'}
                        </p>
                        <div className='mt-2 flex flex-wrap items-center gap-2 text-xs font-medium'>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 capitalize ${getStatusStyle(
                              jobStatus
                            )}`}
                          >
                            {jobStatus}
                          </span>
                          {job?.job_type && (
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 capitalize ${getJobTypePill(
                                job.job_type
                              )}`}
                            >
                              {job.job_type}
                            </span>
                          )}
                          <span className='text-slate-400'>
                            Posted {createdDate}
                          </span>
                        </div>
                      </div>
                      <div className='flex flex-1 flex-wrap items-center gap-4 text-sm text-slate-500'>
                        <div className='flex gap-1'>
                          <span className='font-medium text-slate-700'>
                            Salary:
                          </span>
                          <span>
                            {job?.salary?.salary || 'Not specified'}
                          </span>
                        </div>
                        <div className='flex gap-1'>
                          <span className='font-medium text-slate-700'>
                            Location:
                          </span>
                          <span>
                            {job?.address?.country || 'Remote-friendly'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-2 self-start sm:self-auto'>
                      <button
                        type='button'
                        onClick={() => handleEditJobs(job?._id)}
                        className='inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900'
                      >
                        <MdOutlineModeEditOutline className='h-4 w-4' />
                        Edit
                      </button>
                      <button
                        type='button'
                        onClick={() => handledeleteJob(job?._id)}
                        className='inline-flex items-center gap-2 rounded-xl border border-transparent bg-rose-50 px-4 py-2 text-sm font-medium text-rose-500 transition hover:bg-rose-100 hover:text-rose-600'
                      >
                        <MdDeleteOutline className='h-4 w-4' />
                        Delete
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className='flex flex-col items-center justify-center gap-3 px-6 py-12 text-center text-slate-500'>
              <MdOutlineWorkOutline className='h-12 w-12 text-slate-300' />
              <p className='text-base font-semibold text-slate-700'>
                You haven’t posted any jobs yet.
              </p>
              <p className='text-sm'>
                Create your first job to start attracting candidates.
              </p>
              <button
                type='button'
                onClick={() => navigate('/dashboard/post-job')}
                className='mt-2 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800'
              >
                <HiOutlineDocumentText className='h-4 w-4' />
                Create job post
              </button>
            </div>
          )}
        </div>
        <div className='mt-6 flex justify-end'>
          <ResponsivePaginationComponent
            total={totalPages}
            current={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default MyJobs
