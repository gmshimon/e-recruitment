/* eslint-disable no-irregular-whitespace */
import { CiClock2 } from 'react-icons/ci'
import { IoBagHandleOutline } from 'react-icons/io5'
import CompanyDetails from '../../Component/CompanyDetails/CompanyDetails'
import ApplicationJob from '../../Component/ApplicationJob/ApplicationJob'

const ApplyJob = () => {
  return (
    <section className='pt-20 md:px-0 px-2'>
      <div className='mt-8'>
        <div className='flex justify-center mb-5'>
          <img
            className='rounded-md'
            src='https://jthemes.com/themes/wp/jobbox/wp-content/uploads/2023/02/job-single.svg'
            alt=''
          />
        </div>
        <h1 className='text-3xl font-semibold md:ml-24'>Full Stack Engineer</h1>
        <div className='flex md:ml-24 mt-2'>
          <div className='flex items-center text-gray-600'>
            <IoBagHandleOutline />
            <p className='ml-1'>Full Time</p>
          </div>
          <div className='flex items-center text-gray-600 ml-5'>
            <CiClock2 />
            <p className='ml-1'>Posted 2 years ago</p>
          </div>
        </div>
        <div className='my-5 mx-24'>
          <hr />
        </div>
        <div className='md:flex justify-around max-w-full'>
          <div className='md:w-[700px] ml-15'>
            <div>
              <h1 className='text-3xl font-semibold'>
                Welcome to Jthemes Team
              </h1>
              <p className='mt-5 text-justify text-lg'>
                The AliStudio Design team has a vision to establish a trusted
                platform that enables productive and healthy enterprises in a
                world of digital and remote everything, constantly changing work
                patterns and norms, and the need for organizational resiliency.
                The ideal candidate will have strong creative skills and a
                portfolio of work which demonstrates their passion for
                illustrative design and typography. This candidate will have
                experiences in working with numerous different design platforms
                such as digital and print forms.
              </p>
            </div>
            <div className='mt-5'>
              <h1 className='text-3xl font-semibold'>
                Welcome to Jthemes Team
              </h1>
              <ul className='list-disc ml-5 space-y-1 mt-5 text-lg'>
                <li>
                  A portfolio demonstrating well thought through and polished
                  end to end customer journeys
                </li>
                <li>
                  5+ years of industry experience in interactive design and / or
                  visual design
                </li>
                <li>Excellent interpersonal skills</li>
                <li>
                  Aware of trends in mobile, communications, and collaboration
                </li>
                <li>
                  Ability to create highly polished design prototypes, mockups,
                  and other communication artifacts
                </li>
                <li>
                  The ability to scope and estimate efforts accurately and
                  prioritize tasks and goals independently
                </li>
                <li>History of impacting shipping products with your work</li>
                <li>
                  A Bachelor’s Degree in Design (or related field) or equivalent
                  professional experience
                </li>
                <li>
                  Proficiency in a variety of design tools such as Figma,
                  Photoshop, Illustrator, and Sketch
                </li>
              </ul>
            </div>
            <div className='mt-5'>
              <h1 className='text-3xl font-semibold'>Preferred Experience</h1>
              <ul className='list-disc ml-5 space-y-1 mt-5 text-lg'>
                <li>
                  Designing user experiences for enterprise software / services
                </li>
                <li>
                  Designing user experiences for enterprise software / services
                </li>
                <li>
                  Aligning or influencing design thinking with teams working in
                  other geographies
                </li>
              </ul>
            </div>
            <div className='my-5'>
              <hr />
            </div>
            <div className='mb-5'>
              <button
                className='btn btn-primary w-[100px] text-lg'
                onClick={() =>
                  document.getElementById('my_modal_3').showModal()
                }
              >
                Apply
              </button>
            </div>
            {/* modal for job application */}
            <dialog id='my_modal_3' className='modal'>
              <div className='modal-box w-11/12 max-w-xl'>
                <form method='dialog'>
                  {/* if there is a button in form, it will close the modal */}
                  <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
                    ✕
                  </button>
                </form>
                <ApplicationJob />
              </div>
            </dialog>
          </div>
          <div className='mt-2 '>
            <CompanyDetails />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApplyJob
