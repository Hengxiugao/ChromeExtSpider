chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	/*
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log(request);
    */
    if (request.type == 2) {
    	var newURL = "http://127.0.0.1:3000/index?uid="+request.uid+
    	"&trkName="+request.trkName+
    	"&aTrkName="+request.aTrkName+
    	"&left="+request.left+
    	"&right="+request.right+
    	"&sub="+request.sub;
    	chrome.tabs.create({ url: newURL });
    	//closeCurrentTabUrl(0);
    	//sendResponse(123);
    } else if (request.type == 3) {
    	//Finish
    	console.log("type 3");
    	chrome.tabs.query({active: false}, function(tabs) {
    		//console.log(tabs);
		  chrome.tabs.sendMessage(tabs[1].id, {finish: true}, function(response) {
		    //console.log(response.farewell);
		  });
		});
    } 
    else {
    	var url = sender.tab.url;
	    var sessionID = url.substring(url.indexOf(".com") + 5, url.indexOf("$$/") + 2);
	    console.log(sessionID);
	    var guid = request.guid;
	    var newURL = "https://employee.bnsf.com/"+ sessionID +"/groups/op/TMDSReports/TmdsDetails.aspx?uid="+ guid +"&type=trk&src=Production&ts=1";
	    chrome.tabs.create({ url: newURL });
	    sendResponse({sessionID: sessionID});
    }
});
function closeCurrentTabUrl(i) {
	var queryInfo = {
	    active: true,
	    currentWindow: true
	  };

	chrome.tabs.query(queryInfo, function(tabs) {
		var tab = tabs[i];
		chrome.tabs.remove(tab.id, function() { });
	  });
  	
}

function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}