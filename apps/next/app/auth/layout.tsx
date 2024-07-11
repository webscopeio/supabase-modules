import Link from "next/link"
import { Undo2Icon } from "lucide-react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6 [&>div]:mx-auto [&>div]:max-w-md">
      {children}
      <footer>
        <Link href="/" className="mx-auto flex w-fit items-center text-sm">
          Home <Undo2Icon className="ml-1 inline size-4" />
        </Link>
      </footer>
    </div>
  )
}
