//Global Variables
const ramenAPI = 'http://localhost:3000/ramens'
const ramenMenu = document.getElementById('ramen-menu')
const ramenDetail = document.getElementById('ramen-detail')
const ramenForm = document.getElementById('new-ramen')
const ratingDisplay = document.getElementById('rating-display')
const commentDisplay = document.getElementById('comment-display')
const editForm = document.getElementById('edit-ramen')

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
}

let ramenList = [];

ramenForm.addEventListener('submit', addNewRamens)
editForm.addEventListener('submit', editRamens)

//GET FETCH
fetch(ramenAPI)
.then(resp => resp.json())
.then(json => {
    ramenList = json
    renderRamens()
})

function renderRamens() {
    ramenMenu.innerHTML = " ";
    ramenList.forEach(renderRamen)
        showDetails(ramenList[0])
}

function renderRamen(ramens) {
    const ramenImg = document.createElement('div')
    ramenImg.classList.add('ramen-pics')
    ramenImg.innerHTML = `
    <img src= "${ramens.image}" class= "ramen-images"/>
    <button id="delete-button"> Delete </button>
    `;
    ramenMenu.append(ramenImg)
    ramenImg.addEventListener('click', event => {
        showDetails(ramens)
    })
    const deleteButton = document.getElementById('delete-button')
    deleteButton.addEventListener('click', handleDelete)
}

//Delete Buttom
function handleDelete(event) {

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
            form.reset()
        })
    }

    
//Edit Ramen Rating and Comments
function editRamens(event) {
    event.preventDefault()
    const formEdit = event.value
    const rcChanges = {
        rating: formEdit.rating.value,
        comment: formEdit['new-comment'].value 
    }
    fetch(`${ramenAPI}/${ramenid}`, {
        headers,
        method: "PATCH",
        body: JSON.stringify(rcChanges)
    })
    .then(resp => resp.json())
    .then(json => {
        // ramenList.rating = json.rating
        // ramenList.comment = json.comment

    })
}

    //## Advanced Deliverables


    // if (ramenList.length > 0) {
    //     fetch(`${ramenAPI}/${ramenList[0].id}`)
    //     .then(resp => resp.json())
    //     .then(json => {
    //         showDetails(json)
    //     })}