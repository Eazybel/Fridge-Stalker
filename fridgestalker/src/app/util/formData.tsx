export default async function formHandler(prev:unknown,formData:FormData){
const ingredients=formData.get("ingredients")
return ingredients
}