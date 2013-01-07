var Entity = require('./entity')()

var Boat = Entity.extend({}, {
  design: '[88>',
  background: 63,
  foreground: 94
})

module.exports = function() {
  return new Boat({x: 5, y: 5})
}
