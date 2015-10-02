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

}

global = {
  width : null,
  height : null,
  centerX : null,
  centerY : null,
  ctx : null,
  isReversed : false,
  decompositionNumber : 128,
  ratioDegDecompo : 360 / 128,
  ratioDegPi: Math.PI / 180
};

listLines = [];
listModulos = [50, 100, 150, 200, 250, 300, 350, 400];

window.onload = main;

function animate(){
  requestAnimFrame(animate);
  drawWhiteLines();
}

function drawWhiteLines(){
  applyChange();


  for (var i = 0; i < global.decompositionNumber; i++){
    var x = Math.cos(global.ratioDegDecompo + (global.decompositionNumber * i) * global.ratioDegPi);
    var y = Math.sin(global.ratioDegDecompo + (global.decompositionNumber * i) * global.ratioDegPi);
    drawWhiteLine(x, y);
  }
}
function drawWhiteLine(dirX, dirY) {
  global.ctx.strokeStyle = "white";
  global.ctx.beginPath();
  for (var i = 0; i < listModulos.length / 2; i++) {
    var fromX = global.centerX + (((Math.random() * 1000) % listModulos[i*2]) * dirX);
    var fromY = global.centerY + (((Math.random() * 1000) % listModulos[i*2]) * dirY);
    global.ctx.moveTo(fromX, fromY);
    var toX = global.centerX + (((Math.random() * 1000) % listModulos[i*2+1]) * dirX);
    var toY = global.centerY + (((Math.random() * 1000) % listModulos[i*2+1]) * dirY);
    global.ctx.lineTo(toX, toY);
  }
  global.ctx.stroke();
}

function main(){
  global.ctx = document.getElementById('canvas').getContext('2d');
  global.width = document.getElementById('canvas').width;
  global.height = document.getElementById('canvas').height;
  global.centerX = global.width / 2;
  global.centerY = global.height / 2;
  global.circleX = global.width / 4;

  global.ctx.fillStyle = "black";
  global.ctx.rect(0, 0, global.width, global.height);
  global.ctx.fill();

  /*for (var i = 0; i < global.decompositionNumber; i++) {

  }*/

  animate();
}

