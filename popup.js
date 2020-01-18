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

let goToCourseraBtn = document.getElementById("my-btn")
goToCourseraBtn.onclick = function(element) {
  chrome.tabs.create({"url": "https://www.coursera.org/"})
  return false
}

function toggleShow() {
  var inputToggle = document.querySelector('[data-toggle-switch]');
  if (inputToggle.checked === false) {
    // do something
  } else {
    // do other things (might need to send to background)
  }
}
