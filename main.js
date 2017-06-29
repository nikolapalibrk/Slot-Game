var line1 = [],
    line2 = [],
    line3 = [],
    line4 = [],
    line5 = [],
    allLines = [],
    line1Img = [],
    line2Img = [],
    line3Img = [],
    line4Img = [],
    line5Img = [],
    allLinesImg = [],
    imgUrl = ['img/ananas.png','img/ananas.png','img/ananas.png','img/ananas.png',
    'img/watermelon.png','img/watermelon.png','img/watermelon.png','img/watermelon.png',
    'img/lemon.png','img/lemon.png','img/lemon.png',
    'img/grape.png','img/grape.png','img/grape.png',
    'img/cocktail.png','img/cocktail.png',
    'img/cherry.png','img/cherry.png',
    'img/joker.png'
    ],
    audio = new Audio('spin.mp3');

//Kreiranje pocetnog stanja
jQuery(document).ready(function($) {
  $('.column').each(function() {
    makeColumn($(this));
  });
});


function makeColumn(parent) {
        for (var i = 0; i < 3; i++) {
            var rand = Math.floor(Math.random() * imgUrl.length);
            parent.append('<div class="logo" data-img="' + imgUrl[rand] + '"><img src="' + imgUrl[rand] + '"></div>');
        }
}
//Kreiranje novih elemenata i animacija
function moveSlot(parent) {
        for (var i = 0; i < 10; i++) {
            var rand = Math.floor(Math.random() * imgUrl.length);
            parent.prepend('<div class="logo" data-img="' + imgUrl[rand] + '"><img src="' + imgUrl[rand] + '"></div>');
        }
        parent.addClass('animate');
        setTimeout(function  () {
          parent.children('.logo:gt(2)').remove();
          parent.removeClass('animate');
        },1500)
}

$('.roll').on('click', function() {
  $(this).removeAttr('disabled').css('backgroundColor', 'grey');
  $(this).attr('disabled', 'disabled');
  audio.play();
  moveSlot($('.column1'));

  setTimeout(function  () {
    moveSlot($('.column2'));
  }, 200);

  setTimeout(function  () {
    moveSlot($('.column3'));
  }, 350);

  setTimeout(function  () {
    moveSlot($('.column4'));
  }, 500);

  setTimeout(function  () {
    moveSlot($('.column5'));
  }, 650);
  setTimeout(checkCombination, 2150);
});

//Screen change
$('.goPlay').on('click', function() {
  $('.info').css({
    display: 'none'});
  $('.game').css({
    display: 'flex'});
});
$('.infoBtn').on('click', function() {
  $('.info').css({
    display: 'flex'});
  $('.game').css({
    display: 'None'});
});

//Kreiranje linija (niz elemenata)
function checkCombination() {
  $('.roll').removeAttr('disabled').css('backgroundColor', 'tomato');
  var col = document.getElementsByClassName('column');
  for (var i = 0; i < 5; i++) {
    line1Img.push(col[i].children[0].dataset.img);
    line2Img.push(col[i].children[1].dataset.img);
    line3Img.push(col[i].children[2].dataset.img);
  }
  line4Img.push(col[0].children[0].dataset.img, col[1].children[1].dataset.img, col[2].children[2].dataset.img, col[3].children[1].dataset.img, col[4].children[0].dataset.img);
  line5Img.push(col[0].children[2].dataset.img, col[1].children[1].dataset.img, col[2].children[0].dataset.img, col[3].children[1].dataset.img, col[4].children[2].dataset.img);
  allLinesImg.push(line1Img, line2Img, line3Img, line4Img, line5Img);

  for (var i = 0; i < 5; i++) {
    line1.push(col[i].children[0]);
    line2.push(col[i].children[1]);
    line3.push(col[i].children[2]);
  }
  line4.push(col[0].children[0], col[1].children[1], col[2].children[2], col[3].children[1], col[4].children[0]);
  line5.push(col[0].children[2], col[1].children[1], col[2].children[0], col[3].children[1], col[4].children[2]);
  allLines.push(line1, line2, line3, line4, line5);

  alertWin();
}

Array.prototype.allValuesSame = function() {

    for (var i = 1; i < this.length; i++) {
        if(this[i] !== this[0])
            return i;
    }

    return i - 1;
}


//// Provera da li su isti i alert ///

function alertWin () {
  var help = [];
  for (var i = 0; i < allLinesImg.length; i++) {
    help.push(allLinesImg[i].allValuesSame());
  }
  for (var i = 0; i < allLines.length; i++) {
    if (help[i]>1) {
    for (var x = 0; x < help[i]; x++) {
          allLines[i][x].classList.add('oboj' + i);
        }
    }
  }
  help.length = 0;
  var firstCom = $('.oboj0');
  var secCom = $('.oboj1');
  var thirdCom = $('.oboj2');
  var fourthCom = $('.oboj3');
  var fifthCom = $('.oboj4');
  var arej = [];
  if(firstCom.length > 0){
    firstCom.addClass('highlight1');
  }
  if(secCom.length > 0){
    if (firstCom.length > 0) {
      setTimeout(function  () {
        secCom.addClass('highlight2')
      },400)
    }
    else {
      secCom.addClass('highlight2')
    }
  }

  if (thirdCom.length > 0) {
    if (firstCom.length > 0 && secCom.length > 0) {
      setTimeout(function  () {
        thirdCom.addClass('highlight3')
      }, 800)
    }
    else if(firstCom.length > 0 || secCom.length > 0){
      setTimeout(function  () {
        thirdCom.addClass('highlight3')
      },400)
    }
    else {
      thirdCom.addClass('highlight3')
    }
  }

  if (fourthCom.length > 0) {
    if (firstCom.length > 0 && secCom.length > 0 && thirdCom.length > 0) {
      setTimeout(function  () {
        fourthCom.addClass('highlight4')
      }, 1200)
    }
    else if((firstCom.length > 0 && secCom.length > 0) || (secCom.length > 0 && thirdCom.length > 0) || (firstCom.length > 0 && thirdCom.length > 0)){
      setTimeout(function  () {
        fourthCom.addClass('highlight4')
      },800)
    }
    else if(firstCom.length > 0 || secCom.length > 0 || thirdCom.length > 0) {
      setTimeout(function  () {
        fourthCom.addClass('highlight4')
      }, 400)
    }
    else {
      fourthCom.addClass('highlight4')
    }
  }
  if (fifthCom.length > 0) {
    if (firstCom.length > 0 && secCom.length > 0 && thirdCom.length > 0 && fourthCom.length > 0) {
      setTimeout(function  () {
        fifthCom.addClass('highlight5')
      }, 1600)
    }
    else if((firstCom.length > 0 && secCom.length > 0 && thirdCom.length > 0) || (firstCom.length > 0 && secCom.length > 0 && fourthCom.length > 0) || (firstCom.length > 0 && thirdCom.length > 0 && fourthCom.length > 0) || (secCom.length > 0 && thirdCom.length > 0 && fourthCom.length > 0)){
      setTimeout(function  () {
        fifthCom.addClass('highlight5')
      },1200)
    }
    else if((firstCom.length > 0 && secCom.length > 0) || (firstCom.length > 0 && thirdCom.length > 0) || (firstCom.length > 0 && fourthCom.length > 0) || (secCom.length > 0 && thirdCom.length > 0) || (secCom.length > 0 && fourthCom.length > 0) || (thirdCom.length > 0 && fourthCom.length > 0)) {
      setTimeout(function  () {
        fifthCom.addClass('highlight5')
      }, 800)
    }
    else if(firstCom.length > 0 || secCom.length > 0 || thirdCom.length > 0 || fourthCom.length > 0) {
      setTimeout(function  () {
        fifthCom.addClass('highlight5')
      }, 400)
    }
    else {
      fifthCom.addClass('highlight5')
    }
  }

  //Brisanje svih array-a
  help.length = 0;

  for (var i = 0; i < allLines.length; i++) {
    allLines[i].length = 0;
  }

  allLines.length = 0;

  for (var i = 0; i < allLinesImg.length; i++) {
    allLinesImg[i].length = 0;
  }
  allLinesImg.length = 0;
}
