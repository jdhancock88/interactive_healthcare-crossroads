/*
global $:true, window:true, _:true, Handlebars:true
*/


/*
////////////////////////////////////////////////////////////////////////////////
// BUILDING THE LATEST PAGE
////////////////////////////////////////////////////////////////////////////////
*/

function buildLatest(stream) {
  const latestTemplate = Handlebars.compile($('#hc-latest').html());

  Handlebars.registerHelper('splitName', (passedString) => {
    const firstLast = passedString.split(' ');
    let last = firstLast[1];
    last = last.toLowerCase();
    return new Handlebars.SafeString(last);
  });

  Handlebars.registerHelper('ifAll', function (a, b, opts) {
    if (a !== b) {
      return opts.fn(this);
    }
  });

  $.each(stream, (k, v) => {
    const latest = latestTemplate(v);
    $('#latest').append(latest);
  });
}


/*
////////////////////////////////////////////////////////////////////////////////
// FORMATTING THE DATA
////////////////////////////////////////////////////////////////////////////////
*/

function formatStream(data) {
  // the individual we're looking for links for
  const PERSON = $('.ch__side-block h4').text();
  let stream = data;

  // iterate through the data, creating an array for all the names in the name key
  // then reassinging the names key in stream to that array
  $.each(data, (k, v) => {
    const names = v.names.split(', ');
    stream[k].names = names;
  });

  stream = stream.reverse();

  // if we are on the latest updates page, build the stream of updates
  if ($('#latest').length > 0) {
    buildLatest(stream);
  }

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
  url: 'https://interactives.dallasnews.com/data-store/2017/04-2017-healthcare-crossroads.json',
  success: formatStream,
  cache: false,
});
