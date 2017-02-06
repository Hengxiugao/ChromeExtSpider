function tmds() {
	console.log("tmds");
	var current = $("td");
	var uid;
	var trkName;
	var aTrkName;
	var left;
	var right;
	var sub;
	for (var i = 0; i < current.length; i++) {
		if (current[i].innerText == "UID") {
			uid = current[i + 1].innerText;
			continue;
		}
		if (current[i].innerText == "TrkName") {
			trkName = current[i + 1].innerText;
			continue;
		}
		if (current[i].innerText == "AlternateTrackNames") {
			aTrkName = current[i + 1].innerText;
			continue;
		}
		if (current[i].innerText == "LeftLimitMPRange") {
			left = current[i + 1].innerText;
			continue;
		}
		if (current[i].innerText == "RightLimitMPRange") {
			right = current[i + 1].innerText;
			continue;
		}
		if (current[i].innerText == "Subdivision") {
			sub = current[i + 1].innerText;
			sub = sub.substring(0, sub.indexOf("(")).trim();
			continue;
		}
	}
	chrome.runtime.sendMessage({type: 2, uid: uid, trkName: trkName, aTrkName: aTrkName, left: left, right: right, sub: sub}, function(response) {
		console.log(response);
		window.close();
	});
	console.log(uid+", trkName="+trkName+", aTrkName="+aTrkName+", "+ left +", " + right+", sub="+sub);

}


tmds();