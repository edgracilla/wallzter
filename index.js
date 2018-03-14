'use strict'

const _ = require('lodash')

const Runner = require('./lib/runner')

module.exports.test = (options) => {
  let runner = new Runner()

  return runner.validate(options)
    .then(errors => {
      if (!_.isEmpty(errors)) {
        errors.map(err => {
          console.log(err)
        })
      }

      // return runner.run()
    })
}
