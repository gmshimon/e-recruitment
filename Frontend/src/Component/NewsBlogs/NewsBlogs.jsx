import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import './newsblogs.css'

import { EffectCoverflow, Pagination } from 'swiper/modules'
const NewsBlogs = () => {
  const text =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quasi, adipisci natus culpa consequuntur quos Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quasi, adipisci natus culpa consequuntur quos'
  return (
    <section className='mt-12'>
      <h1 className='text-center text-3xl font-semibold'>News and Blog</h1>
      <p className='text-center text-gray-500 mt-2 mb-5'>
        Get the latest news, updates and tips{' '}
      </p>

      <div className='mb-10'>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className='mySwiper'
        >
          <SwiperSlide>
            <div className='card bg-base-100 w-auto md:w-96 border-2 mb-2 cursor-pointer hover:border-black'>
              <figure>
                <img
                  src='https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2023/03/img-big2-404x257.png'
                  alt='Shoes'
                  className='p-1 rounded-xl'
                />
              </figure>
              <div className='mt-2 h-[150px] mx-3'>
                <h2 className='card-title '>
                  Recruiter and Land Your Dream Job Explore Nice Jobs
                </h2>
                <p className='mt-3 text-[15px] text-gray-600' title={text}>
                  {text.length > 110 ? `${text.slice(0, 110)}...` : text}
                </p>
              </div>
              <div className='flex items-center justify-between mx-3 mb-3 mt-2'>
                <div className='flex items-center'>
                  <div className='avatar placeholder'>
                    <div className='bg-neutral text-neutral-content w-8 rounded-full'>
                      <span>AD</span>
                    </div>
                  </div>
                  <div className='ml-3'>
                    <p className='text-[14px] text-gray-600 font-semibold'>
                      Administrator
                    </p>
                    <p className='text-[13px] text-gray-500'>March 16,2023</p>
                  </div>
                </div>
                <div>
                  <p className='text-[13px] text-gray-500'>2 mins to read</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        
          <SwiperSlide>
            <div className='card bg-base-100 w-auto md:w-96 border-2 mb-2 cursor-pointer hover:border-black'>
              <figure>
                <img
                  src='https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2023/03/img-big2-404x257.png'
                  alt='Shoes'
                  className='p-1 rounded-xl'
                />
              </figure>
              <div className='mt-2 h-[150px] mx-3'>
                <h2 className='card-title '>
                  Recruiter and Land Your Dream Job Explore Nice Jobs
                </h2>
                <p className='mt-3 text-[15px] text-gray-600' title={text}>
                  {text.length > 110 ? `${text.slice(0, 110)}...` : text}
                </p>
              </div>
              <div className='flex items-center justify-between mx-3 mb-3 mt-2'>
                <div className='flex items-center'>
                  <div className='avatar placeholder'>
                    <div className='bg-neutral text-neutral-content w-8 rounded-full'>
                      <span>AD</span>
                    </div>
                  </div>
                  <div className='ml-3'>
                    <p className='text-[14px] text-gray-600 font-semibold'>
                      Administrator
                    </p>
                    <p className='text-[13px] text-gray-500'>March 16,2023</p>
                  </div>
                </div>
                <div>
                  <p className='text-[13px] text-gray-500'>2 mins to read</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        
          <SwiperSlide>
            <div className='card bg-base-100 w-auto md:w-96 border-2 mb-2 cursor-pointer hover:border-black'>
              <figure>
                <img
                  src='https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2023/03/img-big2-404x257.png'
                  alt='Shoes'
                  className='p-1 rounded-xl'
                />
              </figure>
              <div className='mt-2 h-[150px] mx-3'>
                <h2 className='card-title '>
                  Recruiter and Land Your Dream Job Explore Nice Jobs
                </h2>
                <p className='mt-3 text-[15px] text-gray-600' title={text}>
                  {text.length > 110 ? `${text.slice(0, 110)}...` : text}
                </p>
              </div>
              <div className='flex items-center justify-between mx-3 mb-3 mt-2'>
                <div className='flex items-center'>
                  <div className='avatar placeholder'>
                    <div className='bg-neutral text-neutral-content w-8 rounded-full'>
                      <span>AD</span>
                    </div>
                  </div>
                  <div className='ml-3'>
                    <p className='text-[14px] text-gray-600 font-semibold'>
                      Administrator
                    </p>
                    <p className='text-[13px] text-gray-500'>March 16,2023</p>
                  </div>
                </div>
                <div>
                  <p className='text-[13px] text-gray-500'>2 mins to read</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        
          <SwiperSlide>
            <div className='card bg-base-100 w-auto md:w-96 border-2 mb-2 cursor-pointer hover:border-black'>
              <figure>
                <img
                  src='https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2023/03/img-big2-404x257.png'
                  alt='Shoes'
                  className='p-1 rounded-xl'
                />
              </figure>
              <div className='mt-2 h-[150px] mx-3'>
                <h2 className='card-title '>
                  Recruiter and Land Your Dream Job Explore Nice Jobs
                </h2>
                <p className='mt-3 text-[15px] text-gray-600' title={text}>
                  {text.length > 110 ? `${text.slice(0, 110)}...` : text}
                </p>
              </div>
              <div className='flex items-center justify-between mx-3 mb-3 mt-2'>
                <div className='flex items-center'>
                  <div className='avatar placeholder'>
                    <div className='bg-neutral text-neutral-content w-8 rounded-full'>
                      <span>AD</span>
                    </div>
                  </div>
                  <div className='ml-3'>
                    <p className='text-[14px] text-gray-600 font-semibold'>
                      Administrator
                    </p>
                    <p className='text-[13px] text-gray-500'>March 16,2023</p>
                  </div>
                </div>
                <div>
                  <p className='text-[13px] text-gray-500'>2 mins to read</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        
          <SwiperSlide>
            <div className='card bg-base-100 w-auto md:w-96 border-2 mb-2 cursor-pointer hover:border-black'>
              <figure>
                <img
                  src='https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2023/03/img-big2-404x257.png'
                  alt='Shoes'
                  className='p-1 rounded-xl'
                />
              </figure>
              <div className='mt-2 h-[150px] mx-3'>
                <h2 className='card-title '>
                  Recruiter and Land Your Dream Job Explore Nice Jobs
                </h2>
                <p className='mt-3 text-[15px] text-gray-600' title={text}>
                  {text.length > 110 ? `${text.slice(0, 110)}...` : text}
                </p>
              </div>
              <div className='flex items-center justify-between mx-3 mb-3 mt-2'>
                <div className='flex items-center'>
                  <div className='avatar placeholder'>
                    <div className='bg-neutral text-neutral-content w-8 rounded-full'>
                      <span>AD</span>
                    </div>
                  </div>
                  <div className='ml-3'>
                    <p className='text-[14px] text-gray-600 font-semibold'>
                      Administrator
                    </p>
                    <p className='text-[13px] text-gray-500'>March 16,2023</p>
                  </div>
                </div>
                <div>
                  <p className='text-[13px] text-gray-500'>2 mins to read</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        
          <SwiperSlide>
            <div className='card bg-base-100 w-auto md:w-96 border-2 mb-2 cursor-pointer hover:border-black'>
              <figure>
                <img
                  src='https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2023/03/img-big2-404x257.png'
                  alt='Shoes'
                  className='p-1 rounded-xl'
                />
              </figure>
              <div className='mt-2 h-[150px] mx-3'>
                <h2 className='card-title '>
                  Recruiter and Land Your Dream Job Explore Nice Jobs
                </h2>
                <p className='mt-3 text-[15px] text-gray-600' title={text}>
                  {text.length > 110 ? `${text.slice(0, 110)}...` : text}
                </p>
              </div>
              <div className='flex items-center justify-between mx-3 mb-3 mt-2'>
                <div className='flex items-center'>
                  <div className='avatar placeholder'>
                    <div className='bg-neutral text-neutral-content w-8 rounded-full'>
                      <span>AD</span>
                    </div>
                  </div>
                  <div className='ml-3'>
                    <p className='text-[14px] text-gray-600 font-semibold'>
                      Administrator
                    </p>
                    <p className='text-[13px] text-gray-500'>March 16,2023</p>
                  </div>
                </div>
                <div>
                  <p className='text-[13px] text-gray-500'>2 mins to read</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        
        </Swiper>
      </div>
    </section>
  )
}

export default NewsBlogs
