'use strict'

global.Promise = require('bluebird')

const _ = require('lodash')
const path = require('path')
const should = require('should')

const mongoose = require('mongoose')
const Payloads = require('./wall-payloads')

let home = __dirname.replace('-api\\tests', '')
let collectionName = path.basename(home)
let resource = collectionName.replace(/s$/, '')
let modelName = _.startCase(resource)

let token
let payloads

describe(`## ${modelName} Test ##`, function () {
  before(function (done) {
    this.timeout(10000)

    Promise.props({
      env: require('../main'),
      token: require('./auth').getToken(`${collectionName}`, 'admin')
    }).then(result => {
      token = result.token
      payloads = new Payloads(mongoose.model(modelName))
      done()
    }).catch(done)
  })


  it('should wall test', function (done) {
    this.timeout(5000)
    done()

//     let options = {
//       token,
//       baseUrl: 'http://localhost:8080',
//       jobs: [
//         {
//           endpoint: '/',
//           model: mongoose.model(_.startCase(RESOURCE_NAME)),
//           verbs: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
//           rules: {
//           }
//         }
//       ]
//     }

//     wallzter.test(options).then(() => {
//       console.log('done walls!')
//       done()
//     }).catch(err => {
//       console.error(err.message)
//     })
  })
})