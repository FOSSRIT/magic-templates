// JavaScript Document
window.onload = function(){
  
  // init vars
  var particles = new Array();
  var frame = document.getElementById('particle-frame');
  var canvas_width = parseInt(frame.style.width);
  var canvas_height = parseInt(frame.style.height);

  // settings
  var frame_rate = 31; // per second
  var max_particle_size = 50; // pixels
  var max_velocity = 2; // pixels per frame
  createParticles(30);
  var runtime = 0; // seconds, 0 for infinite
  var time_elapsed = 0;

  // timer
  var timer = setInterval(function() {
    animateParticles();

    if (runtime != 0) { 
      time_elapsed += 1 / frame_rate;
      if (time_elapsed >= runtime) clearInterval(timer);
    }

  }, 1000 / frame_rate);

  // functions
  function createParticles(amount) {
    for (var i = 1; i <= amount; i++) {
      particles[i] = {'dom': document.createElement("particle-" + getRandomInt(1,2)),
                      'opacity' : getRandomInt(50,100)/100,
                      'size' : getRandomInt(1, max_particle_size),
                      'left' : canvas_width * Math.floor(Math.random() * 101) / 100,
                       'top' : canvas_height * Math.floor(Math.random() * 101) / 100, 
                      'x-velocity' : getRandomInt(-max_velocity*100, max_velocity*100) / 100, 
                      'y-velocity' : getRandomInt(-max_velocity*100, max_velocity*100) / 100 }

      particles[i]['dom'].style.cssText = "opacity: " + particles[i]['opacity'] + "; border-radius: " + particles[i]['size']/2 + "px; height:" + particles[i]['size'] + "px; width: " +particles[i]['size'] + "px; left:" + particles[i]['left'] + "px; top:" + particles[i]['top'] + "px;";
      particles[i]['dom'].setAttribute("x-velocity",particles[i]['x-velocity']);
      particles[i]['dom'].setAttribute("y-velocity",particles[i]['y-velocity']);
      document.body.appendChild(particles[i]['dom']);
      frame.appendChild(particles[i]['dom']);
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function animateParticles() {
    for (var i = 1; i < particles.length; i++) {
      // particle hits left side
      if ((particles[i]['left'] + particles[i]['size']) < 0 && particles[i]['x-velocity'] < 0) {
        particles[i]['dom'].style.left = (canvas_width + particles[i]['x-velocity']) + 'px';
        particles[i]['dom'].style.top = particles[i]['top'] + particles[i]['y-velocity'] + 'px';

      // particle hits top side
      } else if ((particles[i]['top'] + particles[i]['size']) < 0 && particles[i]['y-velocity'] < 0) {
        particles[i]['dom'].style.top = (canvas_height - particles[i]['size']) + particles[i]['y-velocity'] + 'px';
        particles[i]['dom'].style.left = particles[i]['left'] + particles[i]['x-velocity'] + 'px';

      // particle hits right side
      } else if (particles[i]['left'] > canvas_width && particles[i]['x-velocity'] > 0) {
        particles[i]['dom'].style.left = particles[i]['x-velocity'] + 'px';
        particles[i]['dom'].style.top = particles[i]['top'] + particles[i]['y-velocity'] + 'px';

      // particle hits bottom side
      } else if (particles[i]['top'] > canvas_height && particles[i]['y-velocity'] > 0) {
        particles[i]['dom'].style.top = particles[i]['y-velocity'] + 'px';
        particles[i]['dom'].style.left = particles[i]['left'] + particles[i]['x-velocity'] + 'px';

       // particle floating in middle
       } else {
        particles[i]['dom'].style.left = (particles[i]['left']+(particles[i]['x-velocity'])) + 'px';
        particles[i]['dom'].style.top = (particles[i]['top']+(particles[i]['y-velocity'])) + 'px';
      }

      // update particle array values
      particles[i]['left'] = parseFloat(particles[i]['dom'].style.left);
      particles[i]['top'] = parseFloat(particles[i]['dom'].style.top);

    }
  }

}