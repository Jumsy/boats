var Backbone = require('backbone')

var Rock = Backbone.Model.extend({
  design: '0'
})

var Rocks = Backbone.Collection.extend({
  model: Rock
})

module.exports = function(game) {
  return new Rocks()
}
