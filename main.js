var line1 = [],
    line2 = [],
    line3 = [],
    line4 = [],
    line5 = [],
    allLines = [],
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
            parent.append('<div class="logo"><img src="' + imgUrl[rand] + '"></div>');
        }
}
//Kreiranje novih elemenata i animacija
function moveSlot(parent) {
        for (var i = 0; i < 10; i++) {
            var rand = Math.floor(Math.random() * imgUrl.length);
            parent.prepend('<div class="logo"><img src="' + imgUrl[rand] + '"></div>');
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
    line1.push(col[i].children[0]);
    line2.push(col[i].children[1]);
    line3.push(col[i].children[2]);
  }
  line4.push(col[0].children[0], col[1].children[1], col[2].children[2], col[3].children[1], col[4].children[0]);
  line5.push(col[0].children[2], col[1].children[1], col[2].children[0], col[3].children[1], col[4].children[2]);
  allLines.push(line1, line2, line3, line4, line5);
  alertWin();
}

//Provera da li su isti i alert
function alertWin () {
  var winLines = [];
  for (var i = 0; i < allLines.length; i++) {
    for (var x = 1; x < allLines[i].length; x++) {
      if(x === 1){
        if( allLines[i][0].children[0].getAttribute('src') === allLines[i][x].children[0].getAttribute('src') ){
          allLines[i][0].style.backgroundColor = 'seagreen';
          allLines[i][x].style.backgroundColor = 'seagreen';
          allLines[i][0].classList.add('highlight');
          allLines[i][x].classList.add('highlight');
          winLines[winLines.length - 1].push(allLines[i][0], allLines[i][x]);
        }
      }
      else if
        ( allLines[i][0].children[0].getAttribute('src') === allLines[i][x].children[0].getAttribute('src') && allLines[i][x-1].children[0].getAttribute('src') === allLines[i][0].children[0].getAttribute('src') && allLines[i][x-1].style.backgroundColor === 'seagreen'){
          allLines[i][x].style.backgroundColor = 'seagreen';
          allLines[i][x].classList.add('highlight');
          winLines[winLines.length - 1].push(allLines[i][x]);
      }
    }
  }
  for (var i = 0; i < allLines.length; i++) {
    allLines[i].length = 0;
  }
  allLines.length = 0;
}
