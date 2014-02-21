window.onload = init;

var gAnimating = true;
var iFrame = 0;
var daFlippers = null;


function init() {
	
	daFlippers = new FlipperController();
	daFlippers.initializeFlippers();
	//document.getElementsByClassName(
	//'flip');
	//alert(daFlippers[1].id);
	
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
	
	//do anything you want to animate here...
	//or pass a list of things that should be animated?  Hmmmm.
	iFrame++;
	//alert(iFrame);
	if(iFrame >= 100) {
		iFrame=0;
		//alert(daFlippers.pickOne());
		daFlippers.flipOne();
	}
		
	// request new frame
	requestAnimFrame(function() {
		if (gAnimating) {
			animate();
		}
	});
}
      //animate();  


