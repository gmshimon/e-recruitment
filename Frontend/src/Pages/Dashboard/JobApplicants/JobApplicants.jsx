import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyJob } from '../../../Redux/Slices/jobSlice'
import ResponsivePaginationComponent from 'react-responsive-pagination'
import 'react-responsive-pagination/themes/classic.css'
import { FcViewDetails } from 'react-icons/fc'
import { MdOutlineGroup, MdOutlineWorkOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const JobApplicants = () => {
  const { jobs } = useSelector(state => state.job)
  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMyJob())
  }, [dispatch])

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

  const navigate = useNavigate()

  const handleViewApplicants = id => {
    navigate(`/dashboard/job/applicants/${id}`)
  }

  const hasJobs = items.length > 0

  const statusVariants = {
    draft: 'bg-slate-100 text-slate-600',
    active: 'bg-emerald-100 text-emerald-700',
    closed: 'bg-rose-100 text-rose-700'
  }

  const getStatusStyle = status => {
    if (!status) return statusVariants.draft
    const normalized = status.toLowerCase()
    return statusVariants[normalized] || statusVariants.draft
  }

  const getJobTypePill = jobType => {
    if (!jobType) return 'bg-slate-100 text-slate-600'
    return jobType === 'Full Time'
      ? 'bg-blue-100 text-blue-600'
      : 'bg-emerald-100 text-emerald-600'
  }

  return (
    <section className='min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8'>
      <div className=' w-full px-4 sm:px-6 lg:px-8'>
        <header className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-3xl font-semibold text-slate-900'>
              Job applicants
            </h1>
            <p className='mt-1 text-sm text-slate-500'>
              Review candidate pipelines by role and jump into applicant detail.
            </p>
          </div>
          <div className='inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-600 shadow-sm'>
            <span className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white'>
              {jobs?.length || 0}
            </span>
            <div>
              <p className='font-semibold text-slate-900'>Active postings</p>
              <p className='text-xs text-slate-500'>
                Keep your top roles updated to attract talent.
              </p>
            </div>
          </div>
        </header>

        <div className='mt-8 rounded-3xl border border-slate-200 bg-white/95 shadow-sm backdrop-blur'>
          <div className='flex items-center justify-between border-b border-slate-200 px-6 py-4'>
            <div className='flex items-center gap-3 text-sm text-slate-500'>
              <span className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600'>
                <MdOutlineWorkOutline className='h-5 w-5' />
              </span>
              <div>
                <p className='font-medium text-slate-900'>Job overview</p>
                <p>
                  {jobs?.length > 0
                    ? `${jobs.length} total jobs`
                    : 'No jobs posted yet'}
                </p>
              </div>
            </div>
            <div className='hidden text-xs font-medium uppercase tracking-wide text-slate-400 sm:flex'>
              <span className='w-48 px-2'>Applicants</span>
              <span className='w-48 px-2'>Type</span>
              <span className='w-48 px-2'>Location</span>
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
                const applicantCount =
                  job?.applications?.length ??
                  job?.applicantsCount ??
                  job?.applicantCount ??
                  0

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
                        <div className='flex items-center gap-2'>
                          <MdOutlineGroup className='h-4 w-4 text-slate-400' />
                          <span className='font-medium text-slate-700'>
                            {applicantCount} applicant
                            {applicantCount === 1 ? '' : 's'}
                          </span>
                        </div>
                        <div className='flex gap-2'>
                          <span className='font-medium text-slate-700'>
                            Salary:
                          </span>
                          <span>
                            {job?.salary?.salary ||
                              [job?.salary?.min, job?.salary?.max]
                                .filter(Boolean)
                                .join(' - ') ||
                              'Not specified'}
                          </span>
                        </div>
                        <div className='flex gap-2'>
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
                        onClick={() => handleViewApplicants(job?._id)}
                        className='inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900'
                      >
                        <FcViewDetails className='h-4 w-4' />
                        View applicants
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className='flex flex-col items-center justify-center gap-3 px-6 py-12 text-center text-slate-500'>
              <MdOutlineGroup className='h-12 w-12 text-slate-300' />
              <p className='text-base font-semibold text-slate-700'>
                No job applicants yet.
              </p>
              <p className='text-sm'>
                Post a new job and share it to start receiving candidates.
              </p>
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

export default JobApplicants
