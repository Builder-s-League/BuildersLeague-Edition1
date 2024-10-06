import Modal from '@/components/Overlay/Modal'

const ImagePreviewModal: React.FC<{
  onReset: () => void
  onConfirm: () => void
  imageURL: string | null
}> = ({ onReset, imageURL, onConfirm }) => {
  return (
    <Modal
      reset={onReset}
      modal="w-[50%] h-[70%] mt-20 grid place-content-center gap-6"
    >
      <h2 className="translate text-4xl font-medium text-slate-950">
        Photo Preview
      </h2>
      {imageURL && (
        <img
          src={imageURL}
          alt="Uploaded"
          className="mx-auto h-[10rem] w-[10rem] rounded-full object-cover"
        />
      )}
      <div className="mx-auto flex gap-6">
        <button
          onClick={onConfirm}
          className="rounded-md bg-blue-500 px-2 py-1"
        >
          Confirm
        </button>
        <button onClick={onReset} className="rounded-md bg-slate-500 px-2 py-1">
          Cancel
        </button>
      </div>
    </Modal>
  )
}

export default ImagePreviewModal
