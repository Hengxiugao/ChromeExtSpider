var uidData = [];
var terr = [];
var option_list = [];
var currentTerr;
var index = 0;


chrome.runtime.sendMessage({getInitStat: true}, function(response) {

});
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	//console.log("start");
    /*
  	if (request.isInit) {
  		console.log("init success");
  		init();
  		start();
  	} else
    */
    if (request.start) {
  		currentTerr = request.currentTerr;
  		console.log("currentTerr updated="+currentTerr);
  		init();
      start();
  	} else if (request.finish) {
  		console.log("finish");
  		setTimeout(function (){
  			index++;
  			if (index == uidData.length) {
  				// Finish collecting for one terr
  				index = 0;
  				chrome.runtime.sendMessage({finishTerr: true}, function(response) {
					console.log("currentTerr= "+currentTerr+", completed");
				});
  			} else {
  				console.log("ready for next index");
  				read(index);
  			}

  		},1);

  	} else if (request.currentTerr) {
  		currentTerr = request.currentTerr;
  		console.log("currentTerr updated="+currentTerr);
  	} else if (request.finishAll) {
  		alert("finish All");
  	} else {
  		//alert("unmatched msg from bk to content");
  	}
});


function read(i) {

	chrome.runtime.sendMessage({guid: uidData[i].guid}, function(response) {
		console.log("uid= "+uidData[i]+", completed");

	});
}

function init() {

	option_list = $("option");
	for (var i = 0; i < option_list.length; i++) {
		var name = option_list[i].innerText;
		if (name.indexOf("-") > 0) {
			var num = name.substring(name.indexOf("-") + 1, name.length).trim();
			terr[num] = name;
		}
	}

	loadData();
	//updateTerr();
}

function updateTerr() {
	if ($('select :selected').text() == terr[currentTerr]) {
		return;
	}
	/*
	window.setTimeout(function() {
		$("select").val(terr[currentTerr]).trigger('change');
		location.href="javascript:F5_r2u();F5_Event_common(event);try{eval(F5_Invoke_eval_event(null,F5_jsBody(function(){setTimeout(__doPostBack(\'DdlTerritories\',\'\'), 0)})))}finally{try{F5_u2r()}catch(e){}}";
	}, 1);
	*/
	console.log(terr[currentTerr]);
}

function loadData() {
	var current = $("area");
	var str = "";
	uidData = [];
	for (var i = 0; i < current.length; i++) {
		curComplete = false;
		if (current[i].title) {
			//console.log(current[i].title);
			var guid = current[i].title.substring(0, current[i].title.indexOf(";")).trim();
			var left = current[i].title.substring(current[i].title.indexOf("Left") + 8, current[i].title.indexOf("Right") - 4).trim();
			var right = current[i].title.substring(current[i].title.indexOf("Right") + 9, current[i].title.length).trim();

			str += guid +","+left +","+right +"\n";
			uidData.push({guid : guid});


		}
	}
	console.log(uidData);
}

function start() {

	console.log("Content start");
	read(0);

}
