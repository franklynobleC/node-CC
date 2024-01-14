const net = require('net')

const socket = net.createConnection({ host: 'localhost', port: 8050 }, () => {
  // from  the  buffer  pass the
  // hex to be interpreted as zeros and  ones
  // const head = Buffer.from()

  //take  this value, convert  it  to zeros and  Ones  using Hex
  const header = Buffer.from(
    '504f5354202f6372656174652d706f737420485454502f312e310d0a436f6e74656e742d547970653a206170706c69636174696f6e2f6a736f6e0d0a6e616d653a204a6f650d0a486f73743a206c6f63616c686f73743a383035300d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a436f6e74656e742d4c656e6774683a2037340d0a0d0a',
    'hex'
  )

  // req[0] = 12
  // req[1] = 34
  const body = Buffer.from(
    '7b226d657373616765223a22506f73742077697468207469746c65205469746c65206f66206d7920706f7374207761732063726561746564206279204a6f65227d',
    'hex'
  )

  //concat  Both and Send as  one Stream
  socket.write(Buffer.concat([header, body]))
  // socket.write(Buffer.concat([head, body]))
})

socket.on('data', chunk => {
  console.log('Received Response')
  console.log(chunk.toString('utf-8'))
  // console.log(chunk.toString('hex'))
  socket.end()
})

socket.on('end', () => {
  console.log('connection closed.')
})
