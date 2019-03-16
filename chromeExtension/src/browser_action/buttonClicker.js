window.addEventListener('load', function load(event) {
  document.getElementById("button1").onclick = () => {
    alert("button1 has been clicked. This message was sent from browser_action.html's loaded script, and cannot affect the dom without a call to it.");

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
        console.log(response.farewell);
      });
    });
  };
});