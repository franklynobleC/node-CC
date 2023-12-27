const fs = require('node:fs')
require('buffer')
const { performance } = require('node:perf_hooks')
const fileStream = fs.createWriteStream('testfile.txt')

//Execution  Time:  1.18s
//CPU   usage: 100% (One Core)
const writeData = async () => {
  console.time('writeMany')
  // const fileStream = fs.createWriteStream('testfile.txt')
  // try {
  //   for (let i = 0; i <= 1000000; i++) {
  // const buff = Buffer.from(i.toString() + ' ', 'utf-8')
  console.log(fileStream.writableHighWaterMark)
  console.log(fileStream.writableLength)
  //8 bits (each  bit,  is  either a 1 0r  0 (binary)) = 1 byte
  //1000 bytes =1 kilobyte
  //1000 kilobytes = i megabyte

  //10*8 (ten  to  the  power  of  8)

  // 1a => 0001 1010
  //whenEver  you  are creating a  Buffer,  you are Allocating  some Amount of  your Memory(Hardware Memory) to That Buffer
  // const buff = Buffer.alloc(16383, 'A')
  // // console.log(buff)
  // console.log(fileStream.write(buff))
  // console.log(fileStream.write(Buffer.alloc(2, 'a')))
  //**train  Event  is called  when  the  the Buffer  is  full and  is emptied */
  // fileStream.on('drain', () => {
  //   console.log(fileStream.write(Buffer.alloc(1, 'a')))
  //   console.log(fileStream.writableLength)

  //   console.log(' now safe to  write More')
  // })
  // setInterval(() => {}, 1000)
  //     await fileStream.write(buff, error => {
  //       if (error) {
  //         console.log('error has  occurred', error)
  //       }
  //     })

  //     if (i === 1000000) {
  //       fileStream.end()
  //       return
  //     }
  //   }
  // } catch (error) {
  //   console.log('error', error)
  // }
  // fileStream.close()
  console.timeEnd('writeMany')
}

const benChmarkWriteData = async () => {
  const startTime = performance.now()
  await writeData()
  const endTime = performance.now()
  let executionTime = endTime - startTime

  console.log(`time taken to write data is : ${executionTime} milliseconds`)
  const timeInSeconds = executionTime / 1000

  console.log(`benchMark  is ${timeInSeconds} seconds`)
}

benChmarkWriteData()
let i = 0
const writeMany = () => {
  while (i < 100000) {
    const buf = Buffer.from(` ${i}`, 'utf-8')

    //if  is  our  last write
    if (i === 999999) {
      return fileStream.end(buf)
    }
    i++
    //if   fileStream returns  false,  stop  the  loop
    if (!fileStream.write(buf)) break
  }
}
writeMany()
console.log('writable Length', fileStream.writableLength)

//resume the  loop  once  the  fileStream's internal  buffer  is  emptied
fileStream.on('drain', () => {
  console.log('Drained!')
  writeMany()
})

fileStream.on('finish', () => {
  console.log('writeMany finished')
  console.time('writeMany')
  fileStream.close()
})
