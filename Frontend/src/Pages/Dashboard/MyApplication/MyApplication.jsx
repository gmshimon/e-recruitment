import { FcViewDetails } from 'react-icons/fc'
import ApplicationStatus from '../../../Component/Dashboard/ApplicationStatus/ApplicationStatus'

const MyApplication = () => {
  return (
    <section className='h-[calc(100vh-29px)]'>
      <h1 className='text-4xl m-7'>My Applications</h1>
      <div className='bg-white mx-7 mt-10 px-10 py-10 rounded-xl'>
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
                      <div className='badge badge-accent mt-2 badge-sm p-2'>
                        Accepted
                      </div>
                    </div>
                  </div>
                </td>
                <td className='w-[350px]'>
                  <p className='text-red-600 '>Full Time</p>
                  <p>Yearly Salary, Germany</p>
                </td>
                <td className='w-[300px]'>20-11-2024</td>
                <th>
                  <button
                    className='btn btn-ghost btn-xs text-2xl'
                    title='Details'
                    onClick={() =>
                      document.getElementById('my_modal_5').showModal()
                    }
                  >
                    <FcViewDetails />
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
          <dialog id='my_modal_5' className='modal'>
            <div className='modal-box'>
              <form method='dialog'>
                {/* if there is a button in form, it will close the modal */}
                <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
                  ✕
                </button>
              </form>
              <ApplicationStatus />
            </div>
          </dialog>
        </div>
      </div>
    </section>
  )
}

export default MyApplication
