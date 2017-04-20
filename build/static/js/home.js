/* global $:true window:true */


const MAXSLIDES = 4;
let currentSlide = 0;

/*
--------------------------------------
CHANGING SLIDES
--------------------------------------
*/

// removing the intro overlay if the skip intro button is clicked
function removeIntro() {
  $('#cast-grid').removeClass('noshow');
  $('#intro').fadeOut(1000);
  clearInterval(advanceTimer);
  $('body').removeClass('no--scroll');
}

// clicking the intro_skip button
$('#intro__skip').on('click', removeIntro);
$('#intro__begin').on('click', removeIntro);

// updates the slide, moving forward or backward based on the currentSlide variables
// also updates the slide nav at the bottom of the screen
function updateSlide() {
  // remove our click handlers so we don't gum up the works by advancing mid animation
  $('#arrow__right').off('click');
  $('#arrow__left').off('click');

  // fade out current slide and fade in next/previous slide based on direction
  $('.intro__slide').fadeOut(1000);

  setTimeout(() => {
    $('.intro__slide').eq(currentSlide).fadeIn(1000);

    // update circles, making corresponding circle active
    $('.slide__circle').removeClass('slide--active');
    $('.slide__circle').eq(currentSlide).addClass('slide--active');

    // advancing or rewinding based on which arrow is clicked
    $('#arrow__right').click(() => {
      advanceSlide();
    });
    $('#arrow__left').on('click', rewindSlide);
  }, 1100);
}

// checks if we are not at the end of the slides yet. if not, update currentSlide and
// update slides
function advanceSlide() {
  if (currentSlide < MAXSLIDES) {
    currentSlide += 1;
    updateSlide();
  } else {
    removeIntro();
  }
}

// checks if we are at the first slie. if not, update currentSlide and update slides
function rewindSlide() {
  if (currentSlide > 0) {
    currentSlide -= 1;
    updateSlide();
  }
}

// our timer that will auto advance the slider every 7.1 seconds
// (2.1 seconds for animation, 5 seconds for read time)
const advanceTimer = setInterval(() => { advanceSlide(); }, 7100);

// advancing or rewinding based on which arrow is clicked, if advanced, the auto
// advancing timer is cleared
$('#arrow__right').click(() => {
  clearInterval(advanceTimer);
  advanceSlide();
});
$('#arrow__left').click(() => {
  clearInterval(advanceTimer);
  rewindSlide();
});

function swipeAdvance() {
  advanceSlide();
  clearInterval(advanceTimer);
}

function swipeRewind() {
  rewindSlide();
  clearInterval(advanceTimer);
}

$('#intro').on('swipeleft', swipeAdvance);
$('#intro').on('swiperight', swipeRewind);

/*
--------------------------------------
HOME GRID BEHAVIORS
--------------------------------------
*/

// mousing over an individual lightens it and darkens all the rest
$('.cast__item').on('mouseover', function () {
  $('.cast__item').addClass('cast--faded');
  $(this).removeClass('cast--faded');

  const w = $(window).width();
  const i = $(this).index();
  const row = $(this).parent('.cast__row');
  const rowi = $(this).parent('.cast__row').index();

  // check all the other individuals in the row of the one hovered over
  // if they come before, shift them left, after, shift them right
  $.each(row.children('.cast__item'), function () {
    if ($(this).index() < i) {
      $(this).addClass('cast--shift-left');
    } else if ($(this).index() > i) {
      $(this).addClass('cast--shift-right');
    }
  });

  // if we're on a window width smaller than 800, all the individuals are stacked
  // on top of each other, not in two rows. This checks what row the individual is in
  // and moves all the individuals in the other rows accordingly
  if (w <= 800) {
    $.each($('.cast__row'), function () {
      if ($(this).index() < rowi) {
        $(this).children('.cast__item').addClass('cast--shift-left');
      } else if ($(this).index() > rowi) {
        $(this).children('.cast__item').addClass('cast--shift-right');
      }
    });
  }
});

// when we mouse out of all of the individuals, we're going to remove the shade
// from them, restoring them to their natural order
$('.cast__item').on('mouseout', () => {
  $('.cast__item').removeClass('cast--faded cast--shift-left cast--shift-right');
});
