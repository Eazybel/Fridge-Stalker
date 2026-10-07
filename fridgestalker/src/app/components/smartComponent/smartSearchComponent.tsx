import useActionState from "next"
export default function SmartSearchComponent() {

  return (
   <>
   <form action="">
    <label htmlFor="recipe">Insert comma separated ingredient</label>
    <input type="text" name="recipe" id="reipe" />
    <button type="submit">Submit</button>
   </form>
   </>
  )
}