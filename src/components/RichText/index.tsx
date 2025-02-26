import React, { useEffect, useState } from 'react'

interface RichTextNode {
  type?: string
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  newTab?: boolean
  url?: string
  value?: {
    id?: string
    alt?: string
    url?: string
    title?: string
    [key: string]: any
  }
  children?: RichTextNode[]
}

interface RichTextRendererProps {
  content: RichTextNode[]
}

const renderTextWithFormatting = (node: RichTextNode, key: number) => {
  let textElement: React.ReactNode = node.text || ''

  if (node.bold) {
    textElement = <strong key={`bold-${key}`}>{textElement}</strong>
  }
  if (node.italic) {
    textElement = <em key={`italic-${key}`}>{textElement}</em>
  }
  if (node.underline) {
    textElement = <u key={`underline-${key}`}>{textElement}</u>
  }
  if (node.strikethrough) {
    textElement = <s key={`strike-${key}`}>{textElement}</s>
  }

  return <React.Fragment key={key}>{textElement}</React.Fragment>
}

const renderNode = (node: RichTextNode, key: number): React.ReactNode => {
  if (
    node.text !== undefined &&
    (!node.children || node.children.length === 0)
  ) {
    return renderTextWithFormatting(node, key)
  }

  const children = node.children?.map((child, i) =>
    renderNode(child, `${key}-${i}` as any),
  )
  switch (node.type) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6': {
      const Tag = node.type as keyof JSX.IntrinsicElements
      return (
        <Tag
          key={key}
          className="break-words text-xl sm:text-2xl md:text-3xl lg:text-4xl"
        >
          {children}
        </Tag>
      )
    }
    case 'link': {
      return (
        <a
          key={key}
          href={node.url}
          target={node.newTab ? '_blank' : '_self'}
          rel="noopener noreferrer"
          className="break-words text-blue-500 underline hover:text-blue-700"
        >
          {children}
        </a>
      )
    }
    case 'upload': {
      if (node.value && node.value.url) {
        return (
          <img
            key={key}
            src={node.value.url}
            alt={node.value.alt || ''}
            className="max-w-full"
          />
        )
      }
      return null
    }
    case 'relationship': {
      if (node.value && node.value.title) {
        return (
          <div key={key} className="break-words text-sm text-gray-600">
            Related: {node.value.title}
          </div>
        )
      }
      return null
    }
    default: {
      if (!node.type) {
        return (
          <p key={key} className="break-words text-base sm:text-lg md:text-xl">
            {children}
          </p>
        )
      }
      return (
        <div key={key} className="break-words">
          {children}
        </div>
      )
    }
  }
}
// Function to extract plain text with simple formatting for speech synthesis
const extractTextFromNode = (node: RichTextNode): string => {
  if (node.type === 'upload' && node.value?.alt) {
    // If the node is an image, return alt text for speech synthesis
    return `Image: ${node.value.alt}`
  }
  let textContent: string = node.text || ''

  // Handle any child nodes by recursively extracting their text
  if (node.children && node.children.length > 0) {
    textContent = node.children.map(extractTextFromNode).join(' ')
  }

  // If the node has any specific styling, like bold or italic, we can wrap it with text markers for better speech
  if (node.bold) textContent = `**${textContent}**`
  if (node.italic) textContent = `*${textContent}*`
  if (node.underline) textContent = `_${textContent}_`
  if (node.strikethrough) textContent = `~~${textContent}~~`

  return textContent
}
// Function to recursively extract plain text from all nodes in the content
const extractTextContent = (content: RichTextNode[]): string => {
  return content.map(extractTextFromNode).join(' ')
}
const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const handlePlayPause = () => {
    const textContent = extractTextContent(content) // Get the plain text content from the RichTextNode
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()

      setIsPlaying(true)
    } else if (isPlaying) {
      window.speechSynthesis.pause()
      setIsPlaying(false)
    } else {
      if (!textContent.trim()) {
        console.error('No content to speak') // Log if there's no text content to speak
        return
      }

      // Create a new utterance every time to ensure it plays fresh
      const newUtterance = new SpeechSynthesisUtterance(textContent)

      // Event when the speech ends
      newUtterance.onend = () => setIsPlaying(false)

      // Debugging: check if speech synthesis is available
      if ('speechSynthesis' in window) {
        console.log('Speech synthesis is supported and available')
        window.speechSynthesis.speak(newUtterance)
        setIsPlaying(true)
      } else {
        console.error('Speech synthesis is not supported in this browser')
      }
    }
  }

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  if (!content || !Array.isArray(content)) return null

  return (
    <div className="max-w-md p-10 md:max-w-max">
      <div className="mb-5 flex justify-center">
        <button
          onClick={handlePlayPause}
          className={`p-2 text-white ${isPlaying ? 'bg-red-500' : 'bg-green-500'} rounded`}
        >
          {isPlaying ? 'Pause' : 'Speak'}
        </button>
      </div>

      <AudioIcon playing={isPlaying} />
      {content.map((node, index) => renderNode(node, index))}
    </div>
  )
}
const AudioIcon = ({ playing }: { playing: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="absolute right-3 top-3 h-4 w-4 text-slate-500"
  >
    {playing ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
      />
    )}
  </svg>
)
export default RichTextRenderer
