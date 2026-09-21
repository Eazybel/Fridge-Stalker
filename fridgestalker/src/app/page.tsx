"use client"
type categoryType={
  strCategory:string,
  strCategoryThumb:string,
  strCategoryDescription:string

}
import {useState,useEffect} from "react"
import Image from "next/image"
export default function Home() {
  const [category,setCategory]=useState<categoryType[]|undefined>([])
  const [isLoading,setLoad]=useState(true)
  const [error,setError]=useState({})
  useEffect(()=>{
const fetchCategory=async()=>{
const res=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
if(!res.ok){
  setError(res)
}else{
const data=await res.json()
setCategory(data)
setLoad(false)
}
}
fetchCategory()
  },[])
return(

  <>
  {isLoading&& <p>Loading</p>}
  {error&&console.log(error)}
  {category&&

  <>
  {
    category.map((categories:categoryType,index:number)=>{
 
   return <div key={index}>
      <h1>{categories.strCategory}</h1>
      <p>{categories.strCategoryDescription}</p>
      <Image
      src={`${categories.strCategoryThumb}`}
      alt="category Image"
      width={200}
      height={200}
      />
    </div>
  
 })
  }
  </>
  }
      {category&&console.log(category)}
  </>
)
}
