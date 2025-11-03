import { BsBank } from 'react-icons/bs'
import { FaRegFileAlt, FaRegFolderOpen, FaSearchengin } from 'react-icons/fa'
import { GrCloudSoftware, GrPersonalComputer } from 'react-icons/gr'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { HiOutlineSparkles } from 'react-icons/hi'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import SingleJob from '../../Component/SingleJob/SingleJob'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJobs } from '../../Redux/Slices/jobSlice'
import { useLocation } from 'react-router-dom'

const tabs = [
  {
    id: 1,
    icon: <FaRegFileAlt />,
    name: 'content Writer',
    job: 3
  },
  {
    id: 2,
    icon: <TfiHeadphoneAlt />,
    name: 'Human Resource',
    job: 2
  },
  {
    id: 3,
    icon: <BsBank />,
    name: 'Finance',
    job: 1
  },
  {
    id: 4,
    icon: <GrPersonalComputer />,
    name: 'Management',
    job: 0
  },
  {
    id: 5,
    icon: <FaSearchengin />,
    name: 'Market Research',
    job: 1
  },
  {
    id: 6,
    icon: <FaRegFolderOpen />,
    name: 'Retail Product',
    job: 0
  },
  {
    id: 7,
    icon: <MdProductionQuantityLimits />,
    name: 'Market Sale',
    job: 0
  },
  {
    id: 8,
    icon: <GrCloudSoftware />,
    name: 'Software',
    job: 0
  }
]

const Jobs = () => {
  const { jobs } = useSelector(state => state.job)
  const [jobByCategory, setJobByCategory] = useState([])
  const location = useLocation()

  // Parse query parameters from the location.search
  const queryParams = new URLSearchParams(location.search)
  const category = queryParams.get('category') // Extract 'category' parameter

  const [tabIndex, setTabIndex] = useState(0)
  useEffect(() => {
    const index = tabs.findIndex(tab => tab.name === category)
    setTabIndex(index !== -1 ? index : 0)
  }, [category])

  const dispatch = useDispatch()

  const jobList = Array.isArray(jobs) ? jobs : []

  const categoryCounts = useMemo(() => {
    const counts = {}
    jobList.forEach(job => {
      const key = job?.job_category
      if (key) {
        counts[key] = (counts[key] || 0) + 1
      }
    })
    return counts
  }, [jobList])

  const tabItems = useMemo(
    () =>
      tabs.map(tab => ({
        ...tab,
        count: categoryCounts[tab.name] ?? 0
      })),
    [categoryCounts]
  )

  useEffect(() => {
    const selectedTab = tabs[tabIndex] || tabs[0]
    if (!selectedTab) {
      setJobByCategory([])
      return
    }
    const jobsByCategory = jobList.filter(job => job?.job_category === selectedTab.name)
    setJobByCategory(jobsByCategory)
  }, [jobList, tabIndex])

  useEffect(() => {
    dispatch(getJobs({ title: '', category: '', country: '' }))
  }, [dispatch])

  const totalOpenRoles = jobList.length || 0

  return (
    <section className='relative overflow-hidden pt-24 pb-20'>
      <div className='pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-white' />
      <div className='pointer-events-none absolute inset-x-0 top-0 -z-20 h-[520px] bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-blue-700/10 blur-3xl opacity-70' />

      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <header className='rounded-[44px] border border-white/60 bg-white/80 px-8 py-10 text-center shadow-2xl shadow-blue-900/10 backdrop-blur-sm sm:px-12 sm:py-14'>
          <span className='inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700'>
            <HiOutlineSparkles className='h-4 w-4' />
            Explore roles
          </span>
          <h1 className='mt-5 text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-[44px]'>
            Find the role that matches your next chapter
          </h1>
          <p className='mx-auto mt-3 max-w-2xl text-sm text-slate-500 sm:text-base'>
            Browse live openings by speciality, compare compensation, and apply in minutes. We update the board every week as new teams come online.
          </p>
          <div className='mt-6 inline-flex items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-2 text-xs font-semibold text-blue-600 shadow-sm'>
            <span className='inline-flex h-2 w-2 rounded-full bg-blue-500' />
            {totalOpenRoles} open {totalOpenRoles === 1 ? 'role' : 'roles'} across {tabs.length} categories
          </div>
        </header>

        <div className='mt-12 rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8'>
          <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
            <TabList className='grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4'>
              {tabItems.map((tab, index) => {
                const isActive = tabIndex === index
                return (
                  <Tab
                    key={tab.id}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left font-medium shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 ${
                      isActive
                        ? 'border-blue-400 bg-blue-50/80 text-blue-700 shadow-md'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50/50'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-base ${
                        isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {tab.icon}
                    </span>
                    <div className='flex flex-col'>
                      <span className='text-sm capitalize'>{tab.name}</span>
                      <span className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                        {tab.count} {tab.count === 1 ? 'role' : 'roles'}
                      </span>
                    </div>
                  </Tab>
                )
              })}
            </TabList>

            {tabItems.map((tab, index) => (
              <TabPanel key={tab.id} className='mt-10'>
                {tabIndex === index && (
                  <>
                    {jobByCategory.length > 0 ? (
                      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
                        {jobByCategory.map((job, jobIndex) => (
                          <SingleJob job={job} key={job?._id || jobIndex} />
                        ))}
                      </div>
                    ) : (
                      <div className='flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-12 text-center text-sm text-slate-500'>
                        <div className='flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400'>
                          {tab.icon}
                        </div>
                        <p className='mt-4 text-base font-semibold text-slate-600'>No roles posted in this category yet</p>
                        <p className='mt-1 max-w-md text-sm text-slate-500'>
                          Check back soon or browse another category to discover open positions that match your profile.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}

export default Jobs
