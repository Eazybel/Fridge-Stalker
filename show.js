
const drop=document.getElementById("food-select")
const titles=document.getElementById("titles")
const disc=document.getElementById("disc")
const blog=document.getElementById("blog")
const tube=document.getElementById("tube")
const lookup=document.getElementById("lookup")
const usedingredients=document.getElementById("used-ingredients")
const missedingredients=document.getElementById("missed-ingredients")

const identifier=async()=>{
    for (let i = 0; i < localStorage.length; i++) {
        let recievedAll=localStorage.getItem(i)
        let data=JSON.parse(recievedAll)
       drop.innerHTML+=`<option value="${data.title}">${data.title}</option>`
        
    }
    let recieved=localStorage.getItem(1)
    let data=JSON.parse(recieved)
    let used=data.usedIngredients
    titles.innerText=data.title
       for (let i = 0; i < used.length; i++) {
        usedingredients.innerHTML+=`<tr>
                                  <td>${used[i].name}</td>
                                  <td>${used[i].amount}</td>
                                  <td>${used[i].unit}</td>
                                </tr>`
       }
       let unused=data.unusedIngredients
       let missed=data.missedIngredients
      for (let i = 0; i < missed.length; i++) {
         missedingredients.innerHTML+=`<tr>
                                  <td>${missed[i].name}</td>
                                  <td>${missed[i].amount}</td>
                                  <td>${missed[i].unit}</td>
                                </tr>`
        
      }


const res1= await fetch(`https://api.spoonacular.com/recipes/${data.id}/information?includeNutrition=true&apiKey=6ac0520a7f964f07ae0a80fec737d889`)
    const data1=await res1.json()
     const tubeRes=await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=how+to+make+${data.title}&type=video&key=AIzaSyAP-oIoX3192ixcZbQ7IwEVYBZ9oTUmreM`)
     const tubeData=await tubeRes.json()
    blog.setAttribute("href",data1.sourceUrl)
    tube.setAttribute("href",data1.sourceUrl)
    instraction.innerHTML=data1.instructions
     tube.setAttribute("src",`https://www.youtube.com/embed/${tubeData.items[0].id.videoId}`)
     foodImage.setAttribute("src",data1.image) 
     


      
}
identifier()
lookup.onclick=async()=>{
const res= await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${drop.value}&number=1&apiKey=6ac0520a7f964f07ae0a80fec737d889`)
    const data=await res.json()
    titles.innerText=data.results[0].title
    const id=data.results[0].id
    
   //i stopped here where from this step i will implement the datas needed for thr foods when they clicked from local storage not from api or something else
}