'use strict'

const _ = require('lodash')
const BPromise = require('bluebird')
const axios = require('axios')
const supertest = require('supertest')

class Jobs {
  constructor (baseUrl, token, options) {
    this.baseUrl = baseUrl
    this.request = supertest(baseUrl)

    this.endpoint = options.endpoint
    this.model = options.model
    this.rules = options.rules

    this.verbs = options.verbs
    this.verbCodes = options.verbCodes || {
      post: 201, get: 200, put: 200, patch: 200, delete: 204
    }

    // this.config = {
    //   headers: {
    //     // 'Accept': 'application/json',
    //     // 'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`
    //   }
    // }


    this.config = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  run () {
    let schema = _.get(this.model, 'schema.obj')

    return BPromise.resolve().then(() => {
      if (!this.verbs.includes('POST')) return BPromise.resolve()

      return this.post()
    }).then(ret => {
      // console.log('--b', ret)
      return BPromise.resolve()
    })
  }

  post () {
    // return axios.post(`${this.baseUrl}${this.endpoint}`, {}, this.config).then(ret => {
    //   console.log(ret.status)
    //   return BPromise.resolve()
    // })

    return this.request
      .post(this.endpoint)
      .set(this.config)
      .send({})
      .then(ret => {
        console.log(ret.body)
        return BPromise.resolve()
      })
  }
}

module.exports = Jobs
