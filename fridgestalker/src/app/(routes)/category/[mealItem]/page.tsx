"use client"
import {useState,useEffect} from 'react'
import {useRouter,useParams} from "next/navigation"

export default function MealItems() {
  const paramsItem=useParams<{mealItem:string}>()
  return (
    <div>{paramsItem?.mealItem}</div>
  )
}