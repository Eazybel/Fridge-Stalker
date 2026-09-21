import {useState,useEffect} from "react"

export default function Home() {
  const [category,setCategory]=useState({})
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
  },[])
return(

  <>
  {isLoading&& <p>Loading</p>}
  {category&&
  
  console.log(category)
      }
  </>
)
}
