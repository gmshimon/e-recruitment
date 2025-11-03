import { useMemo } from 'react'
import { useSelector } from 'react-redux'

const statusTokens = {
  pending: {
    label: 'Pending review',
    badgeClass: 'bg-amber-50 text-amber-600 border border-amber-100'
  },
  applied: {
    label: 'Application received',
    badgeClass: 'bg-blue-50 text-blue-600 border border-blue-100'
  },
  interviewing: {
    label: 'Interview in progress',
    badgeClass: 'bg-indigo-50 text-indigo-600 border border-indigo-100'
  },
  offered: {
    label: 'Offer extended',
    badgeClass: 'bg-emerald-50 text-emerald-600 border border-emerald-100'
  },
  rejected: {
    label: 'No longer moving forward',
    badgeClass: 'bg-rose-50 text-rose-600 border border-rose-100'
  }
}

const ApplicationStatus = () => {
  const { singleApplication } = useSelector(state => state.application)

  const statusMeta = useMemo(() => statusTokens[singleApplication?.application_status] || null, [singleApplication])

  const salaryRange =
    singleApplication?.job?.salary?.min && singleApplication?.job?.salary?.max
      ? `${Number(singleApplication.job.salary.min).toLocaleString()} - ${Number(
          singleApplication.job.salary.max
        ).toLocaleString()}`
      : singleApplication?.job?.salary?.salary || 'Salary undisclosed'

  const getFileName = url => {
    if (typeof url !== 'string') return 'Attachment'
    try {
      const parts = url.split('/')
      return parts[parts.length - 1] || 'Attachment'
    } catch {
      return 'Attachment'
    }
  }

  const attachments = [
    singleApplication?.resume && {
      label: 'Submitted resume',
      url: singleApplication.resume
    },
    singleApplication?.offer_letter && {
      label: 'Offer letter',
      url: singleApplication.offer_letter
    }
  ].filter(Boolean)

  const interview = singleApplication?.interview
  const messages = singleApplication?.messages || []

  return (
    <section className='space-y-8'>
      <header className='space-y-4 text-center'>
        <p className='text-xs font-semibold uppercase tracking-[0.3em] text-blue-600'>Application details</p>
        <h1 className='text-2xl font-semibold text-slate-900 sm:text-3xl'>
          {singleApplication?.job?.title || 'Role information unavailable'}
        </h1>
        <div className='flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500'>
          <span className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'>
            {singleApplication?.job?.job_type || 'Job type unavailable'}
          </span>
          <span className='text-slate-300'>•</span>
          <span>{singleApplication?.job?.company_name || 'Company pending'}</span>
          <span className='text-slate-300'>•</span>
          <span>{singleApplication?.job?.address?.country || singleApplication?.job?.address?.city || 'Location TBD'}</span>
        </div>

        {statusMeta && (
          <div className='flex justify-center'>
            <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${statusMeta.badgeClass}`}>
              <span className='inline-block h-2 w-2 rounded-full bg-current' />
              {statusMeta.label}
            </span>
          </div>
        )}
        <p className='text-xs uppercase tracking-wide text-slate-400'>
          Applied on {singleApplication?.createdAt ? singleApplication.createdAt.split('T')[0] : '—'}
        </p>
      </header>

      <div className='grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>Compensation</p>
          <p className='mt-2 text-sm font-medium text-slate-700'>{salaryRange}</p>
          {singleApplication?.job?.salary?.salary && (
            <p className='mt-1 text-xs text-slate-400'>Salary band: {singleApplication.job.salary.salary}</p>
          )}
        </div>
        <div>
          <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>Experience</p>
          <p className='mt-2 text-sm font-medium text-slate-700'>{singleApplication?.job?.experience || 'Not specified'}</p>
        </div>
      </div>

      {attachments.length > 0 && (
        <section className='space-y-4 rounded-3xl border border-slate-200 bg-slate-50/60 p-6'>
          <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Attachments</h2>
          <div className='space-y-3'>
            {attachments.map(item => (
              <a
                key={item.url}
                href={item.url}
                target='_blank'
                rel='noreferrer'
                className='flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-blue-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700'
              >
                <div className='flex flex-col'>
                  <span className='text-xs uppercase tracking-wide text-slate-400'>{item.label}</span>
                  <span>{getFileName(item.url)}</span>
                </div>
                <span className='text-xs font-semibold uppercase tracking-wide'>View file</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {interview?.date && (
        <section className='space-y-4 rounded-3xl border border-blue-200 bg-blue-50/70 p-6'>
          <h2 className='text-sm font-semibold uppercase tracking-wide text-blue-600'>Interview details</h2>
          <div className='flex flex-wrap gap-6 text-sm text-blue-900'>
            <div>
              <p className='text-xs uppercase tracking-wide text-blue-500'>Scheduled for</p>
              <p className='mt-1 font-semibold'>
                {interview.date}
                {interview.time && ` at ${interview.time}`}
              </p>
            </div>
            <div>
              <p className='text-xs uppercase tracking-wide text-blue-500'>Format</p>
              <p className='mt-1 font-semibold'>{interview.type || 'To be confirmed'}</p>
            </div>
            <div className='min-w-[180px]'>
              <p className='text-xs uppercase tracking-wide text-blue-500'>Joining details</p>
              <p className='mt-1 font-semibold'>
                {interview.type === 'Offline' ? (
                  <>
                    {interview.location}
                    {interview.phone && (
                      <>
                        <br />
                        <span className='text-sm font-medium text-blue-700'>Contact: {interview.phone}</span>
                      </>
                    )}
                  </>
                ) : interview.location ? (
                  <a href={interview.location} className='text-blue-600 underline hover:text-blue-700'>
                    Join call
                  </a>
                ) : (
                  'Link pending'
                )}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className='space-y-4 rounded-3xl border border-slate-200 bg-white p-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>Updates &amp; messages</h2>
          <span className='text-xs text-slate-400'>
            {messages.length} {messages.length === 1 ? 'message' : 'messages'}
          </span>
        </div>

        {messages.length > 0 ? (
          <div className='max-h-72 space-y-3 overflow-y-auto pr-1'>
            {messages.map((message, index) => (
              <article key={`${message?.message_date || index}-${index}`} className='rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm'>
                <div className='flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-400'>
                  <span>{message?.createdBy?.name || 'Recruiter'}</span>
                  <span>{message?.message_date || 'Date pending'}</span>
                </div>
                <p className='mt-3 text-sm text-slate-600'>{message?.text || 'No message content available.'}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className='rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center text-sm text-slate-400'>
            No updates yet. We&apos;ll notify you here as soon as the hiring team shares feedback.
          </div>
        )}
      </section>
    </section>
  )
}

export default ApplicationStatus
