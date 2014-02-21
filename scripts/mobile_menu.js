// JavaScript Document
// media query event handler

//NOTES:
// on element arracys we start on element 8 and count by 2 - this is because childNodes returns garbage 
// text on every other element, and there are buffer elements in the child array as they were
// inserted by script.

// we start at 8 given the three spacers in the menu (the magic logo, the glowing logo, and the spacer behind it).
// This can be avoided by checking the className and looking for functional nav elements,
// but it's SLOWER.  So, we have hardcoded values below to make things snappy.

// Script will also use matchMedia to look for resolution changes and pop nav on/off as appropriate
// This is largely useless on individual devices, but makes for a better experience in scenarious
// where users can change the resolution (Win 8 browser snapping, limited android support)

var deskWidth = 801;

if (matchMedia) {
	var mq = window.matchMedia("(min-width: " + deskWidth + "px)");
	//mq.addListener(WidthChange);
	//sadly can't use addListener with older versions of iOS and Android - 
	//uncomment when this becomes the reality...
	
	window.addEventListener("orientationchange", WidthChange);
	window.addEventListener("resize", WidthChange);
	//window.addEventListener("load", WidthChange);
	
	//fire once at startup
	WidthChange(mq);
}

var iDevice = false;
if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
	iDevice = true;
}

//avoid leaving menu on for iDevice page cache
if (iDevice) {
  window.onpageshow = function(evt) {
    // If persisted then it is in the page cache, force a reload of the page.
    if (evt.persisted) {
      document.body.style.display = "none";
      location.reload();
    }
  };
}

var isSafari = false;
var ua = navigator.userAgent.toLowerCase(); 
if (ua.indexOf('safari')!=-1){ 
   if(ua.indexOf('chrome')  > -1){
    		//is chrome not safari
   }else{
     isSafari = true;
   }
}


// media query change
function WidthChange(mq) {

    var w = window.innerWidth;
	if (isSafari) { w = document.documentElement.clientWidth };
	
	if (mq.matches || w > deskWidth) {
		//alert(window.innerWidth );
		// window width is at least 768px
		 var x = document.getElementById('nav_header');
		 if (x) { x.style.height = '41px'; };
	     x = document.getElementById('header');
		 if (x) { x.style.height = '180px'; };
		 
		 if (x) {
			 elems = x.childNodes;
				for (var i=8; i<25; i=i+2) {
				elems[i].style.display = 'block';
			 }
		 }
	}
	
	else {
		 var x = document.getElementById('nav_header');
		 if (x) { x.style.height = '0px'; };
	     x = document.getElementById('header');
		 if (x) { x.style.height = '18px'; };
		 
		 if (x) {
			 elems = x.childNodes;
				for (var i=8; i<25; i=i+2) {
				elems[i].style.display = 'none';
			 }
		 }
	}

}



function toggle_mobile_menu(special) {
	
	if(special) {
		if(window.innerWidth > deskWidth) {
			return;
		}
	}
	
       var e = document.getElementById('menu1');
       if(e.style.display == 'block') {
	   	
          //e.style.display = 'none';
		  e = document.getElementById('header');
		  elems = e.childNodes;
		  for (var i=8; i<25; i=i+2) {
			elems[i].style.display = 'none';
		  }
		  var x = document.getElementById('nav_header');
		  x.style.height = '0px';
		  e.style.height = '18px';
		  
	   } else {

		  e = document.getElementById('header');
		  elems = e.childNodes;
		  
		  for (var i=8; i<25; i=i+2) {
			  //if (elems[i].className == 'nav_element') {
				elems[i].style.display = 'block';
			  //}
		  }
		  var x = document.getElementById('nav_header');
		  x.style.height = '369px';
		  e.style.height = '369px';
	   }
}