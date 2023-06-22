import { ReactNode } from "react"
import Link from 'next/link'
import { Route } from "next"


type prop = {
  children: ReactNode
  nextjs?: boolean
  href?: string
  xs?: boolean
  plain?: boolean
}

function Button(prop: prop) {

  const padding = `${prop.xs ? 'px-3' : 'px-4'} py-[0.4rem]`
  const fontSize = `${prop.xs ? 'text-xs' : 'text-sm'}`

  if (prop.nextjs) return (
    <Link
      href={ prop.href as Route }
      className={ `block
      ${padding}
      ${prop.plain ?
          'font-medium bg-none text-slate-300' + ' ' + 'hover:bg-slate-400/10 hover:text-slate-100'
          :
          'bg-slate-100 text-slate-950' + ' ' + 'hover:shadow-slate-200/20 hover:bg-slate-50 hover:shadow-lg hover:text-slate-600'
        } rounded-md
      ${fontSize} font-semibold no-underline
      flex flex-row items-center
      transition-all duration-75`
      }
    >
      { prop.children }
    </Link>
  )
  else return (
    <button type="button" className="">
      { prop.children }
    </button>
  )
}

export default Button