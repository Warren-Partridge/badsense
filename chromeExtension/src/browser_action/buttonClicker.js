// Get our keywords from ext file
var searchArray;
var globalKeywords;

var query_queue;

if (localStorage.is_bg === undefined){
  localStorage.is_bg = "false";
}
var is_bg = localStorage.is_bg;

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

// background code

function click(link) {
  if (link) {
    $.post(link.ping, "PING", function(d, s, x){console.log("Sent ping. Status: " + s);});
  }
}

function bg_search(response){
  search_query(response.pop());
  setTimeout(function(){
    if(response.length <= 0){
      return null;
    }
    else{
      bg_search(response);
    }
  }, 2000);
}

function search_query(query) {
  var results_page;
  $.get(encodeURI("https://www.google.com/search?q=" + query), "", function(d, t, x) {
    results_page = $.parseHTML(d);

    var results = $(results_page).find(".r").toArray();
    console.log(results); 

    for (var i = results.length - 1; i >= 0; i--) {
      var anchor = $(results[i]).find("a")[0];
      if (anchor && anchor.ping) {
        click(anchor.ping);
      }
    }
  })
}


window.addEventListener('load', function load(event) {
  document.getElementById("is_bg").checked = localStorage.is_bg == 'true'? true : false;
  // Button 0 listener
  document.getElementById("button0").onclick = () => {
    let keywordToPass = document.getElementById("button0").innerText;
    console.log(keywordToPass);
    let resultSearches = $.ajax({
      url:"https://badsense.herokuapp.com/" + keywordToPass,
      success: function(response){ 
        if(is_bg === "true"){
          bg_search(response);
        }
        else{
          chrome.extension.sendMessage({type:"add_queries", queries:response}, function(response) {});
        }
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
        if(is_bg === "true"){
          bg_search(response);
        }
        else{
          chrome.extension.sendMessage({type:"add_queries", queries:response}, function(response) {});
        }
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
        if(is_bg === "true"){
          bg_search(response);
        }
        else{
          chrome.extension.sendMessage({type:"add_queries", queries:response}, function(response) {});
        }
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
          if(is_bg === "true"){
            bg_search(response);
          }
          else{
            chrome.extension.sendMessage({type:"add_queries", queries:response}, function(response) {});
          }
        }
      });
    }
  };

  // Button 3 listener
  document.getElementById("button3").onclick = () => {
    let keywordToPass = document.getElementById("button3").innerText;
    console.log(keywordToPass);
    let resultSearches = $.ajax({
      url:"https://badsense.herokuapp.com/" + keywordToPass,
      success: function(response){
        if(is_bg === "true"){
          bg_search(response);
        }
        else{
          chrome.extension.sendMessage({type:"add_queries", queries:response}, function(response) {});
        }
        
      }
    });

  };

  // Button 4 listener
  document.getElementById("button4").onclick = () => {
    let keywordToPass = document.getElementById("button4").innerText;
    console.log(keywordToPass);
    let resultSearches = $.ajax({
      url:"https://badsense.herokuapp.com/" + keywordToPass,
      success: function(response){
        if(is_bg === "true"){
          bg_search(response);
        }
        else{
          chrome.extension.sendMessage({type:"add_queries", queries:response}, function(response) {});
        }
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

  document.getElementById("is_bg").onclick = () => {
    localStorage.is_bg = (localStorage.is_bg == 'true') ? false : true;
    is_bg = localStorage.is_bg;
    console.log(is_bg);
  };
});