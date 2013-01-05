var shortcut = require('shortcut')(process.stdin)
var charm = require('charm')(process.stdout)
var cols = process.stdout.columns
var rows = process.stdout.rows
var river = ''
var rocks = []
var boat = {x: 10, y: 10, design: '[88>'};
var screen = {x: 0, y: 0}
var j, i

for(j=0;j<cols;j++)
  river += '}';

makeRock(18, 4)
makeRock(14, 16)
makeRock(8, 10)

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
  charm.position(cols, rows-1)
}

function writeBoat() {
  charm.erase('screen');
  drawRiver()
  console.log(boat)
  charm.position(boat.x - screen.x, boat.y - screen.y)
  charm.left()
  charm.foreground('magenta')
  charm.write(boat.design)
  charm.position(cols, rows-1)
}

charm.position(boat.x, boat.y)

shortcut('h', function() {
    boat.x = boat.x - 1;
    writeBoat();
})
shortcut('j', function() {
    boat.y += 1;
    writeBoat();
})
shortcut('k', function() {
    boat.y = boat.y - 1;
    writeBoat();
})
shortcut('l', function() {
    boat.x += 1;
    writeBoat();
})

shortcut('c', process.exit)
process.stdin.setRawMode(true)
process.stdin.resume()

setInterval(function moveScreen() {
  screen.x = screen.x + 1
  writeBoat()
}, 500)

setInterval(function() {
  boat.x = boat.x - 1
  writeBoat();
}, 750)
