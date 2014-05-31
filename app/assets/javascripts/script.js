$(document).ready(function(){
  for(n=1; n<100; n++){
    var col_id = "column" + n;
    // alert(col_id);
    var colDiv = $('<div/>').attr('id', col_id).addClass("vertical").appendTo("#chart");
      var redDiv = $('<div>').addClass("box red").appendTo(colDiv);
      var orangeDiv = $('<div>').addClass("box orange").appendTo(colDiv);
      var yellowDiv = $('<div>').addClass("box yellow").appendTo(colDiv);
      var greenDiv = $('<div>').addClass("box green").appendTo(colDiv);
      var blueDiv = $('<div>').addClass("box blue").appendTo(colDiv);
      var indigoDiv = $('<div>').addClass("box indigo").appendTo(colDiv);
      var purpleDiv = $('<div>').addClass("box purple").appendTo(colDiv);
  }

  function lightUp(){

    var colorArr = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'];
    var randArrIndex = Math.floor(Math.random() * 6) + 1;
    var color = colorArr[randArrIndex];

    var lightedBox = "." + colorArr[randArrIndex];
//     console.log(lightedBox);

    var rand = Math.floor(Math.random() * 100) + 1;
    var rand_col_Id = "#column" + rand;

    var litUpThingIds = rand_col_Id + " " + lightedBox;
    console.log(litUpThingIds);


    $(litUpThingIds).css({'background-color': color});

  }

  setInterval(function() {
      lightUp();
  }, 500);

});
