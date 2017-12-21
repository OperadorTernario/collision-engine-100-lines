draggable = function(node, callback) 
{
	var x,y;

	node.addEventListener('mousedown', function(event) {
		x = event.clientX - node.offsetLeft;
		y = event.clientY - node.offsetTop;
		document.addEventListener('mousemove', move);
	});

	node.addEventListener('mouseup', function() {
		document.removeEventListener('mousemove', move);
	});

	callback = callback || new Function("return true;");

	function move(event)
	{
		// store values before moving
		var left = node.style.left;
		var top = node.style.top;

		// do movement
		node.style.left = event.clientX - x + "px";
		node.style.top = event.clientY - y + "px";

		// undo movement where condition ...!
		if (!callback())
		{
			node.style.left = left;
			node.style.top = top;
			node.style.background = "red";		// on collision!
		}
		else
			node.style.background = "rgb(0,150,200)";
	}
}

function collision(p1, p2)
{
	// x-axis superposition
	var p1x0 = p1.offsetLeft;
	var p1x1 = p1.offsetLeft + p1.offsetWidth;

	var p2x0 = p2.offsetLeft;
	var p2x1 = p2.offsetLeft + p2.offsetWidth;

	var x_superposition = false;

	if ((p1x0 <= p2x0 && p2x0 <= p1x1) || (p1x0 <= p2x1 && p2x1 <= p1x1))
		x_superposition = true;

	// y-axis superposition
	var p1y0 = p1.offsetTop;
	var p1y1 = p1.offsetTop + p1.offsetHeight;

	var p2y0 = p2.offsetTop;
	var p2y1 = p2.offsetTop + p2.offsetHeight;

	var y_superposition = false;

	if ((p1y0 <= p2y0 && p2y0 <= p1y1) || (p1y0 <= p2y1 && p2y1 <= p1y1))
		y_superposition = true;

	if (x_superposition && y_superposition)
		return true;
	else
		return false;
}