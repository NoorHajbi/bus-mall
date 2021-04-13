'use strict';

/*

don’t forget a custom font, color palette, layout with semantic HTML, and so on.
img width height
---
Create a constructor function that creates an object associated with each product,
and has the following properties:
Name of the product
File path of image
Times the image has been shown

---
For each of the three images, increment its property of times it has been shown by one.
---
After voting rounds have been completed, remove the event listeners on the product.
Add a button with the text View Results,
which when clicked displays the list of all the products followed by the votes received,
and number of times seen for each. Example: banana had 3 votes, and was seen 5 times.
*/

let leftImg= document.getElementById('left-image');
let middleImg= document.getElementById('middle-image');
let rightImg= document.getElementById('right-image');

let maxAttempts=25;
let userAttemptsCounter=0;

let leftImageIndex;
let middleImageIndex;
let rightImageIndex;
//let button = document.createElement('button');

function ImageIndex(name, path) {
  this.name=name;
  this.path = path;
  this.votes=0;
  this.timesShown=0;
  ImageIndex.allImages.push(this);
}

ImageIndex.allImages=[];


// instantces
new ImageIndex('bag','img/bag.jpg');
new ImageIndex('banana','img/banana.jpg');
new ImageIndex('bathroom','img/bathroom.jpg');
new ImageIndex('boots','img/boots.jpg');
new ImageIndex('breakfast','img/breakfast.jpg');
new ImageIndex('bubblegum','img/bubblegum.jpg');
new ImageIndex('chair','img/chair.jpg');
new ImageIndex('cthulhu','img/cthulhu.jpg');
new ImageIndex('dog-duck','img/dog-duck.jpg');
new ImageIndex('dragon','img/dragon.jpg');
new ImageIndex('pen','img/pen.jpg');
new ImageIndex('pet-sweep','img/pet-sweep.jpg');
new ImageIndex('scissors','img/scissors.jpg');
new ImageIndex('shark','img/shark.jpg');
new ImageIndex('sweep','img/sweep.png');//png
new ImageIndex('tauntaun','img/tauntaun.jpg');
new ImageIndex('unicorn','img/unicorn.jpg');
new ImageIndex('usb','img/usb.gif');//gif
new ImageIndex('water-can','img/water-can.jpg');
new ImageIndex('wine-glass','img/wine-glass.jpg');

console.log(ImageIndex.allImages);

function generateRandomIndex() {
  return Math.floor(Math.random() * ImageIndex.allImages.length);
}

console.log(generateRandomIndex()); //12

function renderThreeImages() {

  leftImageIndex=generateRandomIndex();
  middleImageIndex= generateRandomIndex();
  rightImageIndex=generateRandomIndex();
  //to dispaly imgs
  while (leftImageIndex===rightImageIndex||middleImageIndex===rightImageIndex||middleImageIndex===leftImageIndex)
  {
    rightImageIndex=generateRandomIndex();
    //middleImageIndex=generateRandomIndex();
  }
  //timesshown
  leftImg.src=ImageIndex.allImages[leftImageIndex].path;
  middleImg.src=ImageIndex.allImages[middleImageIndex].path;
  rightImg.src=ImageIndex.allImages[rightImageIndex].path;
}
renderThreeImages();

// handle clicking:
leftImg.addEventListener('click',handleUserClick);
middleImg.addEventListener('click',handleUserClick);
rightImg.addEventListener('click',handleUserClick);


function handleUserClick(event) {
  console.log(event.target.id);

  // add to attempts
  userAttemptsCounter++;

  console.log(userAttemptsCounter);
  //samer's explination from goat project:
  // if the attempts is lower than the max tries
  // - add to the votes based on the id
  // -render again
  // Else
  // show the list
  // and finaly remove the clicking

  if (userAttemptsCounter<=maxAttempts) {
    if (event.target.id ==='left-image')
      ImageIndex.allImages[leftImageIndex].votes++;
    else if(event.target.id ==='middle-image')
      ImageIndex.allImages[middleImageIndex].votes++;
    else
      ImageIndex.allImages[rightImageIndex].votes++;

    console.log(ImageIndex.allImages);
    renderThreeImages();
  }else{
    //show output
    let list=document.getElementById('resultContainer');
    let imgsResult;


    for (let i = 0; i < ImageIndex.allImages.length; i++) {
      imgsResult=document.createElement('li');
      list.appendChild(imgsResult);

      imgsResult.textContent=`${ImageIndex.allImages[i].name}: ${ImageIndex.allImages[i].votes} votes, and was seen - times`;
    }
    //  remove event listener
    //list.appendChild(button);
    leftImg.removeEventListener('click',handleUserClick);
    middleImg.removeEventListener('click',handleUserClick);
    rightImg.removeEventListener('click',handleUserClick);
  }

}
