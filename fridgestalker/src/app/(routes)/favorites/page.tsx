"use client"
import {useEffect,useState} from 'react'
import Image from "next/image"
export default function page() {
  const [mealIds,setMealIds]=useState<string[]>([])
  const [mealNames,setMealNames]=useState<string[]>([])
  const [mealThumbs,setMealThumbs]=useState<string[]>([])
useEffect(()=>{
const mealData=Object.keys(localStorage)
const mealsId:string[]=[]
const mealsName:string[]=[]
const mealsThumb:string[]=[]
mealData.forEach(meal=>{
  mealsId.push(meal.split(",")[0])
  mealsName.push(meal.split(",")[1])
  mealsThumb.push(meal.split(",")[1])
})
setMealNames(mealsName)
setMealIds(mealsId)
setMealThumbs(mealsThumb)
},[])
  return (
    <div>
        {
          mealIds.map((meal,index)=>{
              return  <div key={index}>
                    <Image
                       href={mealThumbs[index]}
                       alt="mealThumb"
                       />
                        <p>{meal}</p>
                        <p>{mealNames[index]}</p>
                      </div>
          })
        }
    </div>
  )
}