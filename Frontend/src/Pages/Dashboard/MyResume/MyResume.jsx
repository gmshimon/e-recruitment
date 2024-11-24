import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../../../Redux/Slices/userSlice'
import Swal from 'sweetalert2'
import UploadResume from '../../../Component/Dashboard/UploadResume/UploadResume'
import UploadEducation from '../../../Component/Dashboard/UploadEducation/UploadEducation'
import { eduReset, getEducationList } from '../../../Redux/Slices/educationSlice'
import { AiOutlineClose } from 'react-icons/ai'

const MyResume = () => {
  const { educations, createEducationSuccess, createEducationError } =
    useSelector(state => state.educations)
  const { isUserResumeUpdateSuccess, isUserResumeUpdateError } = useSelector(
    state => state.user
  )
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getEducationList())
  },[dispatch])

  useEffect(() => {
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
  }, [
    createEducationError,
    createEducationSuccess,
    dispatch,
    isUserResumeUpdateError,
    isUserResumeUpdateSuccess
  ])

  return (
    <section>
      <h1 className='text-4xl m-7'>My Resume</h1>
      <div className='bg-white mx-7 mt-10 p-10 rounded-xl'>
        <h1 className='text-3xl text-blue-800'>Resume Attachment</h1>
        <UploadResume />
      </div>
      <div className='bg-white mx-7 mt-10 p-10 rounded-xl'>
        <h1 className='text-3xl text-blue-800'>Education Background</h1>
        {educations?.map((item, index) => (
          <div key={item}>
            <div
              key={index}
              className='flex items-center justify-between bg-gray-100 rounded-lg p-4 w-full mb-2'
            >
              <p className='text-gray-800 text-md hover:text-blue-500 cursor-pointer'>
                {item?.title} of {item?.subject} in {item?.institution}
                <p className='text-sm'>{item?.startDate.split('T')[0]} - {item?.endDate.split('T')[0]}</p>
              </p>
              <button
                aria-label='Remove file'
                className='text-green-600 hover:text-green-800'
                // onClick={() => handleDeleteResume(item)}
              >
                <AiOutlineClose size={18} />
              </button>
            </div>
          </div>
        ))}
        <UploadEducation />
      </div>
    </section>
  )
}

export default MyResume
