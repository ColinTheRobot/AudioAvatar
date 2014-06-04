$(function(){

var audio = new Audio();
audio.src = "http://al1perrier.free.fr/mp3/Jamiroquai%20-%20Virtual%20Insanity.mp3";
audio.controls = true;
audio.autoplay = false;
document.body.appendChild(audio);

var context = new webkitAudioContext();
var analyser = context.createAnalyser();
javascriptNode = context.createScriptProcessor(2048, 1, 1);

analyser.smoothingTimeConstant = 0.3;
analyser.fftSize = 1024;

analyser2 = context.createAnalyser();
analyser2.smoothingTimeConstant = 0.0;
analyser2.fftSize = 1024;

// create a buffer source node
sourceNode = context.createBufferSource();
splitter = context.createChannelSplitter();

// connect the source to the analyser and the splitter
sourceNode.connect(splitter);

// connect one of the outputs from the splitter to
// the analyser
splitter.connect(analyser,0,0);
splitter.connect(analyser2,1,0);

// we use the javascript node to draw at a
// specific interval.
analyser.connect(javascriptNode);

// and connect to destination
sourceNode.connect(context.destination);



// var fftData = analyser.getFloatFrequencyData();





// Wait for window.onload to fire. See crbug.com/112368
window.addEventListener('load', function(e) {
  // Our <audio> element will be the audio source.
  var source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
  soundSource = context.createBufferSource();
  // soundBuffer = context.createBuffer(audio, true);
  // soundSource.buffer = soundBuffer;
  var array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(array);
  var fftData = analyser.getFloatFrequencyData(array);
      console.log(fftData);
        // draw the spectrogram
  if (sourceNode.playbackState == sourceNode.PLAYING_STATE) {
      drawSpectrogram(array);
      console.log(array);
  }


  requestAnimationFrame()
}, false);


function audioGraph(audioData) {

        var volumeNode, lowPassFilter;
        // Same setup as before
        soundSource = context.createBufferSource();
        soundBuffer = context.createBuffer(audioData, true);
        soundSource.buffer = soundBuffer;
        volumeNode = context.createGainNode();
        volumeNode.gain.value = 1;

        // Create our filter
        lowPassFilter = context.createBiquadFilter();
        lowPassFilter.type = 0; // (Low-pass)

        // Specify parameters for the low-pass filter.
        lowPassFilter.frequency.value = 220; // Cut off above 220 Hz

        // Wiring
        soundSource.connect(volumeNode);
        volumeNode.connect(lowPassFilter);
        lowPassFilter.connect(context.destination);

        // Finally
        playSound(soundSource);
    }

     function startSound() {
        // play the source now
        // soundSource.noteOn(context.currentTime);
        console.log("start sound clicked.");
    }

    // function stopSound() {
    //     // stop the source now
    //     soundSource.noteOff(context.currentTime);
    // }

    // Events for the play/stop bottons

    document.querySelector('.play').addEventListener('click', startSound);
    document.querySelector('.stop').addEventListener('click', stopSound);



audioGraph(audio);

  // create a temp canvas we use for copying and scrolling
    var tempCanvas = document.createElement("canvas"),
        tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width=800;
    tempCanvas.height=512;

    // used for color distribution
    var hot = new chroma.ColorScale({
        colors:['#000000', '#ff0000', '#ffff00', '#ffffff'],
        positions:[0, .25, .75, 1],
        mode:'rgb',
        limits:[0, 300]
    });

    // when the javascript node is called
    // we use information from the analyzer node
    // to draw the volume
    javascriptNode.onaudioprocess = function () {

        // get the average for the first channel
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);

        // draw the spectrogram
        if (sourceNode.playbackState == sourceNode.PLAYING_STATE) {
            drawSpectrogram(array);
            console.log(array)
        }
    }

    function drawSpectrogram(array) {

        // copy the current canvas onto the temp canvas
        var canvas = document.getElementById("canvas");

        tempCtx.drawImage(canvas, 0, 0, 800, 512);

        // iterate over the elements from the array
        for (var i = 0; i < array.length; i++) {
            // draw each pixel with the specific color
            var value = array[i];
            ctx.fillStyle = hot.getColor(value).hex();

            // draw the line at the right side of the canvas
            ctx.fillRect(800 - 1, 512 - i, 1, 1);
        }

        // set translate on the canvas
        ctx.translate(-1, 0);
        // draw the copied image
        ctx.drawImage(tempCanvas, 0, 0, 800, 512, 0, 0, 800, 512);

        // reset the transformation matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }


        function setupAudioNodes() {

        // setup a javascript node
        javascriptNode = context.createScriptProcessor(2048, 1, 1);
        // connect to destination, else it isn't called
        javascriptNode.connect(context.destination);

        // setup a analyzer
        analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 512;

        // create a buffer source node
        sourceNode = context.createBufferSource();
        sourceNode.connect(analyser);
        analyser.connect(javascriptNode);

//        sourceNode.connect(context.destination);
    }





})
