var data = [];
var index = 0;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	if (request.finish) {
  		console.log("finish");
  		setTimeout(function (){
  			index++;
	  		read(index);
	  		console.log(index);
  		},1);

  	}
});


function read(i) {
	chrome.runtime.sendMessage({guid: data[i].guid}, function(response) {
		console.log("uid= "+data[i]+", completed");

	});
}

function start() {
	console.log("Content start");

	var current = $("area");
	var str = "";

	for (var i = 0; i < current.length; i++) {
		curComplete = false;
		if (current[i].title) {
			//console.log(current[i].title);
			var guid = current[i].title.substring(0, current[i].title.indexOf(";")).trim();
			var left = current[i].title.substring(current[i].title.indexOf("Left") + 8, current[i].title.indexOf("Right") - 4).trim();
			var right = current[i].title.substring(current[i].title.indexOf("Right") + 9, current[i].title.length).trim();

			str += guid +","+left +","+right +"\n";
			//console.log(str);
			data.push({guid : guid});


			//setTimeout(function (){console.log("time out")},100000);
			//while(!curComplete) {
			//}
			//break;
		}
	}
	console.log(data);
	read(0);

	//console.log(str);

	/*
	var mapHTML = $("#ImageMapImageMap1").html();
	var area = [];
	area = mapHTML.split("area");
	console.log(area);

	for (a in area) {
		console.log(a);
	}
	*/

}

start();
