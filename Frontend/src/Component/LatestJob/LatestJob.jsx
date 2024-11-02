const LatestJob = () => {
  return (
    <section className='mt-14'>
      <h1 className='text-center text-3xl font-semibold'>Browse by Category</h1>
      <p className='text-center text-gray-500 mt-2'>
        Find the job that’s perfect for you. about 800+ new jobs everyday{' '}
      </p>
      <div role='tablist' className='tabs tabs-bordered'>
        <input
          type='radio'
          name='my_tabs_2'
          role='tab'
          className='tab'
          aria-label='Tab 1'
        />
        <div
          role='tabpanel'
          className='tab-content bg-base-100 border-base-300 rounded-box p-6'
        >
          Tab content 1
        </div>

        <input
          type='radio'
          name='my_tabs_2'
          role='tab'
          className='tab'
          aria-label='Tab 2'
          defaultChecked
        />
        <div
          role='tabpanel'
          className='tab-content bg-base-100 border-base-300 rounded-box p-6'
        >
          Tab content 2
        </div>

        <input
          type='radio'
          name='my_tabs_2'
          role='tab'
          className='tab'
          aria-label='Tab 3'
        />
        <div
          role='tabpanel'
          className='tab-content bg-base-100 border-base-300 rounded-box p-6'
        >
          Tab content 3
        </div>
      </div>
    </section>
  )
}

export default LatestJob
