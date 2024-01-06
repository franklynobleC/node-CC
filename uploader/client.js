const net = require('net')
const fs = require('node:fs/promises')

const path = require('node:path')

const socket = net.createConnection({ host: '::1', port: 5050 }, async () => {
  const filePath = process.argv[2]
  console.log(process.argv)
  console.log('file  path', filePath)

  const fileName = path.basename(filePath)

  const fileHandle = await fs.open(filePath, 'r')
  const fileStream = fileHandle.createReadStream() // the  stream to read from

  //fileName to  the socket
  /**socket  write  would  read  all  the data from  the apcket  starting  from  `fileName: the actual ${fileName}` */
  socket.write(`fileName: ${fileName}-------`)
  //Reading  from  the  source file
  fileStream.on('data', data => {
    //  if  the file  is  data  has  filled  the  internal  Buffer,  pause,  then  move On To Drain, from  the internal  buFfer then Come back To  continue
    if (!socket.write(data)) {
      fileStream.pause()
    }
  })
  socket.on('drain', () => {
    fileStream.resume()
  })

  //if  the file  is  successfully Uploaded,  this  Event would   kick  in
  fileStream.on('end', () => {
    console.log('The file was Successfully  uploaded')
    socket.end()
  })
})
