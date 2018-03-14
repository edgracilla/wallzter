'use strict'

global.Promise = require('bluebird')

const RESOURCE_NAME = 'plugin'
const RESOURCE_NAME_PLURAL = 'plugins'

const _ = require('lodash')
const should = require('should')
const request = require('supertest')

const data = require('./data-samples')

const mongoose = require('mongoose')
const wallzter = require('../../../index')

let id
let app
let token

describe(`${_.startCase(RESOURCE_NAME)} - wall test`, function () {
  before(function (done) {
    this.timeout(5000)

    Promise.props({
      env: require('../main'),
      token: require('./auth').getToken(`${RESOURCE_NAME_PLURAL}`, 'admin')
    }).then(result => {
      token = result.token
      done()
    })
  })


  it('should wallterized', function (done) {
    this.timeout(5000)

    let options = {
      token,
      baseUrl: 'http://localhost:8080',
      jobs: [
        {
          endpoint: '/',
          model: mongoose.model(_.startCase(RESOURCE_NAME)),
          verbs: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
          rules: {
          }
        }
      ]
    }

    wallzter.test(options).then(() => {
      console.log('done walls!')
      done()
    }).catch(err => {
      console.error(err.message)
    })
  })
})