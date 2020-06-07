const shoesUrl = 'http://localhost:3000/shoes'
const shoesUl  = document.querySelector("ul#shoe-list")
const shoeImg  = document.getElementById("shoe-image")
const shoeName = document.getElementById("shoe-name")
const shoeDesc = document.getElementById("shoe-description")
const shoePrice = document.getElementById("shoe-price")
const formContainer = document.getElementById("form-container")
const reviewUL = document.getElementById("reviews-list")

fetch(shoesUrl)
.then(r => r.json())
.then(shoesArr => shoesArr.forEach(renderShoeList))

function renderShoeList(shoe) {
    // console.log(shoe)
    const shoeLi = document.createElement('li')
    shoeLi.className = "list-group-item"
    shoeLi.innerText = shoe.name
    shoesUl.append(shoeLi)
    
    if (shoe.id === 1) {
        renderMain(shoe) 
    }

    shoeLi.addEventListener('click', e => {
        renderMain(shoe)
        // console.log(shoe.id)
    })
    
    function renderMain(shoe) {
        // console.log(shoe.image)
        shoeImg.src = shoe.image
        shoeName.innerText = shoe.name
        shoeDesc.innerText = shoe.description
        shoePrice.innerText = shoe.price

        renderShoeForm(shoe)
        renderRevLi(shoe)
    }

    function renderShoeForm(shoe) {
        formContainer.innerHTML = ""
        shoeForm = document.createElement('form')
        shoeForm.className = "new-review"
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
            // console.log(shoe.id)
            fetch(`http://localhost:3000/shoes/${shoe.id}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: newRev
                })
            })
              .then(r => r.json())
              .then(newRev => {
                addEachRevToLi(newRev)
                shoe.reviews.push(newRev)
              })
        })
    }

    function renderRevLi(shoe) {
        reviewUL.innerHTML = ""
        // console.log(shoe.reviews)
        shoe.reviews.forEach(revObj => {
            addEachRevToLi(revObj)
        })
    }

    function addEachRevToLi(revObj) {
        const reviewLi = document.createElement('li')
        reviewLi.innerText = revObj.content
        reviewUL.append(reviewLi)
    }
}