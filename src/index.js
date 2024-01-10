//Global Variables
const ramenAPI = 'http://localhost:3000/ramens'
const ramenMenu = document.getElementById('ramen-menu')
const ramenDetail = document.getElementById('ramen-detail')
const ramenForm = document.getElementById('new-ramen')
const ratingDisplay = document.getElementById('rating-display')
const commentDisplay = document.getElementById('comment-display')
const editForm = document.getElementById('edit-ramen')

let selectedRamenId = null;

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
}

let ramenList = [];
 
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
    const ramenImg = document.createElement('img')
    ramenImg.src = ramens.image
    ramenImg.id =`rmn-id${ramens.id}`
    const deleteButton = document.createElement('button')
    const deleteButtonID = `delete-btn${ramens.id}`
    deleteButton.id = deleteButtonID
    deleteButton.textContent = "DELETE"
    deleteButton.style.display = "in-line"
    deleteButton.style.display = 'block';
    deleteButton.style.width = '80px'; 
    deleteButton.style.height = '20px'; 
    deleteButton.style.backgroundColor = 'lightcoral';

    ramenMenu.append(ramenImg, deleteButton)
    ramenImg.addEventListener('click', event => {
        selectedRamenId = ramens.id; 
        showDetails(ramens)
    })
        deleteButton.addEventListener('click', () => {
         handleDelete(ramens)
        })
    }
    //Delete Buttom
function handleDelete(ramens) {
    const index = ramenList.findIndex(ramen => ramen.id === ramens.id);
    const detailImage = ramenDetail.querySelector('.detail-image')

    // Remove the ramen from the array
    ramenList.splice(index, 1);
    
    fetch(`${ramenAPI}/${ramens.id}`, {
        headers,
        method: "DELETE",
    })
    .then(resp => resp.json())
    .then(deletedRamen => {
        detailImage.src = './assets/image-placeholder.jpg'
        renderRamens();
    })
}

//Image Click Shows Details
function showDetails(ramens) {
    const detailImage = ramenDetail.querySelector('.detail-image')
    detailImage.src = ramens.image
    detailImage.alt = ramens.name
    ramenDetail.querySelector('.name').textContent = ramens.name
    ramenDetail.querySelector('.restaurant').textContent = ramens.restaurant
    ratingDisplay.textContent = ramens.rating
    commentDisplay.textContent = ramens.comment

    ratingDisplay.style.display = "inline";
    commentDisplay.style.display = "block";
}

//Submit for event listener
ramenForm.addEventListener('submit', addNewRamens)

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

//Edit form event listener    
 editForm.addEventListener('submit', editRamens)

//Edit Ramen Rating and Comments
function editRamens() {
    event.preventDefault();
    const form = event.target;
    const updatedRating = form.rating.value;
    const updatedComment = form['new-comment'].value;

// Update the displayed details
    ratingDisplay.textContent = updatedRating;
    commentDisplay.textContent = updatedComment;

    form.reset();

     // PATCH  
     if (selectedRamenId) {
         const idLink = `${ramenAPI}/${selectedRamenId}`;
         fetch(idLink, {
             headers,
             method: 'PATCH',
             body: JSON.stringify({
                 rating: updatedRating,
                 comment: updatedComment,
             }),
         })
         .then(resp => resp.json())
         .then(updatedRamen => {
            updatedRamen
         });
         }
     }