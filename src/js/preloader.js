'use strict'

function Preloader() {
  this.ready = false
}

Preloader.prototype = {

  preload: function () {
    if (!navigator.isCocoonJS) {
      this.asset = this.add.sprite(this.game.width/2, this.game.height/2, 'preloader')
      this.asset.anchor.setTo(0.5, 0.5)
      this.load.setPreloadSprite(this.asset)
    }

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)
    this.load.image('player', 'assets/player.png')


    var fileFormat = (this.game.device.cocoonJS) ? '.json' : '.xml'
    console.log(fileFormat, 'font format')
    this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia' + fileFormat)
  },

  create: function () {
  },

  update: function () {
    if (!!this.ready) {
      this.game.state.start('play')
    }
  },

  onLoadComplete: function () {
    this.ready = true
  }
}

module.exports = Preloader
