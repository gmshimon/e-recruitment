import { CiLocationOn } from 'react-icons/ci'
import mapImg from '../../assets/images/map.png'
const CompanyDetails = () => {
  return (
    <section className='w-5/6'>
      <div className='border rounded-lg'>
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
          <img src={mapImg} className='w-[350px] h-[170px]' alt='' />
          </div>
          <ul className='list-disc ml-7 text-gray-600 mt-7'>
            <li>205 North Michigan Avenue, Suite 810 Chicago, 60601, USA</li>
            <li>Phone : (123) 456-7890</li>
            <li>Email : contact@Evara.com</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default CompanyDetails
