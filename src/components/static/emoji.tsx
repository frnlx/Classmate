import clsx from "clsx"

export default function ClassroomEmoji(p: {
  text: string | number | readonly string[] | null | undefined
  size?: "large" | "base" | "small" | "smaller" | "larger"
}) {

  const size = p.size ?? "base"

  let parentcn = 'w-9 h-9 rounded-md'
  let childcn = 'text-4xl w-24 ml-[2px] '

  if (size === 'small') {
    parentcn = 'w-8 h-8 rounded-md'
    childcn = 'text-3xl w-24'
  } else if (size === 'smaller') {
    parentcn = 'w-6 h-6 rounded-md'
    childcn = 'text-2xl w-24'
  } else if (size === 'large') {
    parentcn = 'w-12 h-12 rounded-lg'
    childcn = 'text-5xl w-24 ml-[2px]'
  } else if (size === 'larger') {
    parentcn = 'w-12 h-12 rounded-lg'
    childcn = 'text-5xl w-24 ml-[2px]'
  }

  return (
    <>
      {
        p.text ? <div className={ clsx("relative flex items-center justify-center overflow-hidden drop-shadow-[0_0_8px_rgba(0,0,0,.6)]", parentcn) }>
          <div className={ clsx("text-center h-[1px] leading-[0px]", childcn) }>{ p.text }</div>
        </div> : null

      }
    </>
  )
}