import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

const fetchMediaFromSupabase = async (
  bucketName: string,
  filePath: string,
  mediaType: 'image' | 'video',
): Promise<string | null> => {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .download(filePath)

    if (error) {
      throw error
    }

    if (mediaType === 'image') {
      const reader = new FileReader()

      return new Promise((resolve) => {
        reader.onloadend = () => {
          const base64data = reader.result as string
          resolve(base64data)
        }

        reader.readAsDataURL(data)
      })
    } else if (mediaType === 'video') {
      // For videos, convert the blob to an object URL
      const videoUrl = URL.createObjectURL(data)
      return videoUrl
    }
  } catch (error) {
    console.error(`Error fetching ${mediaType} from Supabase:`, error)
    return null
  }

  return null
}

export default fetchMediaFromSupabase
