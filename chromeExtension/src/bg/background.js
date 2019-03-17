// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

//var settings = new Store("settings", {
//  "sample_setting": "This is how you use Store.js to remember values"
//});

var query_queue = [];


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {

  	console.log(request);

  	switch (request.type) {
  		case "add_queries":
  			console.log(request.queries);
  			query_queue = (request.bg == "True") ? query_queue.concat(request.queries) : request.queries;
  			console.log(query_queue);
  			sendResponse({});
  			chrome.tabs.create({url: encodeURI("https://www.google.com/search?q=" + query_queue.shift())})
  			break;

  		case "next_query":
  			console.log("aa");
  			var r = {query:query_queue.shift()};
  			console.log(r);
  			sendResponse(r);
  			break;

  		default:
  			sendResponse();
  	}
  });
