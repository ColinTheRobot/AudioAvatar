$(document).ready(function(){
  for(n=1; n<100; n++){
    var col_id = "column" + n;
    // alert(col_id);
    var colDiv = $('<div/>').attr('id', col_id).addClass("vertical").appendTo("#chart");
      var purpleDiv = $('<div>').addClass("box purple").appendTo(colDiv);
      var indigoDiv = $('<div>').addClass("box indigo").appendTo(colDiv);
      var blueDiv = $('<div>').addClass("box blue").appendTo(colDiv);
      var greenDiv = $('<div>').addClass("box green").appendTo(colDiv);
      var yellowDiv = $('<div>').addClass("box yellow").appendTo(colDiv);
      var orangeDiv = $('<div>').addClass("box orange").appendTo(colDiv);
      var redDiv = $('<div>').addClass("box red").appendTo(colDiv);
  }

  function lightUp(){
    // color array to randomly choose colors to brighten
    var colorArr = ['black','red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'];
    var randArrIndex = Math.floor(Math.random() * 6) + 1;
    var color = colorArr[randArrIndex];
    var lightedBox = "." + colorArr[randArrIndex];

    // generates random column number
    var rand = Math.floor(Math.random() * 100) + 1;
    var rand_col_Id = "#column" + rand;

    // This concats the random column id and box class
    var litUpThingIds = rand_col_Id + " " + lightedBox;

    // This changes the background-color of certain divs
    $(litUpThingIds).css({'background-color': color});

  }

  // Randomly lights up colored divs
  setInterval(function() {
      lightUp();
  }, 100);

});
