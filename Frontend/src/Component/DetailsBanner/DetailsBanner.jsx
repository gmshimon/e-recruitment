import AnimatedNumbers from 'react-animated-numbers'
import {
  HiOutlineTrendingUp,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineHeart
} from 'react-icons/hi'

const metrics = [
  {
    id: 'cases',
    label: 'Completed projects',
    description: 'Delivered with measurable business impact.',
    value: 25,
    suffix: 'K+',
    icon: HiOutlineTrendingUp,
    accent: 'from-blue-500/20 to-indigo-500/10'
  },
  {
    id: 'offices',
    label: 'Global offices',
    description: 'Regional hubs supporting local hiring teams.',
    value: 17,
    suffix: '+',
    icon: HiOutlineOfficeBuilding,
    accent: 'from-emerald-500/20 to-teal-500/10'
  },
  {
    id: 'talent',
    label: 'Talent partners',
    description: 'Experts guiding every search end-to-end.',
    value: 86,
    suffix: '+',
    icon: HiOutlineUserGroup,
    accent: 'from-purple-500/20 to-pink-500/10'
  },
  {
    id: 'clients',
    label: 'Happy clients',
    description: 'Organisations that trust our recruiting platform.',
    value: 28,
    suffix: '+',
    icon: HiOutlineHeart,
    accent: 'from-amber-500/20 to-orange-500/10'
  }
]

const DetailsBanner = () => {
  return (
    <section className='relative mt-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_60%)]' />
      <div className='relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 text-center text-white sm:text-left'>
        <div className='max-w-3xl'>
          <p className='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-blue-200'>
            Impact in numbers
          </p>
          <h2 className='mt-4 text-3xl font-semibold sm:text-4xl'>
            Built for teams who value outcomes over output.
          </h2>
          <p className='mt-3 text-sm text-slate-200 sm:text-base'>
            We pair human expertise with data-driven insights to help organisations
            hire confidently, onboard faster, and retain the talent that drives
            real growth.
          </p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
          {metrics.map(metric => {
            const Icon = metric.icon
            return (
              <article
                key={metric.id}
                className='rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl shadow-black/20 backdrop-blur transition hover:-translate-y-1'
              >
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${metric.accent} text-2xl text-white shadow-inner`}
                >
                  <Icon />
                </span>
                <div className='mt-6 flex items-baseline gap-2'>
                  <AnimatedNumbers
                    includeComma
                    animateToNumber={metric.value}
                    transitions={index => ({
                      type: 'spring',
                      duration: 0.6 + index * 0.15
                    })}
                    fontStyle={{
                      fontSize: 42,
                      fontWeight: 700,
                      color: 'white'
                    }}
                  />
                  <span className='text-3xl font-semibold text-blue-200'>
                    {metric.suffix}
                  </span>
                </div>
                <h3 className='mt-4 text-lg font-semibold text-white'>
                  {metric.label}
                </h3>
                <p className='mt-2 text-sm text-slate-300'>{metric.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default DetailsBanner
