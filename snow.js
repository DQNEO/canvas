var theta = 0.0;
var canvasWith = 600;
var canvasHeight = 400;

var unit = 100;
var centerX = canvasWith / 2;
var baseY = 0;
var root3 = 1.73205

function draw(ctx) {

  //輪郭
  ctx.moveTo(centerX,  0);
  ctx.lineTo(centerX + unit * root3, baseY + unit);
  ctx.lineTo(centerX + unit * root3, baseY + 3 * unit);
  ctx.lineTo(centerX, baseY + 4 * unit);
  ctx.lineTo(centerX - unit * root3, baseY + 3 * unit);
  ctx.lineTo(centerX - unit * root3, baseY + unit);
  ctx.lineTo(centerX,   0);
  ctx.strokeStyle = "rgb(100,100,255)";
  ctx.stroke();

  //対角線
  ctx.moveTo(centerX, baseY);
  ctx.lineTo(centerX ,unit * 4 + baseY);
  ctx.stroke();

  ctx.moveTo(centerX + unit * root3, baseY + unit);
  ctx.lineTo(centerX - unit * root3, baseY + unit * 3);
  ctx.stroke();

  ctx.moveTo(centerX - unit * root3, baseY + unit);
  ctx.lineTo(centerX + unit * root3, baseY + unit * 3);
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

  setTimeout(function(){loop(ctx,fps);}, fps.getInterval());
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
