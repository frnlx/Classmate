'use client'
import Script from 'next/script'

export default function EmojiParser() {
  return (
    <Script
      src="https://twemoji.maxcdn.com/v/latest/twemoji.min.js"
      crossOrigin="anonymous"
      onLoad={
        () => {
          //@ts-ignore
          twemoji.parse("🌈", {
            //@ts-ignore
            callback: (icon, options) => {
              console.log(icon)
            }
          })
        }
      }
    />
  )
}