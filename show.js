
const drop=document.getElementById("food-select")
const titles=document.getElementById("titles")
const disc=document.getElementById("disc")
const blog=document.getElementById("blog")

    const identifier=async()=>{
       let recieved=localStorage.getItem(1)
       console.log(JSON.parse(recieved))
}
identifier()

