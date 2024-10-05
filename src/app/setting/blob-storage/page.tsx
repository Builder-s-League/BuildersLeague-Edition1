const Blob = () => {
  return (
    <div className="mt-[10rem]">
      <h2 className="mb-4 text-4xl">Blob Storage Settings</h2>
      <form className="flex flex-col gap-6">
        <input
          className="border-2 border-white placeholder:pl-3"
          placeholder="Enter storage URL"
          required
        />
        <button className="order-white border-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Blob
