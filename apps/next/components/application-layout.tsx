"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bookmark, PanelLeft } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ProfileDropdown } from "@/components/user/profile-dropdown"

export const ApplicationLayout: React.FC<
  React.PropsWithChildren<{
    userId?: string
    isAnonymousUser?: boolean
  }>
> = ({ children, userId, isAnonymousUser }) => {
  const pathname = usePathname()

  const paths = React.useMemo(() => {
    const segments = pathname.split("/").filter(Boolean)

    return segments.reduce<{ href: string; label: string }[]>(
      (acc, curr, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`
        const label =
          curr.charAt(0).toUpperCase() + curr.slice(1).replaceAll("-", " ")

        acc.push({ href, label })
        return acc
      },
      [{ href: "/", label: "Home" }]
    )
  }, [pathname])

  if (!userId) return children

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            href="/"
            className="group flex size-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg *:size-6 md:size-8 md:text-base"
          >
            <SupabaseModulesIcon />
            <span className="sr-only">Supabase Modules</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/bookmarks"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
              >
                <Bookmark className="size-5" />
                <span className="sr-only">Bookmarks</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Bookmarks</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="size-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <div className="group flex size-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg *:size-6 md:size-8 md:text-base">
                  <SupabaseModulesIcon />
                  <span className="sr-only">Supabase Modules</span>
                </div>
                <SheetClose asChild>
                  <Link
                    href="/bookmarks"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Bookmark className="size-5" />
                    Bookmarks
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              {paths.map(({ href, label }, index) => (
                <React.Fragment key={href}>
                  {index !== paths.length - 1 ? (
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={href}>{label}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem>
                      <span className="text-foreground">{label}</span>
                    </BreadcrumbItem>
                  )}
                  {index !== paths.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <ProfileDropdown userId={userId} isAnonymousUser={isAnonymousUser} />
        </header>
        <main className="px-6">{children}</main>
      </div>
    </div>
  )
}

const SupabaseModulesIcon: React.FC = () => {
  return (
    <svg
      className="transition-all group-hover:scale-110"
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M62.2789 69.2656C62.2789 69.2656 103.924 23.0312 103.383 22.1289C102.841 21.2265 86.3843 14.214 85.6023 14.0765C84.8203 13.9304 80.575 13.5781 80.2226 13.6554C79.8703 13.7242 74.2757 11.1976 74.2757 11.1976C74.2757 11.1976 74.3617 9.59919 73.7171 9.23825C73.0726 8.87732 62.064 3.75544 59.0734 3.6781C55.189 3.59216 8.97185 18.7515 7.59685 19.25C5.23357 20.1008 7.03826 26.3226 7.86326 31.7109C8.68826 37.0992 15.95 86.4531 17.6086 88.739C19.2672 91.025 50.1617 106.984 52.8601 106.984C53.3156 106.984 54.7765 107.207 55.3867 105.42C58.3859 96.5508 61.832 68.939 62.2789 69.2656Z"
        fill="#E0E0E0"
      />
      <path
        d="M10.725 21.8796C16.6117 20.3757 44.4812 11.2921 48.4515 9.90854C52.7054 8.43042 56.0054 6.96948 60.5 7.66558C61.9179 7.88042 65.5961 9.36714 70.8297 11.5843C71.6289 11.9281 69.5578 13.1914 70.4 13.5523C71.3883 13.9734 75.2812 13.5007 76.2953 13.939C86.6593 18.4765 97.9601 23.7187 97.9601 23.7187L54.4586 43.3382L52.7312 42.8742L16.3797 26.1421L10.725 21.8796Z"
        fill="white"
      />
      <path
        d="M55.1719 41.7484C55.1719 41.7484 43.3125 35.1398 42.5992 34.5469C41.3273 33.4727 39.9695 27.5086 40.1156 27.1648C40.5711 26.0992 69.532 15.1766 69.532 15.1766C69.532 15.1766 84.3047 15.3656 85.2328 15.3399C87.4758 15.2711 87.5875 13.9649 83.918 13.6899C80.2484 13.4149 72.5914 12.8133 72.1703 12.5297C71.7148 12.2289 73.5883 10.8453 74.0438 9.90001C74.3703 9.21251 73.2445 8.54219 71.3023 10.0289C69.9445 11.0688 67.3148 12.7789 67.3148 12.7789C67.3148 12.7789 62.0125 14.3516 54.5445 17.368C46.1828 20.7367 37.4258 24.5266 36.5063 24.6898C34.7531 24.9992 25.3172 26.2539 23.4609 26.1508C21.6047 26.0477 8.98047 20.3156 8.21563 20.0664C6.83204 19.6024 6.00704 20.8398 7.19297 21.768C8.37891 22.6961 20.4273 29.2703 22.7477 29.5281C25.068 29.7859 36.3258 28.6258 36.3258 28.6258C36.3258 28.6258 37.8984 36.1797 38.9813 36.9531C40.0641 37.7266 52.9461 43.6133 53.2125 44.2578C53.7883 45.6328 53.0492 106.167 53.625 106.674C54.2008 107.181 56.0398 106.382 60.2938 104.165C64.5477 101.948 86.032 90.5867 87.6305 89.5211C89.2289 88.4555 89.9336 87.0375 90.4664 84.5539C90.9992 82.0703 103.512 26.9586 103.778 25.5406C104.045 24.1227 104.311 21.4586 101.999 21.9055C99.6961 22.3523 72.3594 34.1516 72.3594 34.1516L55.1719 41.7484Z"
        fill="#B0B0B0"
      />
      <path
        d="M71.0359 48.8727C71.139 47.4891 86.0835 30.9031 87.1492 30.2328C88.2148 29.5625 100.684 23.1344 101.406 22.6875C102.137 22.2406 102.523 21.175 100.624 21.682C98.7249 22.1891 84.9578 28.5398 84.3476 29.0383C83.7374 29.5367 79.3804 33.9797 79.3804 33.9797C79.3804 33.9797 75.7968 32.7851 75.3757 32.8195C74.3187 32.9055 56.1773 40.8547 55.4468 41.1383C54.7164 41.4219 54.046 42.8742 56.1171 42.4273C58.1882 41.9805 74.3445 35.7758 74.9632 35.6641C75.582 35.5523 77.9367 36.5836 77.9367 36.5836C77.9367 36.5836 68.1398 47.3859 68.1914 48.907C68.2773 51.2273 76.0546 66.3008 75.8312 67.3578C75.6078 68.4234 55.7562 101.57 53.6937 105.084C52.7398 106.709 54.2781 107.688 55.4468 106.236C56.6156 104.784 76.8968 72.4281 77.9882 72.282C79.0796 72.1445 87.3296 88.0945 87.7765 88.6273C88.2234 89.1516 89.8562 88.2234 89.1945 87.0117C88.2921 85.3617 82.3109 73.8547 79.3632 67.7273C73.6312 55.825 70.8898 50.832 71.0359 48.8727Z"
        fill="#858585"
      />
      <path
        d="M21.2266 77.0945C21.45 77.7734 45.3063 88.4297 45.925 88.2063C46.5438 87.9828 46.0109 85.6195 45.4094 84.657C44.6703 83.4797 43.1664 82.5688 43.1664 82.5688L43.1148 78.3063C43.1148 78.3063 45.3922 80.0938 46.6297 80.2055C47.8672 80.3172 48.3227 78.8219 47.5234 78.2719C46.8102 77.7734 46.2086 78.057 46.2086 78.057C46.2086 78.057 44.8422 77.0859 43.6649 76.0289C42.4875 74.9719 41.5508 73.5625 41.5508 73.5625L41.4563 69.2055C41.4563 69.2055 43.3898 70.7867 44.5156 70.8984C45.6414 71.0102 46.432 69.5492 45.3578 68.8703C44.7391 68.475 44.0945 68.8961 44.0945 68.8961C44.0945 68.8961 42.8828 68.2 41.9891 67.1859C40.9234 65.9828 40.3047 64.5133 40.3047 64.5133L40.2274 61.4367C40.2274 61.4367 41.7656 62.6141 42.8914 62.7859C44.0172 62.9578 44.3008 61.8063 43.6734 61.2391C43.0547 60.6719 42.5391 61.1445 42.5391 61.1445C42.5391 61.1445 39.2391 57.8188 36.6781 54.3813C34.8305 51.9063 33.5156 50.2649 33.5156 50.2649L33.4555 46.2774C33.4555 46.2774 33.507 45.2375 32.5531 45.0141C31.5906 44.7906 31.7109 45.8563 31.7109 45.8563V49.9727C31.7109 49.9727 28.1617 53.1266 26.2453 53.4102C24.3289 53.6938 24.0453 53.4102 24.0453 53.4102C24.0453 53.4102 23.8563 52.2328 22.7992 52.6195C21.957 52.9289 22.2148 54.2609 22.9711 54.768C24.5953 55.8508 26.632 55.3352 26.632 55.3352V58.8844C26.632 58.8844 24.9391 60.4656 23.9852 60.3539L23.0227 60.2422C23.0227 60.2422 22.9367 59.082 21.8367 59.5117C20.7883 59.9242 21.6391 61.8578 23.3578 62.0469C24.8274 62.2102 25.3859 62.107 25.3859 62.107V66.7906C25.3859 66.7906 24.1484 67.4695 23.2977 67.5211C22.4555 67.5813 21.7164 67.2375 21.7164 67.2375C21.7164 67.2375 21.2266 65.8797 20.3672 66.6703C19.5594 67.4094 20.4789 68.6984 21.7164 69.2055C22.9539 69.7125 24.2516 69.4289 24.2516 69.4289V75.0149C24.2516 75.0149 22.7305 74.9547 21.9399 75.6336C21.1664 76.3039 21.2266 77.0945 21.2266 77.0945Z"
        fill="#E93D82"
      />
      <path
        d="M30.0266 76.4157L37.0735 79.4579C37.0735 79.4579 36.7211 74.6196 33.4469 73.8289C30.1813 73.0469 30.0266 76.4157 30.0266 76.4157Z"
        fill="#E0E0E0"
      />
      <path
        d="M30.3015 67.5383L35.75 69.6524C35.75 69.6524 35.5523 65.8281 33.0085 65.218C30.4734 64.6078 30.3015 67.5383 30.3015 67.5383Z"
        fill="#E0E0E0"
      />
      <path
        d="M30.7399 59.5461L35.2516 61.3508C35.2516 61.3508 35.475 57.8531 32.8282 57.2945C30.5938 56.8133 30.7399 59.5461 30.7399 59.5461Z"
        fill="#E0E0E0"
      />
    </svg>
  )
}
