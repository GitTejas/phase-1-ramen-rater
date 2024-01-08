// write your code here 
const ramenMenu = document.getElementById('ramen-menu')
const ramenURL = 'http://localhost:3000/ramens'
const ramenForm = document.getElementById('new-ramen')
const ramenDetail = document.getElementById('ramen-detail')
const ratingDisplay = document.getElementById('rating-display');
const commentDisplay = document.getElementById('comment-display');

const headers = {
    Accept: "application/json",
   "Content-Type": "application/json",
 }

 let ramenList = [];

 ramenForm.addEventListener('submit', addNewRamen)


 fetch(ramenURL)
 .then(resp => resp.json())
 .then(json => {
    ramenList = json
    renderRamens()
 })

function renderRamens() {
    ramenMenu.innerHTML = " ";
    ramenList.forEach(renderRamen)
}

function renderRamen(ramens) {
    const ramenImg = document.createElement(`div`)
    ramenImg.classList.add('ramen-thing')
    ramenImg.innerHTML = `
    <img src= "${ramens.image}" class= "ramen-pictures"/>
    <button class="delete-button" data-id="${ramens.id}">Delete</button>
    `;
    ramenMenu.append(ramenImg)

    ramenImg.addEventListener('click', event => {
        renderDetails(ramens)  
    })
 }

  function renderDetails(ramens) { 
    ramenDetail.innerHTML = `
      <img class="detail-image" src="${ramens.image}" alt="${ramens.name}"/>
      <h2 class="name">${ramens.name}</h2>
      <h3 class="restaurant">${ramens.restaurant}</h3>
    `
    ratingDisplay.textContent = `${ramens.rating}`;
    commentDisplay.textContent = ramens.comment;
  }

 function addNewRamen(event) {
    event.preventDefault()
    form = event.target
    const newRamen = {
        name: form.name.value,
        restaurant: form.restaurant.value,
        image: form.image.value,
        rating: form.rating.value,
        comment: form['new-comment'].value
    }

    fetch(ramenURL, {
        headers,
        method: "POST",
        body: JSON.stringify(newRamen)
    })
    .then(resp => resp.json())
    .then(json => {
        ramenList.push(json)
        renderRamens()
        form.reset()
    })
 }





 //// Advanced ///
//  // Fetch the details for the first ramen on page load
//  fetch(`${ramenURL}/${ramenList[0].id}`)
//  .then((resp) => resp.json())
//  .then((json) => {
//    renderDetails(json);
//  });