const find=document.getElementById("find")
const show=document.getElementById("show")
const input1=document.getElementById("input1")
const input2=document.getElementById("input2")
const table=document.getElementById("table")

// find.onclick = async()=>{
//     const res= await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2&apiKey=111e9b61931c419e856d4712ba13d208`)
//     const data=await res.json()
//     console.log(data)
//     console.log(input1.vlaue)
    
// }


show.onclick = async()=>{
    
  try {
     if(input2.value===""){
   return alert("Please Insert The Dish Name")
   }
   const res= await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${input2.value}&number=30&apiKey=ed3941946fc44d8bb13024cd55d5a476`)
    const data=await res.json()
    localStorage.clear()
    for (let i = 0; i < data.results.length; i++) {
        localStorage.setItem(i,data.results[i].title) 
       
    }
window.location="./food.html"
  } catch (error) {
     alert("Please type the exact food name")
  }
}