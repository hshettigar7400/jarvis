var tInterval;
var jarvisAudio ={};
function loadAudio(pageNum) {
	soundManager.destruct();
    clearInterval(tInterval);
  	jarvisAudio = soundManager.createSound({
    url: '../app/assets/audio/m01_t01_p0'+pageNum+'.mp3',
    autoLoad: true,
    autoPlay: true,
    onload: function() {
      enableButtons();
      $.getJSON( "../app/assets/data/transcript.json", function( data ) {
          $(".transcript-text-container").html(data.transcript[pageNum-1].text)
      });
    },
    onfinish: function() {
      jarvisAudio.unload();
      disableButtons();
      $(".start-button").removeClass("disabled");
      $(".button").removeClass('disabled');
      if(Number(pageNum) !== 9 && Number(pageNum) !== 6 && Number(pageNum) !== 3) {
        document.querySelector('.next-button').classList.add("blinker");
      }
    },
    whileplaying() {
      syncPageText(jarvisAudio.position);
      if(!jarvisAudio.paused)
      {
      $(".button").addClass('disabled');
    }
    else {
        $(".button").removeClass('disabled');
    }
    }
  });
}

function toggleSoundVolume() {
  jarvisAudio.toggleMute();
}

function togglePlayPuase() {
  if(jarvisAudio.playState !== 0)
   jarvisAudio.togglePause();
}

function toggleButtonState(e) {
  if (e) {
    e.currentTarget.classList.toggle('selected');
  }
}

function disableButtons() {
  if (document.getElementById('button-playPause'))
  document.getElementById('button-playPause').classList.add("disabled");
  if (document.getElementById('button-audio'))
  document.getElementById('button-audio').classList.add("disabled");
}

function enableButtons() {
  if (document.getElementById('button-playPause'))
  document.getElementById('button-playPause').classList.remove("disabled");
  if (document.getElementById('button-audio'))
  document.getElementById('button-audio').classList.remove("disabled");
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  var s = ((minutes * 60) + parseInt(seconds));
  return s;
}

function pauseSound() {
  jarvisAudio.pause();
}

function changeFontSize() {
  if (document.querySelector('.text-1-large') !== null)
    document.querySelector('.text-1-large').style.fontSize = '1em';
}

function changeText(element) {
  $("."+element).hide();
}

function imageSwap(id) {
  $(".image-container"+id).hide();
}

function highlightElement(id) {
  $(".highlight-image"+(id-1)).removeClass("highlight")
  $(".highlight-image"+id).addClass("highlight")
}

function syncPageText(position) {

  $("#button-playPause").removeClass("selected");

  if (qPoints !== null && currentCuePointId != undefined) {
     var t = millisToMinutesAndSeconds(position);

     if (t == qPoints[currentCuePointId]) {
        console.log(t == qPoints[currentCuePointId])
       if (document.querySelector('.sync'+(currentCuePointId+1))) {
         document.querySelector('.sync'+(currentCuePointId+1)).classList.remove('fadeOut');
         document.querySelector('.sync'+(currentCuePointId+1)).classList.add('fadeIn');

       }
       if(qPointsExecution && qPointsExecution[currentCuePointId])
       {
         eval(qPointsExecution[currentCuePointId]);

       }
       currentCuePointId++;

     }
   }

}

module.exports = {
  toggleSoundVolume,
  togglePlayPuase,
  loadAudio,
  toggleButtonState
}
