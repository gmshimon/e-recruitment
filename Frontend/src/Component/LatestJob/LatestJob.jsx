import {
  FaAngleRight,
  FaRegFileAlt,
  FaRegFolderOpen,
  FaSearchengin
} from 'react-icons/fa'
import { GrCloudSoftware, GrPersonalComputer } from 'react-icons/gr'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { BsBank } from 'react-icons/bs'
import SingleJob from '../SingleJob/SingleJob'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJobs } from '../../Redux/Slices/jobSlice'
import { useNavigate } from 'react-router-dom'
import { HiOutlineSparkles } from 'react-icons/hi'

const BASE_CATEGORIES = [
  {
    id: 'content-writer',
    name: 'Content Writer',
    icon: FaRegFileAlt,
    keywords: ['content writer', 'content writing']
  },
  {
    id: 'human-resource',
    name: 'Human Resource',
    icon: TfiHeadphoneAlt,
    keywords: ['human resource', 'hr', 'talent acquisition']
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: BsBank,
    keywords: ['finance', 'financial analyst', 'accounting']
  },
  {
    id: 'management',
    name: 'Management',
    icon: GrPersonalComputer,
    keywords: ['management', 'operations', 'business']
  },
  {
    id: 'market-research',
    name: 'Market Research',
    icon: FaSearchengin,
    keywords: ['market research', 'research']
  },
  {
    id: 'retail-product',
    name: 'Retail Product',
    icon: FaRegFolderOpen,
    keywords: ['retail product', 'retail', 'merchandising']
  },
  {
    id: 'market-sale',
    name: 'Market Sale',
    icon: MdProductionQuantityLimits,
    keywords: ['market sale', 'sales', 'business development']
  },
  {
    id: 'software',
    name: 'Software',
    icon: GrCloudSoftware,
    keywords: ['software', 'engineering', 'developer', 'devops']
  }
]

const normalize = value => value?.toString().trim().toLowerCase() || ''

const LatestJob = () => {
  const { jobs = [] } = useSelector(state => state.job)
  const [activeCategory, setActiveCategory] = useState('all')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getJobs({ title: '', category: '', country: '' }))
  }, [dispatch])

  const sortedJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return []
    return [...jobs].sort((a, b) => {
      const dateA = a?.createdAt ? new Date(a.createdAt) : 0
      const dateB = b?.createdAt ? new Date(b.createdAt) : 0
      return dateB - dateA
    })
  }, [jobs])

  const categories = useMemo(() => {
    const categoryDetails = BASE_CATEGORIES.map(category => {
      const normalizedKeywords = category.keywords.map(normalize)
      const count = sortedJobs.filter(job =>
        normalizedKeywords.includes(normalize(job?.job_category))
      ).length

      return {
        ...category,
        count,
        normalizedKeywords
      }
    })

    return [
      {
        id: 'all',
        name: 'All roles',
        icon: HiOutlineSparkles,
        count: sortedJobs.length,
        normalizedKeywords: []
      },
      ...categoryDetails
    ]
  }, [sortedJobs])

  useEffect(() => {
    if (!categories.some(category => category.id === activeCategory)) {
      setActiveCategory(categories[0]?.id || 'all')
    }
  }, [categories, activeCategory])

  const filteredJobs = useMemo(() => {
    if (activeCategory === 'all') return sortedJobs

    const category = categories.find(cat => cat.id === activeCategory)
    if (!category) return []

    return sortedJobs.filter(job =>
      category.normalizedKeywords.includes(normalize(job?.job_category))
    )
  }, [activeCategory, categories, sortedJobs])

  const displayedJobs = useMemo(
    () => filteredJobs.slice(0, 8),
    [filteredJobs]
  )

  const companiesHiring = useMemo(() => {
    const unique = new Set(
      sortedJobs
        .map(job => job?.company_name || job?.companyName)
        .filter(Boolean)
    )
    return unique.size
  }, [sortedJobs])

  const jobsThisWeek = useMemo(() => {
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    return sortedJobs.filter(job => {
      const createdAt = job?.createdAt ? new Date(job.createdAt) : null
      return createdAt && createdAt >= sevenDaysAgo
    }).length
  }, [sortedJobs])

  const handleSeeMore = () => {
    const category = categories.find(cat => cat.id === activeCategory)
    if (!category || activeCategory === 'all') {
      navigate('/jobs')
      return
    }
    navigate(`/jobs/?category=${encodeURIComponent(category.name)}`)
  }

  return (
    <section className='mt-20 bg-gradient-to-b from-white via-slate-50 to-white py-14'>
      <div className='mx-auto w-full max-w-7xl px-6'>
        <div className='flex flex-col gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left'>
          <div>
            <p className='inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600'>
              <HiOutlineSparkles className='h-4 w-4' />
              Jobs of the day
            </p>
            <h2 className='mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl'>
              Stay ahead with the latest opportunities
            </h2>
            <p className='mt-2 max-w-xl text-sm text-slate-500 sm:text-base'>
              Discover freshly posted roles across industries. Filter by category to
              find openings tailored to your skills and interests.
            </p>
          </div>
          {/* <div className='flex flex-wrap items-center justify-center gap-4 text-left sm:justify-end'>
            <div className='rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm shadow-sm sm:min-w-[170px]'>
              <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                Live openings
              </p>
              <p className='mt-1 text-2xl font-semibold text-slate-900'>
                {sortedJobs.length}
              </p>
              <p className='text-xs text-slate-500'>Updated in real time</p>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm shadow-sm sm:min-w-[170px]'>
              <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                Posted this week
              </p>
              <p className='mt-1 text-2xl font-semibold text-slate-900'>
                {jobsThisWeek}
              </p>
              <p className='text-xs text-slate-500'>New roles in the last 7 days</p>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm shadow-sm sm:min-w-[170px]'>
              <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                Hiring teams
              </p>
              <p className='mt-1 text-2xl font-semibold text-slate-900'>
                {companiesHiring}
              </p>
              <p className='text-xs text-slate-500'>Companies recruiting now</p>
            </div>
          </div> */}
        </div>

        <div className='mt-10 flex flex-wrap justify-center gap-3 sm:justify-start'>
          {categories.map(category => {
            const Icon = category.icon
            const isActive = category.id === activeCategory
            return (
              <button
                key={category.id}
                type='button'
                onClick={() => setActiveCategory(category.id)}
                className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isActive
                    ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                    : 'border-slate-200 bg-white text-slate-600 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    isActive ? 'bg-white/10' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : ''}`} />
                </span>
                <span>{category.name}</span>
                {category.id !== 'all' && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                    }`}
                  >
                    {category.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className='mt-12'>
          {displayedJobs.length > 0 ? (
            <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
              {displayedJobs.map(job => (
                <SingleJob key={job?._id} job={job} />
              ))}
            </div>
          ) : (
            <div className='rounded-3xl border border-dashed border-slate-300 bg-white/80 px-10 py-16 text-center text-slate-500'>
              <p className='text-base font-semibold text-slate-700'>
                No openings in this category yet.
              </p>
              <p className='mt-2 text-sm'>
                Check back soon or explore another category to keep your search moving.
              </p>
            </div>
          )}
        </div>

        <div className='mt-10 flex justify-center'>
          <button
            onClick={handleSeeMore}
            type='button'
            className='inline-flex items-center gap-2 rounded-full border border-transparent bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-300'
          >
            See more openings
            <FaAngleRight />
          </button>
        </div>
      </div>
    </section>
  )
}

export default LatestJob
