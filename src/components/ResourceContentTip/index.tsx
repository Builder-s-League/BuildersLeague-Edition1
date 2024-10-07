'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function ResourceContentTooltip({
  contentRef,
  setActivateNoteArea,
}: {
  contentRef: React.RefObject<HTMLDivElement>
  setActivateNoteArea: any
}) {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [selectedText, setSelectedText] = useState('')

  const tooltipRef = useRef<HTMLDivElement>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedText)
    alert('Copied to clipboard!')
  }
  useEffect(() => {
    if (selectedText != '') {
      localStorage.setItem('highlightPosition', JSON.stringify(tooltipPosition))
    } else {
      localStorage.setItem(
        'highlightPosition',
        JSON.stringify({ top: 0, left: 0 }),
      )
      setActivateNoteArea((prev: any) => prev + 1)
    }
  }, [tooltipPosition])
  useEffect(() => {
    // if (tooltipVisible == false) {
    localStorage.setItem(
      'highlightPosition',
      JSON.stringify({ top: 0, left: 0 }),
    )
    // }
  }, [tooltipVisible])

  useEffect(() => {}, [selectedText])
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
          : 200

        // Calculate the left position with boundary checks
        let leftPos = range.left + window.scrollX + range.width - tooltipWidth

        // Ensure the tooltip stays within the viewport
        const viewportWidth = window.innerWidth

        // If the tooltip goes off the right edge, adjust the position

        let extra = viewportWidth - (leftPos + tooltipWidth)

        if (viewportWidth - (leftPos + tooltipWidth) < 100) {
          leftPos = leftPos - tooltipWidth + extra
        }
        if (leftPos < 10) {
          // Ensure it doesn't go off the left edge
          leftPos = 10
        }

        setSelectedText(text)
        setTooltipPosition({
          top: range.top + window.scrollY - 70, // Adjust the offset
          left: leftPos,
        })
        setTooltipVisible(true)
      } else {
        setTooltipVisible(false)
        localStorage.setItem(
          'highlightPosition',
          JSON.stringify({ top: 0, left: 0 }),
        )
        if (selectedText != '') {
          setActivateNoteArea((prev: any) => prev + 1)
        }
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

            zIndex: 1000,
          }}
          className="flex flex-wrap border   bg-background p-2"
        >
          <Button variant={'outlineNone'} className="mr-2" size="sm">
            Highlight
          </Button>
          <Separator className="h-10" orientation="vertical" />
          <Button
            variant={'outlineNone'}
            className="mr-2"
            size="sm"
            onClick={() => setActivateNoteArea((prev: number) => prev + 1)}
          >
            Make a Note
          </Button>
          <Separator className="h-10" orientation="vertical" />
          <Button variant={'outlineNone'} onClick={handleCopy} size="sm">
            Copy
          </Button>
        </div>
      )}
    </div>
  )
}
