$(document).ready(function(){
  for(n=0; n<=7; n++){
    var col_id = "column" + n;
    var colDiv = $('<div/>').attr('id', col_id).appendTo("#chart");

    for (i = 0; i <= 100; i++){
      var arr_id = "array" + i;
      var arrayDiv = $('<div>').attr('id', arr_id);
      var miniDivs = $('<div>');
      var divBoxes = miniDivs.addClass("box").appendTo(arrayDiv);
      $(divBoxes).appendTo(rowDiv);
    }
  }

  var rand = Math.floor(Math.random() * 100) + 1;
  var rand_colId = "column" + rand;







});
