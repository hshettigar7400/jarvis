
var topicNamesArray = [
  'Welcome',
  'Course objectives',
  'Medical devices move to the home',
  'Growth in portable- and home-use medical devices',
  'Internet of things—connected medical equipment',
  'Target/focus medical applications',
  'Medical appications for Honeywell sensors - Activity',
  'Course Summary',
  'Quiz Introduction'
];

function Assessment() {
    var currentQuestion;
    var jarvisAudio;
    var totalQuestions;
    var attemptCounter = 0;
    var data;
    var questionDataArr;
    var userScore;
    var questionWidth;
    var page;
    var tabindex = 0;
    var questionResult;
    var reviewMode = false;
    var selectors = {};
    var defaults = {};
    var gData = {};
    var isDesktopFirst = 2;
    this.init = init;

    function init(options) {
        defaults = {
            pageSelector: '',
            container: '.assessment-container',
            isMobileFirst: false,
            randomizeQuestions: false,
            randomizeOptions: false,
            review: true,
            exitReview: true,
            revisitContent: true,
            exitButtonOnResultPage: true,
            noOfAttempts: 3,
            showReviewButtonAfterAttempt: 2,
            certificate: true,
            certificateURL: ''
        };
        defaults = $.extend(defaults, options);
        if (defaults.noOfAttempts > 0) {
            defaults.showReviewButtonAfterAttempt = Math.min(defaults.showReviewButtonAfterAttempt, defaults.noOfAttempts)
        } else {
            defaults.review = true
        }
        selectors = {
            wrapper: '.assessment',
            sliderContainer: '.assessment .slider-container',
            startQuizButton: '.assessment-start-btn',
            submitAnswer: '.assessment .submit-answer',
            tryAgainButton: '.assessment .tryAgain',
            reviewButton: '.assessment .review',
            visitContentButton: '.assessment .revisitContent',
            exitCourseButton: '.assessment .exitCourse',
            certificateButton: '.assessment .certificate',
            qOptions: '.assessment .question-page .option',
            nextQuestionBtn: '.assessment .next-question',
            prevQuestionBtn: '.assessment .back-question',
            questionCounter: '.assessment .question-counter',
            resultPage: '.assessment .result-page',
            questionBlock: '.assessment .questionBlock',
            userValue: 'user-value',
            reviewButtonContainer: '.assessment .review-button-container',
            exitReview: '.assessment .review-button-container .exitReview'
        };
        //$(Selectors.player).trigger(FRED.event.ASSESSMENT_PAGE);
        //pageObj = $('.final-assessment').closest('div.player-page').data('pageRef');
        $.getJSON("assets/data/assessment.json", function( result ) {
        	data = result.data;
        	$(Selectors.player).on('click', selectors.startQuizButton, function() {
	            $(this).addClass(Selectors.disabled);
	            $(this).attr('aria-disabled', true);
	            $('.start-page').hide();
	            $(defaults.container).show();
	            dataLoadComplete();
	            showQuestion(0);
              soundManager.stopAll();
	        });
	        $('.player-module-0').hide()
        });


    }

    function dataLoadComplete() {
        removeListeners();
        questionWidth = 0;
        reviewMode = false;
        initVars();
        //FRED.loader.updatepageTitleObject(data.title);
        page = $(defaults.container).closest('div.player-page').data('pageRef');
        var min = Math.min(data.questionPools.length, defaults.poolsSharing.length);
        defaults.poolsSharing = defaults.poolsSharing.slice(0, min);
        $.each(data.questionPools, function(i, e) {
            if (i < min) {
                defaults.poolsSharing[i] = Math.min(defaults.poolsSharing[i], e.questions.length)
            }
        });
        totalQuestions = defaults.poolsSharing.reduce(function(a, b, index) {
            return a + b
        });
        questionDataArr = [];
        createQuestionData();
        //console.log('container: ',defaults.container);
        $(defaults.container).html(createAssessmentHTML());
        if (!reviewMode && defaults.exitReview /*|| FRED.player.isMobileFirst*/) {
            $(selectors.reviewButtonContainer).hide()
        }
        $(window).resize(function() {
            updateLayout()
        });
        setTimeout(updateLayout, 1);
        if (!defaults.isMobileFirst) $(selectors.wrapper).addClass('desktopFirst');
        randomizeQuestions();
        randomizeOptions();
        $(Selectors.scrollContainer).scrollTop(0);
        updateOptionStatus();
        initEvents();
        updateLayout()
    }

    function removeListeners() {
        $(selectors.nextQuestionBtn).off('click');
        $(selectors.wrapper).off('click', '.options a');
        $(selectors.submitAnswer).off('click');
        $(selectors.nextQuestionBtn).off('click');
        $(selectors.prevQuestionBtn).off('click');
        $(Selectors.player).off('click', selectors.startQuizButton);
        $(Selectors.player).off('click', selectors.tryAgainButton);
        $(Selectors.player).off('click', selectors.reviewButton);
        $(Selectors.player).off('click', selectors.exitReview);
        $(Selectors.player).off('click', selectors.exitCourseButton);
        $(Selectors.player).off('click', selectors.certificateButton);
        $(Selectors.player).off('click', selectors.visitContentButton)
    }

    function createQuestionData() {
        var poolsCount = Math.min(defaults.poolsSharing.length, data.questionPools.length);
        var arr = [];
        var tempArr = [];
        for (var i = 0; i < poolsCount; i++) {
            arr = [];
            arr = data.questionPools[i].questions;
            tempArr = tempArr.concat(arr.slice(0, defaults.poolsSharing[i]))
        }
        questionDataArr = tempArr
    }

    function randomizeOptions() {
        if (!defaults.randomizeOptions) return;
        var optionContainer;
        var currentOptions;
        var arr;
        var currentQuestions = $(selectors.questionBlock);
        currentQuestions.each(function(index, element) {
            arr = [];
            optionContainer = $(this).find('.options ul');
            currentOptions = optionContainer.find('li');
            currentOptions.each(function(index, element) {
                arr.push(element)
            });
            shuffle(arr);
            optionContainer.empty();
            var l = arr.length;
            for (var i = 0; i < l; i++) {
                var el = arr[i];
                var sts = $(el).hasClass(Selectors.selected);
                $(el).attr('aria-checked', sts);
                $(el).attr('aria-posinset', i + 1);
                $(el).attr('aria-setsize', l);
                optionContainer.append(el)
            }
        })
    }

    function randomizeQuestions() {
        if (!defaults.randomizeQuestions) return;
        var currentQuestions = $(selectors.questionBlock);
        var arr = [];
        currentQuestions.each(function(index, element) {
            arr.push(element)
        });
        shuffle(arr);
        currentQuestions.remove();
        for (var i = 0; i < arr.length; i++) {
            if (!defaults.isMobileFirst) {
                $(arr[i]).insertBefore(selectors.resultPage)
            } else {
                $(arr[i]).insertBefore($(selectors.submitAnswer).parent())
            }
        }
    }

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue
        }
        return array
    }

    function initVars() {
        currentQuestion = 0;
        userScore = 0;
        questionResult = [];
        handleNextBackStatus()
    }

    function initEvents() {
    	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {

    	} else {
    		$(Selectors.player).on("mouseenter", "a", function() {
	            if ($(this).hasClass(Selectors.disabled)) {
	                $(this).removeClass(Selectors.hover);
	                return false
	            }
	            $(this).addClass(Selectors.hover)
	        });

	        $(Selectors.player).on("mouseleave", "a", function() {
	            if ($(this).hasClass(Selectors.disabled)) {
	                return false
	            }
	            $(this).removeClass(Selectors.hover);
	            $(this).removeClass(Selectors.focus)
	        })
    	}

        $(selectors.wrapper).on('click', '.options a', function() {
            if ($(this).hasClass(Selectors.disabled)) return;
            if (defaults.isMobileFirst) currentQuestion = Number($(this).parents().eq(5).attr("id").split("-")[2]);
            if ($(this).hasClass('mcq')) {
                $(this).closest('.options').find('.option').removeClass(Selectors.selected);
                $(this).closest('.options').find('.option').attr('aria-checked', false);
                $(this).closest('.options').find('.option').attr(selectors.userValue, '0');
                $(this).addClass(Selectors.selected);
                $(this).attr('aria-checked', true);
                $(this).attr(selectors.userValue, '1');
                $(this).closest('.options').find('.option').children('.icon.icon-radio-button').html('&#xe61f;');
                $(this).children('.icon.icon-radio-button').html('&#xe61e;')
            } else if ($(this).hasClass('mrq')) {
                var i = $(this).children('.icon.icon-check-button');
                if ($(this).hasClass(Selectors.selected)) {
                    $(this).removeClass(Selectors.selected);
                    $(this).attr(selectors.userValue, '0');
                    $(this).attr('aria-checked', false);
                    i.html('&#xe609;')
                } else {
                    $(this).addClass(Selectors.selected);
                    $(this).attr(selectors.userValue, '1');
                    $(this).attr('aria-checked', true);
                    i.html('&#xe608;')
                }
            }
            handleSubmitState();
            handleNextBackStatus()
        });
        $(selectors.submitAnswer).on('click', function() {
            if ($(this).hasClass(Selectors.disabled)) return;
            evaluate();
            $(this).addClass(Selectors.disabled);
            $(this).attr('aria-disabled', true);
            $(defaults.qOptions).addClass(Selectors.disabled);
            $(defaults.qOptions).attr('aria-disabled', true)
        });
        if (defaults.noOfAttempts > 1 || defaults.noOfAttempts < 1) $(Selectors.player).on('click', selectors.tryAgainButton, function() {
            $('.lastQuestion').html('Submit');
            restartAssessment()
        });
        if (defaults.review) $(Selectors.player).on('click', selectors.reviewButton, function() {
            $('.lastQuestion').html('Exit review');
            reviewAssessment()
        });
        if (defaults.exitReview) $(Selectors.player).on('click', selectors.exitReview, function() {
            showQuestion(totalQuestions)
        });
        if (defaults.exitButtonOnResultPage) $(Selectors.player).on('click', selectors.exitCourseButton, function() {
            //FRED.player.openComponent(FRED.player.exitName)
            //SUMANTH open the exit popup window here
        });
        if (defaults.revisitContent) $(Selectors.player).on('click', selectors.visitContentButton, function() {
			
            $('.lastQuestion').html('Submit');
            $(".page-loader").empty();
            $(".page-loader").load('components/content/m01/t01/m01_t01_p01.html');
            $(".page-number").html(01);
			$(".page-title").html(topicNamesArray[0]);
			
            $.getJSON( "../app/assets/data/transcript.json", function( data ) {
                $(".transcript-text-container").html(data.transcript[0].text)
            });
			
			$.getJSON( "../app/assets/data/menu.json", function( data ) {
                $(".transcript-text-container").html(data.menu[0].text)
            });
            document.querySelector('.next-button').classList.remove("disabled");
            soundManager.stopAll();
            document.querySelector('.back-button').classList.add("disabled");
            jarvisAudio = soundManager.createSound({
              url: '../app/assets/audio/m01_t01_p01.mp3',
              autoLoad: true,
              autoPlay: true,
              onload: function() {
              },
              onfinish: function() {
              },
              whileplaying() {
              }
            });
            //window.reloadFromStart();
            /*if (document.querySelector('.next-button'))
                document.querySelector('.next-button').classList.remove("blinker");
              if (document.querySelector('#button-audio'))
                document.querySelector('#button-audio').classList.remove("disabled");
              if (document.querySelector('#button-playPause'))
                document.querySelector('#button-playPause').classList.remove("disabled");
              $(".page-loader").empty();
              $(".page-loader").load('components/content/m01/t01/m01_t01_p01.html');*/
            //SUMANTH REVISIT FROM FIRST PAGE
            // if (FRED.player.isDesktopFirst) {
            //     FRED.navigation.loadPage(0)
            // } else {
            //     $(Selectors.scrollContainer).animate({
            //         scrollTop: 0
            //     }, 500)
            // }
        });
        if (defaults.certificate) $(Selectors.player).on('click', selectors.certificateButton, function() {
            openCertificate()
        });
        $(selectors.nextQuestionBtn).on('click', function() {
            if ($(this).hasClass(Selectors.disabled)) return;
            if (currentQuestion < totalQuestions - 1) {
                showNextQuestion()
            } else {
                showNextQuestion();
                evaluate();
                $(defaults.qOptions).addClass(Selectors.disabled);
                $(defaults.qOptions).attr('aria-disabled', true)
            }
        });
        $(selectors.prevQuestionBtn).on('click', function() {
            if ($(this).hasClass(Selectors.disabled)) return;
            showPrevQuestion()
        })
    }

    function evaluate() {
        var failed = false;
        $.each($('.assessment .question-page'), function(i, el) {
            failed = false;
            $.each($(el).find('.option'), function(j, elm) {
                if ($(elm).attr('data-value') !== $(elm).attr(selectors.userValue)) {
                    failed = true;
                    return false
                }
            });
            questionResult[i] = failed ? 0 : 1
        });
        updateEndPage();
        $(selectors.resultPage).addClass('show');
        if (defaults.isMobileFirst) {
            $(Selectors.scrollContainer).animate({
                scrollTop: $(Selectors.scrollContainer).scrollTop() + $(selectors.resultPage).height()
            }, 500)
        }
    }

    function updateEndPage() {
        attemptCounter++;
        var correctCount = (questionResult.filter(function(x) {
            return x === 1
        }).length);
        var per = Math.ceil(correctCount / (questionResult.length) * 100);
        updateEndPageContent(per, correctCount);
        if (attemptCounter >= defaults.noOfAttempts && defaults.noOfAttempts > 0) {
            $(selectors.tryAgainButton).hide()
        }
    }

    function updateEndPageContent(per, correctCount) {
        var obj = getResultPageData(per);
        gData.userScore = per;
        gData.quizAttempted = true;
        //gData.updatePageStatus(2, page);
        tabindex = 3;
        if (!obj) return;
        var txt = obj.text;
        if (assessment_config.playQuestionAudio) {
            if (!reviewMode) {
              if(per < assessment_config.passingScore) {
                jarvisAudio = soundManager.createSound({
                  url: '../app/assets/audio/m01_t01_p09_02.mp3',
                  autoLoad: true,
                  autoPlay: true,
                  onload: function() {
                  },
                  onfinish: function() {
                  },
                  whileplaying() {
                  }
                });
              } else {
                jarvisAudio = soundManager.createSound({
                  url: '../app/assets/audio/m01_t01_p09_01.mp3',
                  autoLoad: true,
                  autoPlay: true,
                  onload: function() {
                  },
                  onfinish: function() {
                  },
                  whileplaying() {
                  }
                });
              }
              //
                //var audioId = obj.audioID;
                //FRED.contentSync.playAudioById(audioId)
                //SUMANTH AUDIO TO BE PLAUED FOR ALL THE QUESTION SCREEN
            }
        }
        txt = txt.replace('<<X>>', correctCount);
        txt = txt.replace('<<Y>>', questionResult.length);
        txt = txt.replace('<<I>>', questionResult.length - correctCount);
        txt = txt.replace('<<R>>', per + "%");
        var str = '<div class="text-content-header">';
        str += '</div>';
        str += '<div class="text-content">';
        str += txt;
        str += '</div>';
        str += '<div class="buttons">';
        str += '</div>';
        /*FRED.player.enableButton(FRED.player.transcriptName);
        FRED.player.enableButton(FRED.player.replayName);
        FRED.player.enableButton(FRED.player.audioName);
        FRED.player.enableButton(FRED.player.playPauseName);*/
        //SUMANTH ENABLE THE REQUIRED BUTTONS
        $('.assessment .end-page').html(str).show();
        var str = '';
        if ((defaults.noOfAttempts > attemptCounter || defaults.noOfAttempts == 0) && per < assessment_config.passingScore) str += '<div class="button-container"><span>' + data.tryAgain.text + ' </span><a href="#" class="tryAgain button assessbtnbg ' + Selectors.tabIndex + '">' + data.tryAgain.label + '</a></div>';
        if (defaults.review) {
            str += '<div class="button-container"><span>' + data.review.text + '</span><a href="#" class="review button assessbtnbg ' + Selectors.tabIndex + '">' + data.review.label + '</a></div>'
        }
        if (defaults.revisitContent) str += '<div class="button-container"><span>' + data.visitContent.text + ' </span><a href="#" class="revisitContent button assessbtnbg ' + Selectors.tabIndex + '">' + data.visitContent.label + '</a></div>';
        if (defaults.exitButtonOnResultPage) str += '<div class="button-container"><span>' + data.exitCourse.text + '</span><a href="#" class="exitCourse button assessbtnbg ' + Selectors.tabIndex + '">' + data.exitCourse.label + '</a></div>';
        if (defaults.certificate && per >= assessment_config.passingScore && assessment_config.complianceType !== 1) str += '<div class="button-container"><a data-index="' + ++tabindex + '" href="#" class="certificate button assessbtnbg ' + Selectors.tabIndex + '">' + data.certificate.label + '</a></div>';
        $(selectors.wrapper + ' .text-content-header').html(obj.header);
        $('.assessment .end-page .buttons').html(str).show();
        $('.assessment .end-page').show()
    }

    function updateLayout() {
        $('.assessment .assessment-container').show();
        questionWidth = parseInt($('.assessment').outerWidth());
        $('.block-slider').width(questionWidth);
        $(selectors.questionBlock).width(questionWidth);
        $(selectors.resultPage).width(questionWidth);
        if (defaults.isMobileFirst) {
            $(selectors.sliderContainer).width(questionWidth)
        } else {
            $(selectors.sliderContainer).css({
                width: (questionWidth * (totalQuestions + 2)),
                'left': -(questionWidth * currentQuestion)
            })
        }
    }

    function createAssessmentHTML() {
        var str = '';
        str += '<section id="assessment" class = "assessment">';
        str += '<div class="assessment-container">';
        if (!defaults.isMobileFirst) {
            str += '<div class="header clearfix">';
            if (!defaults.isMobileFirst) {}
            if (!defaults.isMobileFirst) {}
            str += '</div>'
        }
        str += '<div class="block-slider">';
        str += '<div class="slider-container clearfix">';
        str += createQuestionPage();
        str += createEndPage();
        str += '</div>';
        str += '</div>';
        if (defaults.exitReview) {
            str += '<div class="review-button-container"><a data-index="' + ++tabindex + '" href="#" class="exitReview button ' + Selectors.tabIndex + '">' + data.exitReview.label + '</a></div>'
        }
        str += '</div>';
        str += '</section>';
        return str
    }

    function createQuestionPage() {
        var obj = questionDataArr;
        var str = "";
        $.each(obj, function(index, element) {
            tabindex = 3;
            str += createQuestion((index + 1), element)
        });
        if (defaults.isMobileFirst) {
            str += "<div class='button-container'><a data-index='" + ++tabindex + "' href='#' class='submit-answer button disabled " + Selectors.tabIndex + "'>SUBMIT</a></div>"
        }
        return str
    }

    function createQuestion(index, element) {
        var q = element;
        var str = '';
        str += '<div id="question-page-' + index + '" class="questionBlock" data-audio="' + element.audioID + '">';
        str += '<div class="block-bg-1"></div>';
        str += '<div class="block">';
        str += '<div class="question-page">';
        str += '<div class="question">';
        str += '<ul>';
        str += '<li  data-index="' + ++tabindex + '" ><span class="question-counter"> Question ' + (currentQuestion + 1) + '</span><span class="correct-incorrect"></span></li>';
        str += '<li  data-index="' + ++tabindex + '" ><span>' + element.text + '</span></li>';
        str += '</ul>';
        str += '</div>';
        str += '<div class="instruction">';
        str += '<ul>';
        if (totalQuestions == index) {
            str += '<li data-index="' + ++tabindex + '" ><h3 >' + data.lastQuestion.text + '</h3></li>'
        } else {
            str += '<li data-index="' + ++tabindex + '" ><h3>' + element.instruction + '</h3></li>'
        }
        str += '</ul>';
        str += '</div>';
        str += '<div class="options">';
        str += '<ul>';
        var t = element.options.length;
        $.each(element.options, function(index, element) {
            var type = q.type === 'mcq' ? 'icon-radio-button' : 'icon-check-button';
            var icon = q.type === 'mcq' ? 'radioButton' : 'checkBox';
            var role = q.type === 'mcq' ? 'radio' : 'checkbox';
            str += '<li><a  data-index="' + ++tabindex + '" href="#" aria-checked="false" role="' + role + '" aria-posinset="' + (index + 1) + '"  aria-setsize="' + t + '" data-value="' + element.correct + '" user-value="0" class="option ' + q.type + ' clearfix ' + Selectors.tabIndex + '" id="option-' + index + '">';
            str += '</span><span class="icon ' + type + '">&#xe61f;</span><span class="text">' + element.text + '</span>';
            str += '</a></li>'
        });
        str += '</ul>';
        str += '</div>';
        if (!defaults.isMobileFirst) {
            str += '<div class="next-back-container">';
            str += '<div>';
            str += '<a href="#" class="question-nav-btn back-question assessbtnbg ' + Selectors.tabIndex + '">Previous question</a>';
            str += '</div>';
            str += '<div>';
            if (totalQuestions == index) {
                str += '<a href="#" class="question-nav-btn next-question assessbtnbg ' + Selectors.tabIndex + ' lastQuestion">Submit</a>'
            } else {
                str += '<a href="#" class="question-nav-btn next-question assessbtnbg ' + Selectors.tabIndex + '">Next question</a>'
            }
            str += '</div>';
            str += '</div>'
        }
        str += '</div>';
        str += '</div>';
        str += '<div class="block-bg-2"></div>';
        str += '</div>';
        return str
    }

    function createEndPage() {
      if (document.querySelector('.next-button'))
        document.querySelector('.next-button').classList.remove("blinker");
        var obj = data.resultPage;
        var str = '';
        str += '<div id="question-page-' + (totalQuestions + 1) + '" class="result-page">';
        str += '<div class="block">';
        str += '<div class="end-page">';
        str += '</div>';
        str += '</div>';
        str += '</div>';
        return str
    }

    function showNextQuestion() {
        currentQuestion++;
        showQuestion(currentQuestion)
    }

    function showPrevQuestion() {
        currentQuestion--;
        showQuestion(currentQuestion)
    }

    function showQuestion(id) {
        /*FRED.player.closeComponent(FRED.player.transcriptName);
        FRED.player.disableButton(FRED.player.transcriptName);
        FRED.player.disableButton(FRED.player.replayName);
        FRED.player.disableButton(FRED.player.audioName);
        FRED.player.disableButton(FRED.player.playPauseName);
        FRED.player.disableButton(FRED.player.nextName);
        FRED.player.disableButton(FRED.player.backName);*/
        //SUMANTH DISABLE REQUIRED UI BUTTONS
        currentQuestion = id;
        if (defaults.exitReview) {
            if (!reviewMode || id == totalQuestions) {
                $(selectors.reviewButtonContainer).hide()
            } else {
                $(selectors.reviewButtonContainer).css({
                    display: 'inline-block'
                })
            }
        }
        if (assessment_config.playQuestionAudio) {
            var q = $(selectors.questionBlock).toArray();
            //FRED.content.clearAudio();
            if (!reviewMode) {
                var audioId = $(q[currentQuestion]).attr("data-audio");
                //FRED.contentSync.playAudioById(audioId)
            }
        }
        updateQuestionsStatus();
        var newLeft = -(questionWidth * currentQuestion);
        $(selectors.sliderContainer).stop(true).animate({
            'left': newLeft
        }, 300);
        handleNextBackStatus();
        updateOptionStatus();
        /*FRED.player.disableButton(FRED.player.nextName);
        FRED.player.disableButton(FRED.player.backName)*/
        //SUMANTH DISABLE NEXT AND BACK
    }

    function updateQuestionsStatus() {
        var qsts = $(selectors.questionBlock).toArray(),
            i = qsts.length;
        if (reviewMode) {
            if (defaults.isMobileFirst) {
                while (i--) {
                    var a = $(qsts[i]);
                    updateQuestionStatus(a)
                }
            } else {
                var a = $(qsts[currentQuestion]);
                updateQuestionStatus(a)
            }
        } else {
            var a = $('.assessment .question .correct-incorrect');
            a.html('')
        }
    }

    function updateQuestionStatus(a) {
        var c = a.find('.option').toArray();
        var o = $(a.find('.correct-incorrect'));
        var s, dv = [],
            uv = [];
        $.each(c, function(i, e) {
            dv.push($(e).attr('data-value'));
            uv.push($(e).attr(selectors.userValue))
        });
        s = dv.toString() === uv.toString();
        o.removeClass('correct').removeClass('incorrect');
        if (s) {
            o.addClass('correct');
            //o.html('&#xe626;')
        } else {
            o.addClass('incorrect');
            //o.html('&#xe60c;')
        }
    }

    function updateOptionStatus() {
        if (!defaults.isMobileFirst) {
            var q = $(selectors.questionBlock).toArray();
            var r = $(selectors.resultPage).find('a.button');
            $(selectors.qOptions).addClass(Selectors.disabled);
            $(selectors.qOptions).attr('aria-disabled', true);
            r.addClass(Selectors.disabled);
            r.attr('aria-disabled', true);
            var a = $(q[currentQuestion]).find('.option');
            if (currentQuestion < totalQuestions && !reviewMode) {
                $(a).removeClass(Selectors.disabled);
                $(a).attr('aria-disabled', false)
            }
            if (currentQuestion > totalQuestions) {
                $(r).removeClass(Selectors.disabled);
                $(r).attr('aria-disabled', false)
            }
        }
        //if (FRED.tabManager) FRED.tabManager.updateTabIndex()
    }

    function handleNextBackStatus() {
        $(selectors.prevQuestionBtn + ', ' + selectors.nextQuestionBtn).addClass('show');
        $(selectors.prevQuestionBtn).addClass(Selectors.disabled);
        $(selectors.prevQuestionBtn).parent().hide();
        $(selectors.prevQuestionBtn).attr('aria-disabled', true);
        $(selectors.nextQuestionBtn).addClass(Selectors.disabled);
        $(selectors.nextQuestionBtn).attr('aria-disabled', true);
        if (currentQuestion === totalQuestions) {
            $(selectors.prevQuestionBtn + ', ' + selectors.nextQuestionBtn).removeClass('show');
            //FRED.loader.updatepageTitleObject(data.resultPage.title);
            //SUMANTH UPDATE RESULT PAGE TITLE
            return
        } else if (currentQuestion === 0) {
            if (!defaults.linearNavigation || attempted()) {
                $(selectors.nextQuestionBtn).removeClass(Selectors.disabled);
                $(selectors.nextQuestionBtn).attr('aria-disabled', false)
            }
        } else if (currentQuestion > 0 && currentQuestion < totalQuestions) {
            $(selectors.prevQuestionBtn).removeClass(Selectors.disabled);
            $(selectors.prevQuestionBtn).parent().show();
            $(selectors.prevQuestionBtn).attr('aria-disabled', false);
            if (!defaults.linearNavigation || attempted()) {
                $(selectors.nextQuestionBtn).removeClass(Selectors.disabled);
                $(selectors.nextQuestionBtn).attr('aria-disabled', false)
            }
        } else if (currentQuestion > totalQuestions) {
            $(selectors.prevQuestionBtn).removeClass(Selectors.disabled);
            $(selectors.prevQuestionBtn).parent().show();
            $(selectors.prevQuestionBtn).attr('aria-disabled', false);
            if (allAttempted()) {
                $(selectors.nextQuestionBtn).removeClass(Selectors.disabled);
                $(selectors.nextQuestionBtn).attr('aria-disabled', false)
            } else {}
        }
        $(selectors.prevQuestionBtn).removeClass(Selectors.hover);
        $(selectors.nextQuestionBtn).removeClass(Selectors.hover);
        //FRED.loader.updatepageTitleObject(data.title);
        //sumanth update page title
        $(selectors.questionCounter).html("Question " + (currentQuestion + 1))
    }

    function getResultPageData(per) {
        var messages = JSON.parse(JSON.stringify(data.resultPage.messages));
        messages.sort(function(a, b) {
            return a.passMark - b.passMark
        });
        var msgs = messages.filter(function(element, index, array) {
            return element.passMark <= per
        });
        return (!msgs.length) ? messages.shift() : msgs.pop()
    }

    function restartAssessment() {
        reviewMode = false;
        initVars();
        /*FRED.player.enableButton(FRED.player.transcriptName);
        FRED.player.enableButton(FRED.player.replayName);
        FRED.player.enableButton(FRED.player.audioName);
        FRED.player.enableButton(FRED.player.playPauseName);*/
        //SUMANTH ENABLE UI BUTTONS AS REQUIRED ABOVE
        $(selectors.qOptions).attr(selectors.userValue, '0').removeClass(Selectors.selected + ' ' + Selectors.disabled);
        $(selectors.qOptions).attr(selectors.userValue, '0').attr('aria-disabled', false);
        $(selectors.qOptions).attr(selectors.userValue, '0').attr('aria-checked', false);
        $(selectors.qOptions).children('.icon.icon-radio-button').html('&#xe61f;');
        $(selectors.qOptions).children('.icon.icon-check-button').html('&#xe609;');
        $(selectors.resultPage).removeClass('show');
        if (defaults.randomizeQuestions) {
            randomizeQuestions()
        }
        if (defaults.randomizeOptions) {
            randomizeOptions()
        }
        if (defaults.isMobileFirst) {
            var pos = $('.pages').scrollTop() + $(selectors.wrapper).closest('.player-topic').position().top;
            $(Selectors.scrollContainer).animate({
                scrollTop: pos
            }, 500)
        } else {
            showQuestion(0)
        }
    }

    function reviewAssessment() {
        reviewMode = true;
        initVars();
        /*FRED.player.disableButton(FRED.player.transcriptName);
        FRED.player.disableButton(FRED.player.replayName);
        FRED.player.disableButton(FRED.player.audioName);
        FRED.player.disableButton(FRED.player.playPauseName);
        FRED.player.closeComponent(FRED.player.transcriptName);*/
        if (defaults.exitReview) $(selectors.reviewButtonContainer).css({
            display: 'inline-block'
        });
        if (defaults.isMobileFirst) {
            var pos = $('.pages').scrollTop() + $(selectors.wrapper).closest('.player-topic').position().top;
            updateQuestionsStatus();
            $(Selectors.scrollContainer).animate({
                scrollTop: pos
            }, 500)
        } else {
            showQuestion(0)
        }
    }

    function handleSubmitState() {
        var status = false;
        var questions = $(selectors.wrapper).find('.questionBlock').toArray();
        if (isDesktopFirst) {
            var q = questions[currentQuestion];
            var opts = $(q).find('.options a').toArray();
            $.each(opts, function(i, o) {
                if ($(o).hasClass(Selectors.selected)) {
                    status = true
                }
            })
        } else {
            $.each(questions, function(i, q) {
                status = false;
                var opts = $(q).find('.options a').toArray();
                $.each(opts, function(index, op) {
                    if ($(op).hasClass(Selectors.selected)) {
                        status = true
                    }
                });
                if (!status) {
                    return false
                }
            })
        }
        if (status) {
            $(selectors.submitAnswer).removeClass(Selectors.disabled);
            $(selectors.submitAnswer).attr('aria-disabled', false)
        } else {
            $(selectors.submitAnswer).addClass(Selectors.disabled);
            $(selectors.submitAnswer).attr('aria-disabled', true)
        }
    }

    function allAttempted() {
        var status = true;
        var questions = $(selectors.wrapper).find('.questionBlock').toArray();
        $.each(questions, function(index, question) {
            if (!attempted(question)) {
                status = false;
                return false
            }
        });
        return status
    }

    function attempted(question) {
        var status = false;
        var q = question || $(selectors.wrapper).find('.questionBlock').toArray()[currentQuestion];
        var options = $(q).find('.options a').toArray();
        $.each(options, function(index, option) {
            if ($(option).hasClass(Selectors.selected)) {
                status = true
            }
        });
        return status
    }

    function openCertificate() {
        //FRED.util.popupWindow(FRED.util.resolveLangPath(defaults.certificateURL), defaults.certificateWidth, defaults.certificateHeight)
        //sumanth open certificate
    }
}
