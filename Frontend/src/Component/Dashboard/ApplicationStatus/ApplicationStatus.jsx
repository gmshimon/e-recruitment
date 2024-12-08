import { useSelector } from "react-redux"

const ApplicationStatus = () => {
  const {singleApplication} = useSelector(state=>state.application)
  return (
    <section>
      <h1 className='text-center text-2xl font-bold'>Application Details</h1>
      <h1 className='text-center italic mt-3 text-xl'>{singleApplication?.job?.title}</h1>
      <div className='flex justify-center'>
        {
          singleApplication?.status === 'applied' ? <div className='badge badge-warning my-2 p-2'>{singleApplication?.status}</div>:
          singleApplication?.status === 'accepted' ? <div className='badge badge-accent my-2 p-2'>{singleApplication?.status}</div>:
          singleApplication?.status === 'rejected' && <div className='badge badge-error my-2 p-2'>{singleApplication?.status}</div>
        }
        
      </div>
      <p className='text-black font-bold text-lg text-center'>{singleApplication?.createdAt.split('T')[0]}</p>
      <div className='flex flex-col w-full items-center gap-1 mt-4'>
        {/* Job type */}
        <span className='text-red-500 font-semibold'>{singleApplication?.job?.job_type}</span>
        {/* Salary and other details */}
        <span className='text-black font-bold text-lg'>
          ${singleApplication?.job?.salary?.min.split('.')[0]}-${singleApplication?.job?.salary?.max.split('.')[0]}{' '}
          <span className='text-gray-500 font-normal text-base'>
            / {singleApplication?.job.salary?.salary}. {singleApplication?.job?.experience}
          </span>
        </span>
      </div>
      <div className='text-center mt-5'>
        {/* Additional details */}
        <p className='text-gray-500 text-lg'>
          Company: {singleApplication?.job?.company_name} <br />
          Location: {singleApplication?.job?.address?.country}
        </p>
      </div>
      {/* Attachment Section */}
      {
        singleApplication?.resume && <div className='mt-5 flex justify-center'>
        <div className='flex items-center gap-2 border border-gray-300 rounded-md p-3 shadow-md bg-gray-100'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-blue-500'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.172 7l-6.586 6.586a2 2 0 002.828 2.828L18 11.828m0 0L19.414 10.414a2 2 0 00-2.828-2.828L11 14.586M12 20h9m-9-4h6'
            />
          </svg>
          <a
            target='_blank'
            href={singleApplication?.resume}
            className='text-blue-600 font-semibold hover:underline'
            rel='noopener noreferrer'
          >
            {singleApplication?.resume?.split('/')[6]}
          </a>
        </div>
      </div>
      }

      {/* Messages Section */}
      <h2 className='mt-5 text-center text-xl font-semibold'>Messages</h2>
      <div className=' max-h-96 overflow-y-auto'>
        <div className='mt-4 space-y-4'>
          {/* Message 1 */}
          <div className='flex flex-col bg-gray-100 p-4 rounded-lg shadow-md'>
            <div className='flex justify-between text-sm text-gray-500'>
              <span className='font-semibold'>John Doe</span>
              <span>2023-03-16</span>
            </div>
            <p className='text-gray-700 mt-2'>
              Congratulations on your acceptance! We&apos;re excited to have you
              on board for the Product Manager position.
            </p>
          </div>

          {/* Message 2 */}
          <div className='flex flex-col bg-gray-100 p-4 rounded-lg shadow-md'>
            <div className='flex justify-between text-sm text-gray-500'>
              <span className='font-semibold'>Jane Smith</span>
              <span>2023-03-17</span>
            </div>
            <p className='text-gray-700 mt-2'>
              Please let me know if you have any questions about the next steps
              in the onboarding process.
            </p>
          </div>

          {/* Message 3 */}
          <div className='flex flex-col bg-gray-100 p-4 rounded-lg shadow-md'>
            <div className='flex justify-between text-sm text-gray-500'>
              <span className='font-semibold'>HR Team</span>
              <span>2023-03-18</span>
            </div>
            <p className='text-gray-700 mt-2'>
              Here&apos;s the onboarding document. Please review it before our
              first meeting.
            </p>
          </div>
          <div className='flex flex-col bg-gray-100 p-4 rounded-lg shadow-md'>
            <div className='flex justify-between text-sm text-gray-500'>
              <span className='font-semibold'>HR Team</span>
              <span>2023-03-18</span>
            </div>
            <p className='text-gray-700 mt-2'>
              Here&apos;s the onboarding document. Please review it before our
              first meeting.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApplicationStatus
