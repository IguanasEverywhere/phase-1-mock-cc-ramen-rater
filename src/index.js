// write your code here
let allRamen;
const ramenMenu = document.querySelector('#ramen-menu');

function getAllRamen() {
  fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(ramens => {
      allRamen = ramens;
      displayRamenDetail(allRamen[0]);
      ramenMenu.innerHTML = '';
      allRamen.forEach(ramen => appendRamensToDom(ramen))
    })
}
getAllRamen();

function appendRamensToDom(ramen) {
  const ramenMenuImg = document.createElement('img');
  ramenMenuImg.src = ramen.image;
  ramenMenuImg.addEventListener('click', () => {
    displayRamenDetail(ramen);
  })
  ramenMenu.append(ramenMenuImg);
}

function displayRamenDetail(ramen) {
  const ramenDetailImage = document.querySelectorAll('.detail-image')[0];
  const ramenDetailName = document.querySelectorAll('.name')[0];
  const ramenRestaurant = document.querySelectorAll('.restaurant')[0];
  const ramenRating = document.querySelector('#rating-display');
  const ramenComment = document.querySelector('#comment-display');

  ramenDetailImage.src = ramen.image;
  ramenDetailName.textContent = ramen.name;
  ramenRestaurant.textContent = ramen.restaurant;
  ramenRating.textContent = ramen.rating;
  ramenComment.textContent = ramen.comment;
}

const newRamenForm = document.querySelector('#new-ramen');
newRamenForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const ramenNameInputVal = document.querySelector('#new-name').value;
  const ramenRestaurantInputVal = document.querySelector('#new-restaurant').value;
  const ramenImgInputVal = document.querySelector('#new-image').value;
  const ramenRatingInputVal = document.querySelector('#new-rating').value;
  const ramenCommentInputVal = document.querySelector('#new-comment').value;

  let newRamenObj = {
    name: ramenNameInputVal,
    restaurant: ramenRestaurantInputVal,
    image: ramenImgInputVal,
    rating: ramenRatingInputVal,
    comment: ramenCommentInputVal
  }
  allRamen.push(newRamenObj);

  appendRamensToDom(newRamenObj);
})

const editRamenForm = document.querySelector('#edit-ramen');
editRamenForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const editCommentVal = document.querySelector('#edit-comment').value;
  const editRatingVal = document.querySelector('#edit-rating').value;

  const ramenRating = document.querySelector('#rating-display'); // could put these in global to avoid redeclaring
  const ramenComment = document.querySelector('#comment-display');
  ramenRating.textContent = editRatingVal;
  ramenComment.textContent = editCommentVal;
})

const deleteBtn = document.querySelector('#delete-ramen-btn');
deleteBtn.addEventListener('click', () => {
  const ramenDetailName = document.querySelectorAll('.name')[0];
  const ramenRestaurant = document.querySelectorAll('.restaurant')[0];
  deleteCurrentRamen(ramenDetailName.innerHTML, ramenRestaurant.innerHTML)
});

function deleteCurrentRamen(currentName, currentRestaurant) {
  for (let ramen of allRamen) {
    if (ramen.name === currentName && ramen.restaurant === currentRestaurant) {
      let ramenToDeleteIdx = allRamen.indexOf(ramen);
      allRamen.splice(ramenToDeleteIdx, 1);
    }
  }
  let currentRamenSrc = document.querySelectorAll('.detail-image')[0].src;

  for (let i = 0; i < ramenMenu.children.length; i++) {
    if (ramenMenu.children[i].src === currentRamenSrc) {
      ramenMenu.children[i].remove();
    }
  }

  displayRamenDetail(allRamen[0]);


}