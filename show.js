const drop = document.getElementById("food-select");
const titles = document.getElementById("titles");
const disc = document.getElementById("disc");
const blog = document.getElementById("blog");
const tube = document.getElementById("tube");
const lookup = document.getElementById("lookup");
const usedingredients = document.getElementById("used-ingredients");
const missedingredients = document.getElementById("missed-ingredients");

const identifier = async () => {
  for (let i = 0; i < localStorage.length; i++) {
    let recievedAll = localStorage.getItem(i);
    let data = JSON.parse(recievedAll);
    drop.innerHTML += `<option value="${data.title}">${data.title}</option>`;
  }
  let recieved = localStorage.getItem(1);
  let data = JSON.parse(recieved);
  let used = data.usedIngredients;
  titles.innerText = data.title;
  for (let i = 0; i < used.length; i++) {
    usedingredients.innerHTML +=
     `<tbody class="bg-white divide-y divide-gray-100">
    <!-- Example row -->
    <tr>
      <td class="px-6 py-4 text-sm text-gray-700">${used[i].name}</td>
      <td class="px-6 py-4 text-sm text-gray-700">${used[i].amount}</td>
      <td class="px-6 py-4 text-sm text-gray-700">${used[i].unit}</td>
    </tr>
    <!-- Add more rows dynamically -->
  </tbody>`;
  }
  let unused = data.missedIngredients;
  let missed = data.missedIngredients;
  for (let i = 0; i < missed.length; i++) {
    missedingredients.innerHTML += 
    `<tbody class="bg-white divide-y divide-gray-100">
    <!-- Example row -->
    <tr>
      <td class="px-6 py-4 text-sm text-gray-700">${missed[i].name}</td>
      <td class="px-6 py-4 text-sm text-gray-700">${missed[i].amount}</td>
      <td class="px-6 py-4 text-sm text-gray-700">${missed[i].unit}</td>
    </tr>
    <!-- Add more rows dynamically -->
  </tbody>`;
  }

  const res1= await fetch(`https://api.spoonacular.com/recipes/${data.id}/information?includeNutrition=true&apiKey=048c23bbdc0b4593a4bc33bce794d085`)
      const data1=await res1.json()
      //  const tubeRes=await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=how+to+make+${data.title}&type=video&key=AIzaSyAP-oIoX3192ixcZbQ7IwEVYBZ9oTUmreM`)
      //  const tubeData=await tubeRes.json()
      blog.setAttribute("href",data1.sourceUrl)
      // tube.setAttribute("href",data1.sourceUrl)
      instraction.innerHTML=data1.instructions
      //  tube.setAttribute("src",`https://www.youtube.com/embed/${tubeData.items[0].id.videoId}`)
   foodImage.setAttribute("src",data1.image)
};
identifier();
lookup.onclick = async () => {
  let outer;
  for (let i = 0; i < localStorage.length; i++) {
    let parsed = JSON.parse(localStorage.getItem(i));
    if (parsed.title === drop.value) {
      parsed = parsed;
      outer = parsed;
    }
  }
  titles.innerText = outer.title;
  usedingredients.innerHTML= 
  `<tr>
      <th class="px-6 py-3 text-left text-sm font-semibold tracking-wider">Ingredient</th>
      <th class="px-6 py-3 text-left text-sm font-semibold tracking-wider">Amount</th>
      <th class="px-6 py-3 text-left text-sm font-semibold tracking-wider">Unit</th>
    </tr>`;
  missedingredients.innerHTML= 
  `<tr>
      <th class="px-6 py-3 text-left text-sm font-semibold tracking-wider">Ingredient</th>
      <th class="px-6 py-3 text-left text-sm font-semibold tracking-wider">Amount</th>
      <th class="px-6 py-3 text-left text-sm font-semibold tracking-wider">Unit</th>
    </tr>`;
  for (let i = 0; i < outer.usedIngredients.length; i++) {
    usedingredients.innerHTML += 
    `<tbody class="bg-white divide-y divide-gray-100">
    <!-- Example row -->
    <tr>
      <td class="px-6 py-4 text-sm text-gray-700">${outer.usedIngredients[i].name}</td>
      <td class="px-6 py-4 text-sm text-gray-700">${outer.usedIngredients[i].amount}</td>
      <td class="px-6 py-4 text-sm text-gray-700">${outer.usedIngredients[i].unit}</td>
    </tr>
    <!-- Add more rows dynamically -->
  </tbody>`;
  }
  for (let i = 0; i < outer.missedIngredients.length; i++) {
    missedingredients.innerHTML +=
    `<tbody class="bg-white divide-y divide-gray-100">
    <!-- Example row -->
    <tr>
      <td class="px-6 py-4 text-sm text-gray-700">${outer.missedIngredients[i].name}</td>
      <td class="px-6 py-4 text-sm text-gray-700">${outer.missedIngredients[i].amount}</td>
      <td class="px-6 py-4 text-sm text-gray-700">${outer.missedIngredients[i].unit}</td>
    </tr>
    <!-- Add more rows dynamically -->
  </tbody>`;
  }

  console.log(outer);
  const res1= await fetch(`https://api.spoonacular.com/recipes/${outer.id}/information?includeNutrition=true&apiKey=048c23bbdc0b4593a4bc33bce794d085`)
    const data1=await res1.json()
    // const tubeRes=await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=how+to+make+${outer.title}&type=video&key=AIzaSyAP-oIoX3192ixcZbQ7IwEVYBZ9oTUmreM`)
    //    const tubeData=await tubeRes.json()
      blog.setAttribute("href",data1.sourceUrl)
      // tube.setAttribute("href",https://www.youtube.com/embed/${tubeData.items[0].id.videoId})
      instraction.innerHTML=data1.instructions
      //  tube.setAttribute("src",`https://www.youtube.com/embed/${tubeData.items[0].id.videoId}`)
   foodImage.setAttribute("src",data1.image)
    console.log(data1)
};
