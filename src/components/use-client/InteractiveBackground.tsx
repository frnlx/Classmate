'use client'

import clsx from "clsx"
import { ReactNode, useEffect, useRef, useState } from "react"
import { pre } from "../lib/css"

export default function InteractiveBackground() {
  const bgref = useRef<HTMLDivElement | null>(null)
  const hovref = useRef<HTMLDivElement | null>(null)

  globalThis.document

  // const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  let mousePos = { x: 0, y: 0 }

  function mouseMoveEvent() {
    // console.log(`mousepos: ${e.clientX} ${e.clientY}`)

    const hoverRect = hovref.current?.getBoundingClientRect()
    // console.log(hoverRect)

    function setXY(x: number, y: number, rect: DOMRect) {
      hovref.current?.style.setProperty('left', (x - rect.width / 2) + 'px')
      hovref.current?.style.setProperty('top', (y - rect.height / 2) + 'px')
    }

    // console.log('pos', mousePos.x, mousePos.y)

    if (hoverRect) {
      const distX = hoverRect.x - mousePos.x
      const distY = hoverRect.y - mousePos.y

      const posX = hoverRect.x + hoverRect.width / 2
      const posY = hoverRect.y + hoverRect.height / 2
      // console.log(`pos: ${posX} ${posY}`)

      const dX = mousePos.x - posX
      const dY = mousePos.y - posY

      // console.log(`dist: ${dX} ${dY}`)

      setXY(posX + dX / 10, posY + dY / 10, hoverRect)
      // setXY(mousePos.x, mousePos.y, hoverRect)


      // hovref.current?.style.setProperty('left', (e.clientX - hoverRect.width / 2) + 'px')
      // hovref.current?.style.setProperty('top', (e.clientY - hoverRect.height / 2) + 'px')
      // hovref.current?.style.setProperty('left', (hoverRect.x + distX / 2 - hoverRect.width / 2) + 'px')
      // hovref.current?.style.setProperty('top', (hoverRect.y + distY / 2 - hoverRect.height / 2) + 'px')
    }



    // if (domrect) {
    //   hovref.current?.style.setProperty('top', e.clientX.toString())
    //   // ref.current?.style.setProperty('--x', (e.clientX - domrect.x).toString())
    //   // ref.current?.style.setProperty('--y', (e.clientY - domrect.y).toString())
    // }
  }

  useEffect(() => {

    const interval = setInterval(() => {
      mouseMoveEvent()
    }, 15)

    if (bgref) {
      document.addEventListener('mousemove', (e) => {
        // console.log('MouseMove', e.clientX, e.clientY)
        mousePos = { x: e.clientX, y: e.clientY }
      })
    }
    return () => {
      document.removeEventListener('mousemove', mouseMoveEvent)
      clearInterval(interval)
    }

  }, [bgref])

  return (
    <div className="blur-3xl fixed w-screen h-screen overflow-hidden top-0 left-0 bg-radialGreenGradient -z-10"
      ref={ bgref }
    >
      <div className={ clsx(
        "absolute",
        "w-[1000px] h-[1000px]",
        "-z-10",
        // "bg-white"
        "bg-radialGreenGradientTransparent"
        // "after:w-[100px] after:h-[100px] after:content-['_'] after:absolute",
        // "after:top-[calc(var(--y,_0)_*_1px_-_50px)]",
        // "after:left-[calc(var(--x,_0)_*_1px_-_50px)]",
        // "after:bg-white",
        // "after:bg-[radial-gradient(white,#3984ff00_80%)] after:opacity-0 ",
        // "after:transition-[opacity_0.2s] ater:outline-white"
      ) } ref={ hovref } />
    </div>
  )
}