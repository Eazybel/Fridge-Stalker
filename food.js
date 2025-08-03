const selected=document.getElementById("food-select")
const lookup=document.getElementById("lookup")
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
 
   

   const res1= await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2&apiKey=111e9b61931c419e856d4712ba13d208`)
    const data1=await res1.json()
    console.log(data1)
}