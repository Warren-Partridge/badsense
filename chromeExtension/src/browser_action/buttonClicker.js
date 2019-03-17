// Get our keywords from ext file
var searchArray;

const url = chrome.runtime.getURL('data/keywords.json');
fetch(url)
  .then((response) => response.json())
  .then((json) => {
    var globalKeywords = json.keywords;
    choose3Keywords(globalKeywords);
  });


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
        chrome.extension.sendMessage({type:"add_queries", queries:response}, function(response) {});
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

<<<<<<< HEAD
  
=======

  document.getElementById("refresh-button").onclick = () => choose3Keywords(globalKeywords);

>>>>>>> 6b4699d17fdcafea46f8c3e247c7a706ce454cf8
});