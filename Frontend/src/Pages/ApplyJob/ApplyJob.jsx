import { CiClock2, CiLocationOn } from 'react-icons/ci'
import { IoBagHandleOutline, IoCashOutline } from 'react-icons/io5'
import { HiOutlineSparkles } from 'react-icons/hi'
import CompanyDetails from '../../Component/CompanyDetails/CompanyDetails'
import ApplicationJob from '../../Component/ApplicationJob/ApplicationJob'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJobID } from '../../Redux/Slices/jobSlice'
import dateDifference from '../../utilis/formattedDate'
import './applyJob.css'
import Swal from 'sweetalert2'
import { reset } from '../../Redux/Slices/applicationSlice'

const ApplyJob = () => {
  const { job } = useSelector(state => state.job)
  const { createApplicationSuccess, createApplicationError } = useSelector(state => state.application)
  const { id } = useParams()

  const salaryDisplay =
    job?.salary?.salary ||
    [job?.salary?.min, job?.salary?.max]
      .filter(Boolean)
      .map(value => (typeof value === 'number' ? value.toLocaleString() : value))
      .join(' - ') ||
    'Salary undisclosed'

  const locationFragments = [job?.address?.city, job?.address?.state, job?.address?.country].filter(Boolean)
  const locationDisplay = locationFragments.length > 0 ? locationFragments.join(', ') : 'Location flexible'

  const jobMeta = [
    job?.job_type && {
      label: 'Job type',
      value: job.job_type,
      icon: IoBagHandleOutline
    },
    job?.createdAt && {
      label: 'Posted',
      value: dateDifference(job.createdAt),
      icon: CiClock2
    },
    salaryDisplay && {
      label: 'Compensation',
      value: salaryDisplay,
      icon: IoCashOutline
    },
    locationDisplay && {
      label: 'Location',
      value: locationDisplay,
      icon: CiLocationOn
    }
  ].filter(Boolean)

  const heroDescription = job?.company_name
    ? `Join the ${job.company_name} team and help shape the next chapter of growth. We're looking for builders who bring craft, curiosity, and the drive to ship meaningful work from day one.`
    : 'Bring your expertise to a high-growth team and ship meaningful work from day one.'

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getJobID({ id }))
  }, [dispatch, id])

  useEffect(() => {
    if (createApplicationError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Application Error',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if (createApplicationSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Application Successful',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
  }, [createApplicationError, createApplicationSuccess, dispatch])

  const openApplicationModal = () => document.getElementById('my_modal_3')?.showModal()

  return (
    <section className='relative pb-24 pt-28'>
      <div className='pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-white' />
      <div className='pointer-events-none absolute inset-x-0 top-0 -z-20 h-[480px] bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-blue-700/10 blur-3xl' />

      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='relative overflow-hidden rounded-[40px] border border-slate-200/60 bg-white shadow-2xl shadow-blue-900/20'>
          <div className='pointer-events-none absolute -top-14 right-10 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl' />
          <div className='pointer-events-none absolute -bottom-16 left-10 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl' />

          <div className='relative grid items-center gap-10 px-8 py-10 sm:px-14 sm:py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]'>
            <div className='space-y-6 text-center lg:text-left'>
              <div className='inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700'>
                <HiOutlineSparkles className='h-4 w-4' />
                Open role
              </div>
              <h1 className='text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-[44px]'>
                {job?.title || 'New opportunity'}
              </h1>
              {job?.company_name && <p className='text-base font-medium text-blue-600 sm:text-lg'>{job.company_name}</p>}
              <p className='mx-auto max-w-2xl text-base text-slate-500 sm:text-lg lg:mx-0'>{heroDescription}</p>

              <div className='grid gap-4 sm:grid-cols-2'>
                {jobMeta.map(meta => {
                  const Icon = meta.icon
                  return (
                    <div
                      key={meta.label}
                      className='flex items-start gap-3 rounded-3xl border border-slate-200/80 bg-white px-5 py-4 text-left shadow-sm'
                    >
                      <span className='mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600'>
                        <Icon className='h-5 w-5' />
                      </span>
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>{meta.label}</p>
                        <p className='text-sm font-medium text-slate-700'>{meta.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className='flex flex-col items-center gap-4 sm:flex-row sm:justify-between'>
                <div className='text-sm text-slate-500'>
                  <span className='font-semibold text-slate-800'>Ready to make a move?</span> We review applications every
                  business day.
                </div>
                <button
                  type='button'
                  onClick={openApplicationModal}
                  className='inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:scale-[1.01] hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 focus:ring-offset-white'
                >
                  Apply for this role
                </button>
              </div>
            </div>

            <div className='relative h-full'>
              <div className='relative overflow-hidden rounded-[32px] border border-slate-200 bg-blue-900/5 p-2 shadow-inner'>
                <div className='overflow-hidden rounded-[26px]'>
                  <img
                    src='https://www.microsoft.com/de-de/microsoft-365/blog/wp-content/uploads/sites/10/2018/09/10-new-ways-for-everyone-to-achieve-more-in-the-modern-workplace-BANNER-1.png'
                    alt=''
                    className='h-full w-full object-cover'
                  />
                </div>
              </div>
              <div className='absolute -bottom-6 left-1/2 w-[calc(100%-3rem)] -translate-x-1/2 rounded-3xl border border-slate-200 bg-white px-5 py-4 text-center shadow-xl shadow-blue-900/15'>
                <p className='text-xs font-semibold uppercase tracking-wide text-blue-600'>Currently interviewing</p>
                <p className='mt-1 text-sm text-slate-500'>Apply in under five minutes. No cover letter required.</p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,380px)]'>
          <div className='space-y-10'>
            <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-sm'>
              <h2 className='text-2xl font-semibold text-slate-900'>Welcome to {job?.company_name || 'our team'}</h2>
              <p className='mt-4 text-base leading-relaxed text-slate-600'>
                The AliStudio Design team has a vision to establish a trusted platform that enables productive and healthy
                enterprises in a world of digital and remote everything, constantly changing work patterns and norms, and
                the need for organizational resiliency. The ideal candidate will have strong creative skills and a portfolio
                of work which demonstrates their passion for illustrative design and typography. This candidate will have
                experiences in working with numerous different design platforms such as digital and print forms.
              </p>
            </div>

            <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-sm'>
              <h2 className='text-2xl font-semibold text-slate-900'>What you&apos;ll work on</h2>
              <div
                className='design_container mt-5 text-[15px] leading-relaxed text-slate-600'
                dangerouslySetInnerHTML={{ __html: job?.description || '<p>Role description coming soon.</p>' }}
              />
            </div>

            <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-sm'>
              <h2 className='text-2xl font-semibold text-slate-900'>Preferred experience</h2>
              <div
                className='design_container mt-5 text-[15px] leading-relaxed text-slate-600'
                dangerouslySetInnerHTML={{ __html: job?.requirements || '<p>Experience details will be shared shortly.</p>' }}
              />
            </div>

            <div className='flex flex-col items-center justify-between gap-4 rounded-3xl border border-blue-200 bg-blue-50 p-6 text-center sm:flex-row sm:text-left'>
              <div>
                <h3 className='text-lg font-semibold text-blue-900'>Have what it takes?</h3>
                <p className='text-sm text-blue-800/80'>Submit your application and we&apos;ll reach out with next steps within 3–5 days.</p>
              </div>
              <button
                type='button'
                onClick={openApplicationModal}
                className='inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 focus:ring-offset-blue-50'
              >
                Start application
              </button>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
              <h2 className='text-lg font-semibold text-slate-900'>Role snapshot</h2>
              <dl className='mt-4 space-y-3 text-sm text-slate-600'>
                {jobMeta.map(meta => (
                  <div key={`sidebar-${meta.label}`} className='flex items-start gap-2'>
                    <meta.icon className='mt-0.5 h-4 w-4 text-blue-500' />
                    <div>
                      <dt className='text-xs uppercase tracking-wide text-slate-400'>{meta.label}</dt>
                      <dd className='text-sm font-medium text-slate-700'>{meta.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
            <CompanyDetails />
          </div>
        </div>
      </div>

      <dialog id='my_modal_3' className='modal'>
        <div className='modal-box w-11/12 max-w-xl'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
          </form>
          <ApplicationJob />
        </div>
      </dialog>
    </section>
  )
}

export default ApplyJob
