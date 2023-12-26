const { buffer, constants } = require('buffer')

// const bufferSize = Buffer.alloc(1e9) // 1,000,000,000 bytes (1GB)
const b = Buffer.alloc(0.5e8) // 500,000,000 bytes(500MB)
// const b = Buffer.alloc(0.5e9)

console.log(constants.MAX_LENGTH)
//use  set interVale,  run  this Code Every 5 Seconds
setInterval(() => {
  // for (let i = 0; i < b.length; i++) {
  //   // b.length is  the  size  of  buffer in  bytes
  //   b[i] = 0x22
  // }
  // another  method  to  fill  buffer  using  the value  passed   in  the fill Method
  b.fill(0x22)
}, 5000)
console.log(b.toString())
