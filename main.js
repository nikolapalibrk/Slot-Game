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
    ]
//Kreiranje pocetnog stanja
jQuery(document).ready(function($) {
  $('.column').each(function(index, el) {
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

  moveSlot($('.column1'));

  setTimeout(function  () {
    moveSlot($('.column2'));
  }, 200);

  setTimeout(function  () {
    moveSlot($('.column3'));
  }, 400);

  setTimeout(function  () {
    moveSlot($('.column4'));
  }, 600);

  setTimeout(function  () {
    moveSlot($('.column5'));
  }, 800);
  setTimeout(checkCombination, 2500);
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


function alertWin () {
  console.log(allLines);
  for (var i = 0; i < allLines.length; i++) {
    for (var x = 1; x < allLines[i].length; x++) {
      if
      
      if( (allLines[i][0].children[0].getAttribute('src')) === (allLines[i][x].children[0].getAttribute('src')) ){
        allLines[i][0].style.backgroundColor = 'red';
        allLines[i][x].style.backgroundColor = 'red';
      }
    }
  }
  for (var i = 0; i < allLines.length; i++) {
    allLines[i].length = 0;
  }
  allLines.length = 0;
}
