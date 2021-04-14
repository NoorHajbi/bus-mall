'use strict';
/*ideas before code: if one of them included ,
 generate a new random number,
 3 elements
cuz every3 imgs replaced by new 3 imges */
let imgContainer = document.getElementById('imgContainer');
let button=document.getElementById('button');
let leftImg= document.getElementById('left-image');
let middleImg= document.getElementById('middle-image');
let rightImg= document.getElementById('right-image');

let maxAttempts=25;
let userAttemptsCounter=0;

let leftImageIndex;
let middleImageIndex;
let rightImageIndex;
let nameArray=[];
let votesArray=[];
let timesShownArray=[];
function ImageIndex(name, path) {
  this.name=name;
  this.path = path;
  this.votes=0;
  this.timesShown=0;
  ImageIndex.allImages.push(this);
  nameArray.push(this.name);
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
  let leftImg1= leftImageIndex,
    rightImg1= rightImageIndex, middleImg1 = middleImageIndex;
  //leftImageIndex=generateRandomIndex();
  //middleImageIndex= generateRandomIndex();
  //rightImageIndex=generateRandomIndex();
  //to dispaly imgs and replace repeated images each 2 rounds
  while(leftImg1===leftImageIndex||leftImg1===middleImageIndex||leftImg1===rightImageIndex||
    middleImg1===leftImageIndex||middleImg1===middleImageIndex||middleImg1===rightImageIndex ||
    rightImg1===leftImageIndex||rightImg1===middleImageIndex||rightImg1===rightImageIndex){
    leftImageIndex=generateRandomIndex();
    while (leftImageIndex===rightImageIndex||middleImageIndex===rightImageIndex||middleImageIndex===leftImageIndex)
    {
      rightImageIndex=generateRandomIndex();
      middleImageIndex=generateRandomIndex();
    }
  }
  leftImg.src=ImageIndex.allImages[leftImageIndex].path;
  ImageIndex.allImages[leftImageIndex].timesShown++;
  middleImg.src=ImageIndex.allImages[middleImageIndex].path;
  ImageIndex.allImages[middleImageIndex].timesShown++;
  rightImg.src=ImageIndex.allImages[rightImageIndex].path;
  ImageIndex.allImages[rightImageIndex].timesShown++;
}
renderThreeImages();

// handle clicking:
imgContainer.addEventListener('click', handleUserClick);
//leftImg.addEventListener('click',handleUserClick);
//middleImg.addEventListener('click',handleUserClick);
//rightImg.addEventListener('click',handleUserClick);


function handleUserClick(event) {
  console.log(event.target.id);
  // add to attempts
  userAttemptsCounter++;
  console.log(userAttemptsCounter);
  //add votes
  if (userAttemptsCounter<=maxAttempts) {
    if (event.target.id ==='left-image')
      ImageIndex.allImages[leftImageIndex].votes++;
    else if(event.target.id ==='middle-image')
      ImageIndex.allImages[middleImageIndex].votes++;
    else if(event.target.id ==='right-image')
      ImageIndex.allImages[rightImageIndex].votes++;
    else{ // handle, when user click on the image comtainer and outsides images, we don't need to count anything.
      alert('Please click on the images');
      userAttemptsCounter--;
    }
    console.log(ImageIndex.allImages);
    renderThreeImages();
  }
  else{ //comeback
    //show output
    button.addEventListener('click',showList);
    button.hidden=false;
    /****/
    for (let i = 0; i < ImageIndex.allImages.length; i++) {
      votesArray.push(ImageIndex.allImages[i].votes);
      timesShownArray.push(ImageIndex.allImages[i].timesShown);
    }
    console.log(votesArray);

    // show the chart
    chart();
    imgContainer.removeEventListener('click',handleUserClick);
    //leftImg.removeEventListener('click',handleUserClick);
    //middleImg.removeEventListener('click',handleUserClick);
    //rightImg.removeEventListener('click',handleUserClick);
  }

}

function showList(){
  let imgsResult;
  let list=document.getElementById('resultContainer');
  for (let i = 0; i < ImageIndex.allImages.length; i++) {
    imgsResult=document.createElement('li');
    list.appendChild(imgsResult);
    imgsResult.textContent=`${ImageIndex.allImages[i].name} had ${ImageIndex.allImages[i].votes} votes, and was seen ${ImageIndex.allImages[i].timesShown} times`;
  }
  button.removeEventListener('click',showList);
}
// chart.js
function chart() {
  let ctx = document.getElementById('myChart').getContext('2d');

  let chart= new Chart(ctx,{
    // what type is the chart
    type: 'bar',

    //  the data for showing
    data:{
    //  for the names
      labels: nameArray,

      datasets: [
        {
          label: 'Images votes',
          data: votesArray,
          backgroundColor: [
            'rgb(251, 93, 76)',
          ],

          borderWidth: 1
        },

        {
          label: 'Images shown',
          data: timesShownArray,
          backgroundColor: [
            'black',
          ],

          borderWidth: 1
        }

      ]
    },
    options: {}
  });

}

