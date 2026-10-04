"use client"
import {useEffect} from 'react'
export default function page() {
useEffect(()=>{
const mealData=Object.keys(localStorage)
console.log(mealData)
// const mealName=mealData.split(",")[1]
// const mealId=
// const mealThumb=
// const mealArea=
},[])
  return (
    <div>page</div>
  )
}