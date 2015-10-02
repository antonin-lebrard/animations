function print(s){
  window.console.log(s);
}
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(/* function */ callback, /* DOMElement */ element){
      window.setTimeout(callback, 1000 / 60);
    };
})();

function applyChange(){
  global.radius -= 50;
  var circleXChange = (50/global.ratioCircleXRadius)/2;
  global.circleX += global.isReversed ? -circleXChange : circleXChange;

  if (global.radius <= 0){
    global.radius = 0;
    global.isBlackFilled = !global.isBlackFilled;
    global.isWhiteFilled = !global.isWhiteFilled;
  }
  if (global.isReversed && global.circleX <= global.centerX){
    global.isReversed = false;
    global.circleX = global.width / 4;
  }
  else if (!global.isReversed && global.circleX >= global.centerX){
    global.isReversed = true;
    global.circleX = global.width - global.width / 4;
  }
}

global = {
  width : null,
  height : null,
  centerX : null,
  centerY : null,
  ctx : null,
  isWhiteFilled : true,
  isBlackFilled : false,
  isReversed : false,
  circleX : null,
  radius : null,
  baseRadius : null,
  ratioCircleXRadius : null
};

window.onload = main;

function animate(){
  requestAnimFrame(animate);
  if (global.radius === 0){
    global.radius = global.baseRadius;
  }
  if (global.isBlackFilled) {
    blackToWhite();
  }
  else if (global.isWhiteFilled) {
    whiteToBlack();
  }
}

function whiteToBlack(){
  applyChange();

  global.ctx.fillStyle = "black";
  global.ctx.beginPath();
  global.ctx.arc(global.circleX, global.centerY, global.radius, 0, 2 * Math.PI);
  global.ctx.rect(global.width, 0, -global.width, global.height);
  global.ctx.fill();
}

function blackToWhite(){
  applyChange();

  global.ctx.fillStyle = "white";
  global.ctx.beginPath();
  global.ctx.arc(global.circleX, global.centerY, global.radius, 0, 2 * Math.PI);
  global.ctx.rect(global.width, 0, -global.width, global.height);
  global.ctx.fill();
}

function main(){
  global.ctx = document.getElementById('canvas').getContext('2d');
  global.width = document.getElementById('canvas').width;
  global.height = document.getElementById('canvas').height;
  global.baseRadius = Math.ceil(Math.sqrt((global.height * global.height) + (global.width * global.width)));
  global.radius = global.baseRadius;
  global.ratioCircleXRadius = global.baseRadius / (global.width / 2);
  global.centerX = global.width / 2;
  global.centerY = global.height / 2;
  global.circleX = global.width / 4;
  animate();
}

