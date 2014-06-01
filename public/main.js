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

function render() {
    var audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;
    fftObject = audioContext.createAnalyser();
    fftObject.fftSize = samples;
    audioSource.connect(fftObject);
    fftObject.connect(audioContext.destination);
    audioSource.noteOn(0);
    setup = true;

    setInterval(function(){
      var data = new Uint8Array(samples);
      fftObject.getByteFrequencyData(data);
      $('#fun').html('')
      $(data).each(function(idx, magnitude){
        var element = $('<div>').addClass('bin');
        element.css('height', magnitude+'px');
        $('#fun').append(element);
      })
    }, 100)
}

window.onload = function(){
  audioContext = new webkitAudioContext();
  loadFile('audios/corpus_christi.mp3');
}
