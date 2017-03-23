/*
global $:true, window:true, _:true
*/

setTimeout(() => {
  $('.overlay__container').removeClass('init--display');
}, 1000);

$(window).scroll(() => {
  if ($(window).scrollTop() > 10) {
    $('#health-overlay').fadeOut(500);
  }
});

/*
////////////////////////////////////////////////////////////////////////////////
// FORMATTING THE DATA
////////////////////////////////////////////////////////////////////////////////
*/

function formatStream(data) {
  // the individual we're looking for links for
  const PERSON = $('.ch__side-block h4').text();
  const stream = data;

  // iterate through the data, creating an array for all the names in the name key
  // then reassinging the names key in stream to that array
  $.each(data, (k, v) => {
    const names = v.names.split(', ');
    stream[k].names = names;
  });

  // iterate over stream, and if each object's names array contains the name of the
  // individual or 'All', and add that link to the person's related stories div
  $.each(stream, (k, v) => {
    if (_.includes(v.names, PERSON) || _.includes(v.names, 'All')) {
      $('#related-stream').append(`<p><a href='${v.linkurl}'>${v.linktext}</a></p>`);
    }
  });
}

$.ajax({
  dataType: 'json',
  url: 'http://interactives.dallasnews.com/data-store/2017/04-2017-healthcare-crossroads.json',
  success: formatStream,
  cache: false,
});
