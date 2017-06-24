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
