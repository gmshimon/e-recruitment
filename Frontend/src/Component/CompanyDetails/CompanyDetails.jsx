import { CiClock2, CiLocationOn } from 'react-icons/ci'
import mapImg from '../../assets/images/map.png'
import { IoBagHandleOutline } from 'react-icons/io5'
const CompanyDetails = () => {
  const array =["1","2","3","4","5","6"]
  return (
    <section className='w-6/7'>
      <div className=' border-2 rounded-lg'>
        <div className='flex pt-5 pl-5'>
          <div>
            <img
              src='https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2022/09/recruiter-5.svg'
              alt=''
            />
          </div>
          <div className='ml-3'>
            <h1 className='text-xl font-semibold'>Exela Movers</h1>
            <div className='flex items-center text-sm text-gray-600'>
              <CiLocationOn /> <span className='ml-1'>Denmark</span>
            </div>
          </div>
        </div>
        <div className='my-5 px-5'>
          <hr />
        </div>
        <div className='pb-3'>
          <div className='flex justify-center'>
            <img src={mapImg} className='w-[400px] h-[180px]' alt='' />
          </div>
          <ul className='list-disc ml-7 text-gray-600 mt-7 px-2'>
            <li>205 North Michigan Avenue, Suite 810 Chicago, 60601, USA</li>
            <li>Phone : (123) 456-7890</li>
            <li>Email : contact@Evara.com</li>
          </ul>
        </div>
      </div>
      <div className='border-2 rounded-lg h-[500px] mt-10 overflow-y-auto'>
        <h1 className='text-xl font-semibold pt-5 pl-5'>Similar Jobs</h1>
        <div className='my-5 px-5'>
          <hr />
        </div>
        {/* similar jobs */}
        {
          array.map((item,index)=><div className='cursor-pointer' key={index}>
          <div className='flex px-5 hover:font-semibold'>
            <div>
              <img
                src='https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2022/09/recruiter-7.svg'
                alt=''
              />
            </div>
            <div className='ml-5'>
              <h2 className='card-title hover:text-blue-700'>Software Engineer</h2>
              <div className='flex text-sm my-1'>
                <div className='flex items-center text-gray-600'>
                  <IoBagHandleOutline />
                  <p className='ml-1'>Full Time</p>
                </div>
                <div className='flex items-center text-gray-600 ml-10'>
                  <CiClock2 />
                  <p className='ml-1'>Posted 2 years ago</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-end items-center pr-8 text-sm text-gray-600 mb-2'>
            <CiLocationOn /> <span className='ml-2'>Denmark</span>
          </div>
          <div className='my-3 px-5'>
            <hr />
          </div>
        </div>)
        }
      </div>
    </section>
  )
}

export default CompanyDetails
