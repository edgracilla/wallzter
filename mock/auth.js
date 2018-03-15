'use strict'

const jwt = require('jsonwebtoken')
const sign = Promise.promisify(jwt.sign)
const Chance = require('chance')

const chance = new Chance()

let user = {
  '_id': '47a81195-c1a3-585f-a238-84a67d99f4f1',
  'name': 'Reekoh QA',
  'email': 'qa@reekoh.com',
  'account': '70db64c8-90ba-52ec-a4c4-bbc64ffd3f4e',
  'accountName': 'Reekoh',
  'role': 'ce9cfde8-3c67-543c-9fcc-028f097baa4e',
  'roleName': 'Admin',
  'lastIp': '10.240.0.15',
  'lastLogin': '2018-02-18T05:10:21.269Z',
  'createdDate': '2017-11-09T06:24:49.480Z',
  'updatedDate': '2017-11-09T06:25:12.383Z'
}

exports.getUser = function (resource, permission) {
  user.permissions = {}
  user.permissions[resource] = permission

  return Promise.resolve(user)
}

exports.getToken = function (resource, permission) {
  user.permissions = {}
  user.permissions[resource] = permission

  return sign(user, Buffer.from(process.env.JWT_SECRET, 'base64'), {
    algorithm: 'HS512',
    expiresIn: '24h',
    audience: process.env.BASE_URL,
    issuer: 'https://reekoh.com',
    jwtid: chance.guid(),
    subject: user._id
  }).then(token => Promise.resolve(token))
}
