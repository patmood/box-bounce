'use strict'

var Box = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'player', 0)
  this.anchor.setTo(0.5, 0.5)
  this.scale.set(0.5)
  this.game.physics.enable(this, Phaser.Physics.ARCADE)
  this.animations.add('climb', null, 20)

  // Constants
  this.body.gravity.y = 500
  this.BOUNCE_SPEED_X = 100
  this.BOUNCE_SPEED_Y = -500
  this.SPIN_SPEED = 200
}

Box.prototype = Object.create(Phaser.Sprite.prototype)
Box.prototype.constructor = Box

Box.prototype.update = function() {
}

Box.prototype.bounce = function(dir) {

  if (dir === 'L') {
    this.body.angularVelocity = -this.SPIN_SPEED
    this.body.velocity.x = -this.BOUNCE_SPEED_X
    this.body.velocity.y = this.BOUNCE_SPEED_Y
  } else if (dir === 'R') {
    this.body.angularVelocity = this.SPIN_SPEED
    this.body.velocity.x = this.BOUNCE_SPEED_X
    this.body.velocity.y = this.BOUNCE_SPEED_Y
  }

}

Box.prototype.fall = function() {
  this.alive = false
}

module.exports = Box
