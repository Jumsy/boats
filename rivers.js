var shortcut = require('shortcut')(process.stdin)
var charm = require('charm')(process.stdout)
var cols = process.stdout.columns
var rows = process.stdout.rows
var river = ''
var rocks = []
var boat = {x: 10, y: 8, design: '[88>', status: 'floating'};
var screen = {x: 0, y: 0}
var j, i
var pause = false

for(j=0;j<cols;j++)
  river += '}';

makeRock(18, 0)
makeRock(18, 4)
makeRock(14, 16)
makeRock(8, 10)
makeRock(14, 10)
makeRock(20, 10)

function makeRock(x,y) {
 rocks.push({x: x, y: y})
}

function drawRocks() {
  rocks.forEach(function(r) {
    if(r.x < screen.x)
      return;
    var pos = {x: (r.x - screen.x), y: (r.y  - screen.y)}
    charm.position(pos.x, pos.y)
    charm.background('cyan')
    charm.foreground('white')
    charm.write('0')
    charm.background('black')
  })
}

function drawRiver() {
  for(i=0;i<rows;i++) {
    charm.position(0, i)
    charm.foreground('blue')
    charm.write(river)
  }
  drawRocks()
  charm.position(0, rows-1)
}

//function drawEnv() {
    //shoreWidth = 5
    //topShore = shoreWidth;
    //botShore = rows-shoreWidth;
//}

function writeBoat() {
  charm.erase('screen');
  drawRiver()
  checkCollision()

  console.log(boat)

  if (boat.status !== 'sunk') {
    charm.position(boat.x - screen.x, boat.y - screen.y)
    charm.foreground('magenta')
    charm.write(boat.design)
    charm.position(0, rows-1)
  }

  if(boat.status === 'sunk') {
    charm.position(boat.x - screen.x, boat.y - screen.y)
    charm.foreground('magenta')
    charm.write(boat.design[0])
    charm.foreground('blue')
    charm.write(Array(boat.design.length - 1).join('}'))
    charm.foreground('magenta')
    charm.write(boat.design[boat.design.length-1])
    charm.position(0, rows-1)
  }
}

function checkCollision() {
  for (var r in rocks) {
    if((rocks[r].x >= boat.x && (boat.design.length + boat.x) >= rocks[r].x)
      && (rocks[r].y === boat.y))
      boat.status = 'sunk'
  }
}

function moveBoat(x, y) {
    if (boat.status == 'sunk') { return; }
    boat.x += x
    boat.y += y
}

shortcut('h', function() {
    moveBoat(-1, 0);
    writeBoat();
})
shortcut('j', function() {
    moveBoat(0, 1);
    writeBoat();
})
shortcut('k', function() {
    moveBoat(0, -1);
    writeBoat();
})
shortcut('l', function() {
    moveBoat(1, 0);
    writeBoat();
})
shortcut('p', function() {
    pause = pause ? false : true;
    //pause = pause == false
})

shortcut('c, ctrl+c', process.exit)
process.stdin.setRawMode(true)
process.stdin.resume()

setInterval(function moveScreen() {
  if (!pause)
    screen.x = screen.x + 1
  writeBoat()
}, 1500)

setInterval(function() {
  if(!pause && boat.status !== 'sunk') // Sunken boats don't drift!
    boat.x -= 1
  writeBoat();
}, 750)
