import './postJobs.css'
import JobDetailsForm from '../../../Component/Dashboard/PostJobComponent/JobDetailsForm'
import Skill_ExperienceForm from '../../../Component/Dashboard/PostJobComponent/Skill_ExperienceForm'
import AddressForm from '../../../Component/Dashboard/PostJobComponent/AddressForm'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import Swal from 'sweetalert2'
import { createJob, reset, resetDetails } from '../../../Redux/Slices/jobSlice'
import { HiOutlineSparkles } from 'react-icons/hi'

const PostJobs = () => {
  const {
    title,
    company_name,
    description,
    requirements,
    job_category,
    job_type,
    salary,
    min,
    max,
    skills,
    experience,
    english_fluency,
    address,
    country,
    city,
    state,
    createJobSuccess,
    createJobError
  } = useSelector(state => state.job)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetDetails())
  }, [dispatch])

  useEffect(() => {
    if (createJobSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Job Created Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
      dispatch(resetDetails())
    }
    if (createJobError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
      dispatch(resetDetails())
    }
  }, [createJobError, createJobSuccess, dispatch])

  const handlePostJob = () => {
    const data = {
      title,
      company_name,
      description,
      requirements,
      job_category,
      job_type,
      salary: {
        salary: salary,
        min: parseInt(min).toFixed(2),
        max: parseInt(max).toFixed(2)
      },
      skills,
      experience,
      english_fluency,
      address: {
        address,
        country,
        city,
        state
      }
    }
    dispatch(createJob(data))
  }

  const salaryPreview = useMemo(() => {
    if (!salary && !min && !max) return null

    const parsedMin = Number(min)
    const parsedMax = Number(max)

    if (Number.isNaN(parsedMin) && Number.isNaN(parsedMax)) {
      return salary || null
    }

    const formattedMin = !Number.isNaN(parsedMin)
      ? parsedMin.toLocaleString()
      : null
    const formattedMax = !Number.isNaN(parsedMax)
      ? parsedMax.toLocaleString()
      : null

    if (formattedMin && formattedMax) {
      return `${formattedMin} - ${formattedMax}`
    }

    return formattedMin || formattedMax || salary || null
  }, [salary, min, max])

  const metadata = [
    {
      label: 'Job title',
      fallback: 'Title not set',
      value: title
    },
    {
      label: 'Company',
      fallback: 'Company not set',
      value: company_name
    },
    {
      label: 'Category',
      fallback: 'Category not set',
      value: job_category
    },
    {
      label: 'Job type',
      fallback: 'Type not set',
      value: job_type
    },
    {
      label: 'Salary range',
      fallback: 'Salary not set',
      value: salaryPreview
    },
    {
      label: 'Experience level',
      fallback: 'Experience not set',
      value: experience
    },
    {
      label: 'Location',
      fallback: 'Location not set',
      value: [address, city, state, country].filter(Boolean).join(', ')
    },
    {
      label: 'Skills',
      fallback: 'Skills not set',
      value: Array.isArray(skills) ? skills.join(', ') : skills
    }
  ]

  return (
    <section className='min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8'>
      <div className=' w-full px-4 sm:px-6 lg:px-8'>
        <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <p className='inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600'>
              <HiOutlineSparkles className='h-4 w-4' />
              New listing
            </p>
            <h1 className='mt-3 text-3xl font-semibold text-slate-900'>
              Post a new job
            </h1>
            <p className='mt-2 max-w-xl text-sm text-slate-500'>
              Fill in the details below to create a compelling job post and
              invite the right candidates to apply.
            </p>
          </div>
          <div className='flex items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-600 shadow-sm'>
            <span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600'>
              {Array.isArray(skills) ? skills.length : 0}
            </span>
            <div>
              <p className='font-semibold'>Skills selected</p>
              <p className='text-xs text-blue-500'>
                Add more to improve candidate matching
              </p>
            </div>
          </div>
        </header>

        <div className='mt-8 grid gap-8 lg:grid-cols-3'>
          <div className='lg:col-span-2 space-y-8'>
            <div className='rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-sm backdrop-blur'>
              <JobDetailsForm />
            </div>
            <div className='rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-sm backdrop-blur'>
              <Skill_ExperienceForm />
            </div>
            <div className='rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-sm backdrop-blur'>
              <AddressForm />
            </div>
          </div>

          <aside className='space-y-6'>
            <div className='sticky top-28 rounded-3xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-xl shadow-slate-900/10'>
              <h2 className='text-lg font-semibold text-white'>
                Preview essentials
              </h2>
              <p className='mt-1 text-xs text-slate-300'>
                Quickly review the key information candidates will see.
              </p>
              <dl className='mt-4 space-y-3 text-sm'>
                {metadata.map(item => (
                  <div
                    key={item.label}
                    className='rounded-2xl border border-slate-700/50 bg-slate-800/60 px-4 py-3'
                  >
                    <dt className='text-xs uppercase tracking-wide text-slate-400'>
                      {item.label}
                    </dt>
                    <dd className='mt-1 text-sm font-medium text-white'>
                      {item.value || (
                        <span className='text-slate-400'>{item.fallback}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>

        <div className='mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end'>
          <button
            type='button'
            onClick={() => dispatch(resetDetails())}
            className='inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900'
          >
            Clear form
          </button>
          <button
            className='inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg'
            onClick={handlePostJob}
          >
            Save job
          </button>
        </div>
      </div>
    </section>
  )
}

export default PostJobs
