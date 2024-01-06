const net = require('net')

const fs = require('node:fs/promises')
const path = require('path')

const server = net.createServer(() => {})

let fileHandle, fileStream
server.on('connection', async socket => {
  console.log('New connection!')

  socket.on('data', async data => {
    if (!fileHandle) {
      socket.pause() // pause  receiving  data from  the client, if  handle  is  not  yet  created
      /* The line `const indexOfDivide = data.indexOf('-------')` is finding the index of the string
`'-------'` within the `data` variable. It is used to check if the received data contains the
delimiter `'-------'`. The purpose of this check is not clear from the provided code snippet, as it
is not used further. It might be used to determine a specific point in the data for some processing
or handling logic. */

      const indexOfDivide = data.indexOf('-------')

      const fileName = data.subarray(10, indexOfDivide).toString('utf-8')
      fileHandle = await fs.open(`storage/${fileName}`, 'w')
      fileStream = fileHandle.createWriteStream() // the  stream  to  write to

      //write to  our Destination  file
      // here  we a re writing  the entire file  with the headers


      fileHandle.write(data.subarray(indexOfDivide + 7))

      socket.resume() // resume  receiving  data from  the client
      fileStream.on('drain', () => {
        socket.resume()
      })
    } else {
      if (!fileStream.write(data)) {
        socket.pause()
      }
    }
  })

  socket.on('end', () => {
    console.log('Connection  ended!')
    if (fileHandle) fileHandle.close()
    fileHandle = undefined
    fileStream = undefined
    // fileHandle.close()
  })
})

server.listen(5050, '::1', () => {
  console.log('Uploader Server is opened On Address 5050!', server.address())
})
