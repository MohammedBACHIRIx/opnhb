'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SearchParams } from '@/types'

interface PaginationProps {
  currentPage: number
  totalPages: number
  searchParams: SearchParams
}

export function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams as any)
    params.set('page', page.toString())
    return `/browse?${params.toString()}`
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link key={i} href={createPageUrl(i)}>
          <Button
            variant={i === currentPage ? 'default' : 'outline'}
            size="sm"
            className="h-8 w-8 p-0"
          >
            {i}
          </Button>
        </Link>
      )
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      {currentPage > 1 && (
        <Link href={createPageUrl(currentPage - 1)}>
          <Button variant="outline" size="sm" className="h-8 px-2">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
      )}

      {renderPageNumbers()}

      {currentPage < totalPages && (
        <Link href={createPageUrl(currentPage + 1)}>
          <Button variant="outline" size="sm" className="h-8 px-2">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  )
}