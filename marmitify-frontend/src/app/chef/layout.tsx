import { ReactNode } from "react"
import { Header } from "@/components/layout/header-logged"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  
  return (
    <html
      lang="pt-BR"
      className="scroll-smooth"
        >
      <body>
        {children}
      </body>
    </html>
  )
}