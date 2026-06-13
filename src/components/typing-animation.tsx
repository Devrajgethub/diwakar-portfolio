'use client'

import { useState, useEffect } from 'react'

interface TypingAnimationProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  delayBetween?: number
}

export default function TypingAnimation({
  texts,
  speed = 80,
  deleteSpeed = 40,
  delayBetween = 2000,
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentText.substring(0, displayText.length + 1))

          if (displayText.length === currentText.length) {
            setTimeout(() => setIsDeleting(true), delayBetween)
          }
        } else {
          setDisplayText(currentText.substring(0, displayText.length - 1))

          if (displayText.length === 0) {
            setIsDeleting(false)
            setTextIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, textIndex, texts, speed, deleteSpeed, delayBetween])

  return (
    <span className="typing-cursor">
      {displayText}
    </span>
  )
}
