const fs = require('node:fs/promises')

const readFStream = async () => {
  let fileHandleRead = fs.open('testfile.txt', 'r')

  const dataStream = (await fileHandleRead).createReadStream()

  // ** fileHandleStream  call  the   event 'data' on  the  stream  to be able to region-break-inside:

  //NOTE: if 'data' event  is not called  on  the  stream,  it would  not read and  remain  on  pause Mode  **
  dataStream.on('data', chunk => {
    console.log('-----')
    console.log(chunk)
  })
}

readFStream()
