const { Readable } = require('node:stream')
const fs = require('node:fs')

//**When Implementing  the Writable Streams, you have to Implement  a  write Method */
//**When Implementing  the Readable Streams, you have to Implement  a  read Method */
class FileReadStream extends Readable {
  constructor ({ highWaterMark, fileName }) {
    super({ highWaterMark })
    this.fileName = fileName
    this.fd = null
  }

  _construct (callback) {
    fs.open(this.fileName, 'r', (err, fd) => {
      if (err) return callback(err)
      this.fd = fd
      //here  you  must call  the CallBack function, else  there would  be an Error
      callback()
    })
  }
  _read (size) {
    // this.push(Buffer.from('string'))
    //"size" indicates  the Number Of Bytes  we  have  to read
    const buff = Buffer.alloc(size)
    fs.read(this.fd, buff, 0, size, null, (err, bytesRead) => {
      if (err) return this.destroy(err)
      //this,  whatever  we  push  here would  be Added to  the  internal Buffer
      //null  is to  indicate The End Of The Streams
      this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null)
    })
  }
  _destroy (error, callback) {
    if (this.fd) {
      fs.close(this.fd, err => callback(err || error))
    } else {
      callback(error)
    }
  }
}

const streamRead = new FileReadStream({ fileName: 'text.txt' })

//Adding  the Data Event would Enable use  to Get The    Data from  the Stream,  when  the Data event is called  on  the Stream
streamRead.on('data', chunk => {
  console.log(chunk.toString('utf-8'))
})

//
/* The code `streamRead.on('end', () => { console.log('this indicates, Data is done reading') })` is
adding an event listener to the `streamRead` object. */
streamRead.on('end', () => {
  console.log('this indicates,  Data  is done reading')
})
