import { FaArrowRight } from "react-icons/fa"

const Banner = () => {
  return (
    <section className='md:flex items-center justify-evenly mt-14'>
      <div className='md:w-1/2 md:ml-24'>
        <div className='text-4xl font-semibold'>
          <h1>
            Get The <span className='text-blue-700'>Right Job</span>
          </h1>
          <h1>You Deserve</h1>
        </div>
        <p className='w-4/6 mt-5 text-xl text-gray-500'>
          Each Month, more than 3 million job seekers turn to website in their
          search for work, making over 140,000 applications every single day
        </p>

        <p className='mt-3'>
          Popular Searches: <span className='underline'>Content Writer</span> ,{' '}
          <span className='underline'>Finance</span> ,{' '}
          <span className='underline'>Human Resource</span> ,{' '}
          <span className='underline'>Management</span>
        </p>

        <div className="mt-5">
          <button className='btn btn-active btn-primary'><span className="mb-1">Primary</span> <FaArrowRight />
          </button>
        </div>
      </div>
      <div>
        <img
          className='w-[600px] h-[350px]'
          src='https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2023/03/hero-home4.png'
          alt=''
        />
      </div>
    </section>
  )
}

export default Banner
