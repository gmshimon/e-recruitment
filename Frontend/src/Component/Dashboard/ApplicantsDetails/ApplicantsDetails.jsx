import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateApplicationMessage,
  updateApplicationStatus
} from '../../../Redux/Slices/applicationSlice'

const STATUS_BADGE_STYLES = {
  pending: 'bg-amber-100 text-amber-700 border border-amber-200',
  interviewing: 'bg-sky-100 text-sky-700 border border-sky-200',
  offered: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  rejected: 'bg-rose-100 text-rose-700 border border-rose-200'
}

const formatDate = dateString => {
  if (!dateString) return '—'
  const formatted = new Date(dateString)
  if (Number.isNaN(formatted.getTime())) return '—'
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(formatted)
}

const formatDateRange = (start, end) => {
  const formattedStart = formatDate(start)
  const formattedEnd = formatDate(end)
  if (formattedStart === '—' && formattedEnd === '—') return '—'
  return `${formattedStart} - ${formattedEnd}`
}

const getDocumentLabel = url => {
  if (!url) return ''
  try {
    const parsed = new URL(url)
    const pathname = parsed.pathname
    const segments = pathname.split('/').filter(Boolean)
    return decodeURIComponent(segments[segments.length - 1] ?? parsed.hostname)
  } catch (error) {
    return url.split('/').pop() ?? url
  }
}

const ApplicantsDetails = () => {
  //   const { user } = useSelector(state => state.user)
  const {
    singleApplication,
    updateApplicationMessageLoading,
    updateApplicationStatusLoading
  } = useSelector(state => state.application)
  const [newMessage, setNewMessage] = useState('')

  const dispatch = useDispatch()

  const handleShortList = () => {
    const data = {
      application_status: 'interviewing',
      status: 'interviewing'
    }
    dispatch(updateApplicationStatus({ id: singleApplication?._id, data }))
  }

  const handleOfferJob = () => {
    const data = {
      application_status: 'offered',
      status: 'offered'
    }
    dispatch(updateApplicationStatus({ id: singleApplication?._id, data }))
  }

  const handleRejectJob = () => {
    const data = {
      application_status: 'rejected',
      status: 'rejected'
    }
    dispatch(updateApplicationStatus({ id: singleApplication?._id, data }))
  }

  const handleAddNewMessage = id => {
    const trimmedMessage = newMessage.trim()
    if (!trimmedMessage) return

    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()

    const newMessageData = {
      text: trimmedMessage,
      message_date: `${day}-${month}-${year}`
    }
    dispatch(updateApplicationMessage({ id, data: newMessageData }))
    setNewMessage('')
  }

  const statusClass =
    STATUS_BADGE_STYLES[singleApplication?.application_status] ??
    'bg-slate-100 text-slate-600'

  const skills = singleApplication?.candidate?.skills ?? []
  const educations = singleApplication?.candidate?.education ?? []
  const messages = singleApplication?.messages ?? []

  const appliedDate = useMemo(
    () => formatDate(singleApplication?.createdAt),
    [singleApplication?.createdAt]
  )

  if (!singleApplication) {
    return (
      <section className='py-10 text-center'>
        <p className='text-sm text-slate-500'>No applicant selected.</p>
      </section>
    )
  }

  return (
    <section className='space-y-6'>
      <header className='rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-md'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-xs uppercase tracking-wider text-slate-300'>
              Applicant
            </p>
            <h1 className='text-2xl font-semibold leading-snug md:text-3xl'>
              {singleApplication?.candidate?.name ?? 'Unnamed Candidate'}
            </h1>
            <div className='mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-300'>
              {singleApplication?.candidate?.email && (
                <span>{singleApplication.candidate.email}</span>
              )}
              <span className='flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white'>
                Applied {appliedDate}
              </span>
            </div>
          </div>
          <div className='flex flex-col items-start gap-3 md:items-end'>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass}`}
            >
              {singleApplication?.application_status ?? 'Unknown'}
            </span>
            <div className='flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3'>
              <span className='text-xs uppercase tracking-wide text-slate-300'>
                ATS Score
              </span>
              <span className='text-2xl font-semibold'>
                {singleApplication?.ats_score ?? '—'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
        <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
          <h2 className='text-base font-semibold text-slate-800'>
            Manage Status
          </h2>
          {updateApplicationStatusLoading && (
            <span className='text-sm text-slate-500'>Updating status...</span>
          )}
        </div>
        <div className='flex flex-wrap justify-center gap-3 md:justify-start'>
          <button
            disabled={
              updateApplicationStatusLoading ||
              singleApplication?.application_status === 'interviewing'
            }
            onClick={handleShortList}
            className='btn btn-outline btn-sm md:btn-md'
          >
            Shortlist
          </button>
          <button
            disabled={
              updateApplicationStatusLoading ||
              singleApplication?.application_status === 'offered'
            }
            onClick={handleOfferJob}
            className='btn btn-outline btn-success btn-sm md:btn-md'
          >
            Offer Job
          </button>
          <button
            disabled={
              updateApplicationStatusLoading ||
              singleApplication?.application_status === 'rejected'
            }
            onClick={handleRejectJob}
            className='btn btn-outline btn-error btn-sm md:btn-md'
          >
            Reject
          </button>
        </div>
      </div>

      <div className='grid gap-5 md:grid-cols-2'>
        <div className='space-y-5'>
          <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
            <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
              Skills Snapshot
            </h3>
            {skills.length > 0 ? (
              <ul className='mt-3 flex flex-wrap gap-2'>
                {skills.map((skill, index) => (
                  <li
                    key={`${skill}-${index}`}
                    className='inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700'
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className='mt-3 text-sm text-slate-500'>
                No skills provided for this candidate.
              </p>
            )}
          </div>

          <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
            <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
              Documents
            </h3>
            <div className='mt-4 space-y-3'>
              {singleApplication?.resume ? (
                <a
                  target='_blank'
                  rel='noreferrer'
                  href={singleApplication.resume}
                  className='flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                >
                  <span>Resume</span>
                  <span className='truncate pl-4 text-slate-500'>
                    {getDocumentLabel(singleApplication.resume)}
                  </span>
                </a>
              ) : (
                <p className='text-sm text-slate-500'>
                  Resume not provided by candidate.
                </p>
              )}

              {singleApplication?.offer_letter && (
                <a
                  target='_blank'
                  rel='noreferrer'
                  href={singleApplication.offer_letter}
                  className='flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100'
                >
                  <span>Offer Letter</span>
                  <span className='truncate pl-4 text-emerald-600'>
                    {getDocumentLabel(singleApplication.offer_letter)}
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
          <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
            Education History
          </h3>
          {educations.length > 0 ? (
            <div className='mt-4 space-y-4'>
              {educations.map((item, index) => (
                <div
                  key={`${item?.institution}-${index}`}
                  className='rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700'
                >
                  <div className='flex flex-wrap justify-between gap-2'>
                    <p className='font-semibold text-slate-900'>
                      {item?.title} of {item?.subject}
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                        item?.status === 'Graduated'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {item?.status ?? 'In progress'}
                    </span>
                  </div>
                  <p className='mt-1 text-sm text-slate-500'>
                    {item?.institution ?? 'Institution not provided'}
                  </p>
                  <p className='mt-2 text-xs uppercase tracking-wide text-slate-400'>
                    {formatDateRange(item?.startDate, item?.endDate)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className='mt-3 text-sm text-slate-500'>
              No education history recorded for this candidate.
            </p>
          )}
        </div>
      </div>

      <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
        <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
          <h3 className='text-base font-semibold text-slate-800'>Messages</h3>
          <span className='text-xs uppercase tracking-wide text-slate-400'>
            {messages.length} {messages.length === 1 ? 'message' : 'messages'}
          </span>
        </div>
        <div className='mt-4 space-y-3 max-h-72 overflow-y-auto pr-1'>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={`${message?.message_date}-${index}`}
                className='rounded-xl border border-slate-200 bg-slate-50 p-4'
              >
                <div className='flex items-center justify-between text-xs uppercase tracking-wide text-slate-400'>
                  <span className='font-semibold text-slate-500'>
                    {message?.createdBy?.name ?? 'System'}
                  </span>
                  <span>{message?.message_date ?? '—'}</span>
                </div>
                <p className='mt-2 text-sm text-slate-700'>{message?.text}</p>
              </div>
            ))
          ) : (
            <p className='rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500'>
              No messages yet — start the conversation below.
            </p>
          )}
        </div>
        <div className='mt-5 space-y-3'>
          <label className='text-sm font-semibold text-slate-700'>
            Add New Message
          </label>
          <textarea
            className='textarea textarea-bordered min-h-[120px] w-full'
            placeholder='Share interview notes, feedback, or next steps...'
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          />
          <div className='flex justify-end'>
            <button
              disabled={
                updateApplicationMessageLoading || !newMessage.trim().length
              }
              className='btn btn-primary btn-sm md:btn-md'
              onClick={() => handleAddNewMessage(singleApplication?._id)}
            >
              {updateApplicationMessageLoading ? 'Saving...' : 'Add Message'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApplicantsDetails
