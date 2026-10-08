"use server"

export type MealIngredient = {
  id?: number
  name: string
  amount?: number
  unit?: string
  original?: string
  image?: string
}

export type Meal = {
  id: number
  title: string
  image: string
  usedIngredientCount?: number
  missedIngredientCount?: number
  usedIngredients: MealIngredient[]
  missedIngredients: MealIngredient[]
  unusedIngredients: MealIngredient[]
}

export type FormState = {
  data?: Meal[]
  error?: string
} | null

export default async function formHandler(
  prev: unknown,
  formData: FormData
): Promise<FormState> {
  const rawInput = formData.get("ingredients")?.toString().trim()

  if (!rawInput) {
    return { error: "Please enter at least one ingredient." }
  }

  const formattedIngredients = rawInput
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => encodeURIComponent(item))
    .join(",+")

  if (!formattedIngredients) {
    return { error: "Please provide valid ingredient names." }
  }

  const apiKey = process.env.SPOONACULAR_API_KEY || "ed3941946fc44d8bb13024cd55d5a476"

  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${formattedIngredients}&number=12&apiKey=${apiKey}`,
      { next: { revalidate: 1800 } }
    )

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
    return { error: "A network error occurred. Please try again." }
  }
}