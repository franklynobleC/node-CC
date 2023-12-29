const { Writable } = require('node:stream')

const fs = require('node:fs')

class FileWritableStream extends Writable {
  constructor ({ highWaterMark, fileName }) {
    super({ highWaterMark })

    this.fileName = fileName
    this.fd = null
  }

  /// This will run  after  the Constructor , and  it will  put  of  calling all  the Other Methods
  //until we call  the CallBack function
  _construct (callback) {
    fs.open(this.fileName, 'w', (err, fd) => {
      if (err) {
        //so if  we call  the callBack with an argument, it means that we have an error
        //and we should  not proceed
        callback(err)
      } else {
        this.fd = fd
        //No Argument,  means  it was successful
        callback()
      }
    })
  }

  _write(chunk, encoding, callBack) {
    console.log(this.fd)
    // do our write Operation

    // when we are done, we should call the callback function
    callBack()
  }
}
