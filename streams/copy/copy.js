const { read } = require('node:fs')
const fs = require('node:fs/promises')
const { pipeline } = require('node:stream')

//***COPY  THAT  IS  NOT EFFICIENT */
//File size Copied  1 GB(if  using the  file Gigantic)
//Memory   Usage: 30 MB
//Execution   Time: 2s
const dataCopy = async () => {
  const destFile = await fs.open('text-data.txt')
  const result = fs.open('text-copy.txt')

  await destFile.write(result)
}

//file size       Copied 1 GB
// Memory Usage: 30MB
//Execution  Time: 2s
dataCopy = async () => {
  const srcFile = await fs.open('text-data.txt', 'r')

  const destFile = await fs.open('text-copy.txt', 'w')
  let byteRead = -1
  while (byteRead !== 0) {
    const readResult = await srcFile.read()
    byteRead = readResult.bytesRead

    if (byteRead !== 16384) {
      const indexOfNotFilled = readResult.buffer.indexOf(0)
      const newBuffer = Buffer.alloc(indexOfNotFilled)
      readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled)
      await destFile.write(newBuffer)
    } else {
      destFile.writeFile(readResult.buffer)
    }
    console.log(byteRead)
  }
}

//*** USE piping */
const copyUsingPipe = async () => {
  const srcFile = await fs.open('text-data.txt', 'r')
  const destFile = await fs.open('text-copy.txt', 'w')

  const readStream = srcFile.createReadStream()
  const writeStream = destFile.createWriteStream()

  // console.log(readStream.readableFlowing)
  // srcFile.pipe(destFile)

  // readStream.pipe(writeStream)
  // console.log(readStream.readableFlowing)

  // readStream.unpipe(writeStream)
  //File size Copied
  //**In production,  using  Pipeline  is  preferred as  it does not allow memory */
  pipeline(readStream, writeStream, error => {
    console.log(error)
  })
}

//**Using PipeLine */

dataCopy()
