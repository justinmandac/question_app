
$(function() {
  console.log(document);
  var quiz = window.quiz;


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
    }
  ]);

});
