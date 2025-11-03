import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createApplication } from '../../Redux/Slices/applicationSlice'

const ApplicationJob = () => {
  const { job } = useSelector(state => state.job)
  const { user } = useSelector(state => state.user)

  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState('')
  const [cover, setCover] = useState('')
  const [resume, setResume] = useState(user?.resume?.[0] || '')

  const dispatch = useDispatch()

  const resumeOptions = useMemo(() => (Array.isArray(user?.resume) ? user.resume : []), [user])

  useEffect(() => {
    setResume(resumeOptions[0] || '')
  }, [resumeOptions])

  const getResumeFileName = url => {
    if (typeof url !== 'string') return 'Resume'
    try {
      const segments = url.split('/')
      return segments[segments.length - 1] || 'Resume'
    } catch {
      return 'Resume'
    }
  }

  const handleSubmitApplication = event => {
    event?.preventDefault()
    if (!job?._id) return
    if (!name || !phone || !resume) return

    const data = {
      name,
      phone,
      email: user?.email,
      cover,
      resume,
      job: job._id
    }
    dispatch(createApplication(data))
    document.getElementById('my_modal_3')?.close()
  }

  return (
    <section className='space-y-10'>
      <div className='text-center'>
        <span className='inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700'>
          {job?.company_name || 'Your next team'}
        </span>
        <h1 className='mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl'>Start your application</h1>
        <p className='mt-3 text-sm text-slate-500 sm:text-base'>
          Share a few details and we&apos;ll keep you posted through every step of the hiring process.
        </p>
      </div>

      <form onSubmit={handleSubmitApplication} className='space-y-8'>
        <div className='grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8'>
          <label className='flex flex-col gap-2 text-left'>
            <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
              Full name <span className='text-red-500'>*</span>
            </span>
            <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Enter your full name'
              className='rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100'
              required
            />
          </label>

          <label className='flex flex-col gap-2 text-left'>
            <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>Email</span>
            <input
              type='email'
              value={user?.email || ''}
              readOnly
              className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 shadow-sm'
            />
          </label>

          <label className='flex flex-col gap-2 text-left'>
            <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
              Phone <span className='text-red-500'>*</span>
            </span>
            <input
              type='tel'
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder='Include your country code'
              className='rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100'
              required
            />
          </label>

          <label className='flex flex-col gap-2 text-left sm:col-span-2'>
            <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>Cover letter</span>
            <textarea
              value={cover}
              onChange={e => setCover(e.target.value)}
              placeholder='Tell us why you are a great fit (optional)'
              className='min-h-[140px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100'
            />
          </label>
        </div>

        <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'>
          <div className='flex flex-col gap-2 text-left'>
            <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
              Resume on file <span className='text-red-500'>*</span>
            </span>
            <p className='text-sm text-slate-500'>Select the resume you&apos;d like to include with this application.</p>
          </div>

          <div className='mt-5 space-y-3'>
            {resumeOptions.length > 0 ? (
              resumeOptions.map(item => (
                <label
                  key={item}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm shadow-sm transition ${
                    resume === item ? 'border-blue-400 bg-blue-50/60 text-blue-700' : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <input
                      type='radio'
                      name='selected-resume'
                      value={item}
                      checked={resume === item}
                      onChange={() => setResume(item)}
                      className='radio border-slate-300 text-blue-500 focus:ring-blue-200'
                    />
                    <div className='flex flex-col'>
                      <span className='font-medium'>{getResumeFileName(item)}</span>
                      <a
                        href={item}
                        target='_blank'
                        rel='noreferrer'
                        className='text-xs font-semibold uppercase tracking-wide text-blue-500 hover:text-blue-600'
                      >
                        View resume
                      </a>
                    </div>
                  </div>
                  {resume === item && <span className='rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white'>Selected</span>}
                </label>
              ))
            ) : (
              <div className='rounded-2xl border border-dashed border-blue-200 bg-blue-50/80 px-5 py-4 text-sm text-blue-700'>
                No resume on file. Upload your latest resume from your profile to enable quick apply.
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col items-center justify-between gap-4 rounded-3xl border border-blue-200 bg-blue-50 px-6 py-5 text-center sm:flex-row sm:text-left'>
          <div>
            <h3 className='text-base font-semibold text-blue-900'>Ready to submit?</h3>
            <p className='text-sm text-blue-800/80'>We&apos;ll confirm receipt instantly and share next steps via email.</p>
          </div>
          <button
            type='submit'
            className='inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 focus:ring-offset-blue-50'
          >
            Submit application
          </button>
        </div>
      </form>
    </section>
  )
}

export default ApplicationJob
