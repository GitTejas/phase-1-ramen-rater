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

//Submit for event listener
ramenForm.addEventListener('submit', addNewRamens)

 
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
    const idRamenImage = `rmn-id${ramens.id}`
    const deleteButtonID = `delete-btn${ramens.id}`
    ramenImg.innerHTML = `
    <img src= "${ramens.image}" class= "ramen-images" id= "${idRamenImage}"/>
    <button id="${deleteButtonID}"> Delete </button>
    `;
    ramenMenu.append(ramenImg)
    ramenImg.addEventListener('click', (event) => {
        showDetails(ramens)
    })
    const deleteButton = document.getElementById(deleteButtonID)
    deleteButton.addEventListener('click',handleDelete)
}

    //Delete Buttom
function handleDelete(event) {
    // Remove the ramen element from the ramen-menu div
    const index = ramenList.findIndex(ramen => ramen.id === ramenList.id);

    // Remove the ramen from the array
    ramenList.splice(index, 1);

    fetch(ramenAPI, {
        headers,
        method: "DELETE",
    })
    .then(resp => resp.json())
    .then(deletedRamen => {
        ramenDetail.style.display = "none"; 
        ratingDisplay.style.display = "none";
        commentDisplay.style.display = "none";
        
        renderRamens();
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
    event.preventDefault()
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

    //Edit for event listener    
 editForm.addEventListener('submit', editRamens)

//Edit Ramen Rating and Comments
function editRamens(event) {
    event.preventDefault();
    const form = event.target;
    const updatedRating = form.rating.value;
    const updatedComment = form['new-comment'].value;

    // Update the displayed details
    ratingDisplay.textContent = updatedRating;
    commentDisplay.textContent = updatedComment;

    form.reset();

    
    //PATCH ATTEMPT
      //Use for loop to grab the API link for all the IDS
      for (const ramen of ramenList) {
        const ramenIda = ramen.id;
        const idLink = `${ramenAPI}/${ramenIda}`;
        fetch(idLink, {
            headers,
            method: 'PATCH', 
            body: JSON.stringify({
                rating: updatedRating,
                comment: updatedComment,
            }),
        })
        .then(resp => resp.json())
        .then(json => {
            updatedRating.value = ramenIda.rating
            updatedComment.value = ramenIda.comment
        })
        .catch(error => {
            console.error('Error updating ramen:', error);
        });
    }
    }
