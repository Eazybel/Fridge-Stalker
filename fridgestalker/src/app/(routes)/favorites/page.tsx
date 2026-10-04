"use client"
import { useEffect, useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import HeaderFavorite from '@/app/components/Header/HeaderFavorite'

export default function FavoritesPage() {
  const [mealIds, setMealIds] = useState<string[]>([])
  const [mealNames, setMealNames] = useState<string[]>([])
  const [mealThumbs, setMealThumbs] = useState<string[]>([])

  useEffect(() => {
    const mealData = Object.keys(localStorage)
    const mealsId: string[] = []
    const mealsName: string[] = []
    const mealsThumb: string[] = []

    mealData.forEach(meal => {
      // Safety check: only parse keys that follow your comma format
      if (meal.includes(",")) {
        const parts = meal.split(",")
        mealsId.push(parts[0])
        mealsName.push(parts[1])
        mealsThumb.push(parts[2])
      }
    })

    setMealNames(mealsName)
    setMealIds(mealsId)
    setMealThumbs(mealsThumb)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <HeaderFavorite />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Your Favorites
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Quickly access recipes you&apos;ve saved for later
            </p>
          </div>
          <span className="text-sm font-semibold text-orange-600 bg-orange-50 border border-orange-200/60 px-3.5 py-1.5 rounded-full">
            {mealIds.length} Saved
          </span>
        </div>

        {/* Empty State */}
        {mealIds.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mx-auto mb-3 text-xl font-bold">
              🍳
            </div>
            <h3 className="text-base font-semibold text-slate-900">No favorites yet</h3>
            <p className="text-sm text-slate-500 mt-1 mb-5">Explore recipes and bookmark the ones you love.</p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm rounded-xl transition-colors shadow-sm shadow-orange-500/20"
            >
              Explore Recipes
            </Link>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mealIds.map((meal, index) => {
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden hover:shadow-md hover:border-orange-200 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Meal Thumbnail */}
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      {mealThumbs[index] && (
                        <Image
                          src={mealThumbs[index]}
                          alt={mealNames[index] || "Meal Thumbnail"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>

                    {/* Meal Info */}
                    <div className="p-5">
                      <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md mb-2">
                        ID: {meal}
                      </span>
                      <h2 className="text-base font-bold text-slate-800 line-clamp-2 leading-snug">
                        {mealNames[index]}
                      </h2>
                    </div>
                  </div>

                  {/* Recipe Link Button */}
                  <div className="px-5 pb-5 pt-0">
                    <Link
                      href={`/meal/${mealIds[index]}`}
                      className="flex items-center justify-center w-full py-2.5 px-4 bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white font-semibold text-sm rounded-xl transition-all duration-200"
                    >
                      How to do it?
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}