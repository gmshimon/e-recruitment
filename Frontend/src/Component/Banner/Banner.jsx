import JobSearchBar from '../JobSearchBar/JobSearchBar'
import pic1 from '../../../public/Assessts/a68b6889-0a34-4ebc-b5e4-a9cd03a08258.webp'
import { HiOutlineSparkles, HiChevronRight } from 'react-icons/hi'
import { FaUsers, FaBriefcase } from 'react-icons/fa'
import { useMemo } from 'react'

const Banner = () => {
  const featuredSearches = useMemo(
    () => ['Product Design', 'Finance Analyst', 'Human Resource', 'Project Manager'],
    []
  )

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_60%)]' />
      <div className='absolute inset-0 bg-[url("https://www.zmo.ai/wp-content/uploads/2023/09/powerpoint-slide-with-white-background-SB02298-min-scaled.jpg")] bg-cover bg-center opacity-5 mix-blend-overlay' />
      <div className='relative mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 px-6 py-16 md:flex-row md:justify-between lg:py-20'>
        <div className='w-full max-w-xl text-white'>
          <div className='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-blue-200 backdrop-blur'>
            <HiOutlineSparkles className='h-4 w-4' />
            Your growth starts here
          </div>

          <h1 className='mt-6 text-4xl font-semibold leading-tight sm:text-5xl'>
            Discover the <span className='text-blue-400'>role</span> that fits
            your ambition.
          </h1>
          <p className='mt-4 text-lg text-slate-200'>
            Join 3M+ professionals who trust Talent IQ to navigate career moves,
            track applications, and uncover opportunities tailored to them.
          </p>

          <div className='mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur'>
            <JobSearchBar />
            <div className='mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-200/80'>
              <span className='mr-1 font-medium text-slate-100'>
                Trending searches:
              </span>
              {featuredSearches.map(search => (
                <button
                  key={search}
                  type='button'
                  className='inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 transition hover:border-blue-400/50 hover:bg-blue-400/10'
                >
                  {search}
                  <HiChevronRight className='h-4 w-4 text-blue-200' />
                </button>
              ))}
            </div>
          </div>

          <div className='mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-200/80'>
            <div className='flex items-center gap-3'>
              <span className='flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-blue-200'>
                <FaUsers className='h-5 w-5' />
              </span>
              <div>
                <p className='text-base font-semibold text-white'>3M+</p>
                <p>Monthly job seekers</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <span className='flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-blue-200'>
                <FaBriefcase className='h-5 w-5' />
              </span>
              <div>
                <p className='text-base font-semibold text-white'>140k</p>
                <p>Applications submitted daily</p>
              </div>
            </div>
          </div>
        </div>

        <div className='relative flex w-full max-w-lg justify-center'>
          <div className='absolute -left-6 top-6 h-32 w-32 rounded-full bg-blue-500/40 blur-3xl' />
          <div className='absolute -right-6 bottom-0 h-24 w-24 rounded-full bg-cyan-400/30 blur-2xl' />
          <div className='relative rounded-[32px] border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur'>
            <div className='rounded-[28px] bg-gradient-to-br from-white/90 via-white to-white/90 p-4 shadow-lg'>
              <img
                className='h-full w-full rounded-[24px] object-cover'
                src={pic1}
                alt='Team collaborating'
              />
              <div className='mt-4 space-y-2 rounded-2xl bg-slate-900/90 px-5 py-4 text-left text-white shadow-inner'>
                <p className='text-sm uppercase tracking-wide text-blue-200'>
                  Featured Hiring Partner
                </p>
                <p className='text-lg font-semibold'>
                  Empowering teams to deliver lasting impact.
                </p>
                <p className='text-xs text-slate-300'>
                  Recruit talent faster with curated matches, insights, and collaboration tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
