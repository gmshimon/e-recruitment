import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../Redux/Slices/userSlice'
import Swal from 'sweetalert2'
import {
  HiOutlineArrowNarrowRight,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlineSparkles
} from 'react-icons/hi'

const Login = () => {
  const { isLoginSuccess, isLoginError } = useSelector(state => state.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoginError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timer: 1500
      })
    }
    if (isLoginSuccess) {
      navigate('/')
    }
  }, [isLoginError, isLoginSuccess, navigate])

  const handleLogin = event => {
    event?.preventDefault()

    const data = {
      email,
      password
    }

    dispatch(loginUser(data))
  }
  return (
    <section className='relative flex min-h-screen overflow-hidden bg-slate-950 text-slate-900'>
      <div className='pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-blue-900 via-slate-950 to-slate-900' />
      <div className='pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-1/2 bg-[url("https://wallpapers.com/images/hd/recruitment-process-3hcdec7ropkw8rsc.jpg")] bg-cover bg-center lg:block' />
      <div className='pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl' />
      <div className='pointer-events-none absolute bottom-10 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl' />

      <div className='relative mx-auto flex w-full max-w-6xl flex-col-reverse gap-10 px-6 py-12 lg:flex-row lg:items-center lg:py-24'>
        <div className='w-full text-center text-slate-200 lg:w-[44%] lg:text-left'>
          <span className='inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-200'>
            <HiOutlineSparkles className='h-4 w-4' />
            Welcome back
          </span>
          <h1 className='mt-6 text-3xl font-semibold text-white sm:text-4xl'>
            Sign in to keep building your hiring story
          </h1>
          <p className='mt-4 max-w-md text-sm text-slate-300 sm:text-base'>
            Access tailored job recommendations, saved searches, and instant application updates. Your next opportunity is a few clicks away.
          </p>
          <div className='mt-8 grid gap-4 text-left text-sm text-slate-300 sm:grid-cols-2'>
            <div className='rounded-3xl border border-white/10 bg-white/5 px-5 py-4 shadow-inner shadow-blue-900/30'>
              <p className='text-xs font-semibold uppercase tracking-wide text-blue-200'>Faster screening</p>
              <p className='mt-2 text-sm text-slate-200'>
                Automatic progress updates on every application you submit.
              </p>
            </div>
            <div className='rounded-3xl border border-white/10 bg-white/5 px-5 py-4 shadow-inner shadow-blue-900/30'>
              <p className='text-xs font-semibold uppercase tracking-wide text-blue-200'>Personalized matches</p>
              <p className='mt-2 text-sm text-slate-200'>
                Curated roles from teams searching for your exact skill set.
              </p>
            </div>
          </div>
        </div>

        <div className='w-full lg:w-[56%]'>
          <div className='mx-auto w-full max-w-md rounded-[32px] border border-white/10 bg-white/95 p-8 shadow-2xl shadow-blue-900/20 backdrop-blur lg:ml-auto'>
            <div className='mb-8 space-y-3 text-center lg:text-left'>
              <h2 className='text-2xl font-semibold text-slate-900'>Sign in</h2>
              <p className='text-sm text-slate-500'>
                New here?{' '}
                <Link to='/register' className='font-semibold text-blue-600 hover:text-blue-500'>
                  Create an account
                </Link>
                .
              </p>
            </div>

            <form className='space-y-6' onSubmit={handleLogin}>
              <div className='space-y-2'>
                <label htmlFor='email' className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                  Email address
                </label>
                <div className='flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100'>
                  <HiOutlineMail className='h-5 w-5 text-blue-500' />
                  <input
                    id='email'
                    type='email'
                    required
                    className='w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400'
                    name='email'
                    placeholder='you@company.com'
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500'>
                  <label htmlFor='password'>Password</label>
                  <button type='button' className='text-blue-500 transition hover:text-blue-600'>
                    Forgot password?
                  </button>
                </div>
                <div className='flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100'>
                  <HiOutlineLockClosed className='h-5 w-5 text-blue-500' />
                  <input
                    id='password'
                    type='password'
                    className='w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400'
                    name='password'
                    placeholder='Enter your password'
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type='submit'
                className='group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/25 transition hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 focus:ring-offset-white'
              >
                Sign in
                <HiOutlineArrowNarrowRight className='h-5 w-5 transition group-hover:translate-x-1' />
              </button>
            </form>

            <p className='mt-8 text-center text-xs text-slate-400'>
              By continuing you agree to our{' '}
              <span className='font-medium text-slate-500'>Terms</span> and{' '}
              <span className='font-medium text-slate-500'>Privacy Policy</span>.
            </p>
            <p className='mt-6 text-center text-xs text-slate-300'>
              © {new Date().getFullYear()} <span className='font-semibold text-blue-400'>GM Shimon</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
