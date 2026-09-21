"use client"
import {useState,useEffect} from 'react'
import {useRouter,useParams} from "next/navigation"


export default function MealItems() {
  const [meals,setMeals]=useState({})
  const [isLoading,setLoad]=useState(true)
  const [error,setError]=useState(null)
  const paramsItem=useParams<{mealItem:string}>()
  useEffect(()=>{
const fetchMeal=async()=>{
try{
const res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${paramsItem}`)
const data=await res.json()
console.log(data)
}catch(error:any)'{
setLoad(false)
setError(error)
}finally{
setLoad(false)
}
}
fetchMeal()
  },[])
  return (
    <div>{paramsItem?.mealItem}</div>
  )
}