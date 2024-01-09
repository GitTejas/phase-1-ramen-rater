const ramenAPI = 'http://localhost:3000/ramens'
const ramenMenu = document.getElementById('ramen-menu')
const ramenDetail = document.getElementById('ramen-detail')
const ramenForm = document.getElementById('new-ramen')
const ratingDisplay = document.getElementById('rating-display')
const commentDisplay = document.getElementById('comment-display')
const editForm = document.getElementById('edit-ramen')

fetch(ramenAPI)
.then(resp => resp.json())
.then(renderRamens);

function renderRamens(ramens) {
ramens.forEach(renderRamenImage)
}

function renderRamenImage(ramen) {
    const ramenImage = document.createElement('img')
    ramenImage.src = ramen.image
    ramenMenu.append(ramenImage)
    ramenImage.addEventListener('click', event => {
        showDetail(ramen)
    })
}

function showDetail(ramen) {
    const detailImage = ramenDetail.querySelector('.detail-image')
    detailImage.src = ramen.image
    detailImage.alt = ramen.name
    ramenDetail.querySelector('.name').textContent = ramen.name
    ramenDetail.querySelector('.restaurant').textContent = ramen.restaurant
    ratingDisplay.textContent = ramen.rating
    commentDisplay.textContent = ramen.comment
}

ramenForm.addEventListener('submit', createRamen)

function createRamen(event) {
    event.preventDefault()
    const form = event.target
    const newRamen = {
        name: form.name.value,
        restaurant: form.restaurant.value,
        image: form.image.value,
        rating: form.rating.value,
        comment: form['new-comment'].value 
    }
    renderRamenImage(newRamen) //Since we are not doing a POST, we can simply run the function that renders our image and pass in the newly created object
}