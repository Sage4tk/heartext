'use client'

import { useState } from 'react'
import { CreditCard, LayoutDashboard, Menu, Mic2, Volume2, LogOut } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useUser } from '../Wrappers/AuthWrapper'

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Speech to Text', href: '/stt', icon: Mic2 },
  { title: 'Text to Speech', href: '/tts', icon: Volume2 },
  { title: 'Payments', href: '/payments', icon: CreditCard },
]

interface DashboardNavProps {
  children: React.ReactNode
}

const DashboardNav:React.FC<DashboardNavProps> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const pathname = useLocation();
    const { user } = useUser();

   
    const displayName = (): string => {
        if (user && user.displayName) {
        const names = user.displayName.split(' ')
        return names[0][0] + names[names.length - 1][0]
        }
        return 'JD'
    }

    const handleLogout = () => {
        // Implement logout logic here
        console.log('Logging out...')
    }

  return (
    <div className="flex h-screen">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed right-4 top-4 z-40 lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
            <div className="flex flex-col items-center space-y-4 py-6">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">{displayName()}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{user?.email}</span>
            </div>
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <NavLink key={item.href} item={item} pathname={pathname.pathname} />
              ))}
            </nav>
            <div className="mt-auto p-4">
              <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-[300px] flex-col border-r bg-muted/40 lg:flex">
        <ScrollArea className="flex-grow">
          <div className="flex flex-col items-center space-y-4 py-6">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">{displayName()}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{user?.email}</span>
          </div>
          <nav className="grid gap-1 px-2">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname.pathname} />
            ))}
          </nav>
        </ScrollArea>
        <div className="mt-auto p-4 mb-8">
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}

const NavLink:React.FC<{
    item: NavItem,
    pathname: string | null
}> = ({ item, pathname }) => {
  return (
    <Link
      to={item.href}
      className={cn(
        'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
        pathname === item.href ? 'bg-accent' : 'transparent'
      )}
    >
      <item.icon className="mr-2 h-4 w-4" />
      <span>{item.title}</span>
    </Link>
  )
}

export default DashboardNav;