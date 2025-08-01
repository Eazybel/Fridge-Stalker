const find=document.getElementById("find")

find.onclick = async()=>{
    const res= await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Pizza")
    const data=await res.json()
    console.log(data)
}
const show=document.getElementById("find")

show.onclick = async()=>{
    const res= await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Pizza")
    const data=await res.json()
    console.log(data)
}