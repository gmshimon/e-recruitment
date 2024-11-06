import { CiClock2, CiLocationOn } from 'react-icons/ci'
import { IoBagHandleOutline } from 'react-icons/io5'

const SingleJob = () => {
  return (
    <div className='border-2 border-inherit bg-base-100 w-80 rounded-md cursor-pointer hover:border-black hover:shadow-lg'>
      <h1 className='text-lg font-semibold px-2 my-2'>Figma Designer </h1>
      <div className='flex justify-between px-3'>
        <div className='flex items-center text-gray-600'>
          <IoBagHandleOutline />
          <p className='ml-2'>Full Time</p>
        </div>
        <div className='flex items-center text-gray-600'>
          <CiClock2 />
          <p className='ml-2'>Posted 2 years ago</p>
        </div>
      </div>
      <div className='flex mt-4 pl-2'>
        <div className='w-14 bg-gray-200 rounded-md text-center text-md mr-2 py-1'>
          App
        </div>
        <div className='w-14 bg-gray-200 rounded-md text-center text-md mr-2 py-1'>
          Figma
        </div>
        <div className='w-14 bg-gray-200 rounded-md text-center text-md mr-2 py-1'>
          PSD
        </div>
      </div>
      <div className='my-5 px-3'>
        <hr />
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex items-center pl-2 text-gray-600 mb-2'>
          <CiLocationOn /> <span className='ml-2'>Denmark</span>
        </div>
        <div className='mb-2 pr-2'>
          <button className='btn btn-outline btn-primary btn-sm'>Apply</button>
        </div>
      </div>
    </div>
  )
}

export default SingleJob
