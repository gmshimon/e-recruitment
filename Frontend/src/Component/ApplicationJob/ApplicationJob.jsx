const ApplicationJob = () => {
    return (
      <section>
        <div className='flex justify-center'>
          <h1 className='mb-5 w-[250px] text-center bg-blue-200 text-xl text-blue-800 rounded-md py-1 font-bold'>
            Exela Movers
          </h1>
        </div>
        <h1 className='text-3xl font-semibold text-center'>
          Start Your Career Today
        </h1>
        <p className='text-center text-gray-400'>
          Please fill up the information for application
        </p>
        <div className='flex justify-center mt-10'>
          {/* Updated table class */}
          <table className='w-full border-separate border-spacing-y-4'>
            <tbody>
              <tr>
                <th className='text-left'>
                  Full name <span className='text-red-600'>*</span>
                </th>
                <td>
                  <input
                    type='text'
                    className='border-2 border-gray-400 p-2 w-full rounded-md'
                    required
                  />
                </td>
              </tr>
              <tr>
                <th className='text-left'>Email</th>
                <td>
                  <input
                    type='text'
                    className='border-2 border-gray-400 p-2 w-full rounded-md'
                    value='simon.rosedale99@gmail.com'
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <th className='text-left'>
                  Phone <span className='text-red-600'>*</span>
                </th>
                <td>
                  <input
                    type='text'
                    className='border-2 border-gray-400 p-2 w-full rounded-md'
                    required
                  />
                </td>
              </tr>
              <tr>
                <th className='text-left'>Cover</th>
                <td>
                  <textarea
                    className='textarea-lg w-full border-2 border-gray-400 rounded-md h-[150px]'
                    placeholder='Cover Letter'
                  ></textarea>
                </td>
              </tr>
              <tr>
                <th className='text-left'>
                  Resume <span className='text-red-600'>*</span>
                </th>
                <td>
                  <div className='flex items-center mb-2'>
                    <input
                      type='radio'
                      name='radio-1'
                      className='radio mr-5'
                      defaultChecked
                    />
                    <a
                      target='_blank'
                      href='https://drive.google.com/file/d/1sk41FqOHfukzOpBrtQX_4Rk5u51esCq1/view?usp=drive_link'
                    >
                      resume.pdf
                    </a>
                  </div>
                  <div className='flex items-center mb-2'>
                    <input
                      type='radio'
                      name='radio-1'
                      className='radio mr-5'
                      defaultChecked
                    />
                    <a
                      target='_blank'
                      href='https://drive.google.com/file/d/1sk41FqOHfukzOpBrtQX_4Rk5u51esCq1/view?usp=drive_link'
                    >
                      resume.pdf
                    </a>
                  </div>
                  <div className='flex items-center'>
                    <input
                      type='radio'
                      name='radio-1'
                      className='radio mr-5'
                      defaultChecked
                    />
                    <a
                      target='_blank'
                      href='https://drive.google.com/file/d/1sk41FqOHfukzOpBrtQX_4Rk5u51esCq1/view?usp=drive_link'
                    >
                      resume.pdf
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <th className='text-left'></th>
                <td>
                  <button className='btn btn-primary w-[100px] text-lg'>
                    Submit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  };
  
  export default ApplicationJob;
  