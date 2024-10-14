const HiringBanner = () => {
  return (
    <section className="md:flex mt-10 md:justify-center">
      <div className='border rounded-lg w-full md:w-[700px] lg:w-[900px] p-1'>
        <div className='flex items-center justify-evenly'>
          <div className='hidden md:block'>
            <img
              src='https://jthemes.com/themes/wp/jobbox/wp-content/themes/jobbox/assets/imgs/page/homepage1/bg-left-hiring.svg'
              alt=''
            />
          </div>
          <div>
            <h1 className='text-xl text-gray-500 font-semibold'>WE ARE</h1>
            <h1 className='text-3xl text-black font-bold'>HIRING</h1>
          </div>
          <div className="ml-3">
            <p>Let's Work Together & Explore Opportunities</p>
          </div>
          <div>
            <img
              className='w-[250px] h-[120px]'
              src='https://jthemes.com/themes/wp/jobbox/wp-content/themes/jobbox/assets/imgs/page/homepage1/bg-right-hiring.svg'
              alt=''
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HiringBanner
