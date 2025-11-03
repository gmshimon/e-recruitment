import { IoIosContact } from 'react-icons/io'
import { IoLocationOutline } from 'react-icons/io5'
import { MdOutlineMailOutline } from 'react-icons/md'
import { HiOutlineClock } from 'react-icons/hi'

const ContactForm = () => {
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 text-white'>
      <div className='mx-auto flex max-w-6xl flex-col gap-12 px-4 md:px-8'>
        <header className='max-w-3xl space-y-5'>
          <span className='inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-sm font-medium uppercase tracking-wide text-sky-200'>
            We are here for you
          </span>
          <h1 className='text-3xl font-semibold leading-tight text-white md:text-4xl'>
            Let’s start the conversation.
          </h1>
          <p className='text-base text-slate-300 md:text-lg'>
            Whether you have questions about our platform, need support, or just
            want to say hello, our team is ready to help. Tell us a little about
            how we can assist and we’ll get back to you shortly.
          </p>
        </header>

        <div className='grid gap-10 lg:grid-cols-[1.1fr_minmax(0,1.2fr)]'>
          <div className='space-y-6'>
            <div className='rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur'>
              <div className='flex items-start gap-4'>
                <span className='rounded-full bg-sky-500/10 p-3 text-3xl text-sky-300'>
                  <IoLocationOutline aria-hidden='true' />
                </span>
                <div>
                  <h2 className='text-lg font-semibold text-white'>
                    Visit our office
                  </h2>
                  <p className='mt-2 text-sm text-slate-300'>
                    1012 Pebda Parkway, Mirpur 2
                    <br />
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            <div className='rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur'>
              <div className='flex items-start gap-4'>
                <span className='rounded-full bg-sky-500/10 p-3 text-3xl text-sky-300'>
                  <IoIosContact aria-hidden='true' />
                </span>
                <div>
                  <h2 className='text-lg font-semibold text-white'>
                    Call our team
                  </h2>
                  <p className='mt-2 text-sm text-slate-300'>
                    We’re available Monday to Friday, 9am – 6pm.
                  </p>
                  <a
                    href='tel:3108415500'
                    className='mt-3 inline-flex items-center text-base font-semibold text-sky-200 hover:text-sky-100'
                  >
                    310.841.5500
                  </a>
                </div>
              </div>
            </div>

            <div className='rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur'>
              <div className='flex items-start gap-4'>
                <span className='rounded-full bg-sky-500/10 p-3 text-3xl text-sky-300'>
                  <MdOutlineMailOutline aria-hidden='true' />
                </span>
                <div>
                  <h2 className='text-lg font-semibold text-white'>
                    Email support
                  </h2>
                  <p className='mt-2 text-sm text-slate-300'>
                    Drop us a message anytime. We typically respond within one
                    business day.
                  </p>
                  <a
                    href='mailto:example99@gmail.com'
                    className='mt-3 inline-flex items-center text-base font-semibold text-sky-200 hover:text-sky-100'
                  >
                    example99@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className='rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur'>
              <div className='flex items-start gap-4'>
                <span className='rounded-full bg-sky-500/10 p-3 text-3xl text-sky-300'>
                  <HiOutlineClock aria-hidden='true' />
                </span>
                <div>
                  <h2 className='text-lg font-semibold text-white'>
                    Office hours
                  </h2>
                  <p className='mt-2 text-sm text-slate-300'>
                    Sunday – Thursday: 9:00 AM – 6:00 PM
                    <br />
                    Friday – Saturday: On call
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='rounded-3xl border border-white/10 bg-white p-8 shadow-xl'>
            <h2 className='text-2xl font-semibold text-slate-900'>
              Send us a message
            </h2>
            <p className='mt-2 text-sm text-slate-500'>
              We’ll follow up with you within one business day. Fields marked *
              are required.
            </p>
            <form className='mt-8 space-y-6'>
              <div className='grid gap-6 md:grid-cols-2'>
                <label className='flex flex-col gap-2'>
                  <span className='text-sm font-semibold text-slate-600'>
                    Your name *
                  </span>
                  <input
                    type='text'
                    name='name'
                    placeholder='Jane Doe'
                    required
                    className='input input-bordered w-full'
                  />
                </label>
                <label className='flex flex-col gap-2'>
                  <span className='text-sm font-semibold text-slate-600'>
                    Email address *
                  </span>
                  <input
                    type='email'
                    name='email'
                    placeholder='you@example.com'
                    required
                    className='input input-bordered w-full'
                  />
                </label>
              </div>
              <label className='flex flex-col gap-2'>
                <span className='text-sm font-semibold text-slate-600'>
                  Subject
                </span>
                <input
                  type='text'
                  name='subject'
                  placeholder='How can we help?'
                  className='input input-bordered w-full'
                />
              </label>
              <label className='flex flex-col gap-2'>
                <span className='text-sm font-semibold text-slate-600'>
                  Message *
                </span>
                <textarea
                  name='message'
                  rows='5'
                  required
                  placeholder='Share the details of your request...'
                  className='textarea textarea-bordered min-h-[140px]'
                />
              </label>
              <div className='flex flex-wrap items-center justify-between gap-4'>
                <p className='text-xs text-slate-400'>
                  By submitting this form you agree to our friendly privacy
                  policy.
                </p>
                <button
                  type='submit'
                  className='btn btn-primary rounded-full px-8 text-sm uppercase tracking-wide'
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
