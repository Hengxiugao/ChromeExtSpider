function local() {
	chrome.runtime.sendMessage({type: 3}, function(response) {
		console.log(response);
		window.close();
	});
};

local();
