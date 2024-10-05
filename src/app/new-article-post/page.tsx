import React from 'react'

const NewArticlePost = () => {
  return (
    <div>
      <p>Share an article</p>
      <form className="mb-4 text-center">
        <div>
          <button className=" w-full rounded-lg border border-white p-2">
            Article Link
          </button>
        </div>
        <div className="flex items-center justify-center">
          <textarea
            className="custom-placeholder mt-4 rounded-2xl border border-white  p-2 placeholder:text-center"
            placeholder="Comment here"
            rows={6}
            cols={60}
          ></textarea>
        </div>

        <div>
          <button className="mt-4 rounded-lg border border-white p-1">
            Submit post to feed!
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewArticlePost
