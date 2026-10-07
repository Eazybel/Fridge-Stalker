"use client"
import {useActionState} from "react"
import formHandler from "@/app/util/formData"
export default function SmartPantry() {
const [state,formAction,isPending]=useActionState(formHandler,null)
  return (
   <>
   <form action={formAction}>
    <label htmlFor="ingredients">Insert comma separated ingredient</label>
    <input type="text" name="ingredients" id="ingredients" />
    <button type="submit">Submit</button>
   </form>
   {state&&console.log(state)}
   {isPending&&<p>Pending ...</p>}
   </>
  )
}