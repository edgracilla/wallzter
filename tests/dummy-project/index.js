const wallzter = require('./index')

// glob
// wallzter.test

let options = {
  baseUrl: 'http://localhost:8080',
  targets: [
    {
      endpoint: '/roles',
      collection: 'roles',
      verbs: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'], // default all
    }
  ]
}

wallzter.test(options).then(() => {
  // done
}).catch(err => {
  console.error(err)
})