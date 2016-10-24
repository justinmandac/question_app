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
    questions: {},
    render: function(questions) {
      var _this  = this;
      var count;
      var questionsPlaceholder = $('<div/>');
      var buttonStr;
      var questionStr = '';

      for(count = 0; count < questions.length; count++) {
        var choices = questions[count].choices;
        var questionDiv = $('<div/>', {
          class: 'question-page',
          'data-index' : count
        });
        var choiceCount;

        buttonStr = ''; //initialize
        choices.forEach(function(choice) {
          buttonStr += '<button class="btn btn-primary" data-value="'+ choice.value +'">' + choice.text + '</button>';
        });

        questionDiv.append('<h3>'+ 'Question #' + (count + 1) +'</h3>');
        questionDiv.append('<p>'+ questions[count].text +'</p>');
        questionDiv.append('<div class="question-buttons btn-group">' + buttonStr + '</div>');
        questionDiv.appendTo(questionsPlaceholder);

        questionDiv.click(function(event) {
          var el = event.target;
          var isAButton = el.tagName === 'BUTTON';
          var value;
          var questionIndex;
          var question;

          if(!isAButton) {
            return;
          }

          value = $(el).attr('data-value');
          questionIndex = $($('.'+_this.questionActiveClass)[0]).attr('data-index');
          question = _this.questions[questionIndex];

          console.log(question);

          console.log(value);

        });

      }

      return questionsPlaceholder;

    },
    _init: function(questions) {
      var _this = this;
      var count;
      var quizPage = $('#questionPages');


      this.questions = questions;


      this.el = $(this.selector);
      this.quizPages = $('.quiz-page');
      this.questionPagesContainer  = $('#questionPages');

      this.questionPagesContainer.append(this.render(questions).children());

      this.questionPages = $('.question-page');


      this.nextButtonEl = $('#nextQuestionButton');
      this.previousButtonEl = $('#prevQuestionButton');


      this.nextButtonEl.click(function(event) {
        console.log('NEXT CLICKED');
        // validate answer before proceeding
        _this.nextQuestionPage(_this);

      });
      this.previousButtonEl.click(function(event){
        console.log('PREVIOUS CLICKED');
        _this.previousQuizPage(_this);
      });

      $(this.questionPages[0]).addClass(this.questionActiveClass);

      console.log(this);

      return this;
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
    checkQuestion: function(questionIndex, answer) {

    }
  };

  window.quiz = window.quiz || {};
  window.quiz = quiz;

}(document, window, $));
