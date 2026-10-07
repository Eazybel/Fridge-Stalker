"use client"
type mealType={
    id:number,
    title:string,
    image:string,
    usedIngredients:usedUnusedIngredient[]
    unusedIngredients:usedUnusedIngredient[]
    missedIngredients:usedUnusedIngredient[]

}
type usedUnusedIngredient={
name:string
}
import {useActionState, useEffect} from "react"
import formHandler from "@/app/util/formData"
export default function SmartPantry() {
const [state,formAction,isPending]=useActionState(formHandler,null)
useEffect(()=>{
console.log(state)
},[state])
  return (
   <>
   {isPending&&<p>Pending ...</p>}
   <form action={formAction}>
    <label htmlFor="ingredients">Insert comma separated ingredient</label><br />
    <strong>make sure the ingredients are comma separated</strong><br />
    <input type="text" name="ingredients" id="ingredients" placeholder="salt,pasta,chicken"/>
    <button disabled={isPending?true:false} type="submit">Submit</button>
   </form>
   {
    state?.data.map((meal:mealType)=>{
        return <div key={meal.id}>
            <p>{meal.id}</p>
            <p>{meal.title}</p>
           
        </div>
    })
   }
   </>
  )
}