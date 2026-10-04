"use client"
import {useEffect,useState} from 'react'
import Image from "next/image"
import Link from "next/link"
import HeaderFavorite from '@/app/components/Header/HeaderFavorite'
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
  mealsThumb.push(meal.split(",")[2])
})
setMealNames(mealsName)
setMealIds(mealsId)
setMealThumbs(mealsThumb)

},[])
  return (
    <div>
      <HeaderFavorite/>
        {
          mealIds.map((meal,index)=>{
              return  <div key={index}>
                    <Image
                       src={mealThumbs[index]}
                       alt="mealThumb"
                       width={500}
                       height={500}
                       />
                        <p>{meal}</p>
                        <p>{mealNames[index]}</p>
                      <Link
                      href={`/meal/${mealIds[index]}`}
                      >
                          How to do it?
                      </Link>
                      </div>
          })
        }
    </div>
  )
}