const selected=document.getElementById("food-select")
const lookup=document.getElementById("lookup")
const blog=document.getElementById("blog")
const tube=document.getElementById("tube")
const title=document.getElementById("title")
const disc=document.getElementById("lookup")
const option=document.querySelectorAll("option")
const storage=localStorage.length
for (let i = 0; i < storage; i++) {
if(localStorage.getItem(i).includes("What to make for dinner tonight??")){
    let replace=localStorage.getItem(i).replace("What to make for dinner tonight??","")
localStorage.setItem(i,replace)
}
const found=`<option value="${localStorage.getItem(i)}">${localStorage.getItem(i)}</option>`
 selected.innerHTML+=found
}
lookup.onclick=async()=>{
    if (selected.value==="") {
        return alert("Please Select The Dish From The Options")
    }
    const res= await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${selected.value}&number=1&apiKey=4854dfadee4748659f43259d2adf18b2`)
    const data=await res.json()
   title.innerText=data.results[0].title
    const id=data.results[0].id
   

   const res1= await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=4854dfadee4748659f43259d2adf18b2`)
    const data1=await res1.json()
     const tubeRes=await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=how+to+make+${data.results[0].title}&type=video&key=AIzaSyAP-oIoX3192ixcZbQ7IwEVYBZ9oTUmreM`)
     const tubeData=await tubeRes.json()
    blog.setAttribute("href",data1.sourceUrl)
    tube.setAttribute("href",data1.sourceUrl)
    console.log(data1)
  
     tube.setAttribute("src",`https://www.youtube.com/embed/${tubeData.items[0].id.videoId}`)
}