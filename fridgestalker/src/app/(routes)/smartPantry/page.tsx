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
                    meal.unusedIngredients.length==0?(<li>no unused ingredients</li>):
                   meal.unusedIngredients.map((unused:usedUnusedIngredient,index:number)=>( <li key={index} >{unused.name}</li>))
                    
                    }
               </ol>
            
           </div>
           <div>
            <h2>used ingredients</h2>
            
           
              <ol>
                   {
                    meal.usedIngredients.length==0?(<li>no used ingredients from your fridge</li>):
                   meal.usedIngredients.map((used:usedUnusedIngredient,index:number)=>( <li key={index} >{used.name}</li>))
                    
                    }
               </ol>
            
           </div>
           <div>
            <h2>missed ingredients</h2>
            
           
              <ol>
                   {
                    meal.missedIngredients.length==0?(<li>no additional ingredient needed</li>):
                   meal.missedIngredients.map((missed:usedUnusedIngredient,index:number)=>( <li key={index} >{missed.name}</li>))
                    
                    }
               </ol>
            
           </div>
        </div>
    })
   }
   </>
  )
}