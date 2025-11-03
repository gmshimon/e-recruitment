import { useEffect, useMemo, useState } from 'react'
import { CiClock2, CiLocationOn } from 'react-icons/ci'
import { FaUser, FaBookmark, FaEye, FaListOl } from 'react-icons/fa'
import { TiTick } from 'react-icons/ti'
import { IoBagHandleOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import AdminHome from '../../../Component/AdminHome/AdminHome'
import { getAdminData } from '../../../Redux/Slices/userSlice'
import { MdError, MdErrorOutline } from 'react-icons/md'
import { getJobs } from '../../../Redux/Slices/jobSlice'
import { useNavigate } from 'react-router-dom'
import dateDifference from '../../../utilis/formattedDate'

const baseUserStats = [
  {
    key: 'totalApplications',
    label: 'Total Applications',
    helper: 'Applications submitted so far',
    icon: FaListOl,
    accent: 'from-sky-500 to-indigo-500'
  },
  {
    key: 'shortlisted',
    label: 'Shortlisted',
    helper: 'Awaiting interviews or next steps',
    icon: FaBookmark,
    accent: 'from-emerald-500 to-teal-500'
  },
  {
    key: 'offered',
    label: 'Offers',
    helper: 'Offers you have received',
    icon: TiTick,
    accent: 'from-amber-500 to-orange-500'
  },
  {
    key: 'rejected',
    label: 'Rejected',
    helper: 'Applications not moving forward',
    icon: MdErrorOutline,
    accent: 'from-rose-500 to-red-500'
  }
]

const baseAdminStats = [
  {
    key: 'posted',
    label: 'Posted Jobs',
    helper: 'Roles currently live',
    icon: FaUser,
    accent: 'from-blue-500 to-indigo-600'
  },
  {
    key: 'shortlisted',
    label: 'Shortlisted',
    helper: 'Candidates in the pipeline',
    icon: FaBookmark,
    accent: 'from-purple-500 to-fuchsia-500'
  },
  {
    key: 'applications',
    label: 'Applications',
    helper: 'Total applicants so far',
    icon: FaEye,
    accent: 'from-cyan-500 to-blue-500'
  },
  {
    key: 'offered',
    label: 'Offers Made',
    helper: 'Candidates extended offers',
    icon: MdError,
    accent: 'from-amber-500 to-orange-500'
  }
]

const DashboardHome = () => {
  const { user, adminDetails } = useSelector(state => state.user)
  const { jobs } = useSelector(state => state.job)
  const [statsOption, setStatsOption] = useState([])
  const [randomJobs, setRandomJobs] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    if (isAdmin) {
      dispatch(getAdminData())
    }
  }, [dispatch, isAdmin])

  useEffect(() => {
    if (!user) {
      setStatsOption([])
      return
    }

    if (isAdmin) {
      const formattedStats = baseAdminStats.map(stat => {
        const valueMap = {
          posted: adminDetails?.jobs?.totalJobs ?? 0,
          shortlisted:
            adminDetails?.applications?.statuses?.interviewing ?? 0,
          applications: adminDetails?.applications?.totalApplications ?? 0,
          offered: adminDetails?.applications?.statuses?.offered ?? 0
        }

        return {
          ...stat,
          value: valueMap[stat.key] ?? 0
        }
      })
      setStatsOption(formattedStats)
      return
    }

    const groupedStatus = user?.application?.groupedStatus ?? []
    const getStatusCount = key =>
      groupedStatus.find(item => item?._id === key)?.count ?? 0

    const formattedStats = baseUserStats.map(stat => {
      const valueMap = {
        totalApplications: user?.application?.totalCount ?? 0,
        shortlisted: getStatusCount('interviewing'),
        offered: getStatusCount('offered'),
        rejected: getStatusCount('rejected')
      }

      return {
        ...stat,
        value: valueMap[stat.key] ?? 0
      }
    })
    setStatsOption(formattedStats)
  }, [adminDetails, isAdmin, user])

  useEffect(()=>{
    dispatch(getJobs({title:'',category:'',country:''}))
  },[dispatch])

  // Pick random jobs
  useEffect(() => {
    if (jobs?.length > 0) {
      const shuffled = [...jobs].sort(() => 0.5 - Math.random())
      setRandomJobs(shuffled.slice(0, 5))
    }
  }, [jobs])

  return (
    <section className='min-h-screen bg-slate-50 pb-12'>
      <div className=' px-4 pt-10'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-sm font-medium text-slate-500'>
              Welcome back, {user?.name} !
            </p>
            <h1 className='text-3xl font-semibold text-slate-900'>
              {isAdmin ? 'Talent Pipeline Overview' : 'Your Dashboard'}
            </h1>
            <p className='mt-2 text-sm text-slate-500'>
              {isAdmin
                ? 'Monitor job performance and track applicants in one place.'
                : 'Stay on top of your applications and track your progress.'}
            </p>
          </div>
        </div>

        <div className='mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
          {statsOption?.map(stat => {
            const Icon = stat.icon
            const formattedValue =
              typeof stat.value === 'number'
                ? stat.value.toLocaleString()
                : stat.value ?? 0

            return (
              <article
                key={stat.key}
                className='relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg'
              >
                <div className='flex items-start justify-between'>
                  <div>
                    <p className='text-sm font-medium text-slate-500'>
                      {stat.label}
                    </p>
                    <p className='mt-3 text-3xl font-semibold text-slate-900'>
                      {formattedValue}
                    </p>
                  </div>
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.accent}`}
                  >
                    <Icon className='text-lg text-white' />
                  </span>
                </div>
                {stat.helper && (
                  <p className='mt-6 text-xs text-slate-500'>{stat.helper}</p>
                )}
              </article>
            )
          })}
        </div>

        {isAdmin ? (
          <div className='mt-12'>
            <AdminHome />
          </div>
        ) : (
          <div className='mt-12'>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <h2 className='text-2xl font-semibold text-slate-900'>
                  Recommended roles for you
                </h2>
                <p className='text-sm text-slate-500'>
                  Explore fresh opportunities tailored to your interests.
                </p>
              </div>
            </div>

            {randomJobs.length > 0 ? (
              <div className='mt-6 grid gap-5 md:grid-cols-2'>
                {randomJobs.map(job => (
                  <article
                    key={job?._id}
                    onClick={() => navigate(`/apply-job/${job?._id}`)}
                    className='group flex cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg'
                  >
                    <div className='flex items-start gap-4'>
                      <div className='flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100'>
                        <img
                          src='https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2022/09/recruiter-7.svg'
                          alt='Company logo'
                          className='h-10 w-10 object-contain'
                        />
                      </div>
                      <div>
                        <h3 className='text-lg font-semibold text-slate-900 transition group-hover:text-blue-600'>
                          {job?.title || 'Untitled Role'}
                        </h3>
                        <p className='mt-1 text-sm text-slate-500'>
                          {job?.companyName || 'Hiring company'}
                        </p>
                      </div>
                    </div>
                    <div className='mt-6 flex flex-wrap gap-4 text-sm text-slate-600'>
                      <span className='flex items-center gap-2'>
                        <IoBagHandleOutline />
                        {job?.salary?.salary || 'Salary undisclosed'}
                      </span>
                      <span className='flex items-center gap-2'>
                        <CiClock2 />
                        {dateDifference(job?.createdAt)}
                      </span>
                      <span className='flex items-center gap-2'>
                        <CiLocationOn />
                        {job?.address?.country || 'Location flexible'}
                      </span>
                    </div>
                    <button
                      type='button'
                      className='mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-transparent bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition group-hover:bg-blue-100'
                    >
                      View details
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className='mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-100/60 p-10 text-center text-slate-500'>
                <p className='text-base font-medium'>
                  No recommendations just yet.
                </p>
                <p className='mt-2 text-sm'>
                  Apply to more roles to see personalized suggestions here.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default DashboardHome
