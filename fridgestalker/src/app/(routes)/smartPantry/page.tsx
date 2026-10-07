"use client"
import {useActionState} from "react"
import formHandler from "@/app/util/formData"
export default function SmartPantry() {
const [state,formAction,isPending]=useActionState(formHandler,null)

  return (
   <>
   <form action={formAction}>
    <label htmlFor="ingredients">Insert comma separated ingredient</label><br />
    <input type="text" name="ingredients" id="ingredients" placeholder="salt,pasta,chicken"/>
    <button disabled={isPending?true:false} type="submit">Submit</button>
   </form>
   {state&&<p>{JSON.stringify(state)}</p>}
   {isPending&&<p>Pending ...</p>}
   </>
  )
}