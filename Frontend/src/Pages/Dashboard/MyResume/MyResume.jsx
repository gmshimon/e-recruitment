import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../../../Redux/Slices/userSlice'
import Swal from 'sweetalert2'
import UploadResume from '../../../Component/Dashboard/UploadResume/UploadResume'
import UploadEducation from '../../../Component/Dashboard/UploadEducation/UploadEducation'
import {
  deleteEducation,
  eduReset,
  getEducationList,
  setEducation
} from '../../../Redux/Slices/educationSlice'
import { AiOutlineClose } from 'react-icons/ai'
import UpdateEducationForm from '../../../Component/Dashboard/UpdateEducationForm/UpdateEducationForm'
import MySkills from '../../../Component/Dashboard/MySkills/MySkills'
import { HiOutlineSparkles, HiOutlineAcademicCap, HiOutlineDocumentText } from 'react-icons/hi'

const MyResume = () => {
  const {
    educations,
    createEducationSuccess,
    createEducationError,
    updateEducationSuccess,
    updateEducationError,
    deleteEducationSuccess,
    deleteEducationError
  } = useSelector(state => state.educations)
  const {
    isUserResumeUpdateSuccess,
    isUserResumeUpdateError,
    isUpdateUserError,
    isUpdateUserSuccess
  } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEducationList())
  }, [dispatch, updateEducationSuccess])

  useEffect(() => {
    if (isUpdateUserSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User update success',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if (isUpdateUserError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'User update failed',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if (isUserResumeUpdateSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Resume update success',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if (isUserResumeUpdateError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Resume update failed',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if (createEducationSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Education Create success',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(eduReset())
    }
    if (createEducationError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Education Create failed',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(eduReset())
    }
    if (updateEducationSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Education Update success',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(eduReset())
    }
    if (updateEducationError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Education Update failed',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(eduReset())
    }
    if (deleteEducationSuccess) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Education delete success',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(eduReset())
    }
    if (deleteEducationError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Education delete failed',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(eduReset())
    }
  }, [
    createEducationError,
    createEducationSuccess,
    deleteEducationError,
    deleteEducationSuccess,
    dispatch,
    isUpdateUserError,
    isUpdateUserSuccess,
    isUserResumeUpdateError,
    isUserResumeUpdateSuccess,
    updateEducationError,
    updateEducationSuccess
  ])

  const handleDeleteResume = id => {
    dispatch(deleteEducation(id))
  }

  const formatDate = isoString => {
    if (!isoString) return 'Present'
    const date = new Date(isoString)
    if (Number.isNaN(date.getTime())) return isoString
    return date.toLocaleString('default', { month: 'short', year: 'numeric' })
  }

  const totalEducations = Array.isArray(educations) ? educations.length : 0

  return (
    <section className='relative min-h-screen overflow-hidden bg-slate-50/80 pb-20 pt-24'>
      <div className='pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-100 via-white to-white' />
      <div className='pointer-events-none absolute inset-x-0 top-0 -z-20 h-[520px] bg-gradient-to-r from-blue-600/15 via-indigo-500/15 to-blue-700/15 blur-3xl opacity-70' />

      <div className='mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8'>
        <div className='rounded-[44px] border border-white/60 bg-white/85 px-8 py-10 shadow-2xl shadow-blue-900/20 backdrop-blur-sm sm:px-12 sm:py-14'>
          <div className='flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left'>
            <div className='space-y-4'>
              <span className='inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700'>
                <HiOutlineSparkles className='h-4 w-4' />
                Candidate profile
              </span>
              <h1 className='text-3xl font-semibold text-slate-900 sm:text-4xl'>My Resume</h1>
              <p className='max-w-xl text-sm text-slate-500 sm:text-base'>
                Keep your resume, education, and core skills current so recruiters get the full picture the moment you apply.
              </p>
            </div>
            <div className='grid w-full max-w-sm grid-cols-2 gap-3 text-left text-sm text-blue-50 sm:text-center'>
              <div className='rounded-3xl border border-white/20 bg-white/10 px-5 py-4 shadow-inner'>
                <p className='text-xs font-semibold uppercase tracking-wide text-white/80'>Education entries</p>
                <p className='mt-1 text-2xl font-semibold text-white'>{totalEducations}</p>
                <p className='mt-1 text-xs text-blue-500'>Add degrees and certifications to highlight your growth.</p>
              </div>
              <div className='rounded-3xl border border-white/20 bg-white/10 px-5 py-4 shadow-inner'>
                <p className='text-xs font-semibold uppercase tracking-wide text-white/80'>Resume status</p>
                <p className='mt-1 text-2xl font-semibold text-white'>{isUserResumeUpdateSuccess ? 'Updated' : 'Saved'}</p>
                <p className='mt-1 text-xs text-blue-500'>Upload a recent copy to enable quick apply on every job.</p>
              </div>
            </div>
          </div>
        </div>

        <div className='grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]'>
          <div className='space-y-8'>
            <section className='rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8'>
              <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <div className='inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600'>
                    <HiOutlineDocumentText className='h-4 w-4' />
                    Resume attachment
                  </div>
                  <h2 className='mt-3 text-xl font-semibold text-slate-900'>Upload your latest CV</h2>
                  <p className='text-sm text-slate-500'>
                    Recruiters will review this document first. Keep it up to date with your most recent experience.
                  </p>
                </div>
              </div>
              <div className='mt-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-8 sm:px-8'>
                <UploadResume />
              </div>
            </section>

            <section className='rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8'>
              <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <div className='inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600'>
                    <HiOutlineAcademicCap className='h-4 w-4' />
                    Education background
                  </div>
                  <h2 className='mt-3 text-xl font-semibold text-slate-900'>Showcase your academic journey</h2>
                  <p className='text-sm text-slate-500'>Edit any entry to update details or remove items you no longer want to display.</p>
                </div>
                <button
                  type='button'
                  className='inline-flex items-center justify-center rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 focus:ring-offset-white'
                  onClick={() => document.getElementById('upload_education_trigger')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Add new entry
                </button>
              </div>

              <div className='mt-6 space-y-4'>
                {totalEducations > 0 ? (
                  educations.map((item, index) => {
                    const status = (item?.status || '').toLowerCase()
                    const statusClasses =
                      status === 'graduated'
                        ? 'bg-emerald-50 text-emerald-600'
                        : status === 'in progress'
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-slate-100 text-slate-500'

                    return (
                      <article
                        key={item?._id || index}
                        className='flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50/80 px-5 py-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/60 sm:flex-row sm:items-center sm:justify-between'
                      >
                        <div
                          className='cursor-pointer space-y-2 text-left text-sm text-slate-600'
                          onClick={() => {
                            dispatch(setEducation(item))
                            document.getElementById('my_modal_4').showModal()
                          }}
                        >
                          <h3 className='text-base font-semibold text-slate-900'>
                            {item?.title || 'Programme'} in {item?.subject || 'Subject'}
                          </h3>
                          <p className='text-xs uppercase tracking-wide text-slate-400'>
                            {item?.institution || 'Institution not provided'}
                          </p>
                          <p className='text-xs text-slate-500'>
                            {formatDate(item?.startDate)} – {item?.endDate ? formatDate(item.endDate) : 'Present'}
                          </p>
                          <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusClasses}`}>
                            <span className='inline-block h-2 w-2 rounded-full bg-current' />
                            {item?.status || 'Status unknown'}
                          </span>
                        </div>
                        <button
                          aria-label='Remove entry'
                          className='inline-flex items-center justify-center rounded-full border border-rose-100 bg-rose-50 p-2 text-rose-500 transition hover:border-rose-200 hover:bg-rose-100 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:ring-offset-2 focus:ring-offset-rose-50'
                          onClick={() => handleDeleteResume(item?._id)}
                        >
                          <AiOutlineClose size={20} />
                        </button>
                      </article>
                    )
                  })
                ) : (
                  <div className='rounded-3xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-10 text-center text-sm text-slate-500'>
                    No education entries yet. Add your degrees, certificates, or training programmes to strengthen your profile.
                  </div>
                )}
              </div>

              <div id='upload_education_trigger' className='mt-8 rounded-3xl border border-dashed border-indigo-200 bg-indigo-50/70 px-6 py-6'>
                <UploadEducation />
              </div>
            </section>
          </div>

          <aside className='space-y-8'>
            <section className='rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8'>
              <div className='flex flex-col gap-2'>
                <div className='inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600'>
                  Core skills
                </div>
                <h2 className='text-xl font-semibold text-slate-900'>Highlight your strengths</h2>
                <p className='text-sm text-slate-500'>
                  Curated skills help hiring teams match you to the right opportunities faster. Keep them focused and current.
                </p>
              </div>
              <div className='mt-6 rounded-3xl border border-slate-200 bg-slate-50/80 px-5 py-5'>
                <MySkills />
              </div>
            </section>
          </aside>
        </div>
      </div>

      <dialog id='my_modal_4' className='modal'>
        <div className='modal-box max-w-2xl rounded-3xl border border-slate-200 shadow-xl'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
            <UpdateEducationForm />
          </form>
        </div>
      </dialog>
    </section>
  )
}

export default MyResume
