const path = require('path')
const express = require('express')
const helmet = require('helmet')
const generateNonce = require('./middleware/generateNonce')

const PORT = process.env.PORT || 3001

require('express')()
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(generateNonce)
  .use((req, res, next) => {
    const options = {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          // "default-src": [
          //   "'self'",
          //   "https://cdn.plaid.com",
          // ],
          // "connect-src": [
          //   "'self'", 
          //   "https://www.google.com", 
          //   "https://www.googleapis.com",
          //   "https://securetoken.googleapis.com"
          // ],
          "script-src": [
            "'self'",
          ],
        },
      },
    }

    !!req.nonce && options.contentSecurityPolicy.directives['script-src'].push(req.nonce)
    
    helmet(options)(req, res, next)
  })  
  .get("*", (req, res) => {

    console.log(req.indexHTML)

    req.indexHTML 
      ? res.send(req.indexHTML) 
      : res.sendFile(path.join(__dirname, "index.html"))
  })
  .listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

  