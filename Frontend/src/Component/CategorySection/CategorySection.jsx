import { BsBank } from 'react-icons/bs'
import { FaRegFileAlt, FaRegFolderOpen, FaSearchengin } from 'react-icons/fa'
import { GrCloudSoftware, GrPersonalComputer } from 'react-icons/gr'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { HiOutlineSparkles } from 'react-icons/hi'

const CategorySection = () => {
  const categories = useMemo(
    () => [
      {
        id: 1,
        icon: FaRegFileAlt,
        name: 'Content Writer',
        gradient: 'from-sky-500/20 to-blue-500/10',
        accent: 'text-blue-500'
      },
      {
        id: 2,
        icon: TfiHeadphoneAlt,
        name: 'Human Resource',
        gradient: 'from-rose-500/20 to-pink-500/10',
        accent: 'text-rose-500'
      },
      {
        id: 3,
        icon: BsBank,
        name: 'Finance',
        gradient: 'from-amber-500/20 to-orange-500/10',
        accent: 'text-amber-500'
      },
      {
        id: 4,
        icon: GrPersonalComputer,
        name: 'Management',
        gradient: 'from-emerald-500/20 to-teal-500/10',
        accent: 'text-emerald-500'
      },
      {
        id: 5,
        icon: FaSearchengin,
        name: 'Market Research',
        gradient: 'from-purple-500/20 to-indigo-500/10',
        accent: 'text-purple-500'
      },
      {
        id: 6,
        icon: FaRegFolderOpen,
        name: 'Retail Product',
        gradient: 'from-fuchsia-500/20 to-pink-500/10',
        accent: 'text-fuchsia-500'
      },
      {
        id: 7,
        icon: MdProductionQuantityLimits,
        name: 'Market Sale',
        gradient: 'from-lime-500/20 to-green-500/10',
        accent: 'text-lime-500'
      },
      {
        id: 8,
        icon: GrCloudSoftware,
        name: 'Software',
        gradient: 'from-cyan-500/20 to-blue-500/10',
        accent: 'text-cyan-500'
      }
    ],
    []
  )

  const navigate = useNavigate()
  return (
    <section className='relative mt-20 w-full overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-14'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_55%)]' />

      <div className='relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center'>
        <div className='inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-1 text-sm font-semibold shadow-lg shadow-slate-900/15'>
          <HiOutlineSparkles className='h-4 w-4 text-amber-400' />
          Top categories hiring now
        </div>
        <h2 className='mt-5 text-3xl font-semibold text-slate-900 sm:text-4xl'>
          Explore opportunities tailored to your expertise
        </h2>
        <p className='mt-3 max-w-2xl text-sm text-slate-500 sm:text-base'>
          Each category features curated openings from trusted employers. Pick a
          path to see roles aligned with your skills.
        </p>
      </div>

      <div className='relative mx-auto mt-12 w-full max-w-6xl px-6'>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {categories.map(category => {
            const Icon = category.icon
            return (
              <button
                onClick={() => navigate(`/jobs/?category=${category.name}`)}
                key={category.id}
                type='button'
                className={`group flex h-full flex-col justify-between rounded-3xl border border-transparent bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl`}
              >
                <span
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} text-2xl ${category.accent} shadow-inner`}
                >
                  <Icon />
                </span>

                <div className='mt-6 flex-1 space-y-3'>
                  <div>
                    <h3 className='text-lg font-semibold text-slate-900 transition group-hover:text-blue-600'>
                      {category.name}
                    </h3>
                  </div>
                  <p className='text-xs text-slate-400'>
                    Tap to explore openings, salaries, and employer insights curated for this field.
                  </p>
                </div>

                <span className='mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:gap-3 group-hover:text-blue-700'>
                  Browse roles
                  <span aria-hidden='true'>→</span>
                </span>
              </button>
            )
          })}
        </div>

        <div className='mt-10 rounded-3xl border border-slate-200 bg-white/90 p-6 text-center shadow-sm backdrop-blur sm:flex sm:items-center sm:justify-between sm:text-left'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-wide text-blue-600'>
              Not sure where to start?
            </p>
            <p className='mt-1 text-base text-slate-600'>
              Tell us about your experience and we’ll suggest categories that suit you best.
            </p>
          </div>
          <button
            type='button'
            onClick={() => navigate('/career-assessment')}
            className='mt-4 inline-flex items-center justify-center rounded-full border border-transparent bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 sm:mt-0'
          >
            Take the quick assessment
          </button>
        </div>
      </div>
    </section>
  )
}

export default CategorySection
