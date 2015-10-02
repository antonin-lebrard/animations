// Find better, but will do for the moment

var listCanvas = [
  "black-And-White-Circle-In",
  "space-Effect",
  "missed-Anim-1"
];
var listAnchor = [];

listCanvas.forEach(function(canvas){
  var anchor = document.createElement('a');
  anchor.href = canvas.split('-').join('') + "/index.html";
  anchor.innerHTML = canvas.split('-').join(' ').substring(0, 1).toUpperCase() + canvas.split('-').join(' ').substring(1);
  listAnchor.push(anchor);
});

window.onload = function(){
  var content = document.getElementById('content');
  listAnchor.forEach(function(anchor){
    content.appendChild(anchor);
  });
};