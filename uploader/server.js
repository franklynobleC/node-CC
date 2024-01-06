const net = require('net')

const fs = require('node:fs/promises')

const server = net.createServer(() => {})

let fileHandle, fileStream
server.on('connection', async socket => {
  console.log('New connection!')

  socket.on('data', async data => {
    fileHandle = await fs.open(`storage/test.txt`, 'w')
    fileStream = fileHandle.createWriteStream()

    ///writing  to  our Destination  file
    fileHandle.write(data)
  })

  socket.on('end', () => {
    console.log('Connection  ended!')
    fileHandle.close()
  })
})

server.listen(5050, '::1', () => {
  console.log('Uploader Server is opened On Address 5050!', server.address())
})
