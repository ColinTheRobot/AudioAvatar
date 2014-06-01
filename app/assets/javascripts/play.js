// window.onload = function() {
//   var ctx = new AudioContext();
//   var audio = document.getElementById('myAudio');
//   var audioSrc = ctx.createMediaElementSource(audio);
//   var analyser = ctx.createAnalyser();
//   // we have to connect the MediaElementSource with the analyser
//   audioSrc.connect(analyser);
//   // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)

//   // frequencyBinCount tells you how many values you'll receive from the analyser
//   var frequencyData = new Uint8Array(analyser.frequencyBinCount);

//   // we're ready to receive some data!
//   // loop
//   function renderFrame() {
//      requestAnimationFrame(renderFrame);
//      // update data in frequencyData
//      analyser.getByteFrequencyData(frequencyData);
//      // render frame based on values in frequencyData
//      // console.log(frequencyData)
//   }
//   audio.start();
//   renderFrame();
// };
var audio = new Audio();
audio.src = "http://al1perrier.free.fr/mp3/Jamiroquai%20-%20Virtual%20Insanity.mp3";
audio.controls = true;
audio.autoplay = true;
document.body.appendChild(audio);

var context = new webkitAudioContext();
var analyser = context.createAnalyser();

//experimental, slapping in bits of code
// var freqDomain = new Float32Array(analyser.frequencyBinCount);
// analyser.getFloatFrequencyData(freqDomain);

// function getFrequencyValue(frequency) {
//   var nyquist = context.sampleRate/2;
//   var index = Math.round(frequency/nyquist * freqDomain.length);
//   return freqDomain[index];
// }

// Wait for window.onload to fire. See crbug.com/112368
window.addEventListener('load', function(e) {
  // Our <audio> element will be the audio source.
  var source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);

  requestAnimationFrame()
}, false);


