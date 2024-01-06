const net = require('net')

const fs = require('node:fs/promises')

const socket = net.createConnection({ host: '::1', port: 5050 }, async () => {
  const filePath = './test.txt'

  const fileHandle = await fs.open(filePath, 'r')
  const fileStream = fileHandle.createReadStream()

  //Reading  from  the  source file

  fileStream.on('data', data => {
    socket.write(data)
  })

  //if  the file  is  successfully Uploaded,  this  Event would  kick  in
  fileStream.on('end', () => {
    console.log('The file was Successfully  uploaded')
    socket.end()
  })
})
