const fs=require("fs")
const drop=document.getElementById("food-select")
const titles=document.getElementById("titles")
const disc=document.getElementById("disc")
const blog=document.getElementById("blog")

    const identifier=async()=>{
        let data1={}
        for (let i = 0; i < localStorage.length; i++) {
    const res= await fetch(`https://api.spoonacular.com/recipes/${localStorage.getItem(i)}/information?includeNutrition=true&apiKey=e17c67078f944c33989fb7b5b4b20f2e`)
    const data=await res.json()
    const {title}=data
    // drop.innerHTML+=`<option value="${title}">${title}</option>`
     data1=data
    }
   const {sourceUrl,couisins}=data1

}
    fs.readFileSync("./file.json",data1)
identifier()

