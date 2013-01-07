var Backbone = require('backbone')


module.exports = function(game) {

  var Entity = Backbone.Model.extend({
    // set coords absolutely
    position: function(x, y) {
      this.set({x: x, y: y})
    },
    // set coords relatively
    move: function(x, y) {
      this.set({
        x: this.get('x') + x,
        y: this.get('y') + y
      })
      console.log(this.get('x'), this.get('y'))
    },
  })

  return Entity
}
