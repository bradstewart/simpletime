'use strict'

const path = require('path')
const menubar = require('menubar')

/**
 * Create the menubar instance.
 */
const mb = menubar({
  icon: path.join(__dirname, 'assets', 'IconTemplate.png'),
  height: 400,
  width: 400,
})

mb.on('ready', function ready () {
  console.log('app is ready')
})

mb.on('after-create-window', () => {
  if (process.env.NODE_ENV == 'development') {
    mb.window.openDevTools()
  }
  console.log('window is loaded')
})
