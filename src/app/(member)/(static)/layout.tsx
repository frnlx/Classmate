import { LayoutProps } from "@/types/next";

export default async function StaticAppPageLayout({
  children,
  params,
}: LayoutProps) {
  return <div className="p-16 w-full">{children}</div>;
}
// https://nextjs.org/docs/app/api-reference/file-conventions/layout
