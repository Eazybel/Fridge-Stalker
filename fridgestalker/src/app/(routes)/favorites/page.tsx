"use client"
import {useEffect} from 'react'
export default function page() {
useEffect(()=>{
const mealData=Object.keys(localStorage)
const mealsId:string[]=[]
const mealsName:string[]=[]
const mealsThumb:string[]=[]
mealData.forEach(meal=>{
  mealsId.push(meal.split(",")[0])
})
console.log(mealsId)
},[])
  return (
    <div>page</div>
  )
}