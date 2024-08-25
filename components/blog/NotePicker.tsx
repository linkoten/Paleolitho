'use client'

import React, { useState } from 'react'
import Tiptap from '@/components/blog/TipTap'
import { v4 as uuidv4 } from 'uuid'
import { Input } from '../ui/input'
import { createPost } from '@/lib/actionsPost'

const Todo = () => {
  const [content, setContent] = useState<string>('')
  const handleContentChange = (reason: any) => {
    setContent(reason)
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const data = {
      id: uuidv4(),
      content: content,
    }
    const existingDataString = localStorage.getItem('myData')
    const existingData = existingDataString
      ? JSON.parse(existingDataString)
      : []
    const updatedData = [...existingData, data]
    localStorage.setItem('myData', JSON.stringify(updatedData))
    setContent('')
  }

  return (
    <form
action={createPost}      className="max-w-3xl w-full grid place-items-center mx-auto pt-10 mb-10"
    >

      <div className="text-3xl text-center text-sky-800 mb-10">
        Notes Picker
      </div>

      <Tiptap
        content={content}
        onChange={(newContent: string) => handleContentChange(newContent)}
      />
    </form>

  )
}

export default Todo