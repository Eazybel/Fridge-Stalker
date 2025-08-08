
const drop=document.getElementById("food-select")
const titles=document.getElementById("titles")
const disc=document.getElementById("disc")
const blog=document.getElementById("blog")
const usedingredients=document.getElementById("used-ingredients")
const missedingredients=document.getElementById("missed-ingredients")

    const identifier=async()=>{
       let recieved=localStorage.getItem(1)
       let data=JSON.parse(recieved)
       let used=data.usedIngredients
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
       titles.innerText=data.title
       console.log(data)
}
identifier()

