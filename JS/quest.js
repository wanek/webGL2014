function DisplayHelpDiv(){
  $("#help_button")
    .css("height",(height/100*6))
    .css("width",(height/100*6))
    .css("left", width);
  var transform = $("#help_g").attr("transform");
  if (!isAndroid){
    $("#help_button")
    .css("height","20%")
    .css("width","10%")
    .css("left", (width/100*90));
    var newtransform = "translate(-80,-80) scale(.45)";
    $("#help_g").attr("transform",newtransform);
    $("#jump_button").css("left","2%");
    $("#jump_button").css("top","40px");
    $("#jump_g").attr("transform","translate(-40,-20) scale(.35)");
    $("#help-android").css("display", "none");
  } else {
      $("#help-desktop").css("display", "none");
      $("#help-navigate").css("width",width);
  }
  var modelChosen = 0;
  $("#help-model").dialog({
    modal: true,
    height: 275,
    autoOpen: false,
    draggable: false,
    resizeable: false,
    buttons: {
      Go: function() {
        if (modelChosen == 0){
          positionLib.jumpToCube();
        } else {
          positionLib.jumpToPyramid()
        } 
        $(this).dialog("close");
      },
      Cancel: function() {
        $(this).dialog("close");
      }
    }
  });
  $("#jump_button").click(function(){
    $("#help-model").dialog("open");
  });
  $( "#help-navigate" ).dialog({
    modal: true,
    autoOpen: false,
    draggable: false,
    width:function() {
      if (isAndroid) {
        $(this).css("width", width)
      }
    }
  });  
  $("#help_button").click(function(){
    $("#help-navigate").dialog("open");
  });
  $("#help_button").on("touchstart", function() {
    $("#help-navigate").dialog("open");
  });  
  $("#square").css({"stroke": "#E6E6E6"});
  $("#square").click(function() {
    if (modelChosen == 1) {
      modelChosen = 0;
      $("#square").css({"stroke": "#E6E6E6"});
      $("#triangle").css({"stroke": "rgb(0,0,0)"});
    }
  });
  $("#triangle").click(function() {
    if (modelChosen == 0) {
      modelChosen = 1;
      $("#square").css({"stroke": "rgb(0,0,0)"});
      $("#triangle").css({"stroke": "#E6E6E6"});
    }
  });
};
