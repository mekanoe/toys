const https = require('https')
const devcert = require('devcert')
const next = require('next')

async function main () {
  const crt = await devcert.certificateFor('10.10.1.10')

  const app = next({ dev: true })
  await app.prepare()

  const s = https.createServer(crt, app.getRequestHandler())
  s.listen(8443)
}

main()
