const shoesUrl = 'http://localhost:3000/shoes'
const shoesUl = document.querySelector('ul#shoe-list')
const mainShoeDiv = document.querySelector('div#main-shoe')
const containerDiv = document.querySelector('div#form-container')
const reviewsUl = document.querySelector('ul#reviews-list')

fetch(shoesUrl)
  .then(r => r.json())
//   .then(console.log)
     .then(shoesArr => shoesArr.forEach(shoesList))

   //.then(shoesArr => shoesArr.forEach(shoe => shoesList(shoe)))
  function shoesList(shoe) {
    // console.log(item)
    const listLi = document.createElement('li')
    listLi.className = 'list-group-item'
    listLi.innerText = shoe.name 
    if (shoe.id === 1) {
        renderMainShoe(shoe)
        // reviewList(shoe) 
    }

    listLi.addEventListener('click', e => {
        renderMainShoe(shoe)
        // reviewList(shoe) 
    })
    shoesUl.append(listLi)
  }

function renderMainShoe(shoe) {
    const shoeImg = document.querySelector('img#shoe-image')
    shoeImg.src = shoe.image
    const h4 = document.querySelector('h4#shoe-name')
    h4.innerText = shoe.name
    const p = document.querySelector('p#shoe-description')
    p.innerText = shoe.description
    const prc = document.querySelector('small#shoe-price.text-muted')
    prc.innerText = shoe.price

    renderForm(shoe)
    renderReviews(shoe) 
}

function renderForm(shoe) {

    containerDiv.innerHTML = ''
    shoeForm = document.createElement('form')
    shoeForm.id = "new-review"

    shoeForm.innerHTML = `
    <div class="form-group">
    <textarea class="form-control" id="review-content" rows="3"></textarea>
    <input type="submit" class="btn btn-primary"></input>
    </div>
    `
    containerDiv.append(shoeForm)

    let theTextArea = shoeForm.querySelector("textarea")
    // console.log(theTextArea)

    shoeForm.addEventListener('submit', e => {
        e.preventDefault()
        // console.log(e.target['review-content'].value)
        newRev = e.target['review-content'].value
        newReviewsUpdate(shoe, newRev)
    })
}

function newReviewsUpdate(shoe, newRev) {
    // console.log(shoe, newRev)
    fetch(`http://localhost:3000/shoes/${shoe.id}/reviews`, {
    method: "POST", 
    headers: {
        'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
            content: newRev
        })
    })
    .then(r => r.json())
    .then(revObj => {
        addRevToLi(revObj)
        shoe.reviews.push(revObj)
    })        
}

function renderReviews(shoe) {
    reviewsUl.innerHTML = ''
    shoe.reviews.forEach(revObj => {
        addRevToLi(revObj)    
    })
}

function addRevToLi(revObj) {
    const revLi = document.createElement('li')
    revLi.className = "list-group-item"
    // console.log(rev.content)
    revLi.innerText = revObj.content
    // console.log(revLi)
    reviewsUl.append(revLi)
    // console.log(reviewsUl)
}
