type Props = {}
import {useState,useEffect} from 'react'
import {useRouter,useParams} from "next/navigation"
export default function page({}: Props) {
    const paramsItem=useParams<{mealType:string}>()

  return (
    <div>{paramsItem.mealType}</div>
  )
}