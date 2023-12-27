const fs = require('node:fs/promises')

const readFStream = async () => {
  let fileHandleRead = fs.open('testfile.txt', 'r')
  const fileHandleWrite = fs.open('fileDest.txt', 'w')
  const dataStream = (await fileHandleRead).createReadStream({
    highWaterMark: 64 * 1024
  })
  let dataStreamWrite = (await fileHandleWrite).createWriteStream()

  // ** fileHandleStream  call  the   event 'data' on  the  stream  to be able to region-break-inside:
  let split = ''
  //NOTE: if 'data' event  is not called  on  the  stream,  it would  not read and  remain  on  pause Mode  **
  dataStream.on('data', async chunk => {
    console.log('-----')
    // console.log(chunk)
    const numbers = chunk.toString('utf-8').split(' ')
    if (Number(numbers[0]) !== Number(numbers[1]) - 1) {
      if (split) {
        numbers[0] = split + numbers[0]
      }
    }
    if (
      Number(numbers[numbers.length - 2]) + 1 !==
      Number(numbers[numbers.length - 1])
    ) {
      split = numbers.pop()
    }

    numbers.forEach(number => {
      //number is  coming in as String. convert to   Number
      let n = Number(number)
      if (n % 2 === 0) {
        if (!dataStreamWrite.write(' ' + n + ' ')) {
          dataStream.pause()
        }
      }
    })
    // console.log(numbers)
  })
  dataStreamWrite.on('drain', () => {
    dataStream.resume()
    // console.log('drained,  write complete')
  })
}

readFStream()
