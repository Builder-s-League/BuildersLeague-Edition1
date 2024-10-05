import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'
import './page.style.css'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const { data: notes } = await supabase.from('notes').select()

  return (
    <>
      <div className="firstContainer">
        <div className="show">
          <p>Show...</p>
        </div>
        <div className="checkboxes">
          <label>
            <input type="checkbox" name="publicNote" />
            Public
          </label>
          <label>
            <input type="checkbox" name="privateNote" />
            Private Note
          </label>
          <label>
            <input type="checkbox" name="articles" />
            Articles
          </label>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search bar" />
        </div>

        {/* First note */}
        <div className="note">
          <p>I love it...</p>
          <div className="topic">
            <p>Topic 1, Item 2 --- </p>
          </div>
          <div className="edit-buttons">
            <button>Edit & Sharing</button>
            <div className="icon-section">
              <p>1</p>
              <p>❤️</p>
              <p>1</p>
              <p>👁️</p>
            </div>
          </div>
        </div>

        {/* Editing Note */}
        <div className="note">
          <p>I love it...</p>
          <div className="topic">
            <textarea>
              &quot;Lorem ipsum, this is the quote efiwojfweoifjwe
              feiwojfwe&quot;
            </textarea>
            <p>Topic 1, Item 2 ---</p>
          </div>
          <div className="edit-buttons">
            <button>Cancel Edit</button>
          </div>
        </div>

        {/* Take Comments Section */}
        <div className="note">
          <textarea>Take Comments</textarea>
          <div className="actions">
            <button>Save</button>
            <button>Delete Note</button>
            <label>
              <input type="checkbox" checked /> Hide my name
            </label>
            <button>Post to Public</button>
          </div>
        </div>

        {/* Article section */}
        <div className="note">
          <p>I love this article...</p>
          <p className="topic">Article link</p>
          <div className="edit-buttons">
            <button>Edit & Sharing</button>
            <div className="icon-section">
              <p>1</p>
              <p>❤️</p>
              <p>1</p>
              <p>👁️</p>
            </div>
          </div>
        </div>

        {/* Article under review */}
        <div className="note">
          <p>I love this article...</p>
          <div className="topic">Article link</div>
          <div className="edit-buttons">
            <button>Edit</button>
            <span>Under review</span>
          </div>
        </div>

        {/*Footer section*/}
        <footer>
          <button>F</button>
          <button>C</button>
          <button>N</button>
          <button>P</button>
        </footer>
      </div>
    </>
  )
}
