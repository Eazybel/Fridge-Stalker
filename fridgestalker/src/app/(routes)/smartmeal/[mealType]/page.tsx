type mealsType={
params:Promise<{mealType:string}>
}
export default async function SmartMeal({params}:mealsType) {
const mealType=await params
const res=await fetch(`https://api.spoonacular.com/recipes/641122/information?includeNutrition=false&apiKey=ed3941946fc44d8bb13024cd55d5a476`)
const data=await res.json()
console.log(data)

  return (
    <div>SmartMeal page for meal {mealType.mealType}</div>
  )
}