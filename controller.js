var shortcut = require('shortcut')(process.stdin)

module.exports = function(game) {
  var models = game.models

  shortcut('^+c', process.exit)
  shortcut('w', function(){models.boat.move(0, -1)})
  shortcut('a', function(){models.boat.move(-1, 0)})
  shortcut('s', function(){models.boat.move(0, 1)})
  shortcut('d', function(){models.boat.move(1, 0)})

  process.stdin.setRawMode(true)
  process.stdin.resume()

  return true
}
