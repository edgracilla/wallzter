'use strict'

const _ = require('lodash')

class Payloads {
  constructor (model) {
    let schema = _.get(model, 'schema.obj')

    if (!_.isObject(schema)) {
      throw new Error('A valid mongoose model is required in wall payload.')
    }

    this.schema = schema
  }

  gen (type) {
    switch (type) {
      
    }
  }
}

module.exports = Payloads