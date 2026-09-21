import {useState,useEffect} from "react"

export default function Home() {
const [category,setCategory]=useState({})
const [loading,setLoad]=useState(true)
const [error,setError]=useState("")
  useEffect(()=>{
    const fetchData=async()=>{
fetch( `https://www.themealdb.com/api/json/v1/1/categories.php`)
.then(res=>{
  return res.json()
})
.then(data=>{
setCategory(data)
setLoad(false)
})
.catch(error=>{
  setError(error.message)
})
    }
  },[])
  return (<>
  <p>recipi api</p>
  </>);
}
