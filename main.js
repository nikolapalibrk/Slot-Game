var imgUrl = ['img/lemon.png', 'img/ananas.png', 'img/watermelon.png', 'img/cherry.png', 'img/cocktail.png', 'img/grape.png', ]
//Kreiranje pocetnog stanja
jQuery(document).ready(function($) {
    createSlot($('.column1'));
    createSlot($('.column2'));
    createSlot($('.column3'));
    createSlot($('.column4'));
    createSlot($('.column5'));
});

function createSlot(parent) {
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
        parent.children().addClass('blur');
        setTimeout(function  () {
          parent.children('.logo:gt(2)').remove();
          parent.removeClass('animate');
          parent.children().removeClass('blur')
        },1500)
}



$('.roll').on('click', function() {
  var time = 0;
  for (var i = ; i < 6; i++) {
    setTimeout(function() {
      moveSlot($('column' + i));
    }, time);
    time += 200;
  }

  // moveSlot($('.column1'));
  // setTimeout(function  () {
  //   moveSlot($('.column2'));
  // }, 200);
  //
  // setTimeout(function  () {
  //   moveSlot($('.column3'));
  // }, 400);
  //
  // setTimeout(function  () {
  //   moveSlot($('.column4'));
  // }, 600);
  //
  // setTimeout(function  () {
  //   moveSlot($('.column5'));
  // }, 800);
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
