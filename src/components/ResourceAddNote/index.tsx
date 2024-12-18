import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Label } from '@/components/ui/label'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useEffect, useRef, useState } from 'react'
import { Note } from '@/schemas/notes'

export const ResourceAddNote = ({
  activateNoteArea,
}: {
  activateNoteArea: any
}) => {
  const [hide, setHide] = useState<boolean>(true)
  const [saveToNotes, setSaveToNotes] = useState<boolean>(false)
  const [saveToPublic, setSaveToPublic] = useState<boolean>(false)
  const [note, setNote] = useState<Note>({
    id: '',
    topic_id: '',
    employee_id: '',
    note: '',
    note_content: '',
    is_public: false,
    is_approved_cbh: false,
  })
  useUpdateNote(note)
  const [notePos, setNotepos] = useState({ top: 0, left: 0 })
  const NoteAreaRef = useRef<any>('')
  const [isVisible, setIsvisible] = useState(false)
  useEffect(() => {
    NoteAreaRef.current.focus()

    setNotepos(() => {
      let p = JSON.parse(localStorage.getItem('highlightPosition') || '')
      if (!p) return { top: 0, left: 0 }
      return p
    })
  }, [activateNoteArea])

  useEffect(() => {
    if (notePos.top == 0 && NoteAreaRef.current.focus != true) {
      setIsvisible(false)
    } else {
      setIsvisible(true)
    }
  }, [notePos])
  const handleNoteChange = (e: any) => {
    setNote((prev) => ({
      ...prev,
      note_content: e.target.value,
    }))
  }

  useEffect(() => {
    setNote((prev) => ({
      ...prev,
      is_public: saveToPublic,
    }))
  }, [saveToPublic])

  return (
    <div
      style={{
        position: 'absolute',
        top: notePos.top + 130,
        left: notePos.left,
        borderRadius: '5px',
        padding: '10px',
        zIndex: 1000,
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    >
      <div className="relative ">
        <div className="relative z-20 " id="card">
          <Card className="border-gold rounded-xl border bg-background">
            <CardHeader>
              <CardTitle className="font-thin">
                Write down your thought about
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea onChange={handleNoteChange} ref={NoteAreaRef} />
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center justify-between gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSaveToNotes((prev) => !prev)}
                >
                  Save to my note
                </Button>
                <div className="item-center flex gap-1">
                  <Checkbox
                    id="cb"
                    checked={hide}
                    onCheckedChange={() => setHide((prev) => !prev)}
                  />
                  <Label htmlFor="cb">hide my name</Label>
                </div>
                <Button
                  size="sm"
                  variant="roundedOutline"
                  onClick={() => setSaveToPublic((prev) => !prev)}
                >
                  Post to public
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

const useUpdateNote = (note: Note) => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    let timer: any
    timer = setTimeout(async () => {
      await updateDb()
    }, 300)

    return () => clearTimeout(timer)
  }, [note])

  async function updateDb() {
    try {
      setLoading(true)
      const response = await fetch('/api/note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      })
      const data = await response.json()
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
}
