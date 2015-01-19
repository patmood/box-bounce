'use strict'

var Box = require('./box_prefab')
  , Scoreboard = require('./scoreboard_prefab')

function Play() {
  this.player = null
}

Play.prototype = {

  create: function () {
    this.game.stage.backgroundColor = '#666'

    var w = this.game.width
      , h = this.game.height

    // Input
    this.input.onDown.add(this.onInputDown, this)
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.cursors.left.onDown.add(this.pressLeft, this)
    this.cursors.right.onDown.add(this.pressRight, this)

    // Player
    this.player = new Box(this.game, w/2, h - 100)
    this.game.add.existing(this.player)

    // Score
    this.score = 0
    this.scoreText = this.game.add.bitmapText(10, 30, 'minecraftia', '0', 42)
    this.game.add.existing(this.scoreText)

  },

  update: function () {
    // Update Score
    this.scoreText.setText(this.score.toString())
    this.scoreText.updateText()
    this.scoreText.x = this.game.width / 2 - this.scoreText.textWidth / 2
  },

  pressLeft: function() {
    this.player.bounce('L')
  },

  pressRight: function() {
    this.player.bounce('R')
  },

  endGame: function() {
    this.player.fall()
    this.game.input.onDown.removeAll()
    this.cursors.left.onDown.removeAll()
    this.cursors.right.onDown.removeAll()
    this.scoreboard = new Scoreboard(this.game, this.scoreText)
  },

  onInputDown: function () {
    if (this.game.input.activePointer.x < this.game.width * 0.5) {
      this.pressLeft()
    } else {
      this.pressRight()
    }
  },

  render: function() {
  }

}

module.exports = Play
