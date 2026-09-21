"use client"
import {useState,useEffect} from 'react'
import {useRouter,useParams} from "next/navigation"
import Image from "next/image"
import Link from 'next/link'
type mealsType={
  idMeal:string,
  strArea:string,
  strCountry:string,
  strMeal:string,
  strMealThumb:string
}

export default function MealItems() {
  const [meals,setMeals]=useState<mealsType[]|[]>([])
  const [isLoading,setLoad]=useState(true)
  const [error,setError]=useState(null)
  const paramsItem=useParams<{mealItem:string}>()
  useEffect(()=>{
const fetchMeal=async()=>{
try{
const res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${paramsItem?.mealItem}`)
const data=await res.json()
setMeals(data.meals)
}catch(error:any){
setLoad(false)
setError(error)
}finally{
setLoad(false)
}
}
fetchMeal()
  },[])
  return (
    <>
    {
      meals&&meals.map(meal=>{
        return <div key={meal.idMeal}>

          <p>{meal.idMeal}</p><p>{meal.strArea}</p>
          <p>{meal.strCountry}</p>
          <p>{meal.strMeal}</p>
          <Image
          src={`${meal.strMealThumb}`}
          alt="meal image"
          width={500}
          height={500}
          />
          {/* <Link
          href={}
          /> */}
        </div>
      })
    }
    </>
  )
}