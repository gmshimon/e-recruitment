import { FcViewDetails } from "react-icons/fc"

const MyApplication = () => {
  return (
    <section>
      <h1 className='text-4xl m-7'>My Applications</h1>
      <div className='bg-white mx-7 mt-10 px-10 rounded-xl'>
        <div className='overflow-x-auto'>
          <table className='table rounded-lg'>
            {/* head */}
            <thead className='bg-orange-600 text-black'>
              <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td>
                  <div className='flex items-center gap-3'>
                    <div>
                      <div className='font-bold'>Hart Hagerty</div>
                      <div className='text-sm opacity-50'>United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className='badge badge-ghost badge-sm'>
                    Desktop Support Technician
                  </span>
                </td>
                <td>Purple</td>
                <th>
                  <button className='btn btn-ghost btn-xs text-2xl'><FcViewDetails/></button>
                </th>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default MyApplication
