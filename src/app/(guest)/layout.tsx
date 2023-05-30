import { color } from "@/lib/logger/chalk"
import { LayoutProps } from "@/types/next"

export default function GuestPageLayout({ children, params }: LayoutProps) {
  color.yellow('  |-(guest) Layout Rendered')
  return (
    <>{children}</>
  )
}
// https://nextjs.org/docs/app/api-reference/file-conventions/layout