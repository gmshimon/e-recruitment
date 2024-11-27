
import { useEffect } from 'react'
import { MdDeleteOutline, MdOutlineModeEditOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { reset, resetDetails } from '../../../Redux/Slices/jobSlice'


const MyJobs = () => {
  const {updateJobSuccess} = useSelector(state=>state.job)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(updateJobSuccess){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Job Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
       dispatch(resetDetails())
    }
  },[updateJobSuccess,dispatch])

  const handledeleteJob = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success'
        })
      }
    })
  }

  const handleEditJobs = (id)=>{
    navigate(`/dashboard/my-jobs/6744cd946f983cab82c9722e`)
  }
  return (
    <section className='h-[calc(100vh-28px)]'>
      <h1 className='text-4xl m-7'>My Jobs</h1>

      <div className='bg-white h-[550px] mx-7 mt-10 px-10 py-10 rounded-xl'>
        <div className='overflow-x-auto '>
          <table className='table '>
            {/* head */}
            <thead className=' bg-blue-400 text-black text-lg'>
              <tr>
                <th>Title</th>
                <th className=''>Job</th>
                <th>Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className='text-[17px]'>
                <td className='w-[350px]'>
                  <div className='flex items-center gap-3'>
                    <div>
                      <div className='font-bold'>Product Designer</div>
                      <div className='badge badge-error mt-2 badge-sm p-2'>
                        Disable
                      </div>
                    </div>
                  </div>
                </td>
                <td className='w-[350px]'>
                  <p className='text-red-600 '>Full Time</p>
                  <p>Yearly Salary, Germany</p>
                </td>
                <td className='w-[300px]'>20-11-2024</td>
                <th className='flex'>
                  <div>
                    <button
                      className='btn btn-ghost btn-xs text-2xl'
                      title='Details'
                      onClick={()=>handleEditJobs(1)}
                    >
                      <MdOutlineModeEditOutline />
                    </button>
                  </div>
                  <div>
                    <button
                      className='btn btn-ghost btn-xs text-2xl'
                      title='Details'
                      onClick={() => handledeleteJob(1)}
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default MyJobs
