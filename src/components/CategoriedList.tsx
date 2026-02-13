 
'use client'
import React, { useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Folder, Hash, ChevronDown } from 'lucide-react'
import { Category } from '~/types'
import { useCategoriesStore } from '~/stores/useCategoriesStore'
import { useRouter } from 'next/navigation'
import { cn } from '~/lib/utils'

const CategoriedList = ({ categoriesList }: { categoriesList: Category[] }) => {
  const { setCategories, categories } = useCategoriesStore()
  const navigate = useRouter()

  useEffect(() => {
    setCategories(categoriesList)
  }, [categoriesList, setCategories])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-300 outline-none',
            'bg-slate-800/50 backdrop-blur-md border border-slate-700 hover:border-slate-500',
            'text-slate-300 hover:text-white group',
          )}
        >
          <Folder className='w-4 h-4 text-[var(--color-terminal-secondary)] group-hover:text-[var(--color-terminal-accent)] transition-colors' />
          <span className='font-mono text-xs'>~/categories/</span>
          <ChevronDown className='w-3 h-3 ml-1 opacity-50 group-hover:opacity-100 transition-opacity' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56 bg-[#101014]/95 backdrop-blur-xl border border-slate-800 text-slate-300 shadow-2xl'
        align='end'
      >
        <div className='px-2 py-1.5 text-[10px] font-mono text-slate-500 border-b border-slate-800 mb-1'>
          SELECT DIRECTORY
        </div>
        <DropdownMenuGroup>
          {categories.map((category, index) => {
            return (
              <DropdownMenuItem
                key={index}
                className='cursor-pointer focus:bg-slate-800/80 focus:text-[var(--color-terminal-primary)] font-mono text-xs py-2 data-[highlighted]:bg-slate-800/80'
                onClick={() => navigate.push(`/music/${category.slug}`)}
              >
                <Hash className='w-3 h-3 mr-2 opacity-50' />
                <span>{category.title}</span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CategoriedList
