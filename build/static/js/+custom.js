/* global $:true */

$('#stories').click(() => {
  console.log('click');
  $('#story-panel').addClass('story--display');
  $('body').addClass('no--scroll');
});

$('.story__close').click(() => {
  $('#story-panel').removeClass('story--display');
  $('body').removeClass('no--scroll');
});
