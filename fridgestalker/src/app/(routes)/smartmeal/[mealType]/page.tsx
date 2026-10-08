import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

type PageProps = {
  params: Promise<{ mealType: string }>
}

type Ingredient = {
  id: number
  original: string
  name: string
  amount: number
  unit: string
}

type InstructionStep = {
  number: number
  step: string
}

type RecipeDetail = {
  id: number
  title: string
  image: string
  readyInMinutes: number
  servings: number
  summary: string
  instructions: string
  analyzedInstructions: {
    name: string
    steps: InstructionStep[]
  }[]
  extendedIngredients: Ingredient[]
  dishTypes?: string[]
  diets?: string[]
}

export default async function SmartMeal({ params }: PageProps) {
  const { mealType: recipeId } = await params
  const apiKey = process.env.SPOONACULAR_API_KEY

  const res = await fetch(
    `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}`,
    { next: { revalidate: 3600 } } // Cache recipe details for 1 hour
  )

  if (!res.ok) {
    if (res.status === 404) notFound()
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md">
          <span className="text-4xl mb-3 block">⚠️</span>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Unable to load recipe</h1>
          <p className="text-slate-500 text-sm mb-6">
            We couldn't retrieve the recipe instructions. The daily API limit may have been reached or the recipe ID is invalid.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors"
          >
            ← Back to Smart Pantry
          </Link>
        </div>
      </div>
    )
  }

  const recipe: RecipeDetail = await res.json()
  const steps = recipe.analyzedInstructions?.[0]?.steps || []

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Pantry Search
          </Link>

          <span className="text-xs font-mono bg-slate-200/60 text-slate-700 px-3 py-1 rounded-full">
            Recipe ID: #{recipe.id}
          </span>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Image Container */}
            <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[300px] bg-slate-100">
              <Image
                src={recipe.image || "/placeholder-recipe.jpg"}
                alt={recipe.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* Content Container */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                
                {/* Diet & Dish Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {recipe.diets?.slice(0, 3).map((diet) => (
                    <span
                      key={diet}
                      className="text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-0.5 rounded-md"
                    >
                      {diet}
                    </span>
                  ))}
                  {recipe.dishTypes?.slice(0, 2).map((type) => (
                    <span
                      key={type}
                      className="text-[11px] font-bold uppercase tracking-wider bg-orange-50 text-orange-700 border border-orange-200/60 px-2.5 py-0.5 rounded-md"
                    >
                      {type}
                    </span>
                  ))}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {recipe.title}
                </h1>
              </div>

              {/* Quick Info Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-slate-700">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">⏱️</span>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Ready In</p>
                    <p className="text-sm font-bold">{recipe.readyInMinutes || "N/A"} mins</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🍽️</span>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Servings</p>
                    <p className="text-sm font-bold">{recipe.servings || "N/A"} portions</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <span className="text-xl">🥗</span>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Ingredients</p>
                    <p className="text-sm font-bold">{recipe.extendedIngredients?.length || 0} items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Ingredients Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4 lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Ingredients</span>
              <span className="text-xs font-normal text-slate-500">
                {recipe.extendedIngredients?.length || 0} required
              </span>
            </h2>

            <ul className="space-y-2.5 text-sm">
              {recipe.extendedIngredients?.map((item, idx) => (
                <li key={`${item.id}-${idx}`} className="flex items-start gap-2.5 text-slate-700 leading-snug">
                  <span className="text-orange-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>{item.original}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cooking Instructions Main Area */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Instructions
            </h2>

            {/* Option A: Parsed Step-by-Step Instructions */}
            {steps.length > 0 ? (
              <ol className="space-y-6">
                {steps.map((s) => (
                  <li key={s.number} className="flex gap-4 items-start group">
                    <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      {s.number}
                    </span>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed pt-1">
                      {s.step}
                    </p>
                  </li>
                ))}
              </ol>
            ) : recipe.instructions ? (
              /* Option B: Fallback Raw HTML Render with clean prose styling */
              <div
                className="text-slate-700 leading-relaxed space-y-4 [&>ol]:space-y-3 [&>ol]:list-decimal [&>ol]:pl-5 [&>ul]:list-disc [&>ul]:pl-5 text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            ) : (
              <p className="text-slate-400 italic text-sm">
                No detailed instructions available for this recipe.
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}