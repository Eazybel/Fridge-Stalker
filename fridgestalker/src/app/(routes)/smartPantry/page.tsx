"use client"

import { useActionState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import formHandler, { FormState, Meal } from "@/app/util/formData"

export default function SmartPantry() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(formHandler, null)

  useEffect(() => {
    if (state) {
      console.log("Pantry search response:", state)
    }
  }, [state])

  // Safely verify state.data is an array before mapping
  const meals: Meal[] = Array.isArray(state?.data) ? state.data : []

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Search Header / Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 text-2xl mb-1">
            🧺
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Smart Pantry Search
            </h1>
            <p className="text-slate-500 text-sm mt-1.5">
              Enter ingredients from your fridge to discover matching recipes.
            </p>
          </div>

          {/* Error Message Display */}
          {state?.error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl text-left font-medium">
              ⚠️ {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-4 text-left">
            <div>
              <label 
                htmlFor="ingredients" 
                className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2"
              >
                Pantry Ingredients
              </label>
              <input
                type="text"
                name="ingredients"
                id="ingredients"
                required
                placeholder="e.g., pasta, tomato, garlic, chicken"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <span>💡</span> Separate items with commas for best search accuracy.
              </p>
            </div>

            <button
              disabled={isPending}
              type="submit"
              className="w-full py-3 px-5 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Searching Pantry...</span>
                </>
              ) : (
                <span>Find Matching Recipes</span>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        {meals.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Found {meals.length} Recipes
              </h2>
              <span className="text-xs font-semibold px-3 py-1 bg-orange-50 text-orange-600 rounded-full border border-orange-200/60">
                Sorted by ingredient match
              </span>
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal) => (
                <div
                  key={meal.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Meal Image Wrapper */}
                    <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={meal.image}
                        alt={meal.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium">
                        ID: {meal.id}
                      </div>
                    </div>

                    {/* Meal Header Content */}
                    <div className="p-5 space-y-4">
                      <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">
                        {meal.title}
                      </h3>

                      {/* Ingredients Breakdown */}
                      <div className="space-y-3 pt-2 text-xs">
                        
                        {/* Used Ingredients (Green) */}
                        <div>
                          <span className="font-bold text-emerald-700 block mb-1.5 uppercase tracking-wider text-[10px]">
                            Used From Pantry ({meal.usedIngredients.length})
                          </span>
                          {meal.usedIngredients.length === 0 ? (
                            <span className="text-slate-400 italic">None from your list</span>
                          ) : (
                            <div className="flex flex-wrap gap-1.5">
                              {meal.usedIngredients.map((item, idx) => (
                                <span
                                  key={`${item.name}-${idx}`}
                                  className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-md font-medium"
                                >
                                  ✓ {item.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Missed Ingredients (Amber) */}
                        <div>
                          <span className="font-bold text-amber-700 block mb-1.5 uppercase tracking-wider text-[10px]">
                            Need To Buy ({meal.missedIngredients.length})
                          </span>
                          {meal.missedIngredients.length === 0 ? (
                            <span className="text-slate-400 italic">No extra ingredients needed!</span>
                          ) : (
                            <div className="flex flex-wrap gap-1.5">
                              {meal.missedIngredients.map((item, idx) => (
                                <span
                                  key={`${item.name}-${idx}`}
                                  className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-md font-medium"
                                >
                                  + {item.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Unused Ingredients (Slate) */}
                        {meal.unusedIngredients.length > 0 && (
                          <div>
                            <span className="font-bold text-slate-500 block mb-1.5 uppercase tracking-wider text-[10px]">
                              Unused Ingredients
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {meal.unusedIngredients.map((item, idx) => (
                                <span
                                  key={`${item.name}-${idx}`}
                                  className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md font-medium"
                                >
                                  {item.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="p-5 pt-0">
                    <Link
                      href={`/smartmeal/${meal.id}`}
                      target="_blank"
                      className="flex items-center justify-center gap-1.5 w-full py-2.5 px-4 bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white font-semibold text-sm rounded-xl transition-all duration-200"
                    >
                      <span>View Full Recipe</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State after search */}
        {state && !state.error && meals.length === 0 && !isPending && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto">
            <p className="text-slate-500 text-sm">
              No matching recipes found for those ingredients. Try adding broader terms like "chicken" or "rice".
            </p>
          </div>
        )}

      </div>
    </div>
  )
}