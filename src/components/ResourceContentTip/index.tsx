'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'

interface TooltipProps {
  contentRef: React.RefObject<HTMLDivElement>
}

export default function ResourceContentTooltip({ contentRef }: TooltipProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [selectedText, setSelectedText] = useState('')

  const tooltipRef = useRef<HTMLDivElement>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedText)
    alert('Copied to clipboard!')
  }

  const handleTextSelection = useCallback(
    (event: MouseEvent) => {
      const selection = window.getSelection()
      const text = selection ? selection.toString() : ''
      if (
        text.length > 0 &&
        selection &&
        contentRef.current &&
        contentRef.current.contains(selection.anchorNode)
      ) {
        const range = selection.getRangeAt(0).getBoundingClientRect()
        const tooltipWidth = tooltipRef.current
          ? tooltipRef.current.offsetWidth
          : 0

        // Calculate the left position with boundary checks
        console.log('range', range)
        console.log('window.scrollX', window.scrollX)
        console.log('range.width', range.width)
        console.log('tooltipWidth', tooltipWidth)
        console.log('viewportWidth', window.innerWidth)
        let leftPos = range.left + window.scrollX + range.width - tooltipWidth

        // Ensure the tooltip stays within the viewport
        const viewportWidth = window.innerWidth
        console.log(viewportWidth)
        console.log(leftPos + tooltipWidth > viewportWidth)
        console.log(leftPos + tooltipWidth)

        if (leftPos + tooltipWidth > viewportWidth) {
          leftPos = viewportWidth - tooltipWidth - 80 // 10px padding from the right edge
        }
        if (leftPos < 10) {
          // Ensure it doesn't go off the left edge
          leftPos = 10
        }

        setSelectedText(text)
        setTooltipPosition({
          top: range.top + window.scrollY - 80, // Adjust the offset
          left: leftPos,
        })
        setTooltipVisible(true)
      } else {
        setTooltipVisible(false)
      }
    },
    [contentRef],
  )

  useEffect(() => {
    document.addEventListener('mouseup', handleTextSelection)
    return () => {
      document.removeEventListener('mouseup', handleTextSelection)
    }
  }, [contentRef, handleTextSelection])

  return (
    <div>
      {tooltipVisible && (
        <div
          ref={tooltipRef}
          style={{
            position: 'absolute',
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            borderRadius: '5px',
            padding: '10px',
            zIndex: 1000,
          }}
          className="flex flex-wrap gap-2 border border-gray-800 bg-background"
        >
          <Button variant="outline" className="mr-2" size="sm">
            Highlight
          </Button>
          <Button variant="outline" className="mr-2" size="sm">
            Make a Note
          </Button>
          <Button onClick={handleCopy} size="sm">
            Copy
          </Button>
        </div>
      )}
    </div>
  )
}
