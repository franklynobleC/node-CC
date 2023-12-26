//0100 1000 0110 1001 0010 0001
//my Solution
const { buffer } = require('buffer')

const bufferContainer = Buffer.alloc(3) // we  have  24 bits exactly . so   24 bits/8  is equal to  3 bytes

bufferContainer[0] = 0x48
bufferContainer[1] = 0x69
bufferContainer[2] = 0x21

console.log(bufferContainer)

let result = bufferContainer.toString('utf-8')
console.log(result)

//lectures Solution

//this would automatically allocate  memory as  much as  you need to  for storage
const buff = Buffer.from([0x48, 0x69, 0x21])
//OR
const buff1 = Buffer.from("486921",'hex')
const buff2 = Buffer.from("Hi!", 'utf-8')
console.log(buff2.toString('utf-8')) // from    character to  buffer hexd

console.log(buff.toString('utf-8'))
console.log(buff1.toString('utf-8'))
