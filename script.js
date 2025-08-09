const find=document.getElementById("find")
const show=document.getElementById("show")
const input1=document.getElementById("input1")
const input2=document.getElementById("input2")
const table=document.getElementById("table")

find.onclick = async()=>{
  if(input1.value===""){
   return alert("Please Insert The Dish Name")
  }
  let ingredient=input1.value
 ingredient=ingredient.replaceAll(",",",+")
    
    try {
      localStorage.clear()
      const res= await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=20&apiKey=048c23bbdc0b4593a4bc33bce794d085`)
    const data=await res.json()
    for (let i = 0; i < data.length; i++) {
      let {id,missedIngredients,usedIngredients,unusedIngredients,title}=data[i]
     localStorage.setItem(i,JSON.stringify({id,missedIngredients,usedIngredients,unusedIngredients,title}))
    }
    window.location="./show.html"
    } catch (error) {
      console.log(error)
    }
}


show.onclick = async()=>{
    
  try {
     if(input2.value===""){
   return alert("Please Insert The Dish Name")
   }
   const res= await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${input2.value}&number=200&apiKey=048c23bbdc0b4593a4bc33bce794d085`)
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