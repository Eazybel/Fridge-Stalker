"use client"
type mealType = {
    idMeal:string,
    strArea:string,
    strCategory:string,
    strCountry:string,
    strMeasure:string,
    strIngredient:string,
    strInstractions:string,
    strMeal:string,
    strMealThumb:string,
    strYoutube:string
}
type mealTypePartia=Partial<mealType>

import {useState,useEffect} from 'react'
import {useParams} from "next/navigation"
export default function page() {
    const paramsItem=useParams<{mealType:string}>()
    const [recipe,setRecipe]=useState<mealTypePartia|undefined>(undefined)
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
},[recipe?.idMeal])
  return (
   <>
    {
        isLoading&&<p>Loading</p>
    }
    {
        error&&<p>{error}</p>
    }
    {
        recipe&& <>
        <p>{recipe.idMeal}</p>
        <p>{recipe.strArea}</p>
        <p>{recipe.strCategory}</p>
        <p>{recipe.strCountry}</p>
        <p>{recipe.strMeal}</p>
        <p>{recipe.strMealThumb}</p>
        <p>{recipe.strYoutube}</p>
        </>
      

    }
   
   </>
  )
}