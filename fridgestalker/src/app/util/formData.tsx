export default async function formHandler(prev:unknown,formData:FormData){
const inputData=formData.get("ingredients")?.toString().replaceAll(",",",+")

const res=await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${inputData}&apiKey=ed3941946fc44d8bb13024cd55d5a476`)
const data=await res.json()

return {data:data}
}