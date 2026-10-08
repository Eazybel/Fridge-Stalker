"use server"

export type MealIngredient = {
  id?: number
  name: string
  amount?: number
  unit?: string
}

export type Meal = {
  id: number
  title: string
  image: string
  usedIngredientCount: number
  missedIngredientCount: number
  usedIngredients: MealIngredient[]
  missedIngredients: MealIngredient[]
  unusedIngredients: MealIngredient[]
}

export type FormState = {
  data?: Meal[]
  error?: string
} | null

export default async function formHandler(
  prev: FormState,
  formData: FormData
): Promise<FormState> {
  const rawInput = formData.get("ingredients")?.toString().trim()

  // 1. Validation: Prevent API requests on empty inputs
  if (!rawInput) {
    return { error: "Please enter at least one ingredient." }
  }

  // 2. Clean up & format ingredients safely
  // Splits by comma, removes excess whitespace around words, filters out empty items, and URL encodes special characters
  const formattedIngredients = rawInput
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => encodeURIComponent(item))
    .join(",+")

  if (!formattedIngredients) {
    return { error: "Please provide valid ingredient names." }
  }

  const apiKey = process.env.SPOONACULAR_API_KEY

  try {
    // 3. Fetch with error handling and response caching
    const res = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${formattedIngredients}&number=12&apiKey=${apiKey}`,
      { next: { revalidate: 1800 } } // Cache results for 30 minutes to conserve API points
    )

    // 4. Handle non-200 HTTP response codes
    if (!res.ok) {
      if (res.status === 402 || res.status === 429) {
        return { error: "API quota limit exceeded for today. Please try again later." }
      }
      return { error: `Failed to fetch recipes (Status ${res.status}).` }
    }

    const data: Meal[] = await res.json()
    return { data }

  } catch (err) {
    console.error("Error in formHandler:", err)
    return { error: "A network error occurred. Please check your connection and try again." }
  }
}