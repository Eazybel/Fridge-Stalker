const find=document.getElementById("find")
const show=document.getElementById("show")
const input1=document.getElementById("input1")
const input2=document.getElementById("input2")
const table=document.getElementById("table")
const popular=document.getElementById("popular")
const spinner=document.getElementById("spinner")
const main=document.querySelector("main")

const random=async()=>{
  main.style.display="none"
  spinner.classList.remove("hidden")
const res=await fetch(`https://api.spoonacular.com/recipes/random?number=12&tags=vegetarian,dessert&apiKey=4a12b45436ee468ab2e129244d4beaaf`)
if (res.status===402) {
  alert("Am sorry too many request for today try again tomorrow")
}

const data=await res.json()
data.recipes.forEach(food => {
  const {title,image}=food
  popular.innerHTML+=`<div class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
        <img src="${image}" class="w-full h-48 object-cover"  />
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800">${title}</h3>
        </div>
      </div>`
});

}
random().then(()=>{
     main.style.display="block"
  spinner.classList.add("hidden")
})



find.onclick = async()=>{
  if(input1.value===""){
   return alert("Please Insert The Dish Name")
  }
  let ingredient=input1.value
 ingredient=ingredient.replaceAll(",",",+")
    
    try {
      localStorage.clear()
      const res= await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=20&apiKey=4a12b45436ee468ab2e129244d4beaaf`)
      if (res.status===402) {
  alert("Am sorry too many request for today try again tomorrow")
}

    const data=await res.json()
     if (data.length<1) {
      return alert("Please insert the Ingredients the correct Way")
    }
    for (let i = 0; i < data.length; i++) {
      let {id,missedIngredients,usedIngredients,unusedIngredients,title}=data[i]
     localStorage.setItem(i,JSON.stringify({id,missedIngredients,usedIngredients,unusedIngredients,title}))
    }
    window.location="./find.html"
    } catch (error) {
      console.log(error)
    }
}


show.onclick = async()=>{
    
  try {
    main.style.display="none"
  spinner.classList.remove("hidden")
     if(input2.value===""){
   return alert("Please insert the Dish name")
   }
   const res= await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${input2.value}&number=200&apiKey=4a12b45436ee468ab2e129244d4beaaf`)
   if (res.status===402) {
  alert("Am sorry too many request for today try again tomorrow")
}
    const data=await res.json()
    if (data.results.length<1) {
      return alert("Please Insert The Correct Name")
    }
    localStorage.clear()
    for (let i = 1; i < data.results.length; i++) {
      let sent=input2.value.toUpperCase()
        localStorage.setItem(0,sent) 
        localStorage.setItem(i,data.results[i].title) 
       
    }
  window.location="./show.html"
  } catch (error) {
     alert("Please type the exact food name")
  }finally{
    main.style.display="block"
  spinner.classList.add("hidden")
  }
}
