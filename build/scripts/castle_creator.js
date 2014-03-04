// JavaScript Document
window.onload = init();

//vars for the drawing of SVG
var xmlns = "http://www.w3.org/2000/svg";
var svgc = 0; //svg castcle container.  initialized as the base drawing surface from html code
var circle_count = 0;
var poly_count = 0;
var rect_count = 0;
var stroke = "#333333";
var stroke_width = 1;
var dCounter = 0;

//vars for the calculating of a castle
var stage_left = 0;
var stage_right = 0;
var yGap = -1;
var fade_floor = 550;
var pHT = 0.85; //percent threshhold for a high tower...
var window_color = "#000000";

//init - is a shell that waits for a page to actually load, then does stuff
function init() {
	setTimeout("init_ready();", 15);
};

//a real init once we are ready to go
function init_ready() {
	// Place the SVG namespace in a variable to easily reference it.
	svgc = document.getElementById("castle_svg_container");
	if (svgc) {
	//set up drawing tools
	setupGradients();
	
	stage_right = window.innerWidth;
	var stage_width = (stage_right - stage_left);
	var horiz_seed = Math.round(Math.random()*((stage_width/4)));
	var main_castle_area = new Array();
	main_castle_area[0] = horiz_seed - Math.round(Math.random()*200);
	main_castle_area[1] = horiz_seed + Math.round(Math.random()*200);
	main_castle_area[2] = 250; //top of vertical area
	main_castle_area[3] = 500; //bottom of vertical area
	
	var secondary_castle_area = new Array();
	var horiz_seed = Math.round(Math.random()*((stage_width/3)));
	secondary_castle_area[0] = horiz_seed - Math.round(Math.random()*150);
	secondary_castle_area[1] = horiz_seed + Math.round(Math.random()*150);
	secondary_castle_area[2] = 350; //top of vertical area
	secondary_castle_area[3] = 500; //bottom of vertical area
	
	drawTowers(main_castle_area);
	drawTowers(secondary_castle_area);
	
	
	
	localX = Math.round(Math.random()*200);
	localY = 50;
	
	tower_height = Math.round(Math.random()*100)-30;
	tower_width = Math.round(Math.random()*20);
	towerTopHeight = Math.round(Math.random()*40)+20; //20-60
	
	//drawSideTowerRight(localX, localY, tower_width, tower_height, towerTopHeight);
				  
				  
    localX = 300;
	localY = 50;
	
	tower_height = Math.round(Math.random()*100)-30;
	tower_width = Math.round(Math.random()*20);
	
	//drawSideTowerLeft(localX, localY, tower_width, tower_height, towerTopHeight);
	/*
	//draw some circles
	for (var i=0; i<stage_width/4; i++) {
		drawCircle(  Math.round(Math.random()*stage_width),
		             Math.round(Math.random()*250) + (fade_floor-100), 
					 Math.round(Math.random()*100 + 20),
					 "cloudGradient1", true);
					 
		drawCircle(  Math.round(Math.random()*stage_width),
		             Math.round(Math.random()*10) + (fade_floor-20), 
					 Math.round(Math.random()*100 + 40),
					 "cloudGradient1", true);
	}
	
	for (i=0; i<6; i++) {
		drawCircle( 0, fade_floor, Math.round((Math.random()*50))+100, "cloudGradient1", true);
		drawCircle( stage_width, fade_floor, Math.round((Math.random()*50))+100, "cloudGradient1", true);
	}
	*/
	drawRect(0,350, screen.width, fade_floor-350, "castleGradient2", true);
	}
	else {
		//not ready yet, couldn't get svgc 
		dCounter = dCounter ++;
		if (dCounter < 5) { setTimeout("init_ready();", 15); }
	}
	
}

function drawHighTower(localX, localY, width, height) {
	
	localY = localY - Math.round(Math.random()*250) + 0;
	if (localY < 150) { localY = 180 - Math.round(Math.random()*30); }
	x = 0;
	y = 0;
	
	tower_width = Math.random()*60;
	if (tower_width < 50) { tower_width = 50; }
	
	tower_height = 500;
	
	 var points = (x + localX+0)                         + ',' + (y + 30+ localY+0) + ' ' +
				  (x + localX+-10)                       + ',' + (y + 30+ localY-10) + ' ' +
				  (x + localX-10)                        + ',' + (y + localY-25) + ' ' +
				  (x + localX+0)                         + ',' + (y + localY-30) + ' ' +
				  (x + localX+Math.round(tower_width/2)) + ',' + (y + localY-33) + ' ' +
				  (x + localX+tower_width)               + ',' + (y + localY-30) + ' ' +
				  (x + localX+tower_width+10)            + ',' + (y + localY-25) + ' ' +
				  (x + localX+tower_width+10)            + ',' + (y + 30+ localY-10) + ' ' +
				  (x + localX+tower_width)               + ',' + (y + 30+ localY) + ' ' +
				  (x + localX+tower_width)               + ',' + (y + localY+tower_height) + ' ' +
				  (x + localX)                           + ',' + (y + localY+tower_height);
	
	drawPolygon(points, "castleGradient1", true);

	var points =  (x + localX-10)                        + ',' + (y + localY-25-yGap) + ' ' +
				  (x + localX+0)                         + ',' + (y + localY-30-yGap) + ' ' +
				  (x + localX+Math.round(tower_width/2)) + ',' + (y + localY-33-yGap) + ' ' +
				  (x + localX+tower_width)               + ',' + (y + localY-30-yGap) + ' ' +
				  (x + localX+tower_width+10)            + ',' + (y + localY-25-yGap) + ' ' +
				  (x + localX+Math.round(tower_width/2)) + ',' + (y + localY-150);
				  
	drawPolygon(points, "castleGradient1", true);
	
	var f = Math.random(); //a chance there is a flag on this tower!
	f = 0; //disable flags for now until we get one we like...
	if (f > 0.7) {
		// <image xlink:href="firefox.jpg" x="0" y="0" height="50px" width="50px"/> 
		var elem = document.createElementNS(xmlns, "image");
		elem.setAttributeNS(null, "id", "wavingFlag");
		elem.setAttributeNS(null, "x", (x + localX+Math.round(tower_width/2))-8);
		elem.setAttributeNS(null, "y", (y + localY-155-25));
		elem.setAttributeNS(null, "width", 55);
		elem.setAttributeNS(null, "height", 25);
		elem.setAttributeNS('http://www.w3.org/1999/xlink','href', '../theme_images/flag_test.gif');
		svgc.appendChild(elem);
		
		
		var points =  (x + localX+Math.round(tower_width/2)) + ',' + (y + localY-148) + ' ' +
				  	  (x + localX+Math.round(tower_width/2)-2) + ',' + (y + localY-150) + ' ' +
				  	  (x + localX+Math.round(tower_width/2)) + ',' + (y + localY-200) + ' ' +
					  (x + localX+Math.round(tower_width/2)+2) + ',' + (y + localY-150);
		
		drawPolygon(points, "castleGradient1", true);
	}
	
	var c = Math.round(Math.random()*3);	
	if (c == 0) {
		s_tower_height = Math.round(Math.random()*100)-30;
		s_tower_width = Math.round(Math.random()*20);
		towerTopHeight = Math.round(Math.random()*40)+20; //20-60
	    drawSideTowerRight((x+localX+tower_width+10), (y+localY-45), s_tower_width, s_tower_height, towerTopHeight);
	}
	if (c ==1) {
		s_tower_height = Math.round(Math.random()*100)-30;
		s_tower_width = Math.round(Math.random()*20);
		towerTopHeight = Math.round(Math.random()*40)+20; //20-60
	    drawSideTowerLeft((x+localX-10), (y+localY-45), s_tower_width, s_tower_height, towerTopHeight);
	}
	if (c ==2) {
		s_tower_height = Math.round(Math.random()*100)-30;
		s_tower_width = Math.round(Math.random()*20);
		towerTopHeight = Math.round(Math.random()*40)+20; //20-60
	    drawSideTowerLeft((x+localX+1), (y+localY+Math.round(Math.random()*50)), s_tower_width, s_tower_height, towerTopHeight);
	}
	if (c ==3) {
		s_tower_height = Math.round(Math.random()*100)-30;
		s_tower_width = Math.round(Math.random()*20);
		towerTopHeight = Math.round(Math.random()*40)+20; //20-60
	    drawSideTowerRight((x+localX+tower_width-1), (y+localY+Math.round(Math.random()*50)), s_tower_width, s_tower_height, towerTopHeight);
	}
	
	r = Math.random();
	if (r>0.5) {
	var points =  (x+localX+0) + ',' + (y+localY+10) + ' ' +
				  (x+localX+0) + ',' + (y+localY-20) + ' ' +
				  (x+localX+3) + ',' + (y+localY-25) + ' ' +
				  (x+localX+5) + ',' + (y+localY-20) + ' ' +
				  (x+localX+5) + ',' + (y+localY+10);
				  
	drawPolygon(points, window_color, false);
	}
	
	r = Math.random();
	if (r>0.5) {
	var points =  (x+localX+10) + ',' + (y+localY+10) + ' ' +
				  (x+localX+10) + ',' + (y+localY-20) + ' ' +
				  (x+localX+12) + ',' + (y+localY-25) + ' ' +
				  (x+localX+15) + ',' + (y+localY-20) + ' ' +
				  (x+localX+15) + ',' + (y+localY+10);
				  
	drawPolygon(points, window_color, false);
	}
	//alert(Math.round(tower_width/10));
	for (i=1; i<(Math.round(tower_width/10)); i++) {
		for (j=5; j<(Math.round(tower_height/10)); j++) {
			
			
   		points =  (x+localX+(i*10)) + ',' + (y+localY+(j*10)+10) + ' ' +
		    	  (x+localX+(i*10)) + ',' + (y+localY+(j*10)-5) + ' ' +
				  (x+localX+(i*10)+2) + ',' + (y+localY+(j*10)-10) + ' ' +
				  (x+localX+(i*10)+5) + ',' + (y+localY+(j*10)-5) + ' ' +
				  (x+localX+(i*10)+5) + ',' + (y+localY+(j*10)+10);
			
			r = Math.random();
			if (r > 0.5) {
				drawPolygon(points, window_color, false);
			}
			i = i+1;
			if (i>=Math.round(tower_width/10)) {i=1;}
			j = j+2;
			if (j>=20) { return; }
		}
	}
	
}


function drawTowers(castle_area) {
	
	var localX  = castle_area[0];
	var localY = castle_area[2];
	var width = castle_area[1] - castle_area[0];
	var height = castle_area[3] - castle_area[2];
	var numTowers = 10; //Math.round(Math.random()*10);
	var maxX = 0;
	dHT = false;

	
	for (var i = 0; i <= numTowers; i++)
	{
		x = Math.round(Math.random()*width);
		tower_width = Math.round(Math.random()*(width/2));
		if (tower_width < 75) { tower_width = 75; }
		if (tower_width > 155) { tower_width = 155; }

		
		y = Math.round(Math.random()*height);
		if (y >= fade_floor) { y = fade_floor-200; }
		tower_height = fade_floor-y;
		roof_height = Math.round(Math.random()*200);
		if (roof_height < 100) { roof_height = 100; }
		
		
		drawTower(localX+x, localY+y, tower_width, tower_height, "castleGradient1", true);
		
		if (Math.random() > pHT) {
		   drawHighTower(localX+x, localY+y, tower_width, tower_height);
		   dHT = true;
		}
		//drawPolygon(points, "black", false);
	}		
	if (dHT == false) {
		drawHighTower(localX+x, localY+y, tower_width, tower_height);
	}
	
	
}


function setupGradients() {
	//create gradient element and ID
	var elem = document.createElementNS(xmlns, "linearGradient");
	elem.setAttributeNS(null, "id", "castleGradient1");
	
	//create all stops that define the gradient
	var stop1 = document.createElementNS(xmlns, "stop");
	stop1.setAttributeNS(null, "offset", "25%");
	stop1.setAttributeNS(null, "stop-color", "#000000");
	stop1.setAttributeNS(null, "stop-opacity", "1.0");
	elem.appendChild(stop1);
	
	var stop2 = document.createElementNS(xmlns, "stop");
	stop2.setAttributeNS(null, "offset", "65%");
	stop2.setAttributeNS(null, "stop-color", "#000000");
	stop2.setAttributeNS(null, "stop-opacity", "1.0");
	elem.appendChild(stop2);

	var stop3 = document.createElementNS(xmlns, "stop");
	stop3.setAttributeNS(null, "offset", "95%");
	stop3.setAttributeNS(null, "stop-color", "#333333");
	stop3.setAttributeNS(null, "stop-opacity", "1.0");
	elem.appendChild(stop3);
	
	//add the gradient to the SVG
	svgc.appendChild(elem);
	
	//create gradient element and ID
	var elem = document.createElementNS(xmlns, "linearGradient");
	elem.setAttributeNS(null, "id", "castleGradient2");
	elem.setAttributeNS(null, "x1", "0%");
	elem.setAttributeNS(null, "y1", "0%");
	elem.setAttributeNS(null, "x2", "0%");
	elem.setAttributeNS(null, "y2", "100%");

	//create all stops that define the gradient
	var stop1 = document.createElementNS(xmlns, "stop");
	stop1.setAttributeNS(null, "offset", "15%");
	stop1.setAttributeNS(null, "stop-color", "#000000");
	stop1.setAttributeNS(null, "stop-opacity", "0.0");
	elem.appendChild(stop1);
	
	var stop2 = document.createElementNS(xmlns, "stop");
	stop2.setAttributeNS(null, "offset", "45%");
	stop2.setAttributeNS(null, "stop-color", "#000000");
	stop2.setAttributeNS(null, "stop-opacity", "0.5");
	elem.appendChild(stop2);

	var stop3 = document.createElementNS(xmlns, "stop");
	stop3.setAttributeNS(null, "offset", "95%");
	stop3.setAttributeNS(null, "stop-color", "#000000");
	stop3.setAttributeNS(null, "stop-opacity", "1.0");
	elem.appendChild(stop3);
	
	//add the gradient to the SVG
	svgc.appendChild(elem);
	
	//setup radial gradient
	elem = document.createElementNS(xmlns, "radialGradient");
	elem.setAttributeNS(null, "id", "cloudGradient1");
	elem.setAttributeNS(null, "cx", "50%");
	elem.setAttributeNS(null, "cy", "50%");
	elem.setAttributeNS(null, "r", "50%");
	elem.setAttributeNS(null, "fx", "50%");
	elem.setAttributeNS(null, "fy", "50%");
	
	stop1 = document.createElementNS(xmlns, "stop");
	stop1.setAttributeNS(null, "offset", "0%");
	stop1.setAttributeNS(null, "stop-color", "#000000");
	stop1.setAttributeNS(null, "stop-opacity", "0.25");
	elem.appendChild(stop1);
	
	stop2 = document.createElementNS(xmlns, "stop");
	stop2.setAttributeNS(null, "offset", "80%");
	stop2.setAttributeNS(null, "stop-color", "#000000");
	stop2.setAttributeNS(null, "stop-opacity", "0.00");
	elem.appendChild(stop2);
	
	stop3 = document.createElementNS(xmlns, "stop");
	stop3.setAttributeNS(null, "offset", "100%");
	stop3.setAttributeNS(null, "stop-color", "#000000");
	stop3.setAttributeNS(null, "stop-opacity", "0.00");
	elem.appendChild(stop3);
	
	//attach radial gradient
	svgc.appendChild(elem);
	
	
	
}

function drawCircle(x, y, r, fill, isGradient)
{
	var elem = document.createElementNS(xmlns, "circle");
	elem.setAttributeNS(null, "id", "circle" + circle_count);
	elem.setAttributeNS(null, "cx", x);
	elem.setAttributeNS(null, "cy", y);
	elem.setAttributeNS(null, "r", r);
	if (isGradient) {
		elem.setAttributeNS(null, "fill", "url(#" + fill + ")");
	}
	else {
		elem.setAttributeNS(null, "fill", fill);
	}
	circle_count ++;
	svgc.appendChild(elem); 
}

function drawPolygon(points, fill, isGradient)
{
	var elem = document.createElementNS(xmlns, "polygon");
	elem.setAttributeNS(null, "id", "polygon" + poly_count);
	elem.setAttributeNS(null, "points", points);
	if (isGradient) {
		elem.setAttributeNS(null, "fill", "url(#" + fill + ")");
	}
	else {
		elem.setAttributeNS(null, "fill", fill);
	} 
	elem.setAttributeNS(null, "stroke", stroke);
	elem.setAttributeNS(null, "stroke-width", stroke_width);
	poly_count ++;
	svgc.appendChild(elem);
	
}

//function to draw a rect
function drawRect(x, y, width, height, fill, isGradient) 
{
	var elem = document.createElementNS(xmlns, "rect");
	elem.setAttributeNS(null, "id", "rect" + rect_count);
	elem.setAttributeNS(null,"x",x);
	elem.setAttributeNS(null,"y",y);
	elem.setAttributeNS(null,"width",width);
	elem.setAttributeNS(null,"height",height);
	if (isGradient) {
		elem.setAttributeNS(null, "fill", "url(#" + fill + ")");
	}
	else {
		elem.setAttributeNS(null, "fill", fill);
	} 
	elem.setAttributeNS(null, "stroke", stroke);
	elem.setAttributeNS(null, "stroke-width", 0);
	rect_count ++;
	svgc.appendChild(elem);
}

function drawSideTowerRight(localX, localY, tower_width, tower_height, towerTopHeight ) {
	 var points = (localX+0)  + ',' + (localY+31) + ' ' +
				  (localX+5)  + ',' + (localY+36) + ' ' +
				  (localX+11) + ',' + (localY+34) + ' ' +
				  (localX+14) + ',' + (localY+31) + ' ' +
				  (localX+14) + ',' + (localY+28) + ' ' +
				  (localX+8)  + ',' + (localY+21) + ' ' +
				  (localX+16) + ',' + (localY+14) + ' ' +
				  (localX+22 + Math.round(tower_width/2)) + ',' + (localY+12) + ' ' + //center top
				  (localX+30 + tower_width) + ',' + (localY+14) + ' ' +
				  (localX+36 + tower_width) + ',' + (localY+21) + ' ' +
				  (localX+31 + tower_width) + ',' + (localY+26) + ' ' +
				  (localX+28 + tower_width) + ',' + (localY+79+tower_height) + ' ' +
				  (localX+22 + Math.round(tower_width/2)) + ',' + (localY+95+tower_height) + ' ' + //center bottom
				  (localX+16) + ',' + (localY+79+tower_height) + ' ' +
				  (localX+16) + ',' + (localY+52) + ' ' +
				  (localX+10) + ',' + (localY+47) + ' ' +
				  (localX+5)  + ',' + (localY+46) + ' ' +
				  (localX+0)  + ',' + (localY+50);
				  
				  drawPolygon(points, "castleGradient1", true);
				  
				  
				  //top of tower
		points =  (localX+8)  + ',' + (localY+21-yGap) + ' ' +
				  (localX+16) + ',' + (localY+14-yGap) + ' ' +
				  (localX+22 + Math.round(tower_width/2)) + ',' + (localY+12-yGap) + ' ' + //center top
				  (localX+30 + tower_width) + ',' + (localY+14-yGap) + ' ' +
				  (localX+36 + tower_width) + ',' + (localY+21-yGap) + ' ' +
				  (localX+22 + Math.round(tower_width/2)) + ',' + (localY-towerTopHeight+12-yGap);

				   drawPolygon(points, "castleGradient1", true);
}

function drawSideTowerLeft(localX, localY, tower_width, tower_height ) {
	 var points = (localX-0)  + ',' + (localY+31) + ' ' +
				  (localX-5)  + ',' + (localY+36) + ' ' +
				  (localX-11) + ',' + (localY+34) + ' ' +
				  (localX-14) + ',' + (localY+31) + ' ' +
				  (localX-14) + ',' + (localY+28) + ' ' +
				  (localX-8)  + ',' + (localY+21) + ' ' +
				  (localX-16) + ',' + (localY+14) + ' ' +
				  (localX-22 - Math.round(tower_width/2)) + ',' + (localY+12) + ' ' + //center top
				  (localX-30 - tower_width) + ',' + (localY+14) + ' ' +
				  (localX-36 - tower_width) + ',' + (localY+21) + ' ' +
				  (localX-31 - tower_width) + ',' + (localY+26) + ' ' +
				  (localX-28 - tower_width) + ',' + (localY+79+tower_height) + ' ' +
				  (localX-22 - Math.round(tower_width/2)) + ',' + (localY+95+tower_height) + ' ' + //center bottom
				  (localX-16) + ',' + (localY+79+tower_height) + ' ' +
				  (localX-16) + ',' + (localY+52) + ' ' +
				  (localX-10) + ',' + (localY+47) + ' ' +
				  (localX-5)  + ',' + (localY+46) + ' ' +
				  (localX-0)  + ',' + (localY+50);
				  
				  drawPolygon(points, "castleGradient1", true);
				  
				  //top of tower
		points =  (localX-8)  + ',' + (localY+21-yGap) + ' ' +
				  (localX-16) + ',' + (localY+14-yGap) + ' ' +
				  (localX-22 - Math.round(tower_width/2)) + ',' + (localY+12-yGap) + ' ' + //center top
				  (localX-30 - tower_width) + ',' + (localY+14-yGap) + ' ' +
				  (localX-36 - tower_width) + ',' + (localY+21-yGap) + ' ' +
				  (localX-22 - Math.round(tower_width/2)) + ',' + (localY-towerTopHeight+12-yGap);

				   drawPolygon(points, "castleGradient1", true);
}


function drawTower(localX, localY, tower_width, tower_height, fill, isGradient) {
	var points = (localX+0)               + ',' + (localY+10) + ' ' +
				 (localX-10)              + ',' + (localY-0) + ' ' +
				 (localX-10)              + ',' + (localY-20) + ' ';
				 (localX)                 + ',' + (localY-20) + ' ';
				 //make this the stair step pattern
		for (var i=0; i<(tower_width/10); i++) {
			if (i%2 == 0) {
				if ((localX+(i*10)+10) < (localX+tower_width) == true) {
				points = points + (localX+(i*10)) + ',' + (localY-20) + ' ' +
				          (localX+(i*10)) + ',' + (localY-10) + ' ' +  //;
						  (localX+(i*10)+10)+','+ (localY-10) + ' ' +
						  (localX+(i*10)+10)+','+ (localY-20) + ' ';
				}
			}
			else 
			{
				//something
			}
		
		}
		
		points = points + (localX+tower_width)     +','  + (localY-20) + ' ' +
				 		  (localX+tower_width+10)  +','  + (localY-20) + ' ' +
				          (localX+tower_width+10)  +','  + (localY-0) + ' ' +
				          (localX+tower_width)     +','  + (localY+10) + ' ' +
				          (localX+tower_width)     +','  + (localY+tower_height) + ' ' +
				          (localX)                 +','  + (localY+tower_height);
	
	drawPolygon(points, fill, isGradient);
	
	for (i=1; i<(Math.round(tower_width/10)); i++) {
		for (j=5; j<(Math.round(tower_height/10)); j++) {
			
			
   		points =  (localX+(i*10)) + ',' + (localY+(j*10)+10) + ' ' +
		    	  (localX+(i*10)) + ',' + (localY+(j*10)-5) + ' ' +
				  (localX+(i*10)+2) + ',' + (localY+(j*10)-10) + ' ' +
				  (localX+(i*10)+5) + ',' + (localY+(j*10)-5) + ' ' +
				  (localX+(i*10)+5) + ',' + (localY+(j*10)+10);
			
			r = Math.random();
			if (r > 0.5) {
				drawPolygon(points, window_color, false);
			}
			i = i+1;
			if (i>=5) {i=1;}
			j = j+1;
			if (j>=20) { return; }
		}
	}
}

function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}