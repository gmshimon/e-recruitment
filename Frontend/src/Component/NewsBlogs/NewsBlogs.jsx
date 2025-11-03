import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import './newsblogs.css'

import { FreeMode, Pagination } from 'swiper/modules'
import { FaAngleRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { HiOutlineSparkles } from 'react-icons/hi'

const cards = [
  {
    id: 1,
    image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_19.jpg',
    badge: 'Solution',
    date: 'Featured · 18 Jul 2022',
    readTime: '2 min read',
    title: 'Print, publishing qui visual quis layout mockups.',
    description:
      'Discover how visual story-telling and layout prototypes accelerate brand campaigns and stakeholder buy-in.'
  },
  {
    id: 3,
    image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_20.jpg',
    badge: 'Development',
    date: '18 Jul 2022',
    readTime: '4 min read',
    title: 'How to build a complete web application using React and Node.js.',
    description:
      'From project setup to deployment—best practices for shipping production-ready apps with a lean team.'
  },
  {
    id: 4,
    image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_21.jpg',
    badge: 'Business',
    date: '18 Jul 2022',
    readTime: '6 min read',
    title: 'Make more productive working flow daily.',
    description:
      'A tactical framework for async collaboration, deep work, and sprint cadences your teams can rely on.'
  },
  {
    id: 5,
    image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_22.jpg',
    badge: 'Branding',
    date: '18 Jul 2022',
    readTime: '3 min read',
    title: 'Quis nostrud exercitation ullamco laboris nisi.',
    description:
      'Why consistent storytelling fuels trust with candidates and keeps your employer brand top of mind.'
  },
  {
    id: 6,
    image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_23.jpg',
    badge: 'Marketing',
    date: '18 Jul 2022',
    readTime: '5 min read',
    title: 'Make your WordPress a content powerhouse.',
    description:
      'Tools, automations, and templates to publish recruiting updates without waiting on engineering.'
  }
]

const NewsBlogs = () => {
  const navigate = useNavigate()

  return (
    <section className='mt-20 bg-gradient-to-b from-white via-slate-50 to-white py-16'>
      <div className='mx-auto w-full max-w-6xl px-6'>
        <div className='flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left'>
          <div>
            <p className='inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600'>
              <HiOutlineSparkles className='h-4 w-4' />
              Insights for hiring teams
            </p>
            <h2 className='mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl'>
              Fresh strategies to keep talent pipelines moving
            </h2>
            <p className='mt-2 max-w-xl text-sm text-slate-500 sm:text-base'>
              Curated reads on recruiting operations, candidate journeys, and the tools teams use to hire at scale.
            </p>
          </div>
          <button
            type='button'
            onClick={() => navigate('/blogs')}
            className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600'
          >
            View all posts
            <FaAngleRight />
          </button>
        </div>

        <div className='mt-10'>
          <Swiper
            spaceBetween={24}
            slidesPerView='auto'
            freeMode
            pagination={{ clickable: true }}
            breakpoints={{
              0: { spaceBetween: 18 },
              640: { spaceBetween: 20 },
              1024: { spaceBetween: 28 }
            }}
            modules={[FreeMode, Pagination]}
            className='news-swiper'
          >
            {cards.map(card => (
              <SwiperSlide key={card.id}>
                <article
                  onClick={() => navigate(`/read-blog/${encodeURIComponent(card.title)}`)}
                  className='group flex h-full max-w-sm flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl'
                >
                  <div className='relative h-56 w-full overflow-hidden'>
                    <img
                      src={card.image}
                      alt={card.title}
                      className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
                    />
                    <span className='absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-900 shadow-sm'>
                      {card.badge}
                    </span>
                  </div>
                  <div className='flex flex-1 flex-col p-6'>
                    <div className='text-xs font-semibold uppercase tracking-wide text-blue-600'>
                      {card.date}
                    </div>
                    <h3 className='mt-2 text-lg font-semibold text-slate-900 transition group-hover:text-blue-600'>
                      {card.title}
                    </h3>
                    <p className='mt-3 text-sm text-slate-500'>{card.description}</p>
                    <div className='mt-auto flex items-center justify-between pt-5 text-xs text-slate-400'>
                      <div className='flex items-center gap-3'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold uppercase tracking-wide text-blue-600'>
                          {card.badge.slice(0, 2)}
                        </div>
                        <div className='text-left'>
                          <p className='text-sm font-semibold text-slate-700'>Talent IQ Team</p>
                          <p>{card.readTime}</p>
                        </div>
                      </div>
                      <span className='text-sm font-semibold text-blue-600 transition group-hover:text-blue-700'>
                        Read story
                      </span>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='mt-12 flex justify-center sm:hidden'>
          <button
            onClick={() => navigate('/blogs')}
            type='button'
            className='inline-flex items-center gap-2 rounded-full border border-transparent bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl'
          >
            See more insights
            <FaAngleRight />
          </button>
        </div>
      </div>
    </section>
  )
}

export default NewsBlogs

