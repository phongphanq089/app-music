/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { AlignJustify } from 'lucide-react'
import { Category } from '~/types'
import { useCategoriesStore } from '~/stores/useCategoriesStore'
import { useRouter } from 'next/navigation'
import { HeadphoneIcon } from './elements/IconUi'

const CategoriedList = ({ categoriesList }: { categoriesList: Category[] }) => {
  const { setCategories, categories } = useCategoriesStore()
  const navigate = useRouter()
  useEffect(() => {
    setCategories(categoriesList)
  }, categoriesList)

  console.log(categoriesList, '=======>')
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='cursor-pointer'>
          <HeadphoneIcon className='w-5 h-5' />
          Categoried
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-60 p-3 bg-white/50 backdrop-blur'>
        <DropdownMenuGroup>
          {categories.map((category, index) => {
            return (
              <DropdownMenuItem
                key={index}
                className=' mb-1 cursor-pointer bg-accent justify-between px-4'
                onClick={() => navigate.push(`/music/${category.slug}`)}
              >
                <AlignJustify className='text-black' />
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
