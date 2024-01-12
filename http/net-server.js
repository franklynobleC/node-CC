const net = require('net')

const server = net.createServer(socket => {
  socket.on('data', data => {
    console.log(data.toString('utf-8'))
  })
  const response = Buffer.from(
    '7b226d657373616765223a22506f73742077697468207469746c65205469746c65206f66206d7920706f7374207761732063726561746564206279204a6f65227d',
    'hex'
    )
    socket.write(response)
  })
server.listen(8000,'127.0.0.1', () => {
  console.log('server  is started on', server.address())
})
