// Get our keywords from ext file
var searchArray;

const url = chrome.runtime.getURL('data/keywords.json');
fetch(url)
  .then((response) => response.json())
  .then((json) => choose3Keywords(json.keywords));


function choose3Keywords(keywords) {
  let chosenKeywords = [];

  for(let i=0; i<3; i++) {
    chosenKeywords.push(chooseKeyword(i, keywords));
  }

  return chosenKeywords;
}


function chooseKeyword(buttonToApplyTo, keywordsPool) {
  let choiceIndex = Math.floor(Math.random() * keywordsPool.length);
  let chosenKeyword = keywordsPool[choiceIndex];
  keywordsPool.splice(choiceIndex, 1); // Pops chosen keyword out of the array

  console.log("button" + buttonToApplyTo.toString());

  document.getElementById("button" + buttonToApplyTo.toString()).innerText = chosenKeyword;
  return chosenKeyword;
}


window.addEventListener('load', function load(event) {

  // Button 0 listener
  document.getElementById("button0").onclick = () => {
    let keywordToPass = document.getElementById("button0").innerText;
    console.log(keywordToPass);
    let resultSearches = $.ajax({
      url:"https://badsense.herokuapp.com/" + keywordToPass,
      success: function(response){ 
        searchArray = response;
        console.log(searchArray);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {search: searchArray.shift()}, function(response) {
            console.log(response)
          });
        });
        chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
            console.log(sender.tab ?
                        "from a content script:" + sender.tab.url :
                        "from the extension");
            if (request.response == "ok"){
              sendResponse({search: searchArray.shift()});
            }
            return true;
          });
      }
    });
    
  };

  // Button 1 listener
  document.getElementById("button1").onclick = () => {
    let keywordToPass = document.getElementById("button1").innerText;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {keyword: keywordToPass}, function(response) {
        console.log(response);
      });
    });
  };

  // Button 2 listener
  document.getElementById("button2").onclick = () => {
    let keywordToPass = document.getElementById("button2").innerText;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {keyword: keywordToPass}, function(response) {
        console.log(response);
      });
    });
  };

  
});