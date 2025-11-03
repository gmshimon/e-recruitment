import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../../Redux/Slices/userSlice'
import Swal from 'sweetalert2'

const Registration = () => {
  const { isCreateUserSuccess, isCreateUserError } = useSelector(state => state.user)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isCreateUserError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timer: 1500
      })
    }
    if (isCreateUserSuccess) {
      navigate('/')
    }
  }, [isCreateUserSuccess, navigate, isCreateUserError])

  const handleSignup = event => {
    event?.preventDefault()
    const data = {
      name,
      email,
      phone,
      password
    }
    dispatch(createUser(data))
  }
  return (
    <section className='relative flex min-h-screen overflow-hidden bg-slate-950 text-slate-900'>
      <div className='pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-indigo-900 via-slate-950 to-slate-900' />
      <div className='pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-1/2 bg-[url("https://wallpapers.com/images/hd/recruitment-process-3hcdec7ropkw8rsc.jpg")] bg-cover bg-center lg:block' />
      <div className='pointer-events-none absolute right-10 top-24 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl' />
      <div className='pointer-events-none absolute bottom-10 right-1/3 h-96 w-96 rounded-full bg-indigo-500/25 blur-3xl' />

      <div className='relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-24'>
        <div className='w-full max-w-lg text-center text-slate-200 lg:text-left'>
          <span className='inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200'>
            Jump in
          </span>
          <h1 className='mt-6 text-3xl font-semibold text-white sm:text-4xl'>
            Create your account in minutes
          </h1>
          <p className='mt-4 max-w-md text-sm text-slate-300 sm:text-base'>
            Showcase your experience, track applications, and access curated roles designed for your next career jump.
          </p>
          <div className='mt-8 grid gap-4 text-left text-sm text-slate-200 sm:grid-cols-2'>
            <div className='rounded-3xl border border-white/10 bg-white/5 px-5 py-4 shadow-inner shadow-indigo-900/30'>
              <p className='text-xs font-semibold uppercase tracking-wide text-indigo-200'>Smart profile</p>
              <p className='mt-2 text-sm text-slate-200'>
                Upload once and reuse your profile across every application.
              </p>
            </div>
            <div className='rounded-3xl border border-white/10 bg-white/5 px-5 py-4 shadow-inner shadow-indigo-900/30'>
              <p className='text-xs font-semibold uppercase tracking-wide text-indigo-200'>Team insights</p>
              <p className='mt-2 text-sm text-slate-200'>
                View hiring timelines and culture notes before you apply.
              </p>
            </div>
          </div>
        </div>

        <div className='w-full max-w-md lg:ml-auto'>
          <div className='rounded-[32px] border border-white/10 bg-white/95 p-8 shadow-2xl shadow-indigo-900/20 backdrop-blur'>
            <div className='mb-8 space-y-3 text-center lg:text-left'>
              <h2 className='text-2xl font-semibold text-slate-900'>Create your account</h2>
              <p className='text-sm text-slate-500'>
                Already have an account?{' '}
                <Link to='/login' className='font-semibold text-indigo-600 hover:text-indigo-500'>
                  Sign in
                </Link>
                .
              </p>
            </div>

            <form className='space-y-6' onSubmit={handleSignup}>
              <div className='space-y-2'>
                <label htmlFor='name' className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                  Full name
                </label>
                <input
                  id='name'
                  type='text'
                  required
                  className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                  name='name'
                  placeholder='Jane Doe'
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='email' className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                  Email address
                </label>
                <input
                  id='email'
                  type='email'
                  required
                  className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                  name='email'
                  placeholder='you@company.com'
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='phone' className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                  Phone number
                </label>
                <input
                  id='phone'
                  type='tel'
                  required
                  className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                  name='phone'
                  placeholder='+1 (555) 000-0000'
                  onChange={e => setPhone(e.target.value)}
                />
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500'>
                  <label htmlFor='password'>Password</label>
                  <span className='text-indigo-500'>Min 8 characters</span>
                </div>
                <input
                  id='password'
                  type='password'
                  className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                  name='password'
                  placeholder='Create a password'
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type='submit'
                className='group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/25 transition hover:from-indigo-500 hover:via-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 focus:ring-offset-white'
              >
                Create account
              </button>
            </form>

            <p className='mt-8 text-center text-xs text-slate-400'>
              By creating an account you agree to our{' '}
              <span className='font-medium text-slate-500'>Terms of Service</span> and{' '}
              <span className='font-medium text-slate-500'>Privacy Policy</span>.
            </p>
            <p className='mt-6 text-center text-xs text-slate-300'>
              © {new Date().getFullYear()} <span className='font-semibold text-indigo-300'>GM Shimon</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Registration
