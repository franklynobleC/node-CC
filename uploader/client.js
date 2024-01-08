const net = require('net')
const fs = require('node:fs/promises')

const path = require('node:path')

const clearLine = dir => {
  //create and  return  new  Promise
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve()
    })
  })
}
const movCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve()
    })
  })
}

const socket = net.createConnection({ host: '::1', port: 5050 }, async () => {
  const filePath = process.argv[2]

  const fileName = path.basename(filePath)

  const fileHandle = await fs.open(filePath, 'r')
  const fileStream = fileHandle.createReadStream() // the  stream to read from

  //get the actual  file Size

  const fileSize = (await fileHandle.stat()).size

  console.log('file Size', fileSize)

  //for  showing  the    upload  progress
  let uploadedPercentage = 0
  let bytesUploaded = 0
  //fileName to  the socket
  /**socket  write  would  read  all  the data from  the apcket  starting  from  `fileName: the actual ${fileName}` */
  socket.write(`fileName: ${fileName}-------`)
  //Reading  from  the  source file

  console.log() //       to  get  a  nice  for  the    progress percentage

  fileStream.on('data', async data => {
    //  if  the file  is  data  has  filled  the  internal  Buffer,  pause,  then  move On To Drain, from  the internal  buFfer then Come back To  continue
    if (!socket.write(data)) {
      fileStream.pause()
    }
    bytesUploaded += data.length //add  the  number  of  bytes read   to  the variable
    const newPercentage = Math.floor((bytesUploaded / fileSize) * 100)
    //newPercentage % 5 === 0 &&
    if (newPercentage !== uploadedPercentage) {
      uploadedPercentage = newPercentage
      await movCursor(0, -1)
      await clearLine(0)
      console.log(`uploading.... ${uploadedPercentage}%`)
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
