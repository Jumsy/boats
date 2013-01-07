var Backbone = require('backbone')
var EventEmitter = require('events')
var util = require('util')
var charm = require('charm')(process.stdout)

function View(models) {
  this.models = models
  this.rows = process.stdout.rows,
  this.cols = process.stdout.columns,
  this.offsetx = 0,
  this.offsety = 0,
  this.render = function() {
    this.reset()
  }

  this.dirtyScreen()
}

util.inherits(EventEmitter, View)

View.prototype.reset = reset
function reset() {
  this.drawOcean()
  this.drawBoat()
}

View.prototype.dirtyScreen = function dirtyScreen() {
 charm.position(0,0)
 charm.background('blue')
 charm.foreground('black')
 for(var i=0;i!=this.rows;i++) {
  for(var j=0;j!=this.cols;j++)
    charm.write(''+(j%10))
  charm.down(1)
 }

   charm.position(0, i)
}

View.prototype.drawOcean = drawOcean
function drawOcean() {
}

View.prototype.drawBoat = drawBoat
function drawBoat() {
  var boat = this.models.boat
  var posx = boat.get('x') - this.offsetx
  var posy = boat.get('y') - this.offsety
  charm.background(boat.get('background'))
       .foreground(boat.get('foreground'))
       .position(posx, posy)
       .write(boat.get('design'))
}

View.prototype.drawObject = drawObject
function drawObject(obj) {
  if(!onScreen)
    return


}

module.exports = function(game) {
  var GameView = Backbone.Model.extend({
    render: function() {
      charm.reset()
      game.views.boat.render()
      return this;
    }
  })

  return new GameView()
}
