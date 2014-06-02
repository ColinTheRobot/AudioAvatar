var audioContext;
var arraybuffer;
var fftObject;
var audioSource;
var samples = 2048;

function loadFile(mp3file) {
    var reqest = new XMLHttpRequest();
    reqest.open("GET", mp3file,true);
    reqest.responseType = "arraybuffer";
    reqest.onload = function() {
        audioContext.decodeAudioData(reqest.response, function(buffer) {
            audioBuffer = buffer;
            render();
        });
    };
    reqest.send();
}


function getAverage(lowBound, upperBound, audioData){
  var thisArray = [];

  for( var i = lowBound; i<=upperBound; i++){
    thisArray.push(audioData[i]);
  }

  var mySum = thisArray.reduce(function(a, b) {
    return a + b;
  });


  var myAverage = Math.round((mySum/thisArray.length));


  return myAverage;


}

function render() {
    var audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;
    fftObject = audioContext.createAnalyser();
    fftObject.fftSize = samples;
    audioSource.connect(fftObject);
    fftObject.connect(audioContext.destination);
    audioSource.noteOn(0);
    setup = true;
    var upwardIncrement = Math.round((samples/2)/49) - 1;  //floor?
    var ourData = [];
    setInterval(function(){

      var data = new Uint8Array(samples);
      fftObject.getByteFrequencyData(data);

      var low = 0;
      var high = upwardIncrement;


      for (var i=0; i<56; i++){


        var avgValue = ((getAverage(low, high, data)/255).toFixed(2))/1;
        ourData.unshift(avgValue);
        low += upwardIncrement;
        high += upwardIncrement;

      }

        var snapshot = $('<div>').addClass('inner');;
        var element;
      $(ourData).each(function(idx, opacity){

        if (idx >= 12){
          element = $('<div>').addClass('bin');


        if (12 < idx && idx <= 18 ) {
       // pantone violet
          element.css('background-color', 'rgb(158 , 161 ,204 )');
        } else if (18 < idx && idx <= 24) {
          // pantone indigo
          element.css('background-color', 'rgb(88 ,102 ,172   )');
        } else if (24 < idx && idx <= 30) {
          // pantone blue
          element.css('background-color', 'rgb(0  ,142 ,207   )');
        } else if (30 < idx && idx <= 36) {
          // pantone green
          element.css('background-color', 'rgb(7 , 146 ,113  )');
        } else if (36 < idx && idx <= 42) {
          //pantone yellow
          element.css('background-color', 'rgb(255 , 253 ,144  )');
        } else if (42 < idx && idx <= 48) {
          //pantone orange
          element.css('background-color', 'rgb(229 , 74 , 20   )');
        } else if (48 < idx && idx <= 56) {
          //pantone red
          element.css('background-color', 'rgb(154 , 19 , 53    )');
        }

        if (idx > 52 && idx <=56){
          element.addClass('bass');
          element.css('background-color', 'white');

        }

        if (idx >= 12 && idx <=15){
          element.addClass('treble');
        }



        // element.css('opacity', opacity);

        if (opacity >=0.35 && opacity <=0.65) {
          opacity += 0.1;
        } else if (opacity > 0.65 && opacity <= 0.85) {
          opacity += 0.12;
        } else if (opacity > 0.85) {
          opacity = 1.0;
        } else {
          opacity *= 0.7;
        }

        snapshot.append(element);
        var tester = element;
        var randMultiplier = Math.random();
      element.fadeTo(800, opacity, function() {
            tester.fadeOut(18000*randMultiplier + 6000);

      });
      }

    })
      $("#main-body").append(snapshot);
      // snapshot.fadeOut(66000);


      ourData = [];
    }, 100)
}

window.onload = function(){
  audioContext = new webkitAudioContext();
  loadFile('audios/Roygbiv.mp3');
}
