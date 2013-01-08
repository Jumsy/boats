var game = {}
var models = game.models = {}

var window = models.window = require('./models/window')()
var boat = models.boat = require('./models/boat')()

var collections = game.collections = {}
collections.rocks = require('./models/rocks')(models)

var views = game.views = {}
views.boat = require('./views/boat.js')(game)
views.gameView = require('./view')(game)

views.gameView.listenTo(models.window, 'change', views.gameView.render)

setInterval(function() {
  models.window.set({x: models.window.get('x') + 1})
}, 750)

var controller = require('./controller')(game)
