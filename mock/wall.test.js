'use strict'

global.Promise = require('bluebird')

const _ = require('lodash')
const path = require('path')
const should = require('should')

const mongoose = require('mongoose')
const wallzter = require('../index')

// console.log(wallzter)

let home = __dirname.replace('-api\\wallzter\\mock', '')
let collectionName = path.basename(home)
let resource = collectionName.replace(/s$/, '')
let modelName = _.startCase(resource)

console.log(modelName)
// let token

describe(`## ${resource} --`, function () {
  before(function (done) {
    this.timeout(5000)

    Promise.props({
      env: require('../../main'),
      token: require('./auth').getToken(`${collectionName}`, 'admin')
    }).then(result => {
      console.log(result)
      token = result.token
      done()
    })
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