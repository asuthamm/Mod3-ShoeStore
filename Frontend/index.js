const shoesUrl = 'http://localhost:3000/shoes'
const shoesUl = document.getElementById("shoe-list")
const shoeMain = document.getElementById("main-shoe")
const shoeImg = document.getElementById('shoe-image')
const shoeName = document.getElementById("shoe-name")
const shoeDesc = document.getElementById("shoe-description")
const shoePrice = document.getElementById("shoe-price")
const formContainer = document.getElementById("form-container")
const ReviewsUl = document.getElementById("reviews-list")

function initialLoad() {
    fetch(shoesUrl)
      .then(r => r.json())
    //   .then(shoesArr => shoesArr.forEach(renderList))
    //   .then(console.log)
      .then((obj) => {
          obj.forEach((shoe) => {
            renderList(shoe)
          })
      })
}

function renderList(shoe) {
    // console.log(shoe)
    const shoeLi = document.createElement('li')
    shoeLi.className = "list-group-item"
    shoeLi.innerText = shoe.name 
    // shoeLi.addEventListener('click', e => {
    //     renderMain(shoe)
    // })
    shoesUl.append(shoeLi)
    if (shoe.id === 1) {
        renderMain(shoe)
    }
    
    shoeLi.addEventListener('click', e => {
        renderMain(shoe)
    })

}

function renderMain(shoe) {
    shoeImg.src = shoe.image
    shoeName.innerText = shoe.name  
    shoeDesc.innerText = shoe.description
    shoePrice.innerText = shoe.price
    
    renderForm(shoe)
}

function renderForm(shoe) {
    formContainer.innerHTML = ""
    const shoeForm = document.createElement('form')
    shoeForm.id="new-review"
    shoeForm.innerHTML = `
    <div class="form-group">
    <textarea class="form-control" id="review-content" rows="3"></textarea>
    <input type="submit" class="btn btn-primary"></input>
    </div>
    `
    formContainer.append(shoeForm)
    shoeForm.addEventListener('submit', e => {
        e.preventDefault()
        const newRev = e.target["review-content"].value
        console.log(newRev)
        // postFetch(shoe, newRev)
    })
    renderReviews(shoe)
}

function renderReviews(shoe) {
    // console.log(shoe.reviews)
    ReviewsUl.innerHTML = ""
    shoe.reviews.forEach(rev => {
        renderOneReview(rev)
    })
}

function renderOneReview(rev) {
    // console.log(rev)
    shoeLi = document.createElement('li')
    shoeLi.className = "list-group-item"
    shoeLi.innerText = rev.content
    ReviewsUl.append(shoeLi)
}

function postFetch(shoe, newRev) {
    fetch(`http://localhost:3000/shoes/${shoe.id}/reviews`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            "content": newRev
        })
    })
    .then(r => r.json())
    // .then(console.log)      // str of reivew text
    // .then(revObj => {
    //     renderOneReview(revObj)
    //     shoe.reviews.push(revObj)
    // })
}

initialLoad()