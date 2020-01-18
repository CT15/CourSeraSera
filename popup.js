'use strict';

document.addEventListener("DOMContentLoaded", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const coursera = document.getElementById("coursera")
    const notCoursera = document.getElementById("not-coursera")

    if(tabs[0].url.includes("https://www.coursera.org")) {
      coursera.style.display = "block"
      notCoursera.style.display = "none"
    } else {
      coursera.style.display = "none";
      notCoursera.style.display = "block"
    }
  });
});

let goToCourseraBtn = document.getElementById("gotocoursera")
goToCourseraBtn.onclick = function(element) {
  chrome.tabs.create({"url": "https://www.coursera.org/"})
  return false
}

let analyseBtn = document.getElementById("analyse")
analyseBtn.onclick = function(element) {
  chrome.runtime.sendMessage({
    msg: "analyse" 
  })
}
