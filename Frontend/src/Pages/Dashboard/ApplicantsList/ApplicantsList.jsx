import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  evaluateApplication,
  getJobApplicants,
  setSingleApplication,
  setSingleApplicationNull
} from '../../../Redux/Slices/applicationSlice'
import { FcViewDetails } from 'react-icons/fc'
import ApplicantsDetails from '../../../Component/Dashboard/ApplicantsDetails/ApplicantsDetails'
import { FaDownload } from 'react-icons/fa'
import { BsCalendar2DateFill } from 'react-icons/bs'
import InterviewDetails from '../../../Component/Dashboard/InterviewDetails/InterviewDetails'
import * as XLSX from 'xlsx'
import { FiSearch } from 'react-icons/fi'
import { RiFeedbackFill } from 'react-icons/ri'
import InterviewFeedBack from '../../../Component/Dashboard/CreateEducationForm/InterviewFeedBack/InterviewFeedBack'
import { SlEnvolopeLetter } from 'react-icons/sl'
import GenerateOfferLetter from '../../../Component/Dashboard/GenerateOfferLetter/GenerateOfferLetter'

const TAB_STATUS_MAP = {
  All: null,
  'Short Listed': 'interviewing',
  Offered: 'offered',
  Rejected: 'rejected'
}

const STATUS_BADGE_STYLES = {
  pending: 'bg-amber-100 text-amber-700 border border-amber-200',
  interviewing: 'bg-sky-100 text-sky-700 border border-sky-200',
  offered: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  rejected: 'bg-rose-100 text-rose-700 border border-rose-200'
}

const formatDate = dateString => {
  if (!dateString) return '—'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

const ApplicantsList = () => {
  const {
    applicants: applicantsFromStore,
    singleApplication,
    updateApplicationAtsScoreLoading
  } = useSelector(state => state.application)
  const applicants = applicantsFromStore ?? []
  const [activeTab, setActiveTab] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const tabs = useMemo(() => Object.keys(TAB_STATUS_MAP), [])
  const { id } = useParams()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getJobApplicants(id))
  }, [dispatch, id, singleApplication])

  const jobTitle = applicants[0]?.job?.title ?? 'Applicants'
  const jobLocation = applicants[0]?.job?.location

  const baseApplicants = useMemo(() => {
    const statusFilter = TAB_STATUS_MAP[activeTab]
    if (!statusFilter) return applicants
    return applicants.filter(
      app => app?.application_status === statusFilter
    )
  }, [activeTab, applicants])

  const filteredApplicants = useMemo(() => {
    if (!searchTerm.trim()) return baseApplicants
    const term = searchTerm.toLowerCase()
    return baseApplicants.filter(app => {
      const name = app?.candidate?.name?.toLowerCase() ?? ''
      const email = app?.candidate?.email?.toLowerCase() ?? ''
      return name.includes(term) || email.includes(term)
    })
  }, [baseApplicants, searchTerm])

  const statusSummary = useMemo(() => {
    const summary = {
      total: applicants.length,
      pending: 0,
      interviewing: 0,
      offered: 0,
      rejected: 0
    }

    applicants.forEach(app => {
      const status = app?.application_status
      if (status && Object.prototype.hasOwnProperty.call(summary, status)) {
        summary[status] += 1
      }
    })

    return summary
  }, [applicants])

  const handleCalculateATS = () => {
    dispatch(evaluateApplication(id))
  }

  const handleDownload = () => {
    if (!filteredApplicants.length) return

    const data = filteredApplicants.map(item => ({
      applicant: item?.candidate?.name,
      interview_date: item?.interview?.date,
      interview_type: item?.interview?.type,
      details: item?.interview?.location,
      resume_link: {
        t: 's',
        v: 'Resume', // Display text for the cell
        l: { Target: item?.resume } // Hyperlink target (URL)
      }
    }))
    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: [
        'applicant',
        'interview_date',
        'interview_type',
        'details',
        'resume_link'
      ]
    })
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Interviews')

    // Generate and download Excel file
    XLSX.writeFile(workbook, `InterviewList-${jobTitle}.xlsx`)
  }
  return (
    <section className='min-h-screen bg-slate-50 py-10'>
      <div className='mx-auto flex max-w-7xl flex-col gap-6 px-4'>
        <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>
                Job Opening
              </p>
              <h1 className='text-2xl font-semibold text-slate-900 md:text-3xl'>
                {jobTitle}
              </h1>
              {jobLocation && (
                <p className='text-sm text-slate-500'>{jobLocation}</p>
              )}
            </div>
            <div className='flex flex-wrap items-center gap-3'>
              {activeTab === 'Short Listed' && filteredApplicants.length > 0 && (
                <button
                  onClick={handleDownload}
                  className='btn btn-outline btn-sm md:btn-md'
                >
                  <FaDownload className='text-lg' />
                  <span className='ml-2 hidden md:inline'>Export shortlist</span>
                </button>
              )}
              <button
                onClick={handleCalculateATS}
                className='btn btn-primary btn-sm md:btn-md'
                disabled={updateApplicationAtsScoreLoading}
              >
                {updateApplicationAtsScoreLoading ? (
                  <span className='flex items-center gap-2'>
                    <span className='loading loading-spinner loading-sm' />
                    Calculating...
                  </span>
                ) : (
                  'Recalculate ATS'
                )}
              </button>
            </div>
          </div>
          <div className='mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4'>
            {[
              {
                label: 'Total Applicants',
                value: statusSummary.total,
                accent: 'bg-slate-900 text-white'
              },
              {
                label: 'Short Listed',
                value: statusSummary.interviewing,
                accent: 'bg-sky-100 text-sky-700'
              },
              {
                label: 'Offers Sent',
                value: statusSummary.offered,
                accent: 'bg-emerald-100 text-emerald-700'
              },
              {
                label: 'Rejected',
                value: statusSummary.rejected,
                accent: 'bg-rose-100 text-rose-700'
              }
            ].map(item => (
              <div
                key={item.label}
                className={`rounded-xl border border-slate-200 p-4 text-sm font-medium ${item.accent}`}
              >
                <span className='block text-xs uppercase tracking-wide text-current/70'>
                  {item.label}
                </span>
                <span className='mt-1 block text-2xl font-semibold text-current'>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className='rounded-2xl border border-slate-200 bg-white shadow-sm'>
          <div className='flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-wrap items-center gap-2'>
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className='relative w-full md:w-72'>
              <FiSearch className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
              <input
                type='text'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder='Search by name or email'
                className='input input-bordered w-full pl-10'
              />
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='table whitespace-nowrap'>
              <thead className='bg-slate-100 text-slate-600'>
                <tr className='text-sm font-semibold'>
                  <th className='rounded-tl-2xl'>Applicant</th>
                  <th>Applied</th>
                  <th>Resume</th>
                  <th>ATS</th>
                  <th>
                    {activeTab === 'Offered' ? 'Offer Letter' : 'Actions'}
                  </th>
                  {activeTab === 'Short Listed' && <th>Feedback</th>}
                </tr>
              </thead>
              <tbody className='text-sm'>
                {filteredApplicants.length > 0 ? (
                  filteredApplicants.map(app => (
                    <tr key={app?._id} className='hover:bg-slate-50'>
                      <td className='align-top'>
                        <div className='flex flex-col gap-1'>
                          <span className='text-base font-semibold text-slate-900'>
                            {app?.candidate?.name ?? 'Unnamed Candidate'}
                          </span>
                          {app?.candidate?.email && (
                            <span className='text-sm text-slate-500'>
                              {app.candidate.email}
                            </span>
                          )}
                          <span
                            className={`mt-1 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                              STATUS_BADGE_STYLES[app?.application_status] ??
                              'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {app?.application_status ?? 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td>{formatDate(app?.createdAt)}</td>
                      <td>
                        {app?.resume ? (
                          <a
                            className='font-medium text-slate-700 hover:text-blue-600'
                            href={app.resume}
                            target='_blank'
                            rel='noreferrer'
                          >
                            View resume
                          </a>
                        ) : (
                          <span className='text-slate-400'>Not provided</span>
                        )}
                      </td>
                      <td>{app?.ats_score ?? '—'}</td>
                      <td>
                        <div className='flex items-center gap-2'>
                          {activeTab === 'All' && (
                            <button
                              className='btn btn-ghost btn-sm text-2xl'
                              title='Applicant details'
                              onClick={() => {
                                dispatch(setSingleApplication(app))
                                document
                                  .getElementById('my_modal_6')
                                  .showModal()
                              }}
                            >
                              <FcViewDetails />
                            </button>
                          )}
                          {activeTab === 'Short Listed' && (
                            <button
                              className='btn btn-ghost btn-sm text-2xl'
                              title='Schedule interview'
                              onClick={() => {
                                dispatch(setSingleApplication(app))
                                document
                                  .getElementById('my_modal_7')
                                  .showModal()
                              }}
                            >
                              <BsCalendar2DateFill />
                            </button>
                          )}
                          {activeTab === 'Offered' && (
                            <button
                              className='btn btn-ghost btn-sm text-2xl'
                              title='Generate offer letter'
                              onClick={() => {
                                dispatch(setSingleApplication(app))
                                document
                                  .getElementById('my_modal_9')
                                  .showModal()
                              }}
                            >
                              <SlEnvolopeLetter />
                            </button>
                          )}
                          {activeTab === 'Rejected' && (
                            <span className='text-slate-400'>—</span>
                          )}
                        </div>
                      </td>
                      {activeTab === 'Short Listed' && (
                        <td>
                          <button
                            className='btn btn-ghost btn-sm text-2xl'
                            title='Interview feedback'
                            onClick={() => {
                              dispatch(setSingleApplication(app))
                              document
                                .getElementById('my_modal_8')
                                .showModal()
                            }}
                          >
                            <RiFeedbackFill />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={activeTab === 'Short Listed' ? 6 : 5}
                      className='py-16 text-center text-sm text-slate-500'
                    >
                      {searchTerm
                        ? 'No applicants match your search.'
                        : 'No applicants in this stage yet.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <dialog id='my_modal_6' className='modal'>
          <div className='modal-box w-full md:max-w-2xl'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => dispatch(setSingleApplicationNull())}
                className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              >
                ✕
              </button>
            </form>
            <ApplicantsDetails />
          </div>
        </dialog>
        <dialog id='my_modal_7' className='modal'>
          <div className='modal-box w-full md:max-w-2xl'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => dispatch(setSingleApplicationNull())}
                className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              >
                ✕
              </button>
            </form>
            <InterviewDetails />
          </div>
        </dialog>
        <dialog id='my_modal_8' className='modal'>
          <div className='modal-box w-full md:max-w-2xl'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => dispatch(setSingleApplicationNull())}
                className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              >
                ✕
              </button>
            </form>
            <InterviewFeedBack />
          </div>
        </dialog>
        <dialog id='my_modal_9' className='modal'>
          <div className='modal-box w-full md:max-w-3xl'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => dispatch(setSingleApplicationNull())}
                className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              >
                ✕
              </button>
            </form>
            <GenerateOfferLetter/>
          </div>
        </dialog>
      </div>
    </section>
  )
}

export default ApplicantsList
