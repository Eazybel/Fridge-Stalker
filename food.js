const selected=document.getElementById("food-select")
const lookup=document.getElementById("lookup")
const foodImage=document.getElementById("foodImage")
const ingredients=document.getElementById("ingredients")
const instraction=document.getElementById("instraction")
const blog=document.getElementById("blog")
const tube=document.getElementById("tube")
const title=document.getElementById("title")
const spinner=document.getElementById("spinner")
const disc=document.getElementById("disc")
const option=document.querySelectorAll("option")
const main=document.querySelector("main")
const storage=localStorage.length
for (let i = 0; i < storage; i++) {
   if(localStorage.getItem(i).includes("What to make for dinner tonight??")){
    let replace=localStorage.getItem(i).replace("What to make for dinner tonight??","")
localStorage.setItem(i,replace)
}
const found=`<option value="${localStorage.getItem(i)}">${localStorage.getItem(i)}</option>`
 selected.innerHTML+=found
}

const defaulted=async() =>{
    try {

      spinner.classList.remove("hidden")
    main.style.display="none"
  const res=await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${localStorage.getItem(0)}&number=1&apiKey=111e9b61931c419e856d4712ba13d208`)
  const data=await res.json()
  console.log(data)
  title.innerText=localStorage.getItem(0)
    const id=data.results[0].id
   const res1= await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=111e9b61931c419e856d4712ba13d208`)
    const data1=await res1.json()
     const tubeRes=await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=how+to+make+${data.results[0].title}&type=video&key=AIzaSyAP-oIoX3192ixcZbQ7IwEVYBZ9oTUmreM`)
     const tubeData=await tubeRes.json()
    blog.setAttribute("href",data1.sourceUrl)
    tube.setAttribute("href",data1.sourceUrl)
    instraction.innerHTML=data1.instructions
    console.log(data1)
     tube.setAttribute("src",`https://www.youtube.com/embed/${tubeData.items[0].id.videoId}`)
     foodImage.setAttribute("src",data1.image) 
     disc.innerText="Dish Type: "+data1.dishTypes
     data1.extendedIngredients.forEach(item => {
        ingredients.innerHTML+=`<tr>
                                  <td>${item.name}</td>
                                  <td>${item.amount}</td>
                                  <td>${item.measures.metric.unitLong}</td>
                                </tr>`
     });
  setTimeout(() => {
    spinner.classList.add("hidden")
    main.style.display="block"
  }, 3000);
    } catch (error) {
      alert("Something Went Wrong",error)
    }

}
// defaulted()

lookup.onclick=async()=>{
    
    if (selected.value==="") {
        return alert("Please Select The Dish From The Options")
    }
  try {
    
      main.style.display="none"
    spinner.classList.remove("hidden")
    const res= await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${selected.value}&number=1&apiKey=111e9b61931c419e856d4712ba13d208`)
    const data=await res.json()
   title.innerText=data.results[0].title
    const id=data.results[0].id
    
   

   const res1= await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=111e9b61931c419e856d4712ba13d208`)
    const data1=await res1.json()
     const tubeRes=await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=how+to+make+${data.results[0].title}&type=video&key=AIzaSyAP-oIoX3192ixcZbQ7IwEVYBZ9oTUmreM`)
     const tubeData=await tubeRes.json()
    blog.setAttribute("href",data1.sourceUrl)
    tube.setAttribute("href",data1.sourceUrl)
    instraction.innerHTML=data1.instructions
    console.log(data1)
     tube.setAttribute("src",`https://www.youtube.com/embed/${tubeData.items[0].id.videoId}`)
     foodImage.setAttribute("src",data1.image) 
     disc.innerText="Dish Type: "+data1.dishTypes
     data1.extendedIngredients.forEach(item => {
        ingredients.innerHTML+=`<tr>
                                  <td>${item.name}</td>
                                  <td>${item.amount}</td>
                                  <td>${item.measures.metric.unitLong}</td>
                                </tr>`
        
     });
  
  setTimeout(() => {
    spinner.classList.add("hidden")
    main.style.display="block"
  }, 1000);
  } catch (error) {
    console.log(error)
  }
  setTimeout(() => {
    spinner.classList.add("hidden")
    main.style.display="block"
  }, 3000);
}
