// import { HiOutlineBellAlert } from 'react-icons/hi2'
import { IoIosLogOut, IoMdPaper } from 'react-icons/io'
import {
  MdOutlineDashboard,
  MdOutlinePerson,
  MdOutlineSettingsApplications
} from 'react-icons/md'
import { Link, Outlet, useLocation } from 'react-router-dom'
import CurrentUser from '../utilis/CurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { FaPen } from 'react-icons/fa'
import { logOut } from '../Redux/Slices/userSlice'

const navbarOptions = [
  {
    label: 'Dashboard',
    to: '/dashboard/home',
    icon: MdOutlineDashboard
  },
  {
    label: 'Profile',
    to: '/dashboard/profile',
    icon: MdOutlinePerson
  },
  {
    label: 'Resume',
    to: '/dashboard/resume',
    icon: IoMdPaper
  },
  {
    label: 'My Applications',
    to: '/dashboard/applications',
    icon: MdOutlineSettingsApplications
  }
]

const adminNavbarOptions = [
  {
    label: 'Dashboard',
    to: '/dashboard/home',
    icon: MdOutlineDashboard
  },
  {
    label: 'Profile',
    to: '/dashboard/profile',
    icon: MdOutlinePerson
  },
  {
    label: 'My Jobs',
    to: '/dashboard/my-jobs',
    icon: IoMdPaper
  },
  {
    label: 'Post Job',
    to: '/dashboard/post-job',
    icon: FaPen
  },
  {
    label: 'Applicants',
    to: '/dashboard/applicants',
    icon: MdOutlineSettingsApplications
  }
]

const Dashboard = () => {
  const { user } = useSelector(state => state.user)
  const location = useLocation()
  const dispatch = useDispatch()

  CurrentUser()

  const navItems = useMemo(
    () => (user?.role === 'admin' ? adminNavbarOptions : navbarOptions),
    [user?.role]
  )

  const userName = useMemo(() => {
    if (!user) return 'Guest'
    return user?.name || user?.fullName || user?.username || 'Guest user'
  }, [user])

  const userRoleLabel = useMemo(() => {
    if (!user?.role) return null
    return user.role === 'admin' ? 'Administrator' : 'Candidate'
  }, [user?.role])

  useEffect(() => {
    const checkTokenExpiration = () => {
      const storedToken = localStorage.getItem('userToken')
      if (!storedToken) return

      const { expiration } = JSON.parse(storedToken)
      const currentTime = new Date().getTime()

      if (currentTime > expiration) {
        localStorage.removeItem('userToken')
        dispatch(logOut())
        window.location.href = '/'
      }
    }

    const tokenExpirationInterval = setInterval(checkTokenExpiration, 1000)
    return () => clearInterval(tokenExpirationInterval)
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logOut())
    localStorage.removeItem('userToken')
  }

  const isActiveRoute = targetPath => {
    if (targetPath === '/dashboard/home') {
      return location.pathname === targetPath
    }
    return location.pathname.startsWith(targetPath)
  }

  return (
    <div className='drawer lg:drawer-open min-h-screen bg-slate-100'>
      <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex min-h-screen flex-col'>
        <header className='sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur lg:hidden'>
          <div className='flex items-center gap-3'>
            <label
              htmlFor='my-drawer-3'
              aria-label='Open sidebar navigation'
              className='btn btn-ghost btn-square'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block h-6 w-6 stroke-current text-slate-700'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </label>
            <div>
              <p className='text-xs font-semibold uppercase tracking-wide text-blue-600'>
                Talent IQ
              </p>
              <p className='text-sm font-medium text-slate-600'>
                {userRoleLabel || 'Dashboard'}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <span className='hidden text-sm font-medium text-slate-600 sm:block'>
              {userName}
            </span>
            <div className='avatar'>
              <div className='w-10 rounded-full ring ring-blue-500 ring-offset-2 ring-offset-white'>
                <img
                  src={
                    user?.photo
                      ? user.photo
                      : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                  }
                  alt='User avatar'
                />
              </div>
            </div>
          </div>
        </header>
        <main className='flex-1 overflow-y-auto bg-gradient-to-br from-slate-100 via-white to-slate-100'>
          <div className=' px-4 py-6 sm:px-6 lg:px-8'>
            <Outlet />
          </div>
        </main>
      </div>
      <div className='drawer-side z-40'>
        <label
          htmlFor='my-drawer-3'
          aria-label='close sidebar'
          className='drawer-overlay'
        />
        <div className='flex min-h-full w-72 flex-col justify-between bg-white/95 px-6 pb-8 pt-10 shadow-2xl backdrop-blur lg:shadow-none'>
          <div>
            <Link
              to='/'
              className='flex items-center justify-center gap-2 text-2xl font-semibold tracking-tight text-slate-900 hover:text-blue-600'
            >
              Talent IQ
            </Link>
            <div className='mt-10 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 p-6 text-center'>
              <div className='flex justify-center'>
                <div className='avatar'>
                  <div className='w-20 rounded-full border-4 border-white shadow-lg'>
                    <img
                      src={
                        user?.photo
                          ? user.photo
                          : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                      }
                      alt='User avatar'
                    />
                  </div>
                </div>
              </div>
              <p className='mt-4 text-lg font-semibold text-slate-900'>
                {userName}
              </p>
              {userRoleLabel && (
                <span className='mt-2 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600'>
                  {userRoleLabel}
                </span>
              )}
              {user?.email && (
                <p className='mt-3 text-xs text-slate-500'>{user.email}</p>
              )}
            </div>
            <nav className='mt-10 space-y-2'>
              {navItems.map(option => {
                const Icon = option.icon
                const active = isActiveRoute(option.to)

                return (
                  <Link
                    key={option.label}
                    to={option.to}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      active
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <Icon className='h-5 w-5' />
                    </span>
                    <span>{option.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className='mt-8 border-t border-slate-200 pt-6'>
            <button
              onClick={handleLogout}
              type='button'
              className='flex w-full items-center justify-center gap-3 rounded-xl border border-transparent bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 hover:text-rose-700'
            >
              <IoIosLogOut className='h-5 w-5' />
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
