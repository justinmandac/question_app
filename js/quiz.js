(function(document, window, $) {
  'use strict';
  var currentQuestion = 0;
  var takeCount = 0;
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
    questions: [],
    progress: 0,
    totalProgress: 0,
    progressEl: null,
    tally: [],
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
          var answer;

          if(!isAButton) {
            return;
          }

          answer = $(el).attr('data-value');
          questionIndex = parseInt($($('.'+_this.questionActiveClass)[0]).attr('data-index'));
          console.log(answer);
          _this.checkQuestion(questionIndex, answer);

        });

      }

      return questionsPlaceholder;

    },
    _init: function(questions) {
      var _this = this;
      var count;
      var quizPage = $('#questionPages');


      this.questions = questions;

      for(var qCount = 0; qCount <  questions.length; qCount++) {
        this.tally[qCount] = 0;
      }

      this.el = $(this.selector);
      this.quizPages = $('.quiz-page');
      this.questionPagesContainer  = $('#questionPages');

      this.questionPagesContainer.append(this.render(questions).children());

      this.questionPages = $('.question-page');
      this.totalProgress = this.questionPages.length;
      this.progressEl = $('#quizProgress');


      this.nextButtonEl = $('#nextQuestionButton');
      this.previousButtonEl = $('#prevQuestionButton');

      $('#quizProgressLabel #currentQuestion').text(0);
      $('#quizProgressLabel #totalQuestions').text(this.totalProgress);


      this.nextButtonEl.click(function(event) {
        console.log('NEXT CLICKED');
        // validate answer before proceeding
        _this.nextQuestionPage(_this);

      });
      this.previousButtonEl.click(function(event){
        console.log('PREVIOUS CLICKED');
        _this.previousQuestionPage(_this);
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
    previousQuestionPage: function(context) {
      var curr;

      if(currentQuestion > 0) {
        curr = context.questionPages[currentQuestion];
        $(curr).removeClass(context.questionActiveClass);
        curr = context.questionPages[--currentQuestion];
        $(curr).addClass(context.questionActiveClass);
      } else {
        console.log('END');
        // go to end
      }
    },
    checkQuestion: function(questionIndex, answer) {
      var question = this.questions[questionIndex];
      var questionNumber = questionIndex + 1;
      var isCorrect = question.correct == answer;

      if(isCorrect) {
        console.log('Correct Answer for Question#' + questionNumber);
        this.tally[questionIndex]++;
      } else {
        console.warn('Wrong Answer for Question#' + questionNumber);
      }

      this.nextQuestionPage(this);
      $('#quizProgressLabel #currentQuestion').text(currentQuestion);
      console.log(this.tally);
    }
  };

  window.quiz = window.quiz || {};
  window.quiz = quiz;

}(document, window, $));
