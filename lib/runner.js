'use strict'

const VERBS = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE']

const _ = require('lodash')
const BPromise = require('bluebird')

const Job = require('./jobs')

class Runner {
  validate (options) {
    this.baseUrl = options.baseUrl || 'http://localhost'
    this.token = options.token
    this.jobs = options.jobs

    let errBag = []

    return BPromise.each(options.jobs, (target, i) => {
      if (_.isEmpty(target.endpoint)) {
        errBag.push(`'jobs[${i}].endpoint' is required, got '${target.endpoint}'`)
      }

      if (_.isEmpty(target.model)) {
        errBag.push(`'jobs[${i}].model' is required, got '${target.model}'`)
      } else {
        if (!_.isObject(_.get(target.model, 'schema.obj'))) {
          errBag.push(`'jobs[${i}].model' - a valid mongoose model is required.`)
        }
      }

      if (!Array.isArray(target.verbs)) {
        errBag.push(`'jobs[${i}].verbs' is not an array, got '${target.verbs}'`)
      } else {
        if (!target.verbs.length) {
          target.verbs = VERBS
        } else {
          target.verbs.map((verb, j) => {
            if (!VERBS.includes(verb)) {
              errBag.push(`'jobs[${i}].verbs[${j}]' is not a valid http verb. value: '${verb}'`)
            }
          })
        }
      }
    }).then(() => {
      return BPromise.resolve(errBag)
    })
  }

  run () {
    return BPromise.each(this.jobs, jobDetails => {
      let job = new Job(this.baseUrl, this.token, jobDetails)

      return job.run()
    })
  }
}

module.exports = Runner
