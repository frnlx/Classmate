// Bold 28px
// phosphoricons.com?weight=bold&size=28&color=000000
// COPY AS RAW SVG
// Don't forget to change `-

import { HTMLProps } from "react"

const className = 'fill-slate-500'
const size = 28

export function NavbarDashboardIcon() {
  // house-simple
  return (
    <svg className={className} width={size} height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none" />
      <path d="M133.38,34.08a8,8,0,0,0-10.77,0l-80,75.54A8,8,0,0,0,40,115.54V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V115.54a8,8,0,0,0-2.62-5.92Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
    </svg>
  )
}

export function NavbarTasksIcon() {
  // checks
  return (
    <svg className={className} width={size} height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none" />
      <polyline points="16 130.29 54.4 168 144 80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <polyline points="134.11 152 150.4 168 240 80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
    </svg>
  )
}

export function NavbarStatisticsIcon() {
  // trophy
  return (
    <svg className={className} width={size} height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none" />
      <line x1="96" y1="224" x2="160" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <line x1="128" y1="184" x2="128" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <path d="M58,128H48A32,32,0,0,1,16,96V80a8,8,0,0,1,8-8H56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <path d="M198,128h10a32,32,0,0,0,32-32V80a8,8,0,0,0-8-8H200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <path d="M64,48H192a8,8,0,0,1,8,8v55.1c0,39.7-31.75,72.6-71.45,72.9A72,72,0,0,1,56,112V56A8,8,0,0,1,64,48Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
    </svg>
  )
}

export function NavbarClassListIcon() {
  return (
    <svg className={className} width={size} height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none" />
      <rect x="28" y="84" width="160" height="128" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <path d="M64,44H220a8,8,0,0,1,8,8V176" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
    </svg>
    
  )
}

export function NavbarAddClassIcon() {
  return (
    <svg className={ className } width={ size } height={ size }
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" />
      <line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
    </svg>

  )
}


