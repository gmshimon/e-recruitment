/* eslint-disable react/prop-types */
import { CiClock2, CiLocationOn } from 'react-icons/ci'
import { IoBagHandleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import dateDifference from '../../utilis/formattedDate'

const SingleJob = ({ job }) => {
  const skills = Array.isArray(job?.skills)
    ? job.skills.slice(0, 6)
    : []

  const salaryDisplay =
    job?.salary?.salary ||
    [job?.salary?.min, job?.salary?.max]
      .filter(Boolean)
      .map(value =>
        typeof value === 'number' ? value.toLocaleString() : value
      )
      .join(' - ') ||
    'Salary undisclosed'

  return (
    <div className='group flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl'>
      <div>
        <div className='flex items-start justify-between gap-3'>
          <div>
            <h3 className='text-lg font-semibold text-slate-900 transition group-hover:text-blue-600'>
              {job?.title || 'Untitled role'}
            </h3>
            {job?.company_name && (
              <p className='mt-1 text-sm text-slate-500'>
                {job.company_name}
              </p>
            )}
          </div>
          <span className='inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600'>
            <IoBagHandleOutline />
            {job?.job_type || 'Flexible'}
          </span>
        </div>

        <div className='mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500'>
          <span className='inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600'>
            <CiClock2 />
            {dateDifference(job?.createdAt)}
          </span>
          <span className='text-slate-400'>•</span>
          <span>{salaryDisplay}</span>
        </div>

        {skills.length > 0 && (
          <div className='mt-4 flex flex-wrap gap-2'>
            {skills.map(skill => (
              <span
                key={skill}
                className='inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600'
              >
                {skill.length > 18 ? `${skill.slice(0, 15)}...` : skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className='mt-6 border-t border-slate-200 pt-4 text-sm text-slate-500'>
        <span className='inline-flex items-center gap-2'>
          <CiLocationOn className='text-slate-400' />
          {job?.address?.city ? (
            <>
              <span>{job.address.city}</span>
              {job?.address?.country && (
                <>
                  <span className='text-slate-300'>•</span>
                  <span>{job.address.country}</span>
                </>
              )}
            </>
          ) : (
            <span>{job?.address?.country || 'Location flexible'}</span>
          )}
        </span>

        <p>
          <Link
          to={`/apply-job/${job?._id}`}
          className='inline-flex items-center rounded-full border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-500'
        >
          Apply now
        </Link>
        </p>
      </div>
    </div>
  )
}

export default SingleJob
