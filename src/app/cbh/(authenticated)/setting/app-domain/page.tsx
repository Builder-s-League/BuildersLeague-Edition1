const PageDomain = () => {
  return (
    <div className=" mt-[10rem] flex flex-col items-center gap-y-6">
      <h2 className="text-3xl">App Domain Change</h2>
      <input
        placeholder="Enter new Doamin"
        className="w-[30rem] border-2 border-white placeholder:pl-3"
      ></input>
      <button className="w-20 border-2 border-white">Submit</button>
    </div>
  )
}

export default PageDomain
