function DisplayHelpDiv(){
  if (!isAndroid){
    $("#help_g").attr("transform","translate(-85,-85) scale(.45)");
    $("#help_button").css("width", "55px").css("height", "55px");
    $("#jump_button").css("width", "55px").css("height", "55px");
    $("#help_button").css("left", (width*.95)-55);
    $("#jump_button").css("left", (width*.05));
    $("#jump_g").attr("transform","translate(-55,-30) scale(.35)");
    $("#help-android").css("display", "none");
  } else {
      $("#help-desktop").css("display", "none");
      $("#help_g").attr("transform","translate( -192,-191)");
      $("#jump_g").attr("transform", "translate(-123,-66) scale(.77)");
      $("#help_button").css("width", "118px").css("height", "118px");
      $("#jump_button").css("width", "118px").css("height", "118px");
      $("#help_button").css("left", (width*.95)-118);
      $("#jump_button").css("left", (width*.05));
  }
  var modelChosen = 0;
  $("#jump-dialog").dialog({
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
  $( "#help-dialog" ).dialog({
    modal: true,
    autoOpen: false,
    draggable: false,
    position:{my:"center",at:"center",of:"#canvas1"},
    width:function() {
      if (isAndroid) {
  	  //there is probably a cleaner way to make these adjustments
  	  //but currently most dynamic resizing for #help-dialog is occuring here
    	  if (window.height < window.width){//landscape view
  	      $(this).css("width",width*.5);
  	      $("#help-android > p").css("font-size","20px");
    	  }
    	  if (window.height > window.width){ //Portrait view
  	      $(this).css("width",width*.7);
  	      $("#help-android > p").css("font-size","26px");
  	      $(".ui-dialog-titlebar-close").css("height", height*.06).css("width",height*.06);
    	  }  
      }
    }
  });
  if (isAndroid) {
    $("#jump_button").on("touchstart", function() {
      $("#jump-dialog").dialog("open");
    });
    $("#help_button").on("touchstart", function() {
      $("#help-dialog").dialog("open");
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
      $("#jump-dialog").dialog("close");
    });
    $("button span:contains('Cancel')").on("touchstart", function() {
      $("#jump-dialog").dialog("close");
    });
    $(".ui-dialog-titlebar-close").on("touchstart", function() {
      $("#help-dialog").dialog("close");
      $("#jump-dialog").dialog("close");
    });
  } else {
    $("#jump_button").click(function(){
      $("#jump-dialog").dialog("open");
    });
    $("#help_button").click(function(){
      $("#help-dialog").dialog("open");
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
  } else {
    $("#controls").css("top","93%").css("padding-left","130px").css("width",width);
    $("#moveStick").css("margin-left","0px");
	  $("#move_g").attr("transform","translate(110,5)");
	  $("#view_g").attr("transform","translate(5,5)");
	  $("#reset_g").attr("transform","translate(1,1)");
  }
}
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
    }
  }
  return cookieValue;
}
function csrfSafeMethod(method) {
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
function getPoly3Json(){
  var csrftoken = getCookie('csrftoken');
  $.ajax({
    crossDomain: false,
    beforeSend: function(xhr, settings) {
      if (!csrfSafeMethod(settings.type)) {
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
    },
    data: "",
    accepts: "json",
    type: "POST",
    url:"/test/",
    success:function(response){
      bufferLib.JSONobject = response;
      bufferLib.initJSONBuffers();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert("Error " + xhr.status + ": " + thrownError);
    }
  });
}
function getPoly3Json2(){
  var csrftoken = getCookie('csrftoken');
  $.ajax({
    crossDomain: false,
    beforeSend: function(xhr, settings) {
      if (!csrfSafeMethod(settings.type)) {
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
    },
    data: "",
    accepts: "json",
    type: "POST",
    url:"/test2/",
    success:function(response){
      bufferLib.JSONobject = response;
      bufferLib.initJSONBuffers();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert("Error " + xhr.status + ": " + thrownError);
    }
  });
}
