import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import JobDetailsForm from '../../../Component/Dashboard/PostJobComponent/JobDetailsForm'
import Skill_ExperienceForm from '../../../Component/Dashboard/PostJobComponent/Skill_ExperienceForm'
import AddressForm from '../../../Component/Dashboard/PostJobComponent/AddressForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  getJobID,
  reset,
  setAddress,
  setCity,
  setCompany_name,
  setCountry,
  setDescription,
  setEnglish_fluency,
  setExperience,
  setJob_category,
  setJob_skills,
  setJob_type,
  setMax,
  setMin,
  setRequirements,
  setSalary,
  setState,
  setTitle,
  updateJob
} from '../../../Redux/Slices/jobSlice'
import Swal from 'sweetalert2'
import {
  HiOutlineSparkles,
  HiOutlineClipboardList,
  HiOutlineArrowSmLeft
} from 'react-icons/hi'
import { MdOutlineGroup, MdOutlineWorkOutline } from 'react-icons/md'

const EditJobs = () => {
  const {
    job,
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
    updateJobError,
    updateJobSuccess,
    updateJobLoading
  } = useSelector(state => state.job)

  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getJobID({ id }))
  }, [dispatch, id])

  useEffect(() => {
    if (job) {
      dispatch(setTitle(job?.title))
      dispatch(setCompany_name(job?.company_name))
      dispatch(setDescription(job?.description))
      dispatch(setRequirements(job?.requirements))
      dispatch(setJob_category(job?.job_category))
      dispatch(setJob_type(job?.job_type))
      dispatch(setSalary(job?.salary?.salary))
      dispatch(setMin(job?.salary?.min))
      dispatch(setMax(job?.salary?.max))
      dispatch(setJob_skills(job?.skills))
      dispatch(setExperience(job?.experience))
      dispatch(setEnglish_fluency(job?.english_fluency))
      dispatch(setAddress(job?.address?.address))
      dispatch(setCountry(job?.address?.country))
      dispatch(setState(job?.address?.state))
      dispatch(setCity(job?.address?.city))
    }
  }, [dispatch, job])

  useEffect(() => {
    if(updateJobError){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if(updateJobSuccess){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Job updated successfully',
        showConfirmButton: false,
        timer: 1500
      })
      navigate('/dashboard/my-jobs')
    }
  }, [updateJobError, dispatch, updateJobSuccess, navigate])

  const formatNumericField = value => {
    if (value === null || value === undefined || value === '') return undefined
    const num = Number(value)
    if (Number.isNaN(num)) return undefined
    return Number(num.toFixed(2))
  }

  const handleUpdate = () => {
    const data = {
      title,
      company_name,
      description,
      requirements,
      job_category,
      job_type,
      salary: {
        salary: salary,
        min: formatNumericField(min),
        max: formatNumericField(max)
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
    dispatch(updateJob({ id, data }))
  }

  const parsePotentialNumber = value => {
    if (value === null || value === undefined || value === '') return NaN
    const num = Number(value)
    return Number.isNaN(num) ? NaN : num
  }

  const salaryPreview = useMemo(() => {
    const parts = []
    if (salary) parts.push(salary)
    const minNumber = parsePotentialNumber(min)
    const maxNumber = parsePotentialNumber(max)
    if (!Number.isNaN(minNumber) && !Number.isNaN(maxNumber)) {
      parts.push(`${minNumber.toLocaleString()} - ${maxNumber.toLocaleString()}`)
    } else if (!Number.isNaN(minNumber)) {
      parts.push(minNumber.toLocaleString())
    } else if (!Number.isNaN(maxNumber)) {
      parts.push(maxNumber.toLocaleString())
    }
    return parts.join(' | ') || 'Not specified'
  }, [salary, min, max])

  const applicantsCount =
    job?.applications?.length ??
    job?.applicantsCount ??
    job?.applicationCount ??
    0

  const jobCategoryDisplay = job_category || job?.job_category || 'Unassigned'
  const jobTypeDisplay = job_type || job?.job_type || 'Not set'
  const jobStatusDisplay = job?.status || 'Draft'

  const headerMeta = [
    { label: 'Status', value: jobStatusDisplay },
    { label: 'Category', value: jobCategoryDisplay },
    { label: 'Type', value: jobTypeDisplay },
    { label: 'Applicants', value: `${applicantsCount}` }
  ]

  const lastUpdated = job?.updatedAt
    ? new Date(job.updatedAt).toLocaleDateString()
    : job?.createdAt
      ? new Date(job.createdAt).toLocaleDateString()
      : '—'

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <section className='min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8'>
      <div className=' w-full px-4 sm:px-6 lg:px-8'>
        <header className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
          <div>
            <p className='inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-600'>
              <HiOutlineSparkles className='h-4 w-4' />
              Editing job
            </p>
            <h1 className='mt-3 text-3xl font-semibold text-slate-900'>
              {title || job?.title || 'Untitled role'}
            </h1>
            <p className='mt-2 max-w-xl text-sm text-slate-500'>
              Update the role details, adjust requirements, and keep applicants informed.
            </p>
            <p className='mt-3 inline-flex items-center gap-2 rounded-full bg-slate-200/60 px-3 py-1 text-xs font-semibold text-slate-600'>
              <HiOutlineClipboardList className='h-4 w-4' />
              Last updated {lastUpdated}
            </p>
          </div>
          <div className='flex flex-wrap gap-3'>
            {headerMeta.map(item => (
              <div
                key={item.label}
                className='min-w-[130px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm'
              >
                <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                  {item.label}
                </p>
                <p className='mt-1 text-sm font-medium text-slate-800'>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </header>

        <div className='mt-8 grid gap-8 lg:grid-cols-3'>
          <div className='space-y-8 lg:col-span-2'>
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
            <div className='sticky top-28 rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-xl shadow-slate-900/10'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold text-white'>
                  Role snapshot
                </h2>
                <span className='flex h-10 w-10 items-center justify-center rounded-full bg-white/15'>
                  <MdOutlineWorkOutline className='h-5 w-5 text-white' />
                </span>
              </div>
              <p className='mt-1 text-xs text-slate-300'>
                Keep this information accurate to attract the right candidates.
              </p>
              <dl className='mt-6 space-y-4 text-sm'>
                <div className='rounded-2xl border border-white/10 bg-white/10 px-4 py-3'>
                  <dt className='text-xs uppercase tracking-wide text-slate-200'>
                    Salary insight
                  </dt>
                  <dd className='mt-1 text-sm font-medium text-white'>
                    {salaryPreview}
                  </dd>
                </div>
                <div className='rounded-2xl border border-white/10 bg-white/10 px-4 py-3'>
                  <dt className='text-xs uppercase tracking-wide text-slate-200'>
                    Applicants so far
                  </dt>
                  <dd className='mt-1 flex items-center gap-2 text-sm font-medium text-white'>
                    <MdOutlineGroup className='h-4 w-4 text-slate-200' />
                    {applicantsCount}
                  </dd>
                </div>
                <div className='rounded-2xl border border-white/10 bg-white/10 px-4 py-3'>
                  <dt className='text-xs uppercase tracking-wide text-slate-200'>
                    Job category
                  </dt>
                  <dd className='mt-1 text-sm font-medium text-white'>
                    {jobCategoryDisplay}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        <div className='mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end'>
          <button
            type='button'
            onClick={handleCancel}
            className='inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900'
          >
            <HiOutlineArrowSmLeft className='h-4 w-4' />
            Back
          </button>
          <button
            className='inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70'
            onClick={handleUpdate}
            disabled={updateJobLoading}
          >
            {updateJobLoading ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default EditJobs
