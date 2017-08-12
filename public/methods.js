var units = {
	f: ['[N]', '[kN]', '[mN]', '[gf]', '[kgf]', '[ozf]', '[lbf]', '[kipf]'],
	a: ['[m/s2]', '[mm/s2]', '[cm/s2]', '[km/s2]', '[in/s2]', '[ft/s2]', '[mi/(h*s)]'],
	theta: ['[deg]'],
	m: ['[kg]', '[mug]', '[mg]', '[Mg]', '[oz]', '[lb]', '[ton]'],
	u: ['[]'],
	v: ['[m/s]', '[mm/s]', '[cm/s]', '[km/s]', '[in/s]', '[ft/s]', '[mi/s]', '[mi/h]'],
	d: ['[m]', '[mm]', '[cm]', '[km]', '[in]', '[ft]', '[mi]']
}

var options = {
	a: units.a,
	Fnet: units.f,
	g: units.a,
	theta: units.theta,
	m1: units.m,
	m2: units.m,
	muk: units.u,
	mus: units.u,
	V0: units.v,
	Vf: units.v,
	d: units.d
}

$.each(options, function(key, value) {
    
    var gval = (key == "g") ? 9.81 : '';

	var textInput = '<td><input type="text" id='+key+' name="vall" value='+gval+'></td>'
	var unitsSelect = '<td><select id='+key+' name="units"></select></td>'
	
	$('#solve_data').append('<option value='+key+'>'+key+'</option>')


	$('#tbd').append('<tr><td>'+key+'</td>'+textInput+unitsSelect+'</tr>')

	$.each(value, function(index, value2){
		$('select[id='+key+']').append('<option value='+value2+'>'+value2+'</option>')
	})

})

$.each(units.a, function(index, value2){
	    $('#solve_units').append('<option value='+value2+'>'+value2+'</option>')
	})
	


var trianglePath = new Path({
    segments: [[100, 300], [100, 100], [446, 300]],
    closed: true
});

trianglePath.fillColor = '#e9e9ff';
trianglePath.strokeColor = 'black';

var block1 = new Path.Rectangle(new Point(250, 150), new Point(300, 200)).rotate(30);
block1.fillColor = '#e9e9ff';
block1.strokeColor = 'black';

var block2 = new Path.Rectangle(new Point(40, 150), new Point(90, 200));

var myCircle = new Path.Circle(new Point(100, 70), 20);

var path1 = new Path(new Point(105,50), new Point(255, 160))
var path2 = new Path(new Point(82,60), new Point(70, 150))
var support = new Path.Rectangle(new Point(100, 105), new Point(105, 90));

var m1 = new PointText({
    point: [265, 175],
    content: 'm1',
    fontSize: 20
});

m1.visible = false;

var m2text = new PointText({
    point: [50, 170],
    content: 'm2',
    fontSize: 20
});



var m2 = new Group({
    children: [block2, myCircle, path1, path2, support, m2text],
    // Set the stroke color of all items in the group:
    strokeColor: 'black',
    fillColor: '#e9e9ff',
    
    // Move the group to the center of the view:
    
    visible: false
});

m2text.fillColor = 'black';

var theta = new PointText({
    point: [400, 295],
    content: String.fromCharCode(248),
    fontSize: 20,
    visible: false
});


var headLength = 10;
var headAngle = 150;

var lineStart = new Point(300, 225);
var lineEnd = new Point (400, 225);

var tailLine = new Path.Line(lineStart, lineEnd);
var headVector = lineEnd - lineStart;
var headLine = headVector.normalize(headLength);
var tailVector = lineStart - lineEnd;
var tailLine = tailVector.normalize(headLength);

var d = new Group([
    new Path([lineStart, lineEnd]),
    new Path([
        lineEnd + headLine.rotate(headAngle),
        lineEnd,
        lineEnd + headLine.rotate(-headAngle)
    ]),
    new Path([
        lineStart + tailLine.rotate(headAngle),
        lineStart,
        lineStart + tailLine.rotate(-headAngle)
    ]),
    new PointText({
    point: [350, 220],
    content: 'd',
    fontSize: 15
	})
]);

d.rotate(30);
d.strokeColor = 'black';
d.visible = false;

var g = new Group([
    new Path([lineStart, lineEnd]),
    new Path([
        lineEnd + headLine.rotate(headAngle),
        lineEnd,
        lineEnd + headLine.rotate(-headAngle)
    ]),
    new PointText({
    point: [350, 215],
    content: 'gravity',
    fontSize: 15
	}),
	
]);

g.rotate(90);
g.strokeColor = 'black';
g.visible = false;
g.position = new Point(400, 100);

var draw = [
	{id: 'm2', method: m2},
	{id: 'theta', method: theta},
	{id: 'd', method: d},
	{id: 'g', method: g},
	{id: 'm1', method: m1}
]

function drawShape(){

    $('input[type="text"]').each(function(index, value){
    		var option = $(this).attr('id').toString();
    		var val = $(this).val();
    		var solveOption = $('#solve_data').val().toString();
    		
    		function findID(elem){
    		    return elem.id == option;
    		}
    		function findSID(elem){
    		    return elem.id == solveOption;
    		}
    		
    		
    		if(draw.find(findID) && val){
    		    draw.find(findID).method.visible = true;
    		}
    		if(draw.find(findID) && !val){
    		    draw.find(findID).method.visible = false;
    		}
    		if(draw.find(findSID)){
    		    draw.find(findSID).method.visible = true;
    		}
    

    })
}

function changeSolveUnits(){
    $('#solve_units').empty();
    var option = $('#solve_data').val().toString();
    
    $.each(options[option], function(index, value){
	    $('#solve_units').append('<option value='+value+'>'+value+'</option>')
	})
    
}


$('input[type="text"]').on('keyup', function() {
    drawShape();    
})

$('#solve_data').on('change', function() {
    drawShape(); 
    changeSolveUnits();
})