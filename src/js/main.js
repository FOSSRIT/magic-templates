var magic = {}; //global var
var fossbox = {};

//wait until main document is loaded
window.addEventListener('load',function(){
  console.log('DOMLoaded');
}); //end addEventListener



document.doRandomFlips = false;

// this function determines whether the event is the equivalent of the microsoft
// mouseleave or mouseenter events.
function isMouseLeaveOrEnter(e, handler)
{   
  var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
  while (reltg && reltg != handler) reltg = reltg.parentNode;
  return (reltg != handler);
}
//thans to http://www.dynamic-tools.net/toolbox/isMouseLeaveOrEnter/ for this function
