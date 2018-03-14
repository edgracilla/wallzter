'use strict'

const VERBS = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE']

const _ = require('lodash')
const BPromise = require('bluebird')

class Runner {
  validate (options) {
    this.baseUrl = options.baseUrl || 'http://localhost'
    this.targets = options.targets

    let errBag = []

    return BPromise.each(options.targets, (target, i) => {
      if (_.isEmpty(target.endpoint)) {
        errBag.push(`'targets[${i}].endpoint' is required. value: '${target.endpoint}'`)
      }

      if (_.isEmpty(target.collection)) {
        errBag.push(`'targets[${i}].collection' is required. value: '${target.collection}'`)
      }

      if (!Array.isArray(target.verbs)) {
        errBag.push(`'targets[${i}].verbs' is not an array. value: '${target.collection}'`)
      } else {
        if (!target.verbs.length) {
          target.verbs = VERBS
        } else {
          target.verbs.map((verb, j) => {
            if (!VERBS.includes(verb)) {
              errBag.push(`'targets[${i}].verbs[${j}]' is not a valid http verb. value: '${verb}'`)
            }
          })
        }
      }
    }).then(() => {
      return BPromise.resolve(errBag)
    })
  }

  run () {
    console.log('ok!')
  }
}

module.exports = Runner