const button = document.getElementById("button")
const input = document.getElementById("input")

let array = []

button.addEventListener("click", function () {
  console.log("The button was clicked")

  let searchTerm = input.value

  fetchSearch(searchTerm)
})

async function fetchSearch(searchTerm) {
  array = []
  const response = await fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchTerm}`)

  let data = await response.json()
  data.forEach(item => array.push(item))
  displayItems()
}

const displayItems = () => {
  const allItems = document.getElementById("results")
  allItems.innerHTML = ""
  array.map(item => {
    // Create text for item
    const li = document.createElement("li")
    let website = item.website_url ? item.website_url : "Website Unavailable"
    li.innerText = `${item.name}, ${item.city}, ${website}`

    // Create heart for item
    const heart = document.createElement("i")
    heart.classList.add("fas")
    heart.classList.add("fa-heart")
    heart.setAttribute("id", "heart")
    heart.setAttribute("onclick", "heartTransition(this)")
    li.appendChild(heart)
    allItems.appendChild(li)
  })
}

const heartTransition = element => {
  element.classList.add("red")
}
