import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../../../Redux/Slices/userSlice'
import Swal from 'sweetalert2'
import UploadResume from '../../../Component/Dashboard/UploadResume/UploadResume'

const MyResume = () => {
  const { isUserResumeUpdateSuccess, isUserResumeUpdateError } =
    useSelector(state => state.user)
  const dispatch = useDispatch()

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
  }, [dispatch, isUserResumeUpdateError, isUserResumeUpdateSuccess])


  return (
    <section>
      <h1 className='text-4xl m-7'>My Resume</h1>
      <div className='bg-white mx-7 mt-10 p-10 rounded-xl'>
        <h1 className='text-3xl text-blue-800'>Resume Attachment</h1>
        <UploadResume/>
      </div>
      <div className='bg-white mx-7 mt-10 p-10 rounded-xl'>
        <h1 className='text-3xl text-blue-800'>Education Background</h1>
        <UploadResume/>
      </div>
    </section>
  )
}

export default MyResume
