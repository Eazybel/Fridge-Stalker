"use client"
type mealType = {
    idMeal:string,
    strArea:string,
    strCategory:string,
    strCountry:string,
    strMeasure:string,
    strInstractions:string,
    strMeal:string,
    strMealThumb:string,
    strMealYoutube:string,
}

import {useState,useEffect} from 'react'
import {useParams} from "next/navigation"
export default function page() {
    const paramsItem=useParams<{mealType:string}>()
    const [recipe,setRecipe]=useState<mealType|{}>({})
    const [isLoading,setLoad]=useState(true)
    const [error,setError]=useState(null)
useEffect(()=>{
const fetchData=async()=>{
try {
const res =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${paramsItem.mealType}`)
const data=await res.json() 
setRecipe(data.meals[0])
setLoad(false)
} catch (error:any) {
    setError(error)
    setLoad(false)
}finally{
setLoad(false)
}

}
fetchData()
},[])
  return (
   <>
    {
        isLoading&&<p>Loading</p>
    }
    {
        error&&<p>{error}</p>
    }
    {
        recipe&&
        // <p>{recipe.idMeal}</p>
        console.log(recipe)

    }
   
   </>
  )
}