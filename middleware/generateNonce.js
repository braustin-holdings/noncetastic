// generates a NONCE for our CSP script-src and injects it into the GTML script in our html
const path = require('path')
const { randomBytes } = require('crypto')
const { readFileSync } = require('fs')

module.exports = function(req, res, next) {
  if (req.url === '/') {
    const nonce = randomBytes(16).toString('hex')
    req.nonce = `'nonce-${nonce}'`
    try {
      const encoding = 'utf-8'
      const htmlPath = path.join(__dirname, '..', "index.html")
      let html = readFileSync(htmlPath, encoding)
      html = html.replace(/<script/g, `<script nonce="${nonce}"`)
      req.indexHTML = html
    } catch(err) {
      console.log(err)
    }
  }
  next() 
}