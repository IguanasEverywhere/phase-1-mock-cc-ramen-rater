// write your code here
let allRamen;
const ramenMenu = document.querySelector('#ramen-menu');

function getAllRamen() {
  fetch('http://localhost:3000/ramens')
  .then(res => res.json())
  .then(ramens => {
    allRamen = ramens;
    ramenMenu.innerHTML = '';
    allRamen.forEach(ramen => appendRamensToDom(ramen))

  })
}
getAllRamen();

function appendRamensToDom(ramen) {
  // ramenMenu.innerHTML = '';
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

  appendRamensToDom(newRamenObj)


})