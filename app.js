'use strict'

require('bootstrap')
const moment = require('moment')
const Vue = require('vue')

const MAX_LENGTH = 250
const STORAGE_KEY = '__ST__'

/**
 * Returns a human-readable date string.
 */
Vue.filter('date', (value) => {
  return moment(value).calendar()
})

/**
 * The actual vue instance that is attached to the DOM at #app. 
 */
const app = new Vue({
  el: '#app',
  template: '#appTemplate',

  data: {
    content: '',
    entries: [],
    activeView: 'home',
    maxLength: MAX_LENGTH,
  },

  methods: {
    validate () {
      if (this.content.length === 0) {
        alert('Please enter content before saving.')
        return false
      }

      return true
    },

    save () {
      if (!this.validate()) return 

      this.entries.push({
        content: this.content,
        timestamp: new Date(),
      })

      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries))
      this.content = ''
    },

    load () {
      let json = localStorage.getItem(STORAGE_KEY)

      this.entries = json !== null 
        ? JSON.parse(json)
        : []
    },
  },

  ready () {
    this.load()
  }
})
