var shortcut = require('shortcut')(process.stdin)
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

shortcut('^+c', process.exit)
shortcut('w', function(){models.boat.move(0, -1)})
shortcut('a', function(){models.boat.move(-1, 0)})
shortcut('s', function(){models.boat.move(0, 1)})
shortcut('d', function(){models.boat.move(1, 0)})



process.stdin.setRawMode(true)
process.stdin.resume()
