$(document).ready(function(){
  for(n=0; n<=7; n++){
    var row_id = "row" + n;
    var rowDiv = $('<div/>').attr('id', row_id).appendTo("#chart");

    for (i = 0; i <= 100; i++){
      var arr_id = "array" + i;
      var arrayDiv = $('<div>').attr("id", arr_id);
      var miniDivs = $('<div>');
      var divBoxes = miniDivs.addClass("box").appendTo(arrayDiv);
      $(divBoxes).appendTo(rowDiv);
    }
  }
});
