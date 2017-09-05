
  var qPointsExecution = [];
  var currentCuePointId = 0;
  var transcript = "Medical devices are used in a wide span of medical applications. Honeywell offers a variety of sensors and switches focused only on eight medical applications with high win rates. In this activity, labels with different medical equipment names will appear on the screen. Each medical equipment is an example of one of the focus medical applications. Drag each medical equipment label on to the correct medical application name listed on the screen. After making a drop, select Proceed to view the next medical application label and its drop options. There are 16 opportunities and you need at least 12 correct matches to complete this activity. There are unlimited attempts and the duration of each attempt is four minutes. Note that after each drop, you will need to select Proceed on the screen to review the next drop and its drop options. Select Start to begin.";
  var currentActivityNumber = 1;
  var activityAttempt = 1;
  var timeTaken = "";


  var minutes = 60 * 4,
  display = document.querySelector('#time');

  //Make every clone image unique.
  var counts = [0];
  function startActivity() {
    clearInterval(window.tInterval);
    $(".activity-intro-container").fadeOut( "slow", function() {
      $("#activity1").show();
      startTimer(minutes, display);
    })

  }

  function tryAgainActivity() {
    currentActivityNumber = 1;
    var minutes = 60 * 4,
    display = document.querySelector('#time');
    startTimer(minutes, display);
    correctAns = 0;
    activityAttempt++;
    $('.activity-feedback-container__success').hide();
    $('.activity-feedback-container__failed').hide();
    $(".activity-feedback-container").fadeOut( "slow", function() {
      $("#activity1").show();
    })
    document.querySelector('#correct-answer').textContent = correctAns;
    document.querySelector('.drag-element').textContent = dragOption[currentActivityNumber-1];
    for (var i = 1; i <= 4; i++) {
      document.querySelector('.drop'+i).classList.remove("correct");
      document.querySelector('.drop'+i).classList.remove("incorrect");
      document.querySelector('.drop'+i).textContent = dropOption[currentActivityNumber-1][i-1];
    }

  }

  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    window.tInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;
      timeTaken = minutes + ":" + seconds;

      if (--timer < 0) {
        // console.log(timer)
        clearInterval(window.tInterval);
        timer = duration;
        currentActivityNumber = 1;
        $(".activity-holder").fadeOut( "slow", function() {
          $(".activity-feedback-container").show();
          document.querySelector('.score-got').textContent = correctAns;
          document.querySelector('.attempt').textContent = activityAttempt;
          document.querySelector('.time-taken').textContent = timeTaken;
        })
      }
    }, 1000);
  }


  var actvityAns = [[2],[3],[1],[1],[3],[2],[4],[3],[3],[4],[3],[4],[2],[2],[1],[1]];
  var dropOption= [
    ["Kidney dialysis machines", "Hospital hardware", "Respiratory", "Infusion, insulin, and syringe pumps"],
    ["Kidney dialysis machines", "Hospital hardware", "Surgical equipment", "Infusion, insulin, and syringe pumps"],
    ["Kidney dialysis machines", "Hospital hardware", "Respiratory", "Kidney dialysis machines"],
    ["Dental equipment", "Hospital hardware", "Respiratory", "Infusion, insulin, and syringe pumps"],
    ["Kidney dialysis machines", "Hospital hardware", "Respiratory", "Infusion, insulin, and syringe pumps"],
    ["Kidney dialysis machines", "Patient monitoring system", "Respiratory", "Infusion, insulin, and syringe pumps"],
    ["Kidney dialysis machines", "Hospital hardware", "Respiratory", "Diagnostic/analytical equipment"],
    ["Kidney dialysis machines", "Hospital hardware", "Respiratory", "Infusion, insulin, and syringe pumps"],
    ["Kidney dialysis machines", "Hospital hardware", "Respiratory", "Infusion, insulin, and syringe pumps"],
    ["Kidney dialysis machines", "Hospital hardware", "Respiratory", "Infusion, insulin, and syringe pumps"],
    ["Kidney dialysis machines", "Hospital hardware", "Respiratory", "Infusion, insulin, and syringe pumps"],
    ["Kidney dialysis machines", "Hospital hardware", "Respiratory", "Surgical equipment"],
    ["Kidney dialysis machines", "Diagnostic/analytical equipment", "Respiratory", "Infusion, insulin, and syringe pumps"],
    ["Kidney dialysis machines", "Hospital hardware", "Respiratory", "Infusion, insulin, and syringe pumps"],
    ["Patient monitoring system", "Hospital hardware", "Respiratory", "Infusion, insulin, and syringe pumps"],
    ["Kidney dialysis machines", "Hospital hardware", "Respiratory", "Infusion, insulin, and syringe pumps"],
  ];

  var dragOption= [
    "Hospital bed",
    "Surgical fluid management system",
    "Anesthesia delivery system",
    "Pressure-operated dental instrument",
    "Ventilator",
    "Blood glucose monitoring",
    "Blood analyzer",
    "High velocity nasal insufflation (treatment of COPD)",
    "Spirometer",
    "Disposable insulin pump",
    "CPAP machine",
    "Cardiac cryoablation",
    "Hematology analyzer",
    "Medication dispensing system",
    "Non invasive blood pressure",
    "Peritoneal dialysis (PD)"
  ];
  var correctAns = 0;
  document.querySelector('#correct-answer').textContent = correctAns;
  document.querySelector('.drag-element').textContent = dragOption[currentActivityNumber-1];
  for (var i = 1; i <= 4; i++) {
    document.querySelector('.drop'+i).textContent = dropOption[currentActivityNumber-1][i-1];
  }

  var counts = [0];
  $(".dragImg").draggable({
    helper: "clone",
    revert: "invalid",
    //Create counter
    start: function() { counts[0]++; }
  });

  $(".drop-container").droppable({
    drop: function(e, ui){
      if(actvityAns[currentActivityNumber-1].indexOf(parseInt($(this)[0].id)) !== -1) {
        $(this).addClass("correct");
        correctAns ++;
      }
      else {
        $(this).addClass("incorrect");
      }
      $(".proceed-button").show();
      $('.dragImg').css("pointer-events", "none")
      document.querySelector('#correct-answer').textContent = correctAns;

      //$(this).append($(ui.helper).clone());
      $(".drop-container .dragImg").addClass("item-"+counts[0]);
      $(".drop-container .item-"+counts[0]).removeClass("dragImg ui-draggable ui-draggable-dragging");


      $(".item-"+counts[0]).dblclick(function() {
        $(this).remove();
      });
    }
  });

  function loadNextActivity() {
    $('.dragImg').css("pointer-events", "auto")
    $(".proceed-button").hide();
    if(currentActivityNumber !== dragOption.length) {
      currentActivityNumber++;
      document.querySelector('.drag-element').textContent = dragOption[currentActivityNumber-1];
      for (var i = 1; i <= 4; i++) {
        document.querySelector('.drop'+i).classList.remove("correct");
        document.querySelector('.drop'+i).classList.remove("incorrect");
        document.querySelector('.drop'+i).textContent = dropOption[currentActivityNumber-1][i-1];
      }
    }
    else {
      if (correctAns >=12) {
        $(".activity-holder").fadeOut( "slow", function() {
          $(".activity-feedback-container__success").show();
          document.querySelector('.activity-feedback-container__success .score-got').textContent = correctAns;
          document.querySelector('.activity-feedback-container__success .attempt').textContent = activityAttempt;
          document.querySelector('.activity-feedback-container__success .time-taken').textContent = timeTaken;
          clearInterval(window.tInterval);
          document.querySelector('.next-button').classList.add("blinker");
        })
      }
      else {
        $(".activity-holder").fadeOut( "slow", function() {
          $(".activity-feedback-container__failed").show();
          document.querySelector('.activity-feedback-container__failed .score-got').textContent = correctAns;
          document.querySelector('.activity-feedback-container__failed .attempt').textContent = activityAttempt;
          document.querySelector('.activity-feedback-container__failed .time-taken').textContent = timeTaken;
          clearInterval(window.tInterval);
          document.querySelector('.next-button').classList.add("blinker");
        })
      }
    }
  }

  function showAns() {
    $(".activity-holder").hide();
    $(".activity-feedback-container__failed").fadeOut( "slow", function() {

      $(".show-answer-container").show();
    })
  }

  var zIndex = 0;
  function make_draggable(elements)
  {
    elements.draggable({
      containment:'parent',
      start:function(e,ui){ ui.helper.css('z-index',++zIndex); },
      stop:function(e,ui){
      }
    });
  }


  $.fn.slideUp = function(){
      this.velocity("slideUp",  400, function() {
          $(this).parent().removeClass("active");
          $(this).prev().prev().removeClass("minus").addClass("plus");
      });
  };

  $.fn.slideDown = function(){
      this.velocity("slideDown",  400, function() {
          $(this).parent().addClass("active");
          $(this).prev().prev().removeClass("plus").addClass("minus");
      });
  };

  $('#nav li').on('click', function (event) {
      var $panel = $(this),
          $panelContents = $panel.find("ul"),
          $activePanelContents = $(".active").find("ul");

      if($panel.hasClass("active")){
          $panelContents.slideUp();
      } else {
          $activePanelContents.slideUp();
          $panelContents.slideDown();
      }

      event.stopPropagation();
  });
