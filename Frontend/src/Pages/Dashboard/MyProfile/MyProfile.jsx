/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
import { reset, updateUser, updateUserImage } from '../../../Redux/Slices/userSlice'
import { useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import {
  HiOutlinePhotograph,
  HiOutlineBadgeCheck,
  HiOutlineLink
} from 'react-icons/hi'
import { MdOutlineHomeWork, MdOutlinePerson } from 'react-icons/md'

const MyProfile = () => {
  const {
    user,
    isUserImageUpdateSuccess,
    isUserImageUpdateError,
    isUpdateUserError,
    isUpdateUserSuccess
  } = useSelector(state => state.user)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('user')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('')
  const [updateImage, setUpdateImage] = useState(null)
  const [address, setAddress] = useState({
    address: '',
    country: '',
    city: '',
    zip_code: '',
    state: ''
  })
  const [socialLink, setSocialLink] = useState({
    linkedin: '',
    github: '',
    social: ''
  })
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setEmail(user.email || '')
      setPhone(user.phone || '')
      setBio(user.bio || '')
      setRole(user.role || 'user')
      setUpdateImage(user?.photo || null)
      setImage(
        user?.photo ||
          'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
      )
      setAddress({
        address: user?.address?.address || '',
        country: user?.address?.country || '',
        city: user?.address?.city || '',
        zip_code: user?.address?.zip_code || '',
        state: user?.address?.state || ''
      })
      setSocialLink({
        linkedin: user?.social?.linkedin || '',
        github: user?.social?.github || '',
        social: user?.social?.social || ''
      })
    }
  }, [user])

  useEffect(() => {
    if (isUserImageUpdateSuccess || isUpdateUserSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Update success',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if (isUserImageUpdateError || isUpdateUserError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'update error',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
  }, [
    dispatch,
    isUpdateUserError,
    isUpdateUserSuccess,
    isUserImageUpdateError,
    isUserImageUpdateSuccess
  ])

  const handleFileChange = e => {
    const file = e.target.files[0]
    setUpdateImage(file)
    if (file) {
      setIsUploadingImage(true)
      const formData = new FormData()
      formData.append('image', file)
      formData.append('email', user?.email)
      dispatch(updateUserImage(formData)).finally(() => {
        setIsUploadingImage(false)
      })

      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddressChange = (field, value) => {
    setAddress(prevAddress => ({
      ...prevAddress,
      [field]: value
    }))
  }

  const handleSocialLinkChange = (field, value) => {
    setSocialLink(prevSocialLink => ({
      ...prevSocialLink,
      [field]: value
    }))
  }

  const handleUpdateProfile = () => {
    const data = {
      name,
      email,
      phone,
      role,
      bio,
      address,
      social: socialLink
    }

    dispatch(updateUser(data))
  }

  const handleResetForm = () => {
    if (!user) return
    setName(user.name || '')
    setEmail(user.email || '')
    setPhone(user.phone || '')
    setBio(user.bio || '')
    setRole(user.role || 'user')
    setAddress({
      address: user?.address?.address || '',
      country: user?.address?.country || '',
      city: user?.address?.city || '',
      zip_code: user?.address?.zip_code || '',
      state: user?.address?.state || ''
    })
    setSocialLink({
      linkedin: user?.social?.linkedin || '',
      github: user?.social?.github || '',
      social: user?.social?.social || ''
    })
    setImage(
      user?.photo ||
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
    )
  }

  const initials = useMemo(() => {
    if (name) {
      const [first, second] = name.split(' ')
      return (first?.[0] || '') + (second?.[0] || '')
    }
    if (user?.email) return user.email.slice(0, 2).toUpperCase()
    return 'TI'
  }, [name, user?.email])

  const overviewItems = [
    {
      label: 'Role',
      value: role === 'admin' ? 'Administrator' : 'Candidate',
      icon: MdOutlinePerson
    },
    {
      label: 'Email',
      value: email,
      icon: HiOutlineLink
    },
    {
      label: 'Location',
      value:
        [address.city, address.state, address.country].filter(Boolean).join(', ') ||
        'Not provided',
      icon: MdOutlineHomeWork
    },
    {
      label: 'Phone',
      value: phone || 'Not provided',
      icon: HiOutlineBadgeCheck
    }
  ]

  return (
    <section className='min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8'>
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-3xl font-semibold text-slate-900'>
              Personal profile
            </h1>
            <p className='mt-2 text-sm text-slate-500'>
              Update your professional information and build trust with employers.
            </p>
          </div>
          <div className='flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-600 shadow-sm'>
            <span className='flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white'>
              {initials}
            </span>
            <div>
              <p className='text-sm font-semibold text-slate-900'>{name}</p>
              <p className='text-xs text-slate-500'>{email}</p>
            </div>
          </div>
        </header>

        <div className='mt-8 grid gap-8 lg:grid-cols-3'>
          <aside className='space-y-6 lg:col-span-1'>
            <div className='rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-slate-100 shadow-xl shadow-slate-900/10'>
              <div className='relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white/10'>
                <img
                  src={image}
                  alt='Avatar'
                  className='h-24 w-24 rounded-full object-cover ring-2 ring-white/10'
                />
                <label
                  htmlFor='file-input'
                  className='absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/40 transition hover:bg-blue-600'
                >
                  {isUploadingImage ? (
                    <span className='text-xs font-semibold'>...</span>
                  ) : (
                    <HiOutlinePhotograph className='h-4 w-4' />
                  )}
                </label>
                <input
                  id='file-input'
                  type='file'
                  className='hidden'
                  accept='image/*'
                  onChange={handleFileChange}
                />
              </div>
              <p className='mt-4 text-center text-sm text-slate-300'>
                Upload a clear headshot to make your applications stand out.
              </p>
            </div>

            <div className='rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur'>
              <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                At a glance
              </h2>
              <div className='mt-4 space-y-4'>
                {overviewItems.map(item => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className='flex items-center gap-3 rounded-2xl border border-slate-200 px-3 py-3 text-sm text-slate-600'
                    >
                      <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500'>
                        <Icon className='h-5 w-5' />
                      </span>
                      <div>
                        <p className='text-xs uppercase tracking-wide text-slate-400'>
                          {item.label}
                        </p>
                        <p className='text-sm font-medium text-slate-700'>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </aside>

          <div className='space-y-8 lg:col-span-2'>
            <div className='rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-sm backdrop-blur'>
              <h2 className='text-lg font-semibold text-slate-900'>
                Basic information
              </h2>
              <p className='mt-1 text-sm text-slate-500'>
                Make sure your contact details are accurate and up to date.
              </p>
              <div className='mt-6 grid gap-6'>
                <label className='space-y-2 text-sm'>
                  <span className='font-medium text-slate-600'>Full name *</span>
                  <input
                    type='text'
                    placeholder='Full Name'
                    className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200'
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </label>
                <div className='grid gap-6 sm:grid-cols-2'>
                  <label className='space-y-2 text-sm'>
                    <span className='font-medium text-slate-600'>Email *</span>
                    <input
                      type='text'
                      className='w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 outline-none'
                      value={email}
                      readOnly
                    />
                  </label>
                  <label className='space-y-2 text-sm'>
                    <span className='font-medium text-slate-600'>Phone *</span>
                    <input
                      type='tel'
                      placeholder='+1 555-0100'
                      className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200'
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </label>
                </div>
                <label className='space-y-2 text-sm'>
                  <span className='font-medium text-slate-600'>Bio *</span>
                  <textarea
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    className='h-36 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200'
                    placeholder='Share a short summary about your experience, goals, and what motivates you.'
                    style={{ resize: 'none' }}
                  />
                </label>
              </div>
            </div>

            <div className='rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-sm backdrop-blur'>
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-lg font-semibold text-slate-900'>
                    Social presence
                  </h2>
                  <p className='mt-1 text-sm text-slate-500'>
                    Add links to help employers learn more about you.
                  </p>
                </div>
              </div>
              <div className='mt-6 grid gap-6'>
                <label className='space-y-2 text-sm'>
                  <span className='font-medium text-slate-600'>LinkedIn</span>
                  <input
                    value={socialLink?.linkedin}
                    type='url'
                    placeholder='https://www.linkedin.com/in/username'
                    className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-blue-200'
                    onChange={e =>
                      handleSocialLinkChange('linkedin', e.target.value)
                    }
                  />
                </label>
                <label className='space-y-2 text-sm'>
                  <span className='font-medium text-slate-600'>GitHub</span>
                  <input
                    value={socialLink?.github}
                    type='url'
                    placeholder='https://github.com/username'
                    className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-blue-200'
                    onChange={e =>
                      handleSocialLinkChange('github', e.target.value)
                    }
                  />
                </label>
                <label className='space-y-2 text-sm'>
                  <span className='font-medium text-slate-600'>Other link</span>
                  <input
                    value={socialLink?.social}
                    type='url'
                    placeholder='Portfolio, blog, or personal site'
                    className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-blue-200'
                    onChange={e =>
                      handleSocialLinkChange('social', e.target.value)
                    }
                  />
                </label>
              </div>
            </div>

            <div className='rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-sm backdrop-blur'>
              <h2 className='text-lg font-semibold text-slate-900'>
                Address & location
              </h2>
              <p className='mt-1 text-sm text-slate-500'>
                Let employers know where you are based or if you are open to remote work.
              </p>
              <div className='mt-6 grid gap-6'>
                <label className='space-y-2 text-sm'>
                  <span className='font-medium text-slate-600'>Address *</span>
                  <input
                    value={address?.address}
                    type='text'
                    placeholder='123 Talent Avenue'
                    className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200'
                    onChange={e =>
                      handleAddressChange('address', e.target.value)
                    }
                  />
                </label>
                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                  <label className='space-y-2 text-sm'>
                    <span className='font-medium text-slate-600'>Country *</span>
                    <input
                      value={address?.country}
                      type='text'
                      placeholder='Country'
                      className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200'
                      onChange={e =>
                        handleAddressChange('country', e.target.value)
                      }
                    />
                  </label>
                  <label className='space-y-2 text-sm'>
                    <span className='font-medium text-slate-600'>City *</span>
                    <input
                      value={address?.city}
                      type='text'
                      placeholder='City'
                      className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200'
                      onChange={e =>
                        handleAddressChange('city', e.target.value)
                      }
                    />
                  </label>
                  <label className='space-y-2 text-sm'>
                    <span className='font-medium text-slate-600'>Zip code *</span>
                    <input
                      value={address?.zip_code}
                      type='text'
                      placeholder='Postal code'
                      className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200'
                      onChange={e =>
                        handleAddressChange('zip_code', e.target.value)
                      }
                    />
                  </label>
                  <label className='space-y-2 text-sm'>
                    <span className='font-medium text-slate-600'>State *</span>
                    <input
                      value={address?.state}
                      type='text'
                      placeholder='State'
                      className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200'
                      onChange={e =>
                        handleAddressChange('state', e.target.value)
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end'>
          <button
            type='button'
            onClick={handleResetForm}
            className='inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900'
          >
            Reset changes
          </button>
          <button
            className='inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg'
            onClick={handleUpdateProfile}
          >
            Save profile
          </button>
        </div>
      </div>
    </section>
  )
}

export default MyProfile
