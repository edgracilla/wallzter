'use strict'

const _ = require('lodash')
const mongoose = require('mongoose')

const Runner = require('./lib/runner')

module.exports.test = (options) => {
  let runner = new Runner()

  return runner.validate(options)
    .then(errors => {
      if (!_.isEmpty(errors)) {
        errors.map(err => {
          console.log(err)
        })

        return Promise.resolve()
      }

      return runner.run()
    })
}
