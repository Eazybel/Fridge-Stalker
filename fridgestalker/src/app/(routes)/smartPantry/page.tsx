"use client"
type mealType={
    id:number,
    title:string,
    image:string,
    usedIngredients:usedUnusedIngredient[]
    usedIngredientCount:number
    unusedIngredients:usedUnusedIngredient[]
    missedIngredients:usedUnusedIngredient[]

}
type usedUnusedIngredient={
name:string
}
import Image from "next/image"
import {useActionState,useState, useEffect} from "react"
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
    <button disabled={isPending} type="submit">Submit</button>
   </form>
   {
    state?.data.map((meal:mealType)=>{
       
        return <div key={meal.id}>
            <p>{meal.id}</p>
            <p>{meal.title}</p>
            <Image 
            src={meal.image}
            alt="this is meal image"
            width={200}
            height={200}
            loading="lazy"
            />
           <div>
            <h2>unused ingredients</h2>
            
           
              <ol>
                   {
                    meal.unusedIngredients.length==0?(<li>none</li>):
                   meal.unusedIngredients.map((unused:usedUnusedIngredient,index:number)=>( <li key={index} >{unused.name}</li>))
                    
                    }
               </ol>
            
           </div>
        </div>
    })
   }
   </>
  )
}