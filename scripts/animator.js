window.onload = init;

var gAnimating = true;
var iR = Math.round(Math.random()*32);
var oParticleMgr = 0;

var gAnimating = true;
var iFrame = 0;
var daFlippers = null;
var oTracer = null;
var iRandomFlipSpeed = 200; //num of frames before a random flip occurs
var frequency = Math.PI*2/32; 

function init() {
	
	oParticleMgr = new ParticleManager();
	daFlippers = new FlipperController();
	daFlippers.initializeFlippers();
	//oTracer = new Tracer();
	
	if (gAnimating) {
		animate();
	}
}

function toggleAnimation() {
	gAnimating = !gAnimating;
}

//animator callback
window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || 
  window.webkitRequestAnimationFrame || 
  window.mozRequestAnimationFrame || 
  window.oRequestAnimationFrame || 
  window.msRequestAnimationFrame ||
  function(callback) {
	window.setTimeout(callback, 1000 / 60);
	//alert("good stuff fail, using timeouts");
  };
})();

function animate() {
	
	iR = iR + 0.005;

	r = Math.round(Math.sin(frequency*iR + 0) * 127 + 32);
   	g = Math.round(Math.sin(frequency*iR + 2) * 127 + 32);
   	b = Math.round(Math.sin(frequency*iR + 4) * 127 + 32);

	oParticleMgr.update(r,g,b);

	if(iR >= 32) { iR=0; }
	
	iFrame++;
	
	if(iFrame >= iRandomFlipSpeed) {
		
		iFrame=0;
		if (document.doRandomFlips) {
			daFlippers.flipOne();
		}
	}
	
	// request new frame
	requestAnimFrame(function() {
		if (gAnimating) {
			animate();
		}
	});
}
      //animate();  


