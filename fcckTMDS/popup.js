
$(function() {
    $("#buttonStart").bind("click", start);
})


function start() {
  chrome.runtime.sendMessage({start: true}, function(response) {
    
  });
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  renderStatus("Click start to collect data");
});


