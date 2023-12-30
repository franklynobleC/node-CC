const { Duplex } = require('node:stream')
const fs = require('node:fs')

class DuplexStream extends Duplex {
  constructor ({
    writableHighWaterMark,
    readableHighWaterMark,
    readFileName,
    writeFileName
  }) {
    super({ readableHighWaterMark, writableHighWaterMark })
    this.readFileName = readFileName
    this.writeFileName = writeFileName
    this.readFd = null
    this.writeFd = null
    this.chunks = []
    this.chunksSize = 0
  }

  _construct (callback) {
    fs.open(this.readFileName, 'r', (err, readFd) => {
      this.readFd = readFd
      fs.open(this.writeFileName, 'w', (err, writeFd) => {
        if (err) return callback(err)
        this.writeFd = writeFd
        callback()
      })
    })
  }

  _write (chunk, encoding, callback) {
    this.chunks.push(chunk)
    this.chunksSize += chunk.length

    if (this.chunksSize > this.writableHighWaterMark) {
      write(this.find, Buffer.concat(this.chunks), err => {
        if (err) {
          return callback(err)
        }
        this.chunks = []
        this.chunksSize = 0

        callback()
      })
    } else {
      //when we are done,  we should  call  the callback function
      callback()
    }
  }

  _read (size) {
    // this.push(Buffer.from('string'))
    //"size" indicates  the Number Of Bytes  we  have  to read
    const buff = Buffer.alloc(size)
    fs.read(this.readFd, buff, 0, size, null, (err, bytesRead) => {
      if (err) return this.destroy(err)
      //this,  whatever  we  push  here would  be Added to  the  internal Buffer
      //null  is to  indicate The End Of The Streams
      this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null)
    })
  }
  _final (callback) {
    fs.write(this.writeFd, Buffer.concat(this.chunks), err => {
      if (err) return callback(err)
      this.chunks = []
      callback()
    })
  }
  _destroy (error, callback) {
    callback(error)
  }
}

const duplex = new DuplexStream({
  readFileName: 'read.txt',
  writeFileName: 'write.txt'
})

// write  to  the Buffer,  then  to File using      duplex
duplex.write(Buffer.from('this  is a string 0 \n'))
duplex.write(Buffer.from('this  is a string 1 \n'))
duplex.write(Buffer.from('this  is a string 2 \n'))
duplex.end('End  of  string')

//read from   file to Buffer  using Duplex

duplex.on('data', chunk => {
  console.log(chunk.toString('utf-8'))
})
