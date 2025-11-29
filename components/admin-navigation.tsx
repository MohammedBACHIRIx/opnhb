'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  Upload, 
  Database, 
  AlertTriangle, 
  Settings,
  LayoutDashboard
} from 'lucide-react'

export function AdminNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      href: '/admin/import',
      label: 'Bulk Import',
      icon: Upload
    },
    {
      href: '/admin/resources',
      label: 'Resource Management',
      icon: Database
    },
    {
      href: '/admin/reports',
      label: 'Reports',
      icon: AlertTriangle
    }
  ]

  return (
    <div className="border-b">
      <div className="flex space-x-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? 'default' : 'ghost'}
                size="sm"
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}