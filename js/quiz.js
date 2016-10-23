(function(document, window, $) {
  'use strict';
  var currentQuestion = 0;
  var quiz;

  quiz = {
    selector: '#quiz',
    el: null,
    currentPage: 'quiz-home',
    quizPages: [],
    questionPages: [],
    nextButtonEl: null,
    previousButtonEl: null,
    questionActiveClass: 'question-page--active',
    _init: function(questions) {

      var count;
      var quizPage = $('#questionPages');
      var buttonStr;
      var questionStr = '';

      var questionsPlaceholder = $('<div/>');

      for(count = 0; count < questions.length; count++) {
        console.log();
        var choices = questions[count].choices;
        var questionDiv = $('<div/>', {
          class: 'question-page',
          'data-index' : count
        });
        var choiceCount;

        buttonStr = ''; //initialize
        choices.forEach(function(choice) {
          buttonStr += '<button class="btn btn-primary">' + choice.text + '</button>';
        });

        questionDiv.append('<h3>'+ 'Question #' + (count + 1) +'</h3>');
        questionDiv.append('<p>'+ questions[count].text +'</p>');
        questionDiv.append('<div class="question-buttons btn-group">' + buttonStr + '</div>');
        questionDiv.appendTo(questionsPlaceholder);

      }

      console.log(questionsPlaceholder);



      this.el = $(this.selector);
      this.quizPages = $('.quiz-page');
      this.questionPagesContainer  = $('#questionPages');

      this.questionPagesContainer.append(questionsPlaceholder.children());

      this.questionPages = $('.question-page');


      this.nextButtonEl = $('#nextQuestionButton');
      this.previousButtonEl = $('#prevQuestionButton');


      this.nextButtonEl.click(function(event) {
        console.log('NEXT CLICKED');
        // validate answer before proceeding
        this.nextQuestionPage(this);

      }.bind(this));
      this.previousButtonEl.click(function(event){
        console.log('PREVIOUS CLICKED');
        this.previousQuizPage(this);
      }.bind(this));

      $(this.questionPages[0]).addClass(this.questionActiveClass);

      console.log(this);

      return this;
    },
    gotoPage: function(pageName) {

    },
    nextQuestionPage: function(context) {
      var curr;

      if(currentQuestion < context.questionPages.length - 1) {
        curr = context.questionPages[currentQuestion];
        $(curr).removeClass(context.questionActiveClass);
        curr = context.questionPages[++currentQuestion];
        $(curr).addClass(context.questionActiveClass);

      } else {
        console.log('END');
        currentQuestion = context.questionPages.length - 1;
      }
    },
    previousQuizPage: function(context) {
      var curr;

      if(currentQuestion > 0) {
        curr = context.questionPages[currentQuestion];
        $(curr).removeClass(context.questionActiveClass);
        curr = context.questionPages[--currentQuestion];
        $(curr).addClass(context.questionActiveClass);
      } else {
        console.log('END');
      }
    },
    checkQuestion: function(pageNumber, answer) {

    }
  };

  window.quiz = window.quiz || {};
  window.quiz = quiz;

}(document, window, $));
