const drop=document.getElementById("food-select")
const titles=document.getElementById("titles")
const disc=document.getElementById("disc")
const blog=document.getElementById("blog")


    const identifier=async()=>{
        for (let i = 0; i < localStorage.length; i++) {
    const res= await fetch(`https://api.spoonacular.com/recipes/${localStorage.getItem(i)}/information?includeNutrition=true&apiKey=ed3941946fc44d8bb13024cd55d5a476`)
    const data=await res.json()
    const {title}=data
    drop.innerHTML+=`<option value="${title}">${title}</option>`
    console.log(title)
}
}
    
identifier()