
$(function() {
  console.log(document);
  var quiz = window.quiz;

  $('.page-link').click(function(event) {
    var el = event.target;
    var pageName = el.innerHTML.toLowerCase();
    var pageTarget = $('#'+pageName);

    //remove all active pages
    var activePages = $('.page--active');

    for(var c = 0; c < activePages.length; c++) {
      $(activePages[c]).removeClass('page--active');
    }

    console.log(activePages);
    pageTarget.addClass('page--active');

    console.log(pageName);
  });

  quiz._init([
    {
      text: 'Who\'s your daddy?',
      correct: 0,
      choices: [
        {value: 0, text: 'Me'},
        {value: 1, text: 'Not Me'},
      ]
    },
    {
      text: 'What is the largest animal in the planet?',
      correct: 1,
      choices: [
        {value: 0, text: 'Blue Whale'},
        {value: 1, text: 'Yo Momma'},
      ]
    },
    {
      text: 'What\'s the name of THAT bat?',
      correct: 0,
      choices: [
        {value:0, text: 'Lucille'},
        {value:1, text: 'Batty McBatface'},
        {value:2, text: 'BATMan'}
      ]
    }
  ]);

});
