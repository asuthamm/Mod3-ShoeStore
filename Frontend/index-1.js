const shoesUrl = 'http://localhost:3000/shoes'
const shoesUl = document.querySelector('ul#shoe-list')


fetch(shoesUrl)
  .then(r => r.json())
//   .then(console.log)
  .then(shoes => shoes.forEach(renderShoes))


function renderShoes(shoe) {
    console.log(shoe)
    const newLi = document.createElement('li')
    newLi.innerText = shoe.name
    newLi.addEventListener('click', e => {
        displayShoe(shoe)
    })
    shoesUl.append(newLi)
    if (shoe.id === 1) {
        displayShoe(shoe)
    }
   

 
}

function displayShoe(shoe) {
    const shoeImg = document.querySelector('img#shoe-image')
    shoeImg.src = shoe.image
    const shoeName = document.querySelector('h4#shoe-name')
    shoeName.innerText = shoe.name
    const shoeDesc = document.querySelector('p#shoe-description.card-text')
    // console.log(shoe.description)
    shoeDesc.innerText = shoe.description
    const shoePrice = document.querySelector('small#shoe-price.text-muted')
    shoePrice.innerText = shoe.price

    const shoeReviews = document.querySelector('ul#reviews-list.list-group.list-group-flush')

    shoe.reviews.forEach(shoe => {
        const newLi = document.createElement('li')
        // console.log(shoe)

        newLi.innerText = shoe.content
        // console.log(shoeReviews, newLi)
        shoeReviews.append(newLi)
    })

}
