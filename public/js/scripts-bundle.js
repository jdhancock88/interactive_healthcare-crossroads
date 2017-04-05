'use strict';

/* global $:true */

$('#stories').click(function () {
  console.log('click');
  $('#story-panel').addClass('story--display');
  $('body').addClass('no--scroll');
});

$('.story__close').click(function () {
  $('#story-panel').removeClass('story--display');
  $('body').removeClass('no--scroll');
});
"use strict";

$(document).ready(function () {
    // injecting current year into footer
    // DO NOT DELETE

    var d = new Date();
    var year = d.getFullYear();

    $('.copyright').text(year);

    // some code blocks require javascript to function, like slideshows, synopsis blocks, etc
    // you can find that code here: https://github.com/DallasMorningNews/generator-dmninteractives/wiki/Cookbook

    // closes any header dropdown menus and resets the up/down chevron
    function closeList() {
        $(".open-list").removeClass("open-list");
        $(".open-button").removeClass("open-button");
    }

    var $hedButton = $(".header-group button");

    // clicking any of the header dropdown menu buttons (i.e. "topics", or "my account")
    $hedButton.click(function (e) {

        // if the button that is clicked is already open, close the menu, else, close the
        // menu then open the selected menu
        if ($hedButton.hasClass("open-button") === true && $(this).hasClass("open-button") === true) {
            closeList();
        } else {
            closeList();
            $(this).addClass("open-button");
            $(this).siblings("ul").addClass("open-list");
        }
        e.stopPropagation();
    });

    // clicking anywhere in the body should close any open menus
    $("body").click(function () {
        closeList();
    });

    // if the user is signed in, add the subscribed class to the body, which will reveal
    // the proper my account menu items.
    if (document.cookie.indexOf("DMN-P") >= 0) {
        $("body").addClass("subscribed");
    } else {
        $("body").removeClass("subscribed");
    }
});
'use strict';

/*
global $:true, window:true, _:true, Handlebars:true
*/

/*
////////////////////////////////////////////////////////////////////////////////
// BUILDING THE LATEST PAGE
////////////////////////////////////////////////////////////////////////////////
*/

function buildLatest(stream) {
  var latestTemplate = Handlebars.compile($('#hc-latest').html());

  Handlebars.registerHelper('splitName', function (passedString) {
    var firstLast = passedString.split(' ');
    var last = firstLast[1];
    last = last.toLowerCase();
    return new Handlebars.SafeString(last);
  });

  Handlebars.registerHelper('ifAll', function (a, b, opts) {
    if (a !== b) {
      return opts.fn(this);
    }
  });

  $.each(stream, function (k, v) {
    var latest = latestTemplate(v);
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
  var PERSON = $('.ch__side-block h4').text();
  var stream = data;

  // iterate through the data, creating an array for all the names in the name key
  // then reassinging the names key in stream to that array
  $.each(data, function (k, v) {
    var names = v.names.split(', ');
    stream[k].names = names;
  });

  stream = stream.reverse();

  // if we are on the latest updates page, build the stream of updates
  if ($('#latest').length > 0) {
    buildLatest(stream);
  }

  // iterate over stream, and if each object's names array contains the name of the
  // individual or 'All', and add that link to the person's related stories div
  $.each(stream, function (k, v) {
    if (_.includes(v.names, PERSON) || _.includes(v.names, 'All')) {
      $('#related-stream').append('<p><a href=\'' + v.linkurl + '\'>' + v.linktext + '</a></p>');
    }
  });
}

$.ajax({
  dataType: 'json',
  url: 'https://interactives.dallasnews.com/data-store/2017/04-2017-healthcare-crossroads.json',
  success: formatStream,
  cache: false
});
//# sourceMappingURL=scripts-bundle.js.map
