import { MdLogin } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const navbarOptions = (
    <>
      <li className='text-lg md:mr-5'>
        <Link to={"/jobs/?category=content Writer"}>Jobs</Link>
      </li>
      <li className='text-lg md:mr-5'>
        <Link to="/blogs">Blogs</Link>
      </li>
      <li className='text-lg md:mr-5'>
        <Link to="/contact">Contact</Link>
      </li>
    </>
  )
  return (
    <div className='navbar bg-base-00 fixed z-10 bg-opacity-50  bg-blue-800 text-white'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-blue-800 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            {navbarOptions} 
          </ul>
        </div>
       <Link to="/">
       <a className='btn btn-ghost text-xl'>daisyUI</a>
       </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>{navbarOptions}</ul>
      </div>
      <div className='navbar-end'>
      <li className='text-xl md:mr-5 list-none'>
        <Link to="/login"><MdLogin/></Link>
      </li>
      </div>
    </div>
  )
}

export default Navbar
