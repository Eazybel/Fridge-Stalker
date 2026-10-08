type mealsType={
mealType:Promise<{mealType:string}>
}
export default async function SmartMeal(params:mealsType) {
const {mealType}=await params

  return (
    <div>SmartMeal page</div>
  )
}