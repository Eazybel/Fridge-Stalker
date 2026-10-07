"use client"
import {useActionState, useEffect} from "react"
import formHandler from "@/app/util/formData"
export default function SmartPantry() {
const [state,formAction,isPending]=useActionState(formHandler,null)
useEffect(()=>{
console.log(state)
},[state])
  return (
   <>
   <form action={formAction}>
    <label htmlFor="ingredients">Insert comma separated ingredient</label><br />
    <strong>make sure the ingredients are comma separated</strong><br />
    <input type="text" name="ingredients" id="ingredients" placeholder="salt,pasta,chicken"/>
    <button disabled={isPending?true:false} type="submit">Submit</button>
   </form>
   {state&&<p>{JSON.stringify(state)}</p>}
   {isPending&&<p>Pending ...</p>}
   </>
  )
}