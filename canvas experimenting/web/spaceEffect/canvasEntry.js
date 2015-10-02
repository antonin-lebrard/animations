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
  countWaitFilling++;
  if (global.considerCanvasFilledAt === countWaitFilling){
    global.waitFillingOfCanvas = false;
    global.speed = 1.00;
    global.luckRateDenominator = 300;
  }
  var countLinesDrawing = 0;
  listLines.forEach(function(line){
    if (line.toDraw) {
      line.x *= global.speed;
      line.y *= global.speed;
      countLinesDrawing++;
    }
    if (Math.abs(line.x) > (global.width / 2) || Math.abs(line.y) > (global.height / 2)){
      line.x = Math.cos((Math.random() * global.decompositionNumber) * global.ratioDegDecompo);
      line.y = Math.sin((Math.random() * global.decompositionNumber) * global.ratioDegDecompo);
      line.toDraw = false;
      line.color = randomColor();
      countLinesDrawing--;
    }
  });
  if (countLinesDrawing < global.linesNbMax){
    listLines.forEach(function(line){
      if (!line.toDraw)
        line.toDraw = (Math.random() * global.luckRateDenominator) < 1;
    });
    if (global.luckRateDenominator > 10)
      global.luckRateDenominator /= global.speed;
  }
  if (global.speed < 1.15 && !global.waitFillingOfCanvas)
    global.speed *= 1.00005;
  /*if (Math.random()*10 < 1)
    print(global.speed);*/
}

global = {
  width : null,
  height : null,
  centerX : null,
  centerY : null,
  ctx : null,
  isReversed : false,
  decompositionNumber : 360,
  ratioDegDecompo : 360 / 360,
  luckRateDenominator : 3,
  linesNbMax : 600,
  speed : 1.7,
  waitFillingOfCanvas : true,
  considerCanvasFilledAt : 100
};

listLines = [];
countWaitFilling = 0;

window.onload = main;

function animate(){
  requestAnimFrame(animate);
  drawWhiteLines();
}

function drawWhiteLines(){
  applyChange();

  global.ctx.fillStyle = "black";
  global.ctx.rect(0, 0, global.width, global.height);
  global.ctx.fill();

  global.ctx.strokeStyle = "white";
  listLines.forEach(function(line){
    if (line.toDraw && !global.waitFillingOfCanvas) {
      //global.ctx.strokeStyle = line.color;
      global.ctx.beginPath();
      global.ctx.moveTo(global.centerX + line.x, global.centerY + line.y);
      global.ctx.lineTo(global.centerX + (line.x * (global.speed * 1.01)), global.centerY + (line.y * (global.speed * 1.01)));
      global.ctx.lineWidth = 2;
      global.ctx.stroke();
    }
  });
}

function trueRandomColor(){
  function randomLetter(){
    var nb = Math.round(Math.random() * 15);
    switch (nb){
      case 10: return 'A';
      case 11: return 'B';
      case 12: return 'C';
      case 13: return 'D';
      case 14: return 'E';
      case 15: return 'F';
      default: return parseInt(nb);
    }
  }
  return '#' + randomLetter()+randomLetter()+randomLetter()+randomLetter()+randomLetter()+randomLetter();
}

function randomColor(){
  var m = {
    1 : "#E84D4D",
    2 : "#F9F921",
    3 : "#11DE0A",
    4 : "#12A9E9",
    5 : "#FFFFFF"
  };
  return m[(Math.round(Math.random()*4))+1];
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

  for (var i = 0; i < global.linesNbMax; i++) {
    listLines.push({
      x : Math.cos(global.ratioDegDecompo * i),
      y : Math.sin(global.ratioDegDecompo * i),
      toDraw : (Math.random() * global.luckRateDenominator) < 1,
      color : randomColor()
    });
  }

  animate();
}

