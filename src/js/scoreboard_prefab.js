'use strict'

var Scoreboard = function(game, existingScoreObj) {

  Phaser.Group.call(this, game)
  this.x = 0
  this.y = this.game.height

  // Not part of the group as it is tweened separately
  this.scoreText = existingScoreObj

  this.highScoreText = this.game.add.bitmapText(0, 200, 'minecraftia', '', 36, this)

  this.show()
}

Scoreboard.prototype = Object.create(Phaser.Group.prototype)
Scoreboard.prototype.constructor = Scoreboard

Scoreboard.prototype.update = function() {
  this.scoreText.x = this.game.width / 2 - this.scoreText.textWidth / 2
}

Scoreboard.prototype.show = function() {
  var score = parseInt(this.scoreText.text)
    , highScore = '-'

  if(!!localStorage) {
    try {
      highScore = parseInt(localStorage.getItem('highScore'))
      if(!highScore || highScore < score) {
        highScore = score
        localStorage.setItem('highScore', highScore)
      }
      window.highScore = highScore
    } catch(err) {
      console.error(err)
    }
  } else if(!window.highScore || window.highScore < score) {
    window.highScore = score
  }

  this.highScoreText.setText('Record: ' + highScore)
  this.highScoreText.updateText()
  this.highScoreText.x = this.game.width / 2 - this.highScoreText.textWidth / 2

  // Add input listener to restart game after 2 seconds
  this.game.time.events.add(
    Phaser.Timer.SECOND * 2
  , function() {
      this.game.input.onDown.addOnce(this.playClick, this)
      this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
          .onDown.addOnce(this.playClick, this)
      this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
          .onDown.addOnce(this.playClick, this)
    }
  , this)

  this.game.add.tween(this.scoreText).to({ y: 100, fontSize: 72 }, 1000, Phaser.Easing.Bounce.Out, true)
  this.game.add.tween(this).to({ y: 0 }, 1000, Phaser.Easing.Bounce.Out, true)
}

Scoreboard.prototype.playClick = function() {
  this.game.input.onDown.removeAll()
  this.game.input.keyboard.clearCaptures()
  this.game.state.start('play')
  this.destroy()
}

module.exports = Scoreboard
