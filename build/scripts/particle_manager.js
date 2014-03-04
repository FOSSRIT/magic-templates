// JavaScript Document

//tweak variables on all the particles
var particles = new Array();
var frame = 0; //placeholder
var amount = 100; //number of particles
var max_particle_size = 25; // pixels
var max_velocity = 0.35; // pixels per frame
var max_blur = 7;
var bSupportsCanvas = false;
var context = 0;
var canvas = 0;
var lingrad = 0;
var radgrad = 0;
var colorBox = 0;
var giveTag = 0;

function ParticleManager() {
	colorBox = document.getElementById("colorbox");
	giveTag = document.getElementById("givetag");
	
	var t = this.supportsCanvas();
	
	var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
	var isSafari = false;
	var ua = navigator.userAgent.toLowerCase(); 
 	if (ua.indexOf('safari')!=-1){ 
   		if(ua.indexOf('chrome')  > -1){
    		//is chrome not safari
   		}else{
    		isSafari = true;
   		}
	}
  
	//TODO - LOOK FOR SAFARI and DISABLE PARTICLES IF SO.  POOR iPADS.
	if (isFirefox || isSafari || (parseInt(window.innerWidth) <= 768)) {
		t=false;
	}
		
	
	//t = false;
	if (t) {
		bSupportsCanvas = true;
		canvas = document.getElementById('ParticleArea');
		canvas.setAttribute('width', parseInt(window.innerWidth));
		context = canvas.getContext('2d');
		
		var w = parseFloat(window.innerWidth);
		var h = parseFloat(canvas.style.height);
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "rgba(0, 0, 255, 1.0)";
		context.fillRect(0, 0, canvas.width, canvas.height);
		
		canvas_width = window.innerWidth;
    	canvas_height = canvas.height;
	
		for (var i = 1; i <= amount; i++) {
	  		iBlur = this.getRandomInt(0,max_blur);
	  		iSize = this.getRandomInt(0,iBlur);
	  		iBlur = iBlur / max_blur;
			if (iBlur > 0.25) {
				iBlur = 0.25; //hard cap on blur - if this goes too close to 1 it looks bad on some canvas implmentations
			}
			
			particles[i] = {
                      'opacity' : this.getRandomInt(25,100)/100,
                      'size' : this.getRandomInt(5, max_particle_size),
                      'left' : canvas_width * Math.floor(Math.random() * 101) / 100,
                       'top' : canvas_height * Math.floor(Math.random() * 101) / 100, 
                      'x-velocity' : this.getRandomInt(-max_velocity*100, max_velocity*100) / 100, 
                      'y-velocity' : this.getRandomInt(-max_velocity*100, max_velocity*100) / 100,
					  'blur' : iBlur
					  };
					  
		}
		
		lingrad = context.createLinearGradient(0,0,0,canvas.height);
 		lingrad.addColorStop(0, 'rgba(0,0,0,0)');
 		lingrad.addColorStop(0.55, 'rgba(0,0,0,0)');
		lingrad.addColorStop(0.56, 'rgba(0,0,0,0.0001)');
 		lingrad.addColorStop(1, 'rgba(0,0,0,1.0)');
		//end canvas way init
	}
	else {
	
	//NOTE: THIS ALL ASSUMES THAT WE ARE DOING THIS WITHOUT CANVAS.  UGGH.
	frame = document.getElementById('ParticleAreaOld');
	
	e = document.getElementById('ParticleArea');
	e.style.display = 'none';
		
	frame.style.display = 'inline';
	//var h = parseInt(frame.style.top);
	
	//set up overlay div to fake the bottom fade...	
	e = document.getElementById('ParticleFade');
	e.style.display = 'inline'; 
	
	amount = 0;
	
	//TODO: If we're on a non-chrome or low performing device,
	//crank down the number of particles, possibly to zero...
	
	canvas_width = window.innerWidth;
    canvas_height = parseInt(frame.style.height);
	//alert(canvas_height);
	
	for (var i = 1; i <= amount; i++) {
	  iBlur = this.getRandomInt(0,max_blur);
	  iSize = this.getRandomInt(0,iBlur);
	  
      particles[i] = {'dom': document.createElement("particle-" + this.getRandomInt(1,2)),
                      'opacity' : this.getRandomInt(25,100)/100,
                      'size' : this.getRandomInt(5, max_particle_size),
                      'left' : canvas_width * Math.floor(Math.random() * 101) / 100,
                       'top' : canvas_height * Math.floor(Math.random() * 101) / 100, 
                      'x-velocity' : this.getRandomInt(-max_velocity*100, max_velocity*100) / 100, 
                      'y-velocity' : this.getRandomInt(-max_velocity*100, max_velocity*100) / 100 }

      				particles[i]['dom'].style.cssText = "opacity: " +  particles[i]['opacity'] + 
					"; border-radius: " + particles[i]['size']/2 + 
					"px; height:" + particles[i]['size'] + 
					"px; width: " + particles[i]['size'] + 
					"px; left:" + particles[i]['left'] + 
					"px; top:" + particles[i]['top'] + "px; " + "background-color: #dddddd; -moz-box-shadow:0px 0px " + iBlur +"px " + iSize + "px #ffffff; -webkit-box-shadow:0px 0px " + iBlur + "px " + iSize + "px #dddddd; box-shadow:0px 0px " + iBlur + "px " + iSize +"px #dddddd; + z-index:-500;";	
									  
      particles[i]['dom'].setAttribute("x-velocity",particles[i]['x-velocity']);
      particles[i]['dom'].setAttribute("y-velocity",particles[i]['y-velocity']);
      document.body.appendChild(particles[i]['dom']);
      frame.appendChild(particles[i]['dom']);
    }
	}
}

function supportsCanvas() {
  return !!document.createElement('canvas').getContext;
}
ParticleManager.prototype.supportsCanvas = supportsCanvas;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
ParticleManager.prototype.getRandomInt = getRandomInt;
  
//update function (called once per frame)
function update(r, g, b) {

	if (bSupportsCanvas) {
        canvas_width = window.innerWidth;
    	//canvas_height = parseInt(frame.style.height);
		
		canvas.setAttribute('width', parseInt(window.innerWidth));
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "rgba(" + r + "," + g + "," + b + ", 1.0)";
		context.fillRect(0, 0, canvas.width, canvas.height);
		
		for (var i = 1; i < particles.length; i++) {
			 // particle hits left side
			  if ((particles[i]['left'] + particles[i]['size']) < 0 && particles[i]['x-velocity'] < 0) {
				particles[i]['left'] = (canvas_width + particles[i]['size'] + particles[i]['x-velocity']);
				particles[i]['top'] = particles[i]['top'] + particles[i]['y-velocity'];
		
			  // particle hits top side
			  } else if ((particles[i]['top'] + particles[i]['size']) < 0 && particles[i]['y-velocity'] < 0) {
				particles[i]['top'] = (canvas_height + particles[i]['size']) + particles[i]['y-velocity'];
				particles[i]['left'] = particles[i]['left'] + particles[i]['x-velocity'];
		
			  // particle hits right side
			  } else if (particles[i]['left'] > canvas_width && particles[i]['x-velocity'] > 0) {
				particles[i]['left'] = -particles[i]['size'] + particles[i]['x-velocity'];
				particles[i]['top'] = particles[i]['top'] + particles[i]['y-velocity'];
		
			  // particle hits bottom side
			  } else if (particles[i]['top'] > canvas_height && particles[i]['y-velocity'] > 0) {
				particles[i]['top'] = -particles[i]['size'] + particles[i]['y-velocity'];
				particles[i]['left'] = particles[i]['left'] + particles[i]['x-velocity'];
		
			   // particle floating in middle
			   } else {
				particles[i]['left'] = (particles[i]['left']+(particles[i]['x-velocity']));
				particles[i]['top'] = (particles[i]['top']+(particles[i]['y-velocity']));
			  }
			  
			  //alert(particles[i]['left']);
			  
			  //DRAW THESE PARTICLES THE CANVAS-Y WAY
			  radgrad = context.createRadialGradient(particles[i]['left']+particles[i]['size']*0.5,
			  											 particles[i]['top']+particles[i]['size']*0.5,
														 0,
														 particles[i]['left']+particles[i]['size']*0.5,
														 particles[i]['top']+particles[i]['size']*0.5,
														 particles[i]['size']*0.5);
													 
  			  radgrad.addColorStop(0, 'rgba(255,255,255,1)');
  		      radgrad.addColorStop(particles[i]['blur'], 'rgba(228,228,228,.7)');
  		      radgrad.addColorStop(1, 'rgba(220,220,220,0)');

			
  		      // draw shape
  		      context.fillStyle = radgrad;
			  //context.fillStyle = "rgba(0, 0, 255, 1.0)";
  		      context.fillRect( particles[i]['left'],
			  					particles[i]['top'],
								particles[i]['size'],
								particles[i]['size']);
			
		}
		
		

 		context.fillStyle = lingrad;
 		context.fillRect(0, 0, canvas.width, canvas.height);
		
	}
	else {
	canvas_width = window.innerWidth;
	frame.style.background = "rgb(" + r + "," + g + "," + b + ")";

	 for (var i = 1; i < particles.length; i++) {
      // particle hits left side
      if ((particles[i]['left'] + particles[i]['size']) < 0 && particles[i]['x-velocity'] < 0) {
        particles[i]['left'] = (canvas_width + particles[i]['size'] + particles[i]['x-velocity']);
        particles[i]['top'] = particles[i]['top'] + particles[i]['y-velocity'];

      // particle hits top side
      } else if ((particles[i]['top'] + particles[i]['size']) < 0 && particles[i]['y-velocity'] < 0) {
        particles[i]['top'] = (canvas_height + particles[i]['size']) + particles[i]['y-velocity'];
        particles[i]['left'] = particles[i]['left'] + particles[i]['x-velocity'];

      // particle hits right side
      } else if (particles[i]['left'] > canvas_width && particles[i]['x-velocity'] > 0) {
        particles[i]['left'] = -particles[i]['size'] + particles[i]['x-velocity'];
        particles[i]['top'] = particles[i]['top'] + particles[i]['y-velocity'];

      // particle hits bottom side
      } else if (particles[i]['top'] > canvas_height && particles[i]['y-velocity'] > 0) {
        particles[i]['top'] = -particles[i]['size'] + particles[i]['y-velocity'];
        particles[i]['left'] = particles[i]['left'] + particles[i]['x-velocity'];

       // particle floating in middle
       } else {
        particles[i]['left'] = (particles[i]['left']+(particles[i]['x-velocity']));
        particles[i]['top'] = (particles[i]['top']+(particles[i]['y-velocity']));
      }

      // update particle array values
      particles[i]['dom'].style.left = Math.round(particles[i]['left']) + "px";
      particles[i]['dom'].style.top = Math.round(particles[i]['top']) + "px";
		
     }
	}
	
	//do the colorbox if we have one on this page
	if (colorBox) {
		colorBox.style.background = "rgba(" + r + "," + g + "," + b + ", 1.0)";
	}
	
	//do the same if we have a givetag on this page
	if (giveTag) {
		giveTag.style.background = "rgba(" + r + "," + g + "," + b + ", 0.8)";
	}
}
ParticleManager.prototype.update = update;
