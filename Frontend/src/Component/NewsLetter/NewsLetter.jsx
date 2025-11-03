import newsLetterImg_right from '../../assets/images/newsletter-right.png'
import newsLetterImg_left from '../../assets/images/newsletter-left.png'

const NewsLetter = () => {
  return (
    <section className='flex justify-center items-center mt-16 mb-10 px-5'>
      <div className="relative w-full md:w-4/5 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg">
        {/* subtle floating background */}
        <div className="absolute inset-0 bg-[url('https://static.vecteezy.com/system/resources/thumbnails/002/375/040/small_2x/modern-white-background-free-vector.jpg')] bg-cover bg-center opacity-60" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 py-10">
          {/* Left image */}
          <div className='hidden md:block md:w-1/4 animate-fadeInLeft'>
            <img src={newsLetterImg_left} alt='Newsletter decoration left' className="w-full" />
          </div>

          {/* Center content */}
          <div className='flex flex-col items-center text-center md:w-1/2'>
            <h1 className='text-2xl md:text-4xl font-bold text-gray-800 leading-tight mb-4'>
              Stay Updated With Our Latest Jobs & News
            </h1>
            <p className='text-gray-600 mb-6 max-w-md'>
              Subscribe to our newsletter and never miss out on new job postings, updates, and insights.
            </p>

            <form className='w-full flex flex-col md:flex-row items-center gap-3 justify-center'>
              <label className='input input-bordered flex items-center gap-2 w-full md:w-2/3 bg-white/70 backdrop-blur-md focus-within:ring-2 focus-within:ring-blue-400 transition-all'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                  className='h-5 w-5 text-blue-500'
                >
                  <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
                  <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
                </svg>
                <input
                  type='email'
                  className='grow outline-none placeholder:text-gray-400 text-gray-800'
                  placeholder='Enter your email'
                  required
                />
              </label>
              <button
                type='submit'
                className='btn bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-8 rounded-lg hover:scale-105 hover:shadow-md transition-all duration-300'
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Right image */}
          <div className='hidden md:block md:w-1/4 animate-fadeInRight'>
            <img src={newsLetterImg_right} alt='Newsletter decoration right' className="w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsLetter
