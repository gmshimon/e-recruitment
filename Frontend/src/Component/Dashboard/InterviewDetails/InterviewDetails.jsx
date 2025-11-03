import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { updateApplicationStatus } from '../../../Redux/Slices/applicationSlice'

const formatTime = value => {
  if (!value) return 'Set time'
  const [hours, minutes] = value.split(':')
  const hourNumber = Number(hours)
  if (Number.isNaN(hourNumber)) return 'Set time'

  const period = hourNumber >= 12 ? 'PM' : 'AM'
  const formattedHours = hourNumber % 12 || 12
  return `${formattedHours}:${minutes} ${period}`
}

const formatDate = rawDate => {
  if (!rawDate) return 'Pick a date'
  if (typeof rawDate === 'string') return rawDate
  const parsed = new Date(rawDate)
  if (Number.isNaN(parsed.getTime())) return 'Pick a date'
  return parsed.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const InterviewDetails = () => {
  const [value, setValue] = useState('')
  const [time, setTime] = useState()
  const [interviewType, setInterviewType] = useState('')
  const [meetingLink, setMeetingLink] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const { singleApplication, updateApplicationStatusLoading } = useSelector(
    state => state.application
  )

  const dispatch = useDispatch()

  useEffect(() => {
    setValue(singleApplication?.interview?.date)
    setTime(singleApplication?.interview?.time)
    setInterviewType(singleApplication?.interview?.type)
    if (singleApplication?.interview?.type === 'Online') {
      setMeetingLink(singleApplication?.interview?.location)
    } else {
      setAddress(singleApplication?.interview?.location)
      setPhone(singleApplication?.interview?.phone)
    }
  }, [singleApplication, updateApplicationStatusLoading])

  const handleTimeChange = time => {
    const [hours, minutes] = time.split(':')
    const period = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12 // Converts 0 to 12 for midnight
    return `${formattedHours}:${minutes} ${period}`
  }

  const handleDateChange = date => {
    const options = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }
    const formattedDate = date
      .toLocaleDateString('en-US', options)
      .replace(/,/g, '') // Converts to 'Wed Dec 11 2024'
    setValue(formattedDate)
  }

  const handleSaveInterview = () => {
    const data = {
      interview: {
        date: value,
        time: time,
        type: interviewType,
        location: interviewType === 'Online' ? meetingLink : address,
        phone: phone
      }
    }
    dispatch(updateApplicationStatus({ id: singleApplication?._id, data }))
    setTime('')
    setValue('')
    setInterviewType('')
    setMeetingLink('')
    setAddress('')
    setPhone('')
  }

  const selectedDateLabel = useMemo(() => formatDate(value), [value])
  const selectedTimeLabel = useMemo(() => formatTime(time), [time])

  return (
    <section className='space-y-6'>
      <header className='rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-md'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-xs uppercase tracking-wider text-slate-300'>
              Interview Coordination
            </p>
            <h1 className='text-2xl font-semibold md:text-3xl'>
              {singleApplication?.candidate?.name ?? 'Candidate'}
            </h1>
            <p className='text-sm text-slate-300'>
              {singleApplication?.job?.title ?? 'Job title not provided'}
            </p>
          </div>
          <div className='grid gap-2 text-right text-sm text-slate-300'>
            <span>
              <span className='text-slate-400'>Date:</span>{' '}
              <strong className='text-white'>{selectedDateLabel}</strong>
            </span>
            <span>
              <span className='text-slate-400'>Time:</span>{' '}
              <strong className='text-white'>{selectedTimeLabel}</strong>
            </span>
            <span>
              <span className='text-slate-400'>Type:</span>{' '}
              <strong className='text-white'>
                {interviewType || 'Pick type'}
              </strong>
            </span>
          </div>
        </div>
      </header>

      <div className='grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'>
        <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
          <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
            Pick Date & Time
          </h2>
          <p className='mt-2 text-sm text-slate-500'>
            Align availability with the candidate by choosing the date and time
            below.
          </p>
          <div className='mt-4 flex flex-col gap-4'>
            <label className='form-control w-full'>
              <span className='label-text text-sm font-medium text-slate-600'>
                Interview time
              </span>
              <input
                value={time ?? ''}
                onChange={e => setTime(e.target.value)}
                type='time'
                min='09:00'
                className='input input-bordered'
              />
            </label>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-3'>
              <Calendar onChange={handleDateChange} value={value || new Date()} />
            </div>
          </div>
        </div>

        <div className='space-y-5'>
          <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
            <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
              Interview Type
            </h2>
            <label className='form-control mt-3 w-full'>
              <span className='label-text text-sm font-medium text-slate-600'>
                How will this meeting happen?
              </span>
              <select
                value={interviewType}
                onChange={e => setInterviewType(e.target.value)}
                className='select select-bordered'
              >
                <option value=''>Select interview type</option>
                <option value='Online'>Online</option>
                <option value='Offline'>Offline</option>
              </select>
            </label>
            <div className='mt-4 space-y-3'>
              {interviewType === 'Online' && (
                <label className='form-control w-full'>
                  <span className='label-text text-sm font-medium text-slate-600'>
                    Meeting link
                  </span>
                  <input
                    value={meetingLink}
                    type='url'
                    placeholder='https://meet.example.com'
                    className='input input-bordered'
                    onChange={e => setMeetingLink(e.target.value)}
                  />
                  <span className='mt-1 text-xs text-slate-400'>
                    Share the conferencing URL to ensure quick access.
                  </span>
                </label>
              )}

              {interviewType === 'Offline' && (
                <>
                  <label className='form-control w-full'>
                    <span className='label-text text-sm font-medium text-slate-600'>
                      Office address
                    </span>
                    <input
                      value={address}
                      type='text'
                      placeholder='123 Market Street, Suite 400'
                      className='input input-bordered'
                      onChange={e => setAddress(e.target.value)}
                    />
                  </label>
                  <label className='form-control w-full'>
                    <span className='label-text text-sm font-medium text-slate-600'>
                      Contact phone
                    </span>
                    <input
                      value={phone}
                      type='tel'
                      placeholder='(555) 123-4567'
                      className='input input-bordered'
                      onChange={e => setPhone(e.target.value)}
                    />
                    <span className='mt-1 text-xs text-slate-400'>
                      Provide a number the candidate can call if they need help.
                    </span>
                  </label>
                </>
              )}
            </div>
          </div>

          <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
            <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
              Summary
            </h2>
            <div className='mt-3 space-y-2 text-sm text-slate-600'>
              <p>
                <strong className='text-slate-900'>Date:</strong>{' '}
                {selectedDateLabel}
              </p>
              <p>
                <strong className='text-slate-900'>Time:</strong>{' '}
                {selectedTimeLabel}
              </p>
              <p>
                <strong className='text-slate-900'>Type:</strong>{' '}
                {interviewType || 'Not selected'}
              </p>
              {interviewType === 'Online' && meetingLink && (
                <p className='truncate'>
                  <strong className='text-slate-900'>Meeting link:</strong>{' '}
                  <a
                    href={meetingLink}
                    target='_blank'
                    rel='noreferrer'
                    className='text-blue-600 hover:underline'
                  >
                    {meetingLink}
                  </a>
                </p>
              )}
              {interviewType === 'Offline' && address && (
                <p>
                  <strong className='text-slate-900'>Address:</strong> {address}
                </p>
              )}
              {interviewType === 'Offline' && phone && (
                <p>
                  <strong className='text-slate-900'>Phone:</strong> {phone}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-end gap-3'>
        <button
          className='btn btn-ghost btn-sm md:btn-md'
          type='button'
          onClick={() => {
            setValue('')
            setTime('')
            setInterviewType('')
            setMeetingLink('')
            setAddress('')
            setPhone('')
          }}
        >
          Reset
        </button>
        <button
          className='btn btn-primary btn-sm md:btn-md'
          type='button'
          onClick={handleSaveInterview}
          disabled={updateApplicationStatusLoading}
        >
          {updateApplicationStatusLoading ? (
            <span className='flex items-center gap-2'>
              <span className='loading loading-spinner loading-sm' />
              Saving...
            </span>
          ) : (
            'Save interview'
          )}
        </button>
      </div>
    </section>
  )
}

export default InterviewDetails
