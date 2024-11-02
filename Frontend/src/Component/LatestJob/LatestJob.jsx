import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { FaRegFileAlt, FaRegFolderOpen, FaSearchengin } from 'react-icons/fa'
import { GrCloudSoftware, GrPersonalComputer } from 'react-icons/gr'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { BsBank } from 'react-icons/bs'
import { IoBagHandleOutline } from 'react-icons/io5'
import { CiClock2, CiLocationOn } from 'react-icons/ci'

const LatestJob = () => {
  const tabs = [
    {
      id: 1,
      icon: <FaRegFileAlt />,
      name: 'content Writer',
      job: 3
    },
    {
      id: 2,
      icon: <TfiHeadphoneAlt />,
      name: 'Human Resource',
      job: 2
    },
    {
      id: 3,
      icon: <BsBank />,
      name: 'Finance',
      job: 1
    },
    {
      id: 4,
      icon: <GrPersonalComputer />,
      name: 'Management',
      job: 0
    },
    {
      id: 5,
      icon: <FaSearchengin />,
      name: 'Market Research',
      job: 1
    },
    {
      id: 6,
      icon: <FaRegFolderOpen />,
      name: 'Retail & Product',
      job: 0
    },
    {
      id: 7,
      icon: <MdProductionQuantityLimits />,
      name: 'Market & Sale',
      job: 0
    },
    {
      id: 8,
      icon: <GrCloudSoftware />,
      name: 'Software',
      job: 0
    }
  ]
  return (
    <section className='mt-14'>
      <h1 className='text-center text-3xl font-semibold'>Jobs of the day</h1>
      <p className='text-center text-gray-500 mt-2 mb-5'>
        Search and connect with the right candidates faster{' '}
      </p>
      <Tabs>
        <TabList className='grid md:grid-cols-8 grid-cols-3 md:space-x-4 border-b'>
          {tabs.map((tab, index) => (
            <Tab
              className='px-1 py-1 md:px-2 md:py-2 border-l border-r border-t rounded-md text-sm md:text-base w-full md:w-auto text-center cursor-pointer'
              key={index}
            >
              <p className='flex items-center justify-evenly'>
                <span className='text-blue-700'>{tab.icon}</span>
                {tab.name}
              </p>
            </Tab>
          ))}
        </TabList>
        {tabs.map((tab, index) => (
          <TabPanel key={index}>
            <div className='flex justify-center mt-10'>
              <div className='grid grid-cols-4 gap-x-10 gap-y-10'>
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className='border-2 border-inherit bg-base-100 w-80 rounded-md cursor-pointer hover:border-black hover:shadow-lg'
                  >
                    <h1 className='text-lg font-semibold px-2 my-2'>
                      Figma Designer{' '}
                    </h1>
                    <div className='flex justify-between px-3'>
                      <div className='flex items-center text-gray-600'>
                        <IoBagHandleOutline />
                        <p className='ml-2'>Full Time</p>
                      </div>
                      <div className='flex items-center text-gray-600'>
                        <CiClock2 />
                        <p className='ml-2'>Posted 2 years ago</p>
                      </div>
                    </div>
                    <div className='flex mt-4 pl-2'>
                      <div className='w-14 bg-gray-200 rounded-md text-center text-md mr-2 py-1'>
                        App
                      </div>
                      <div className='w-14 bg-gray-200 rounded-md text-center text-md mr-2 py-1'>
                        Figma
                      </div>
                      <div className='w-14 bg-gray-200 rounded-md text-center text-md mr-2 py-1'>
                        PSD
                      </div>
                    </div>
                    <div className='my-5 px-3'>
                      <hr />
                    </div>
                    <div className='flex items-center pl-2 text-gray-600 mb-2'>
                      <CiLocationOn /> <span className='ml-2'>Denmark</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </section>
  )
}

export default LatestJob
