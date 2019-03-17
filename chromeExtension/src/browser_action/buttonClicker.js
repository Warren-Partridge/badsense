// Get our keywords from ext file
var searchArray;
var globalKeywords;

const url = chrome.runtime.getURL('data/keywords.json');
fetch(url)
  .then((response) => response.json())
  .then((json) => {
    globalKeywords = json.keywords;
    choose5Keywords(globalKeywords);
});

function choose5Keywords(keywords) {
  let chosenKeywords = [];
  console.log("in 1st");
  console.log(keywords);
  for(let i=0; i<5; i++) {
    chosenKeywords.push(chooseKeyword(i, keywords));
  }

  return chosenKeywords;
}


function chooseKeyword(buttonToApplyTo, keywordsPool) {
  console.log(keywordsPool);
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
    console.log(keywordToPass);
    let resultSearches = $.ajax({
      url:"https://badsense.herokuapp.com/" + keywordToPass,
      success: function(response){ 
        chrome.extension.sendMessage({type:"add_queries", queries:response}, function(response) {});
      }
    });
  };

  // Button 2 listener
  document.getElementById("button2").onclick = () => {
    let keywordToPass = document.getElementById("button2").innerText;
    console.log(keywordToPass);
    let resultSearches = $.ajax({
      url:"https://badsense.herokuapp.com/" + keywordToPass,
      success: function(response){ 
        chrome.extension.sendMessage({type:"add_queries", queries:response}, function(response) {});
      }
    });
  };

  document.getElementById("custom-search").onkeyup = function(e){
    if (e.keyCode == 13){
      let keywordToPass = document.getElementById("custom-search").value;
      console.log(keywordToPass);
      let resultSearches = $.ajax({
        url:"https://badsense.herokuapp.com/" + keywordToPass,
        success: function(response){ 
          chrome.extension.sendMessage({type:"add_queries", queries:response}, function(response) {});
        }
      });
    }
  };

  // Button 3 listener
  document.getElementById("button3").onclick = () => {
    let keywordToPass = document.getElementById("button0").innerText;
    console.log(keywordToPass);
    let resultSearches = $.ajax({
      url:"https://badsense.herokuapp.com/" + keywordToPass,
      success: function(response){
        chrome.extension.sendMessage({type:"add_queries", queries:response}, function(response) {});
      }
    });

  };

  // Button 4 listener
  document.getElementById("button3").onclick = () => {
    let keywordToPass = document.getElementById("button0").innerText;
    console.log(keywordToPass);
    let resultSearches = $.ajax({
      url:"https://badsense.herokuapp.com/" + keywordToPass,
      success: function(response){
        chrome.extension.sendMessage({type:"add_queries", queries:response}, function(response) {});
      }
    });

  };

  document.getElementById("refresh-button").onclick = () => {
    choose5Keywords(globalKeywords);
    fetch(url)
  .then((response) => response.json())
  .then((json) => {
    globalKeywords = json.keywords;
    choose5Keywords(globalKeywords);
  });
  }

});