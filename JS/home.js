var HiveplotVars = {};

function initializeHiveplotVars() {
    console.log("vars Initializing");    
    HiveplotVars = {
	topology:[],
	nodes:[],
	links:[],
	serverproc:[],
	ajaxcounter:0,
	serverID:0,
	processes:[],
	processnodes:[],
	servertags:[],
	serverdata:[],
	AxesFunctions:[],
	FunctionPointer: 0,
	RespAvgThreshold:100000,
	Transitioning:false,
	Radius:3,
	innerRadius:40,
   	outerRadius:290,
    }
    
    getHiveplotTopology();
    
    
}
	   
function getHiveplotTopology(){
    $.ajax({
	type: "GET",
	url: "/hiveplot/api/server/topology/data",
	data: {},
	dataType: "json",
	success: function(data) {
	    var json_data = eval(data);    
	    getHiveplotServers();
	    HiveplotVars.topology = json_data;
	    console.log("topology success")
            CreateNodesList();
	    CreateLinkList();
	    SetLinks();
	    AppendCoordinatesToNodes();
	    Main();
	
	},
	error:function(jqXHR, textStatus, errorThrown){
	    getHiveplotServers();
	}
    });
}

function getHiveplotServers(){
    $.ajax({
	type: "GET",
	url: "/hiveplot/api/server/data",
	data: {},
	dataType: "json",
	success: function(data)  {
	    var json_data = eval(data);
	    HiveplotVars.servers = json_data;
	    getHiveplotServerTags();
	    console.log("server success");

	},
	error:function(jqXHR, textStatus, errorThrown){
	    getHiveplotServerTags();
	}
    });
}


function getHiveplotServerTags(){
    $.ajax({
	type: "GET",
	url: "/hiveplot/api/server/tags/data",
	data: {},
	dataType: "json",
	success: function(data){
	    var json_data = eval(data);
	    HiveplotVars.servertags = json_data;
		console.log("server tags success")
	 
	}
    });
}

function DocReady(){};
