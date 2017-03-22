/*
global $:true, window $:true
*/

setTimeout(() => {
  $('.overlay__container').removeClass('init--display');
}, 1000);

$(window).scroll(() => {
  if ($(window).scrollTop() > 10) {
    $('#health-overlay').fadeOut(1000);
  } else {
    $('#health-overlay').fadeIn(1000);
  }
});
