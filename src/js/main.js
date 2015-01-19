'use strict'

var width, height, game

function init() {

  console.log('Cocoon?', navigator.isCocoonJS)

  //========== DOMishParser for Cocoon.js ============
  require('./domish_parser')(window.cocoonjsphaser = window.cocoonjsphaser || {})
  if (navigator.isCocoonJS) { cocoonjsphaser.utils.fixDOMParser() }

  width = window.innerWidth
  height = window.innerHeight
  game = new Phaser.Game(width, height, Phaser.CANVAS, '')

  game.state.add('boot', require('./boot'))
  game.state.add('preloader', require('./preloader'))
  game.state.add('menu', require('./menu'))
  game.state.add('play', require('./play'))

  game.state.start('boot')
}

// Start the app
navigator.isCocoonJS ? init() : window.onload = init
