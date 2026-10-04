"use client"
import { useEffect, useState } from 'react'
import Image from "next/image"
import Link from "next/link"


export default function FavoritesPage() {
  const [mealIds, setMealIds] = useState<string[]>([])
  const [mealNames, setMealNames] = useState<string[]>([])
  const [mealThumbs, setMealThumbs] = useState<string[]>([])
   const [isOpen, setIsOpen] = useState(false)

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
      
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand / Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25">
              <span className="text-lg font-bold">🍳</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
              Flavor<span className="text-orange-500">Forge</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/pantry"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Smart Pantry
            </Link>
            <Link
              href="/planner"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Meal Planner
            </Link>
            <Link
              href="/favorites"
              className="px-3.5 py-2 rounded-lg text-sm font-medium bg-orange-50 text-orange-600 transition-colors"
            >
              Favorites
            </Link>
          </nav>

          {/* Search Bar & Actions */}
          <div className="flex items-center gap-4">
            
            {/* Desktop Static Search Input */}
            <div className="relative hidden sm:block w-48 lg:w-64">
              <div className="relative">
                <label
                  htmlFor="meal-search"
                  className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </label>
                <input
                onChange={(e)=>{console.log(e.target.value)}}
                  type="text"
                  id="meal-search"
                  placeholder="Search Favorites..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
              </div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Open Menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          
          {/* Mobile Search Bar */}
          <div className="relative sm:hidden pb-2">
            <input
              type="text"
              placeholder="Search Favorites..."
              className="w-full px-4 py-2 bg-slate-100 border border-transparent rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-500"
            />
          </div>

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            Home
          </Link>
          <Link
            href="/pantry"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            Smart Pantry
          </Link>
          <Link
            href="/planner"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            Meal Planner
          </Link>
          <Link
            href="/favorites"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium bg-orange-50 text-orange-600"
          >
            Favorites
          </Link>
        </div>
      )}
    </header>
  

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