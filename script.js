const find=document.getElementById("find")
const show=document.getElementById("show")
const input1=document.getElementById("input1")
const input2=document.getElementById("input2")
const table=document.getElementById("table")

find.onclick = async()=>{
    const res= await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2&apiKey=111e9b61931c419e856d4712ba13d208`)
    const data=await res.json()
    console.log(data)
    console.log(input1.vlaue)
    
}


show.onclick = async()=>{
   const res= await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2&apiKey=111e9b61931c419e856d4712ba13d208`)
   
    const data=await res.json()
    console.log(data.results)
    // localStorage.clear()
    // for (let i = 0; i < data.meals.length; i++) {
    //     localStorage.setItem(i,data.meals[i].strMeal) 
    // }
}