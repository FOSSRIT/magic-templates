// JavaScript Document
var tracers = new Array();
var flipperArea = 0;

function Tracer() {
	
	flipperArea = document.getElementById('FlipperArea');
	//alert("frame: " + frame);
	//canvas_width = window.innerWidth;
    //canvas_height = parseInt(frame.style.height);
	//alert(canvas_height);

	  
      tracers[1] = document.createElement("tracer");
	  //alert(tracer[1]);
	  tracers[1].style.cssText= "display: block; position: absolute; top: 100px; left: 100px; width: 10px; height: 10px; background: #ffffff; z-index: 500;";
	  

      document.body.appendChild(tracers[1]);
      flipperArea.appendChild(tracers[1]);
      //document.getElementById("ParticleArea").appendChild(tracers[1]);
}