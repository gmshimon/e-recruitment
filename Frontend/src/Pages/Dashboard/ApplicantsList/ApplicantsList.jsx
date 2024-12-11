import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getJobApplicants,
  setSingleApplication,
  setSingleApplicationNull
} from '../../../Redux/Slices/applicationSlice'
import { FcViewDetails } from 'react-icons/fc'
import ApplicantsDetails from '../../../Component/Dashboard/ApplicantsDetails/ApplicantsDetails'

const ApplicantsList = () => {
  const { applicants } = useSelector(state => state.application)
  const [filteredApplicants,setFilteredApplicants] = useState()
  const [activeTab, setActiveTab] = useState('All')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tabs = ['All', 'Short Listed','Offered','Rejected']
  const { id } = useParams()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getJobApplicants(id))
  }, [dispatch, id])

  useEffect(()=>{
    if(activeTab==='All'){
        setFilteredApplicants(applicants)
    }
    else if(activeTab==='Short Listed'){
        setFilteredApplicants(applicants.filter(app=>app.application_status==='interviewing'))
    }
    else if(activeTab==='Offered'){
        setFilteredApplicants(applicants.filter(app=>app.application_status==='offered'))
    }
    else if(activeTab==='Rejected'){
        setFilteredApplicants(applicants.filter(app=>app.application_status==='rejected'))
    }
  },[applicants, activeTab])

  return (
    <section className='h-[calc(100vh-19px)]'>
      <h1 className='text-4xl m-7'>{applicants[0]?.job?.title}</h1>
      <div className='flex space-x-4 items-center py-2 px-4'>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
              activeTab === tab
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className='bg-white h-[550px] mx-7 mt-10 px-10 py-10 rounded-xl'>
        <div className='overflow-x-auto '>
          <table className='table '>
            {/* head */}
            <thead className=' bg-blue-400 text-black text-lg'>
              <tr>
                <th>Applicants</th>
                <th>Date</th>
                <th>Resume</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {filteredApplicants?.map(app => (
                <tr key={app?._id} className='text-[17px]'>
                  <td className='w-[350px]'>
                    <div className='flex items-center gap-3'>
                      <div>
                        <div className='font-bold'>{app?.candidate?.name}</div>
                        <span className='text-sm text-gray-500'>
                          {app?.candidate?.email}
                        </span>
                        <br />
                        {
                            app.application_status==='pending'?<div className='badge badge-warning mt-2 badge-sm p-2'>
                            {app.application_status}
                          </div>:app.application_status==='interviewing'?<div className='badge badge-accent mt-2 badge-sm p-2'>
                            {app.application_status}
                          </div>:app.application_status==='offered'?<div className='badge badge-success mt-2 badge-sm p-2'>
                            {app.application_status}
                          </div>:app.application_status==='pending'&&<div className='badge badge-error mt-2 badge-sm p-2'>
                            {app.application_status}
                          </div>
                        }
                      </div>
                    </div>
                  </td>
                  <td className='w-[300px]'>{app?.createdAt.split('T')[0]}</td>
                  <td>
                    <a
                      className='hover:text-blue-600'
                      href={app?.resume}
                      target='_blank'
                    >
                      Resume
                    </a>
                  </td>
                  <th>
                    <button
                      className='btn btn-ghost btn-xs text-2xl'
                      title='Details'
                      onClick={() => {
                        dispatch(setSingleApplication(app))
                        document.getElementById('my_modal_6').showModal()
                      }}
                    >
                      <FcViewDetails />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
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
      </div>
    </section>
  )
}

export default ApplicantsList
