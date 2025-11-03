import { HiOutlineEye, HiOutlineSparkles } from 'react-icons/hi'
import ApplicationStatus from '../../../Component/Dashboard/ApplicationStatus/ApplicationStatus'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getMyApplications,
  setSingleApplication,
  setSingleApplicationNull
} from '../../../Redux/Slices/applicationSlice'

const MyApplication = () => {
  const { applications } = useSelector(state => state.application)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMyApplications())
  }, [dispatch])

  console.log(applications)

  const statusStyles = {
    applied: 'bg-blue-50 text-blue-600',
    interviewing: 'bg-amber-50 text-amber-600',
    offered: 'bg-emerald-50 text-emerald-600',
    rejected: 'bg-rose-50 text-rose-600'
  }

  return (
    <section className='min-h-[calc(100vh-64px)] bg-slate-50/60 py-10'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-4 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 px-8 py-10 text-white shadow-xl shadow-blue-900/20 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <span className='inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]'>
              <HiOutlineSparkles className='h-4 w-4' />
              Application tracker
            </span>
            <h1 className='mt-4 text-3xl font-semibold sm:text-4xl'>My Applications</h1>
            <p className='mt-2 max-w-2xl text-sm text-blue-100 sm:text-base'>
              Keep tabs on every role you&apos;ve applied to, see where you stand, and jump into the details whenever you need an update.
            </p>
          </div>
          <div className='rounded-3xl border border-white/20 bg-white/10 px-6 py-4 text-sm text-blue-100 shadow-inner'>
            <p className='text-xs font-semibold uppercase tracking-wide text-white/80'>Active applications</p>
            <p className='mt-1 text-3xl font-semibold'>{applications?.length || 0}</p>
            <p className='mt-1 text-xs text-blue-100/80'>
              We&apos;ll email you as soon as a recruiter moves you forward or requests next steps.
            </p>
          </div>
        </div>

        <div className='rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10'>
          <div className='overflow-x-auto rounded-3xl'>
            <table className='min-w-full divide-y divide-slate-200 text-left text-sm'>
              <thead className='bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500'>
                <tr>
                  <th scope='col' className='px-6 py-4'>
                    Role
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Job details
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Applied on
                  </th>
                  <th scope='col' className='px-6 py-4 text-right'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {applications?.length ? (
                  applications.map(app => (
                    <tr key={app?._id} className='transition hover:bg-blue-50/40'>
                      <td className='px-6 py-5'>
                        <div className='space-y-2'>
                          <p className='text-base font-semibold text-slate-900'>{app?.job?.title || 'Untitled role'}</p>
                          <div
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                              statusStyles[app?.status] || 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <span className='inline-block h-2 w-2 rounded-full bg-current' />
                            {app?.status || 'Status pending'}
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-5 text-sm text-slate-500'>
                        <p className='font-medium text-slate-600'>{app?.job?.job_type || 'Flexible schedule'}</p>
                        <p className='mt-1 text-xs uppercase tracking-wide text-slate-400'>
                          {app?.job?.salary?.salary || 'Salary undisclosed'} • {app?.job?.address?.country || 'Remote friendly'}
                        </p>
                      </td>
                      <td className='px-6 py-5 text-sm text-slate-500'>{app?.createdAt?.split('T')[0] || '—'}</td>
                      <td className='px-6 py-5 text-right'>
                        <button
                          type='button'
                          className='inline-flex items-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 focus:ring-offset-white'
                          title='View details'
                          onClick={() => {
                            dispatch(setSingleApplication(app))
                            document.getElementById('my_modal_5').showModal()
                          }}
                        >
                          <HiOutlineEye className='h-4 w-4' />
                          View status
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className='px-6 py-12'>
                      <div className='flex flex-col items-center justify-center gap-4 text-center text-slate-400'>
                        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400'>
                          <HiOutlineEye className='h-7 w-7' />
                        </div>
                        <div>
                          <p className='text-base font-semibold text-slate-600'>No applications yet</p>
                          <p className='mt-1 text-sm text-slate-500'>
                            Once you submit an application, it will appear here so you can track progress in real time.
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <dialog id='my_modal_5' className='modal'>
        <div className='modal-box max-w-2xl rounded-3xl border border-slate-200 shadow-xl'>
          <form method='dialog'>
            <button
              onClick={() => dispatch(setSingleApplicationNull())}
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            >
              ✕
            </button>
          </form>
          <ApplicationStatus />
        </div>
      </dialog>
    </section>
  )
}

export default MyApplication
