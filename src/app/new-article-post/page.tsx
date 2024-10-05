import React from 'react'

const NewArticlePost = () => {
    return (
        <div>
        <p>Share an article</p>
        <form className='text-center mb-4'>
            <div>
            <input className='placeholder:text-center border-white rounded-lg border w-full p-2' placeholder='Article Link' type="text" />
            </div>
            <div className='flex items-center justify-center'>
             <textarea
             className='placeholder:text-center border-white rounded-2xl border mt-4  p-2 custom-placeholder'
             placeholder='Comment here'
            rows={6}
            cols={60}
             >
             </textarea>
            </div>


            <div>
            <button className='border-white rounded-lg border mt-4 p-1'>Submit post to feed!</button>
            </div> 

        </form>
        </div>
    )
}


export default NewArticlePost
