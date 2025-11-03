import { useMemo, useState } from 'react'
import { BsBank } from 'react-icons/bs'
import { FaRegFileAlt, FaRegFolderOpen, FaSearchengin } from 'react-icons/fa'
import { GrCloudSoftware, GrPersonalComputer } from 'react-icons/gr'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { FiSearch, FiMapPin, FiFilter } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const categories = [
  {
    id: 1,
    icon: <FaRegFileAlt />,
    name: 'Content Writer',
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
    name: 'Retail & Product',
    job: 0
  },
  {
    id: 7,
    icon: <MdProductionQuantityLimits />,
    name: 'Market & Sale',
    job: 0
  },
  {
    id: 8,
    icon: <GrCloudSoftware />,
    name: 'Software',
    job: 0
  }
]
const JobSearchBar = () => {
  const [jobCategory, setJobCategory] = useState('')
  const [searchText, setSearchText] = useState('')
  const [country, setCountry] = useState('')

  const navigate = useNavigate()

  const quickFilters = useMemo(() => categories.slice(0, 4), [])

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      title: searchText || '',
      category: jobCategory || '',
      country: country || ''
    }).toString()
    navigate(`/search-job?${queryParams}`)
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleQuickFilter = name => {
    setJobCategory(name)
    const queryParams = new URLSearchParams({
      title: searchText || '',
      category: name,
      country: country || ''
    }).toString()
    navigate(`/search-job?${queryParams}`)
  }
  return (
    <div className='space-y-4'>
      <div className='rounded-3xl border border-white/20 bg-white/90 p-5 shadow-xl shadow-slate-900/10 backdrop-blur'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <label className='flex flex-col gap-2 text-sm font-medium text-slate-600'>
            Job category
            <div className='relative'>
              <FiFilter className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' />
              <select
                value={jobCategory}
                onChange={e => setJobCategory(e.target.value)}
                className='h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200'
              >
                <option value=''>Select category</option>
                {categories.map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className='flex flex-col gap-2 text-sm font-medium text-slate-600 lg:col-span-2'>
            Keywords or title
            <div className='relative'>
              <FiSearch className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' />
              <input
                type='text'
                placeholder='e.g. Product Manager, DevOps, UI Designer'
                className='h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200'
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete='off'
              />
            </div>
          </label>

          <label className='flex flex-col gap-2 text-sm font-medium text-slate-600'>
            Country
            <div className='relative'>
              <FiMapPin className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' />
              <input
                type='text'
                placeholder='Anywhere'
                className='h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200'
                value={country}
                onChange={e => setCountry(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete='off'
              />
            </div>
          </label>

          <div className='flex items-end'>
            <button
              onClick={handleSearch}
              type='button'
              className='h-12 w-full rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-6 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 focus:ring-offset-white'
            >
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-3 text-xs text-slate-500'>
        <span className='font-semibold text-slate-600'>Quick filters:</span>
        {quickFilters.map(({ id, name, icon, job }) => (
          <button
            key={id}
            type='button'
            onClick={() => handleQuickFilter(name)}
            className='group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600'
          >
            <span className='text-base text-blue-500 transition group-hover:text-blue-600'>
              {icon}
            </span>
            <span>{name}</span>
            <span className='rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500 transition group-hover:bg-blue-100 group-hover:text-blue-600'>
              {job} open
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default JobSearchBar
