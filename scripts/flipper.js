// JavaScript Document

var aFlippers = new Array();
var aStates = new Array();
var isSafari = false;

function FlipperController() {
		//make me a FlipperController!!
		//this.initializeFlippers();
};

//this scans a page for anything using the 'flip' class, and 
//regusteres it with this flipper controller...
//only called on page load.
function initializeFlippers() {
	
	isSafari = false;
	var ua = navigator.userAgent.toLowerCase(); 
 	if (ua.indexOf('safari')!=-1){ 
   		if(ua.indexOf('chrome')  > -1){
    		//is chrome not safari
   		}else{
    		isSafari = true;
   		}
	}
		//get all the small flippers in the document...
		var sFlippers = document.getElementsByClassName('flip');
		var bFlippers = document.getElementsByClassName('bigflip');
		var wFlippers = document.getElementsByClassName('wideflip');
		var tFlippers = document.getElementsByClassName('tallflip');
		var wdFlippers = document.getElementsByClassName('wedgeflip');
		
        var index = 0;
		for (i = 0; i < sFlippers.length; i++) aFlippers[index++] = sFlippers[i];
		for (i = 0; i < bFlippers.length; i++) aFlippers[index++] = bFlippers[i];
		for (i = 0; i < wFlippers.length; i++) aFlippers[index++] = wFlippers[i];
		for (i = 0; i < tFlippers.length; i++) aFlippers[index++] = tFlippers[i];
		for (i = 0; i < tFlippers.length; i++) aFlippers[index++] = wdFlippers[i];
		
		for(var i=0; i<aFlippers.length; i++)
		{
			aStates[i] = 0;
		}
		//alert(aStates);
		//alert(aFlippers[2].id);
		
}
FlipperController.prototype.initializeFlippers = initializeFlippers;

//function for picking a particular flipper to flip
//basically gives you back a valid array index of daFlippers at random
function pickOne() {
	//alert("called pickOne");
	return(Math.floor(Math.random() * aFlippers.length) + 0);
}
FlipperController.prototype.pickOne = pickOne;

function flipOne() {
	var iPick = this.pickOne();
	iState = aStates[iPick];
	if(iState == 0) {
		this.flipMe(aFlippers[iPick].id);
		aStates[iPick] = 1;
	} 
	else if (iState == 1)
	{
		this.flipMeBack(aFlippers[iPick].id);
		aStates[iPick] = 0;
	}
}
FlipperController.prototype.flipOne = flipOne;


//--------- to convert ----------
function flipMe(name) {

		var flipper = document.getElementById(name);
		var daFront = flipper.getElementsByClassName("front")[0];
		var daBack = flipper.getElementsByClassName("back")[0];
 
		daFront.style['-webkit-transform'] = "rotateX(180deg)";
		daFront.style['-ms-transform'] = "rotateX(180deg)";
		daFront.style.MozTransform = "rotateX(180deg)";
		daFront.style.zIndex = 13;
		daFront.style.opacity = 0;
		
		daBack.style['-webkit-transform'] = "rotateX(0deg)";
		daBack.style['-ms-transform'] = "rotateX(0deg)";
		daBack.style.MozTransform = "rotateX(0deg)";
		daBack.style.zIndex = 14;
		daBack.style.opacity = 1.0;
		
}
FlipperController.prototype.flipMe = flipMe;

function flipMeBack(name) {

		var flipper = document.getElementById(name);
		var daFront = flipper.getElementsByClassName("front")[0];
		var daBack = flipper.getElementsByClassName("back")[0];
 
		daFront.style['-webkit-transform'] = "rotateX(0deg)";
		daFront.style['-ms-transform'] = "rotateX(0deg)";
		daFront.style.MozTransform = "rotateX(0deg)";
		daFront.style.zIndex = 13;
		daFront.style.opacity = 1.0; 
		
		daBack.style['-webkit-transform'] = "rotateX(-180deg)";
		daBack.style['-ms-transform'] = "rotateX(-180deg)";
		daBack.style.MozTransform = "rotateX(-180deg)";
		daBack.style.zIndex = 12;
		daBack.style.opacity = 0;
		
		
}
FlipperController.prototype.flipMeBack = flipMeBack;

function getIndex(id) {
	
	for (var i=0; i<this.aFlippers.length; i++)
	{
		if(this.aFlippers[i].id == id)
		{
			return i;
		}
	}
	return -1; //error code - should never get here if we're prpoviding a valid search id.
}
FlipperController.prototype.getIndex = getIndex;

function hoverFlipOn(id) {
	//figure out which flipper this is in array
	var a = this.getIndex(id);

    var flipper = document.getElementById(id);
	var daFront = flipper.getElementsByClassName("front")[0];
	var daBack = flipper.getElementsByClassName("back")[0];
		
	flipper.style.zIndex = 25;
	
	daBack.style.borderColor = "#ffffff";
	daFront.style.borderColor = "#ffffff";
	if (!isSafari) {
	
	daBack.style['-webkit-box-shadow'] = "0px 0px 45px #ffffff";
	daBack.style['box-shadow'] = "0px 0px 45px #ffffff";
	daBack.style['-moz-box-shadow'] = "0px 0px 45px #ffffff";
	
	
	daFront.style['-webkit-box-shadow'] = "0px 0px 45px #ffffff";
	daFront.style['box-shadow'] = "0px 0px 45px #ffffff";
	daFront.style['-moz-box-shadow'] = "0px 0px 45px #ffffff";
	}
		
	//mark this as flipped and flip it
	if (this.aStates[a] == 0) {
		this.flipMe(id);
	}
	this.aStates[a] = 2; //mark as flipped by user
	
}
FlipperController.prototype.hoverFlipOn = hoverFlipOn;

function hoverFlipOff(id) {
	var a = this.getIndex(id);
	
	var flipper = document.getElementById(id);
	var daFront = flipper.getElementsByClassName("front")[0];
	var daBack = flipper.getElementsByClassName("back")[0];
	
	flipper.style.zIndex = 20;
	
	daBack.style.borderColor = "#666";
	daFront.style.borderColor = "#666";	
		
	if (!isSafari) {
	
	daBack.style['-webkit-box-shadow'] = "0px 0px 0px #000000";
	daBack.style['box-shadow'] = "0px 0px 0px #000000";
	daBack.style['-moz-box-shadow'] = "0px 0px 0px #000000";
	
	
	daFront.style['-webkit-box-shadow'] = "0px 0px 0px #000000";
	daFront.style['box-shadow'] = "0px 0px 0px #000000";
	daFront.style['-moz-box-shadow'] = "0px 0px 0px #000000";
	
	}
	
	//mark this as flipped and flip it
	if (this.aStates[a] >= 1) {
		this.flipMeBack(id);
		this.aStates[a] = 0; //mark as flipped
		
	}
}
FlipperController.prototype.hoverFlipOff = hoverFlipOff;