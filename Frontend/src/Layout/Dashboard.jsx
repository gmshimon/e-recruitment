import { HiOutlineBellAlert } from 'react-icons/hi2'
import { IoIosLogOut, IoMdPaper } from 'react-icons/io'
import {
  MdOutlineDashboard,
  MdOutlinePerson,
  MdOutlineSettingsApplications
} from 'react-icons/md'
import { Outlet } from 'react-router-dom'

const navbarOptions = [
  {
    label: 'Dashboard',
    to: '/',
    icon: <MdOutlineDashboard />
  },
  {
    label: 'Profile',
    to: '/profile',
    icon: <MdOutlinePerson />
  },
  {
    label: 'Resume',
    to: '/resume',
    icon: <IoMdPaper />
  },
  {
    label: 'My Applications',
    to: '/applications',
    icon: <MdOutlineSettingsApplications />
  },
  {
    label: 'Job Alert',
    to: '/job_alert',
    icon: <HiOutlineBellAlert />
  }
]

const Dashboard = () => {
  return (
    <div className='drawer lg:drawer-open'>
      <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col'>
        {/* Navbar */}
        <div className='navbar bg-base-300 w-full lg:hidden'>
          <div className='flex-none lg:hidden'>
            <label
              htmlFor='my-drawer-3'
              aria-label='open sidebar'
              className='btn btn-square btn-ghost'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block h-6 w-6 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                ></path>
              </svg>
            </label>
          </div>
          <div className='mx-2 flex-1 px-2'>Navbar Title</div>
        </div>
        {/* Page content here */}
        <div className='bg-base-200'>
          <Outlet />
        </div>
      </div>
      <div
        className='drawer-side'
        style={{
          overflowY: 'scroll',
          scrollbarWidth: 'none', // For Firefox
          msOverflowStyle: 'none' // For IE and Edge
        }}
      >
        <label
          htmlFor='my-drawer-3'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <div className='menu  min-h-full w-60 p-4 '>
          <div className='text-3xl text-center my-10 '>
            <p>XXX</p>
          </div>
          <div className='flex justify-center'>
            <div className='avatar online'>
              <div className='w-20 rounded-full'>
                <img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' />
              </div>
            </div>
          </div>
          <p className='text-center mt-2 text-xl mb-10'>
            G M Shaheen Shah Shimon
          </p>
          {/* Sidebar content here */}
          {navbarOptions.map((option, index) => (
            <div
              key={index}
              className='flex items-center text-xl cursor-pointer mb-7 hover:text-green-600  p-2 '
            >
                {/* border rounded-md bg-green-700 text-white */}
              <p>{option?.icon}</p>
              <p className='ml-2'>{option?.label}</p>
            </div>
          ))}

          <div className='flex items-center text-xl cursor-pointer mt-5 hover:text-green-600'>
            <p>Logout</p>
            <p className='ml-2'>
              <IoIosLogOut />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
