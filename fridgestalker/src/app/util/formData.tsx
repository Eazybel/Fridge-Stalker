export default async function formHandler(prev:unknown,formData:FormData){
const inputData=formData.get("ingredients")?.toString().replaceAll(",",",+")

const res=await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${inputData}&apiKey=061deef803d54c4e8034727f78f93b10`)
const data=await res.json()

return {data:data}
}