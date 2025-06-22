import { create } from 'zustand'
import { Category } from '~/types'

interface CategorStore {
  categories: Category[]
  setCategories: (category: Category[]) => void
}
export const useCategoriesStore = create<CategorStore>((set) => ({
  categories: [],
  setCategories: (category) => set({ categories: category }),
}))
