function DisplayHelpDiv(){
  $("#jump_button").css("left", (width/100*.2));
  var transform = $("#help_g").attr("transform");
  if (!isAndroid){
    $("#help_button")
    .css("height","20%")
    .css("width","10%")
    .css("left", "88%");
    var newtransform = "translate(-80,-80) scale(.45)";
    $("#help_g").attr("transform",newtransform);
    $("#jump_button").css("left","2%");
    $("#jump_button").css("top","40px");
    $("#jump_g").attr("transform","translate(-40,-20) scale(.35)");
    $("#help-android").css("display", "none");
  } else {
      $("#help-desktop").css("display", "none");
      $("#help-navigate").css("width",width*.5);
      $("#help-model").css("width",width*.5);
  }
  var modelChosen = 0;
  $("#help-model").dialog({
    modal: true,
    height: 280,
    autoOpen: false,
    draggable: false,
    resizable: false,
    buttons: {
      Go: function() {
        if (modelChosen == 0){
          positionLib.jumpToCube();
        } else {
          positionLib.jumpToPyramid()
        } 
        $(this).dialog("close");
        if (isAndroid) {
          $(this).on("touchstart"), function() {
            $(this).closest(".dialog").dialog("close");
          }
        }
      },
      Cancel: function() {
        $(this).dialog("close");
      }
    }
  });
  $( "#help-navigate" ).dialog({
    modal: true,
    autoOpen: false,
    draggable: false,
    position:{my:"center",at:"center",of:"#canvas1"},
    width:function() {
      if (isAndroid) {
  	  //there is probably a cleaner way to make these adjustments
  	  //but currently most dynamic resizing for #help-navigate is occuring here
    	  if (window.height < window.width){//landscape view
  	      $(this).css("width",width*.5)
  	      $("#help-android > p").css("font-size","20px");
    	  }
    	  if (window.height > window.width){ //Portrait view
  	      $(this).css("width",width*.7)
  	      $("#help-android > p").css("font-size","26px");
  	      $(".ui-dialog-titlebar-close").css("height", height*.06).css("width",height*.06)
    	  }  
      }
    }
  });
  if (isAndroid) {
    $("#jump_button").on("touchstart", function() {
      $("#help-model").dialog("open");
    });
    $("#help_button").on("touchstart", function() {
      $("#help-navigate").dialog("open");
    });
    $("#square").css({"stroke": "#E6E6E6"});
    $("#square").on("touchstart", function() {
      if (modelChosen == 1) {
        modelChosen = 0;
        $("#square").css({"stroke": "#E6E6E6"});
        $("#triangle").css({"stroke": "rgb(0,0,0)"});
      }
    });
    $("#triangle").on("touchstart", function() {
      if (modelChosen == 0) {
        modelChosen = 1;
        $("#square").css({"stroke": "rgb(0,0,0)"});
        $("#triangle").css({"stroke": "#E6E6E6"});
      }
    });
    $("button span:contains('Go')").on("touchstart", function() {
      if (modelChosen == 0){
          positionLib.jumpToCube();
        } else {
          positionLib.jumpToPyramid();
        }
      $("#help-model").dialog("close");
    });
    $("button span:contains('Cancel')").on("touchstart", function() {
      $("#help-model").dialog("close");
    });
    $(".ui-dialog-titlebar-close").on("touchstart", function() {
      $("#help-navigate").dialog("close");
      $("#help-model").dialog("close");
    });
  } else {
      $("#jump_button").click(function(){
        $("#help-model").dialog("open");
      });
      $("#help_button").click(function(){
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
    }
};
function redrawSVG(){
  if (window.height < window.width){
  	$("#controls").css("top","65%").css("padding-left","10px").css("width",width);
  	$("#moveStick").css("margin-left","180px");
  	$("#move_g").attr("transform","translate(270,5) scale(.75)");
  	$("#view_g").attr("transform","translate(5,5) scale(.75)");
  	$("#reset_g").attr("transform","translate(1,1) scale(.5)");
  	$("#help_button").css("left", (width/100*88));
  	$("#jump_button").css("left", (width/100*.2));
  } else {
    $("#controls").css("top","93%").css("padding-left","130px").css("width",width);
    $("#moveStick").css("margin-left","0px");
	  $("#move_g").attr("transform","translate(110,5)");
	  $("#view_g").attr("transform","translate(5,5)");
	  $("#reset_g").attr("transform","translate(1,1)");
  }
}
function getPoly3Json(){
  $.ajax({
	url:"path/to/script",
	success:function(response){
    //send this to data structure
  }
});
}