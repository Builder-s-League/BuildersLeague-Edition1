// src/schemas/notesSchema.ts

import { z } from 'zod'

// Reuse NoteContentSchema

// NotesSchema can be extended or modified as needed
export const NotesSchema = z.object({
  id: z.string().uuid(),

  topic_id: z.string().min(1),
  employee_id: z.string().min(1),
  note: z.string().min(1),
  note_content: z.string().min(1),
  is_public: z.boolean(),
  is_approved_cbh: z.boolean(),
})

export type Note = z.infer<typeof NotesSchema>
