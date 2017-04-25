function loadAudio(pageNum) {
  soundManager.stopAll();
  console.log(pageNum);
  jarvisAudio = soundManager.createSound({
    url: '../app/assets/audio/m01_t01_p0'+pageNum+'.mp3',
    autoLoad: true,
    autoPlay: true,
    onload: function() {
      enableButtons();
      $.getJSON( "../app/assets/data/transcript.json", function( data ) {
        //  $(".transcript-text-container").html(data.transcript[pageNum-1].text)
      });
    },
    onfinish: function() {
      jarvisAudio.unload();
      disableButtons();
      $(".start-button").removeClass("disabled");
      if(PageNum !== 6 )
        document.querySelector('.next-button').classList.add("blinker");
    },
    whileplaying() {
      syncPageText(jarvisAudio.position);
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
  document.getElementById('button-playPause').classList.add("disabled");
  document.getElementById('button-audio').classList.add("disabled");
}

function enableButtons() {
  document.getElementById('button-playPause').classList.remove("disabled");
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

function syncPageText(position) {
  if (qPoints !== null) {
     var t = millisToMinutesAndSeconds(position);
     if (t == qPoints[currentCuePointId]) {
       if (imageSwap &&  document.querySelector('.sync'+(currentCuePointId))){
         document.querySelector('.sync'+(currentCuePointId)).classList.add('hide');
         document.querySelector('.sync'+(currentCuePointId + 1)).classList.remove('hide');
       }
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
