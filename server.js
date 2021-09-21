const path = require('path')
const express = require('express')
const helmet = require('helmet')

const PORT = process.env.PORT || 3001

require('express')()
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  // .use((req, res, next) => {
  //   const options = {
  //     contentSecurityPolicy: {
  //       useDefaults: true,
  //       directives: {
  //         "default-src": [
  //           "'self'",
  //           "https://cdn.plaid.com",
  //         ],
  //         "connect-src": [
  //           "'self'", 
  //           "https://www.google.com", 
  //           "https://www.googleapis.com",
  //           "https://securetoken.googleapis.com"
  //         ],
  //         "script-src": [
  //           "'self'", 
  //           process.env.HEROKU_APP_URL,
  //           "https://cdn.plaid.com",
  //           "https://www.google.com",
  //           "https://www.googleapis.com",
  //           "https://www.clarity.ms",
  //           "https://www.googletagmanager.com",
  //           "https://securetoken.googleapis.com",
  //         ],
  //         "img-src": [
  //           "'self'",
  //           "https://www.googletagmanager.com",
  //         ],
  //       },
  //     },
  //   }

  //   // !!req.nonce && options.contentSecurityPolicy.directives['script-src'].push(req.nonce)
    
  //   helmet(options)(req, res, next)
  // })  
  .get("*", (req, res) => {
    res.indexHTML 
      ? res.send(res.indexHTML) 
      : res.sendFile(path.join(__dirname, "index.html"))
  })
  .listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))

  