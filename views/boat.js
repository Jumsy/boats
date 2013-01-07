var Backbone = require('backbone')
var charm = require('charm')(process.stdout)

module.exports = function(game) {
  var window = game.models.window
  var boat = game.models.boat

  var BoatView = Backbone.Model.extend({
    design: '[88>',
    foreground: 92,
    background: 62,
    initialize: function() {
      this.listenTo(boat, 'change', this.render)
    },
    render: function() {
      var x = boat.get('x') - window.get('x')
      var y = boat.get('y') - window.get('y')

      // on screen?
        charm.position(x, y)
        charm.foreground(this.foreground)
        charm.background(this.background)
        charm.write(this.design)
        charm.display('reset')
        return this;
    }
  })

  var bv = new BoatView()

  return bv
}


