const { Transform } = require('node:stream')
const fs = require('node:fs/promises')

class Decrypt extends Transform {
  constructor (fileTotalSizeInBytes) {
    super()
    this.Counter = 0
    this.TotalBytesRead = null
    this.fileTotalSizeInBytes = fileTotalSizeInBytes
  }
  _transform (chunk, encoding, callback) {

    // <35 -1, ff, a5 - 1, 12 -1, 23 -1...>
    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i] !== 255) {
        chunk[i] = chunk[i] - 1

        this.TotalBytesRead += chunk.length
        this.Counter -= 1
        // console.log('counter  is', this.Counter)
        // this  code  would  run  gradually  Every  5th time time to gradually  give count  in percentage
        if (this.Counter % 5 === 0) {
          console.log('counter  count  is  5th', this.Counter)

          let percent = (this.fileTotalSizeInBytes / this.TotalBytesRead) * 100
          console.log(

            'percentage after floor',
            Math.round(percent)
          )
          if (this.Counter === -5) {
            console.log(this.Counter, ' decrypting file......60%')
          }
          if (this.Counter === -10) {
            console.log(this.Counter, ' decrypting file......70%')
          }
          if (this.Counter === -15) {
            console.log(this.Counter, ' decrypting file..... 89%')
          }
          if (this.Counter === -25) {
            console.log(this.Counter, ' decrypting file......100%')
          }
        }

        // this.TotalBytesRead += chunk.length
      }
      console.log('total Bytes read', this.TotalBytesRead)
    }

    // this.push(chunk)

    // let dataP = (this.TotalBytesRead / totalFileSize) * 100

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
// const percentResult = (bytesRead / totalfileSize) * 100
//   //pipe  through  read  stream  into  writeStream

const streamData = async () => {
  const readFileHandle = await fs.open('encryptedFile.txt', 'r')
  const writeFileHandle = await fs.open('decrypted.txt', 'w')

  const st = await fs.statfs('encryptedFile.txt')

  console.log('Blocks  size')
  const fileTotalSizeInBytes = st.bsize

  console.log('file  in  bytes', fileTotalSizeInBytes)

  const readStream = readFileHandle.createReadStream()
  const writeStream = writeFileHandle.createWriteStream()

  const decrypt = new Decrypt()
  console.log('totalBytes  Read  is', decrypt.TotalBytesRead)

  decrypt.fileTotalSizeInBytes = fileTotalSizeInBytes
  // console.log('total file size', decrypt.totalFileSize)

  // let dataP = (decrypt.TotalBytesRead / fileTotalSizeInBytes) * 100

  //pipe  through  read  stream  into  writeStream
  readStream.pipe(decrypt).pipe(writeStream)
}

streamData()
