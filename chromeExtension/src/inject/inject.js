var results;
var links;

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		results = $(".r").toArray();
		links = [];

		console.log(results);	

		for (var i = results.length - 1; i >= 0; i--) {
			var anchor = $(results[i]).find("a")[0];
			if (anchor.ping) {
				links.push(anchor);
			}
		}

		console.log(links);

		for (var i = links.length - 1; i >= 0; i--) {
			$.post(links[i].ping, "PING", function(d, s, x){console.log("Sent ping. Status: " + s + ", data: " + d);});
		}

		// ----------------------------------------------------------

	}
	}, 10);
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    alert("I'm a content script and I just heard the request: " + request.keyword);
  });