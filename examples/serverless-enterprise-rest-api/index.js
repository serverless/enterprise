const https = require('https')
const moment = require('moment')

/*
* Create User
*/

const createUser = (event, context, callback) => {

  const user = {
    userId: '123456',
    email: 'newuser@serverless.com'
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(user),
  })
}

/*
* List Users
*/

const listUsers = (event, context, callback) => {

  if (event['queryStringParameters'] && event['queryStringParameters']['error']) {
    let r = Math.random().toString(36).substring(7);
    throw new Error(`Random error ${r}`)
  }

  const users = [
    {
      userId: '111111',
      email: 'newuser1@yourapp.com'
    },
    {
      userId: '222222',
      email: 'newuser2@yourapp.com'
    }
  ]

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(users),
  })
}

/*
* Test Endpoint
*/

const testEndpoint = (event, context, callback) => {

  let url = process.env.url
  let format = 'hh:mm:ss'
  let time = moment()
  let beforeTime = moment('04:56:00', format)
  let afterTime = moment('05:00:00', format)

  if (time.isBetween(beforeTime, afterTime)) {
    url += `?error=true`
  }

  console.log('Testing URL: ', url)

  https.get(url, (resp) => {

    let data = ''

    resp.on('data', (chunk) => {
      data += chunk
    })

    resp.on('end', () => {
      console.log('Response: ', data)
      callback(null, 'success')
    })
  }).on("error", callback)
}

module.exports = {
  createUser,
  listUsers,
  testEndpoint,
}
