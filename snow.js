var theta = 0.0;
var canvasWith = 600;
var canvasHeight = 600;

var unit = (canvasHeight / 4) * 0.8;
var centerX = canvasWith / 2;
var centerY = canvasHeight / 2;
var root3 = 1.73205;

var rotateFlag = true;
rotateFlag = false;

function draw(ctx) {

  //多角形
  var outlineUnit = unit * 0.6;
  ctx.moveTo(centerX,  centerY - 2 * outlineUnit);
  ctx.lineTo(centerX + outlineUnit * root3, centerY - outlineUnit);
  ctx.lineTo(centerX + outlineUnit * root3, centerY + outlineUnit);
  ctx.lineTo(centerX, centerY + outlineUnit * 2);
  ctx.lineTo(centerX - outlineUnit * root3, centerY + outlineUnit);
  ctx.lineTo(centerX - outlineUnit * root3, centerY - outlineUnit);
  ctx.lineTo(centerX,   centerY - 2 * outlineUnit);
  ctx.strokeStyle = "rgb(200,200,255)";
  ctx.stroke();

  //多角形2
  var outlineUnit = unit * 0.2;
  ctx.moveTo(centerX,  centerY - 2 * outlineUnit);
  ctx.lineTo(centerX + outlineUnit * root3, centerY - outlineUnit);
  ctx.lineTo(centerX + outlineUnit * root3, centerY + outlineUnit);
  ctx.lineTo(centerX, centerY + outlineUnit * 2);
  ctx.lineTo(centerX - outlineUnit * root3, centerY + outlineUnit);
  ctx.lineTo(centerX - outlineUnit * root3, centerY - outlineUnit);
  ctx.lineTo(centerX,   centerY - 2 * outlineUnit);
  ctx.strokeStyle = "rgb(200,200,255)";
  ctx.stroke();

  //対角線
  var diagonalUnit = unit * 1.0;
  ctx.strokeStyle = "rgb(100,100,255)";
  ctx.moveTo(centerX, centerY - 2 * diagonalUnit);
  ctx.lineTo(centerX ,2 * diagonalUnit + centerY);
  ctx.stroke();

  ctx.moveTo(centerX + diagonalUnit * root3, centerY - diagonalUnit);
  ctx.lineTo(centerX - diagonalUnit * root3, centerY + diagonalUnit);
  ctx.stroke();

  ctx.moveTo(centerX - diagonalUnit * root3, centerY - diagonalUnit);
  ctx.lineTo(centerX + diagonalUnit * root3, centerY + diagonalUnit);
  ctx.stroke();
}

var loop = function(ctx, fps) {
  fps.check();

  ctx.save();

  // キャンバスをクリア
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();

  // 回転の中心は原点なので、
  // 一度図形の中心を原点に移してから回転させて
  // 元の場所に戻す
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(theta);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);
  draw(ctx);

  ctx.restore();

  theta += 5 * Math.PI / 180;
  if(Math.PI * 2 < theta) {
    theta = 0;
  }

  if (rotateFlag) {
    setTimeout(function(){loop(ctx,fps);}, fps.getInterval());
  }
};

var FPS = function(target) {
  this.target     = target;        // 目標FPS
  this.interval   = 1000 / target; // setTimeoutに与えるインターバル
  this.checkpoint = new Date();
  this.fps        = 0;
};
FPS.prototype = {
  // checkからcheckまでの時間を元にFPSを計算
  check: function() {
    var now = new Date();
    this.fps = 1000 / (now - this.checkpoint);
    this.checkpoint = new Date();
  },
  // 現在のFPSを取得
  getFPS: function() {
    return this.fps.toFixed(2);
  },
  // 次回処理までのインターバルを取得
  getInterval: function() {
    var elapsed = new Date() - this.checkpoint;
    return this.interval - elapsed > 10 ? this.interval - elapsed : 10;
  }
};

window.onload = function() {

  var canvas = document.getElementById('canvas');
  canvas.width = canvasWith;
  canvas.height = canvasHeight;

  var ctx = canvas.getContext('2d');

  // 30FPSでアニメーション
  var fps = new FPS(20);
  loop(ctx,fps);
};
