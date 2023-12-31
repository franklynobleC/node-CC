const { Transform } = require('node:stream')
const fs = require('node:fs/promises')

class Decrypt extends Transform {
  _transform (chunk, encoding, callback) {
    // <35 -1, ff, a5 - 1, 12 -1, 23 -1...>
    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i] !== 255) {
        chunk[i] = chunk[i] - 1
      }
    }
    // this.push(chunk)
    //you can  use  callback  as well as  push(but callBack  is preferred)
    callback(null, chunk)
  }
}

// ;(async () => {
//   const readFileHandle = await fs.open('read.txt', 'r')
//   const writeFileHandle = await fs.open('write.txt', 'w')

//   const readStream = readFileHandle.createReadStream()
//   const writeStream = writeFileHandle.createWriteStream()

//   const encrypt = new Encrypt()

//   //pipe  through  read  stream  into  writeStream
//   readStream.pipe(encrypt).pipe(writeStream)
// })()

const streamData = async () => {
  const readFileHandle = await fs.open('encryptedFile.txt', 'r')
  const writeFileHandle = await fs.open('decrypted.txt', 'w')

  const readStream = readFileHandle.createReadStream()
  const writeStream = writeFileHandle.createWriteStream()

  const decrypt = new Decrypt()

  //pipe  through  read  stream  into  writeStream
  readStream.pipe(decrypt).pipe(writeStream)
}

streamData()
