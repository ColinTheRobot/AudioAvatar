$(function(){

  $("#test").html("<p>hello-world</p>");

})


   // check if the default naming is enabled, if not use the chrome one.
    if (! window.AudioContext) {
        if (! window.webkitAudioContext) {
            alert('no audiocontext found');
        }
        window.AudioContext = window.webkitAudioContext;
    }
    var context = new AudioContext();
    var audioBuffer;
    var sourceNode;

    // load the sound
    setupAudioNodes();
    loadSound("../public/audios/aerodynamic.mp3");

    function setupAudioNodes() {
        // create a buffer source node
        sourceNode = context.createBufferSource();
        // and connect to destination
        sourceNode.connect(context.destination);
    }

    // load the specified sound
    function loadSound(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // When loaded decode the data
        request.onload = function() {

            // decode the data
            context.decodeAudioData(request.response, function(buffer) {
                // when the audio is decoded play the sound
                playSound(buffer);
            }, onError);
        }
        request.send();
    }


    function playSound(buffer) {
        sourceNode.buffer = buffer;
        sourceNode.start(0);
    }

    // log if an error occurs
    function onError(e) {
        console.log(e);
    }
