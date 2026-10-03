"use client"
import {useEffect} from 'react'
export default function page() {
useEffect(()=>{

console.log(Object.keys(localStorage))
},[])
  return (
    <div>page</div>
  )
}