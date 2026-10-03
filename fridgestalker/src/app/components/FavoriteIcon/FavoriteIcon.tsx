import {useState,useEffect} from "react"
import {MealsType} from "@/app/(routes)/category/[mealItem]/page"
type propsType={
  currentMeal:string
}

export default function FavoriteIcon(props:propsType) {
const [check,setCheck]=useState<boolean>(false)
const {currentMeal}=props
useEffect(()=>{
if(localStorage.getItem(currentMeal)==="true"){
  setCheck(true)
}else{
  setCheck(false)
}
},[])
const changeHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
const checker=e.target.checked
if(checker){
  localStorage.setItem(currentMeal,"true")
  setCheck(true)
}else{
  setCheck(false)
  localStorage.setItem(currentMeal,"false")
}
}
  return (
     <div className="absolute top-3 right-3 z-10">
            <label className="relative flex items-center justify-center p-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-md cursor-pointer hover:bg-white transition-all">
              <input checked={check} onChange={changeHandler} type="checkbox" className="peer sr-only" />
              <svg
                className="w-5 h-5 text-gray-500 peer-checked:text-rose-500 peer-checked:fill-rose-500 transition-colors"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </label>
          </div>
  )
}