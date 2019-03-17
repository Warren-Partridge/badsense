// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

//var settings = new Store("settings", {
//  "sample_setting": "This is how you use Store.js to remember values"
//});

var query_queue = [];
var last_next_query_timestamp = -1;

//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {

  	console.log(request);

  	switch (request.type) {
  		case "add_queries":
  			console.log(request.queries);
  			query_queue = request.queries;
  			console.log(query_queue);
  			sendResponse({});
  			chrome.tabs.create({url: encodeURI("https://www.google.com/search?q=" + query_queue.shift())})
  			break;

  		case "next_query":
  			if (last_next_query_timestamp === -1) {
  				last_next_query_timestamp = new Date().getTime();
  			}

  			a = (new Date().getTime() - last_next_query_timestamp)
  			if (a > 10000) {
  				console.log("next_query took too long! " + a);
  				sendResponse({});
  				query_queue = [];
  				break;
  			}

  			last_next_query_timestamp = new Date().getTime();
  			var r = {query:query_queue.shift()};
  			console.log(r);
  			sendResponse(r);
  			break;

  		case "unload":
  			sendResponse({});
  			break;

  		default:
  			sendResponse();
  	}
  });
