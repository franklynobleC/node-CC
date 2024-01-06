const dns = require('node:dns/promises')

const lookDns = async () => {
  const result = await dns.lookup('google.com')

  console.log(result)
}

lookDns()
