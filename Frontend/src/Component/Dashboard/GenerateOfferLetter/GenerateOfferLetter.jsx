import { useDispatch, useSelector } from 'react-redux'
import { PDFViewer, pdf } from '@react-pdf/renderer'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import SignatureCanvas from 'react-signature-canvas'
import { useEffect, useMemo, useRef, useState } from 'react'
import './GenerateOfferLetter.css'
import PreviewPDF from '../PreviewPDF/PreviewPDF'
import { MdPreview } from 'react-icons/md'
import { HiOutlineDocumentDownload, HiOutlineRefresh } from 'react-icons/hi'
import { RiInkBottleLine } from 'react-icons/ri'
import { FaCheckCircle } from 'react-icons/fa'
import {
  reset,
  uploadOfferLetter
} from '../../../Redux/Slices/applicationSlice'
import Swal from 'sweetalert2'

const modules = {
  toolbar: [
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image'],
    ['clean']
  ]
}

const GenerateOfferLetter = () => {
  const {
    singleApplication,
    uploadOfferLetterError,
    uploadOfferLetterSuccess
  } = useSelector(state => state.application)
  const sigCanvas = useRef({})
  const [value, setValue] = useState('')
  const [preview, setPreview] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [signature, setSignature] = useState('')
  const [sincerely, setSincerely] = useState()
  const [position, setPosition] = useState()
  const [email, setEmail] = useState()
  const [data, setData] = useState()
  const [isSaving, setIsSaving] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (uploadOfferLetterError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error deleting resume',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
    if (uploadOfferLetterSuccess) {
      setValue('')
      setPreview(false)
      setSignature(null)
      setSincerely(null)
      setPosition(null)
      setEmail(null)
      setIsSaving(false)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Offer letter uploaded successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(reset())
    }
  }, [dispatch, uploadOfferLetterError, uploadOfferLetterSuccess])

  const clear = () => sigCanvas.current.clear()

  const saveSignature = () => {
    if (!sigCanvas.current.isEmpty()) {
      const sig = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png')
      setSignature(sig)
    } else {
      console.log('Signature canvas is empty!')
    }
  }

  const handleSavePDF = async () => {
    if (!value || !sincerely || !position || !email) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing details',
        text: 'Please fill in all required fields before generating the offer letter.'
      })
      return
    }
    if (sigCanvas.current.isEmpty()) {
      Swal.fire({
        icon: 'warning',
        title: 'Signature required',
        text: 'Please add your signature before saving.'
      })
      return
    }

    setIsSaving(true)

    const data = {
      candidate: singleApplication?.candidate?.name,
      description: value,
      signature: sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'),
      sincerely,
      position,
      date: new Date().toLocaleDateString(),
      company: singleApplication?.company?.name,
      phone: singleApplication?.candidate?.phone,
      email
    }
    const blob = await pdf(<PreviewPDF data={data} />).toBlob()

    // const url = URL.createObjectURL(blob)
    // const a = document.createElement('a')
    // a.href = url
    // a.download = `${data?.candidate}_offer_letter.pdf`
    // a.click()
    // URL.revokeObjectURL(url)

    const formData = new FormData()
    formData.append('file', blob, `${data?.candidate}_offer_letter.pdf`)

    dispatch(uploadOfferLetter({ id: singleApplication?._id, data: formData }))
  }

  const handlePreviewPDF = () => {
    setPreview(true)
    const data = {
      candidate: singleApplication?.candidate?.name,
      description: value,
      signature: sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'),
      sincerely,
      position,
      date: new Date().toLocaleDateString(),
      company: singleApplication?.company?.name,
      phone: singleApplication?.candidate?.phone,
      email
    }
    setData(data)
  }

  const offerLetterLabel = useMemo(() => {
    const url = singleApplication?.offer_letter
    if (!url) return ''
    try {
      const parsed = new URL(url)
      const segments = parsed.pathname.split('/').filter(Boolean)
      return decodeURIComponent(segments[segments.length - 1] ?? 'Offer Letter')
    } catch (error) {
      return url.split('/').pop() ?? 'Offer Letter'
    }
  }, [singleApplication?.offer_letter])

  return (
    <section className='space-y-6'>
      <header className='rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-md'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-xs uppercase tracking-wider text-slate-300'>
              Offer Letter Composer
            </p>
            <h1 className='text-2xl font-semibold md:text-3xl'>
              {singleApplication?.candidate?.name ?? 'Candidate'}
            </h1>
            <p className='text-sm text-slate-300'>
              {singleApplication?.job?.title ?? 'Role not specified'} ·{' '}
              {singleApplication?.company?.name ?? 'Company'}
            </p>
          </div>
          {singleApplication?.offer_letter && (
            <a
              target='_blank'
              rel='noreferrer'
              href={singleApplication.offer_letter}
              className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20'
            >
              <HiOutlineDocumentDownload className='text-lg' />
              {offerLetterLabel}
            </a>
          )}
        </div>
      </header>

      <div className='grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'>
        <div className='space-y-6'>
          <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
            <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
              Sender Details
            </h2>
            <div className='mt-4 grid gap-4 md:grid-cols-2'>
              <label className='form-control'>
                <span className='label-text text-sm font-medium text-slate-600'>
                  Candidate
                </span>
                <input
                  value={singleApplication?.candidate?.name ?? ''}
                  disabled
                  className='input input-bordered bg-slate-100 text-slate-500'
                />
              </label>
              <label className='form-control'>
                <span className='label-text text-sm font-medium text-slate-600'>
                  Company email *
                </span>
                <input
                  value={email ?? ''}
                  onChange={e => setEmail(e.target.value)}
                  type='email'
                  placeholder='people@company.com'
                  className='input input-bordered'
                />
              </label>
              <label className='form-control'>
                <span className='label-text text-sm font-medium text-slate-600'>
                  Sincerely *
                </span>
                <input
                  value={sincerely ?? ''}
                  onChange={e => setSincerely(e.target.value)}
                  type='text'
                  placeholder='Your name'
                  className='input input-bordered'
                />
              </label>
              <label className='form-control'>
                <span className='label-text text-sm font-medium text-slate-600'>
                  Position *
                </span>
                <input
                  value={position ?? ''}
                  onChange={e => setPosition(e.target.value)}
                  type='text'
                  placeholder='Talent Acquisition Lead'
                  className='input input-bordered'
                />
              </label>
            </div>
          </div>

          <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
            <div className='flex items-center justify-between gap-3'>
              <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                Letter Body
              </h2>
              <span className='text-xs uppercase tracking-wide text-slate-400'>
                Build the offer copy below
              </span>
            </div>
            <div className='mt-4 rounded-2xl bg-slate-50 p-4'>
              <ReactQuill
                theme='snow'
                value={value}
                onChange={setValue}
                modules={modules}
                className='custom-quill'
              />
            </div>
          </div>

          <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
            <div className='flex items-center justify-between gap-3'>
              <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
                Signature
              </h2>
              <button
                type='button'
                className='btn btn-ghost btn-sm'
                onClick={() => {
                  clear()
                  setSignature(null)
                }}
              >
                <HiOutlineRefresh className='text-lg' />
                Clear canvas
              </button>
            </div>
            <p className='mt-2 text-sm text-slate-500'>
              Draw or upload your sign-off to embed it in the PDF.
            </p>
            <div className='mt-4 overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4'>
              <SignatureCanvas
                penColor='black'
                ref={sigCanvas}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className:
                    'w-full rounded-xl bg-white shadow-inner outline-none'
                }}
              />
            </div>
            <div className='mt-4 flex flex-wrap gap-3'>
              <button
                className='btn btn-outline btn-sm md:btn-md'
                onClick={clear}
                type='button'
              >
                Clear
              </button>
              <button
                className='btn btn-primary btn-sm md:btn-md'
                onClick={saveSignature}
                type='button'
              >
                <RiInkBottleLine className='text-lg' />
                Save signature
              </button>
              {signature && (
                <span className='inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700'>
                  <FaCheckCircle />
                  Saved
                </span>
              )}
            </div>
          </div>
        </div>

        <div className='space-y-6'>
          <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
            <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
              Summary
            </h2>
            <div className='mt-4 space-y-3 text-sm text-slate-600'>
              <p>
                <strong className='text-slate-900'>Candidate:</strong>{' '}
                {singleApplication?.candidate?.name ?? '—'}
              </p>
              <p>
                <strong className='text-slate-900'>Email:</strong>{' '}
                {email ?? '—'}
              </p>
              <p>
                <strong className='text-slate-900'>Signatory:</strong>{' '}
                {sincerely ?? '—'} {position ? `· ${position}` : ''}
              </p>
              <p>
                <strong className='text-slate-900'>Uploaded signature:</strong>{' '}
                {signature ? 'Yes' : 'No'}
              </p>
              <p>
                <strong className='text-slate-900'>Preview mode:</strong>{' '}
                {preview ? 'Viewing PDF' : 'Not yet previewed'}
              </p>
            </div>
          </div>

          <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
            <h2 className='text-sm font-semibold uppercase tracking-wide text-slate-500'>
              Actions
            </h2>
            <div className='mt-4 flex flex-col gap-3'>
              <button
                className='btn btn-outline btn-sm md:btn-md'
                onClick={handlePreviewPDF}
                type='button'
              >
                <MdPreview className='text-lg' />
                Preview PDF
              </button>
              <button
                className='btn btn-primary btn-sm md:btn-md'
                onClick={handleSavePDF}
                type='button'
                disabled={isSaving}
              >
                {isSaving ? (
                  <span className='flex items-center gap-2'>
                    <span className='loading loading-spinner loading-sm' />
                    Uploading...
                  </span>
                ) : (
                  <>
                    <HiOutlineDocumentDownload className='text-lg' />
                    Save & upload
                  </>
                )}
              </button>
            </div>
          </div>

          {preview && (
            <div className='rounded-2xl border border-slate-200 bg-white p-3 shadow-sm'>
              <PDFViewer width='100%' height='480'>
                <PreviewPDF data={data} />
              </PDFViewer>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default GenerateOfferLetter
