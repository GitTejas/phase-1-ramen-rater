//Global Variables

const ramenAPI = 'http://localhost:3000/ramens'
const ramenMenu = document.getElementById('ramen-menu')
const ramenDetail = document.getElementById('ramen-detail')
const ramenForm = document.getElementById('new-ramen')
const ratingDisplay = document.getElementById('rating-display')
const commentDisplay = document.getElementById('comment-display')

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
}

let ramenList = [];

ramenForm.addEventListener('submit', addNewRamens)


//GET FETCH
fetch(ramenAPI)
.then(resp => resp.json())
.then(json => {
    ramenList = json
    renderRamens()
})
// if (ramenList.length < 0) {
// fetch(`${ramenAPI}/${ramenList[0].id}`)
// .then(resp => resp.json())
// .then(json => {
//     ramenDetail(renderRamen)
// })}

function renderRamens() {
    ramenMenu.innerHTML = " ";
    ramenList.forEach(renderRamen)
}

function renderRamen(ramens) {
    const ramenImg = document.createElement('div')
    ramenImg.classList.add('ramen-pics')
    ramenImg.innerHTML = `
    <img src= "${ramens.image}" class= "ramen-images"/>
    `;
    ramenMenu.append(ramenImg)
    ramenImg.addEventListener('click', event => {
        showDetails(ramens)
    })
}

//Image Click Shows Details
function showDetails(ramens) {
    let details 
    ramenDetail.innerHTML = `
    <img class="detail-image" src="${ramens.image}" alt="${ramens.name}"/>
    <h2 class="name">${ramens.name}</h2>
    <h3 class="restaurant">${ramens.restaurant}</h3>
    `;
    ratingDisplay.textContent = `${ramens.rating}`
    commentDisplay.textContent = `${ramens.comment}`
}

//Submit New Ramen
function addNewRamens() {
    const form = event.target
    const addRamens = {
        name: form.name.value,
        restaurant: form.restaurant.value,
        image: form.image.value,
        rating: form.rating.value,
        comment: form['new-comment'].value
    }
    //POST FETCH
        fetch(ramenAPI, {
            headers,
            method: 'POST', 
            body: JSON.stringify(addRamens)
        })
        .then(resp => resp.json())
        .then(json => {
            ramenList.push(json)
            renderRamens()
            form.reeset()
        })
    }

