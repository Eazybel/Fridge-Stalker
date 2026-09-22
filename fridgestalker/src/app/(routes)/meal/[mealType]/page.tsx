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
// @ts-ignore
import ReactPlayer from "react-player/lazy"
import {useState,useEffect} from 'react'
import Image from "next/image"
import {useParams} from "next/navigation"
export default function page() {
    const paramsItem=useParams<{mealType:string}>()
    const [recipe,setRecipe]=useState<mealTypePartia|undefined>(undefined)
    const [isLoading,setLoad]=useState(true)
    const [url,setUrl]=useState("")
    const [error,setError]=useState(null)
useEffect(()=>{
const fetchData=async()=>{
try {
const res =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${paramsItem.mealType}`)
const data=await res.json() 
setRecipe(data.meals[0])
setLoad(false)
if(recipe?.strYoutube){
const strUrl=recipe?.strYoutube.split("v=")[1]
const validUrl=`https://www.youtube.com/embed/${strUrl}`
setUrl(validUrl)
}
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
  
    
    
        recipe&&
        <>
        
        <p>{recipe.idMeal}</p>
        <p>{recipe.strArea}</p>
        <p>{recipe.strCategory}</p>
        <p>{recipe.strCountry}</p>
        <p>{recipe.strMeal}</p>
        <p></p>
            <Image
            src={`${recipe.strMealThumb}`}
            width={500}
            height={500}
            alt="food thumbnail"
            loading="eager"
            
            />
        <iframe
        width={300}
        height={300}
        src={url?`${url}`:undefined}>How to make it?</iframe>
        </>
      

    }
   
   </>
  )
}