const dgram = require('dgram')
const { Buffer } = require('buffer')
//max  size    9217 bytes

const sender = dgram.createSocket('udp4')
//you can  declare and  pass  this Data  using Buffer
// const message = Buffer.from('Hello Data test')
sender.send(
  'Test Corrected from Sender Data ',
  8080,
  '127.0.0.1',
  (error, bytes) => {
    // if (error) console.log(error)
    console.log(bytes)
  }
)

// const message = Buffer.from('Some bytes')
// const client = dgram.createSocket('udp4')
// client.connect(8000, 'localhost', err => {
//   client.send(message, err => {
//     client.close()
//   })
// })
