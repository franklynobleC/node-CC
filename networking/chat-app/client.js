const net = require('net')
const readline = require('readline/promises')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const clearLine = dir => {
  //create and  return  new  Promise
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve()
    })
  })
}
const movCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve()
    })
  })
}

let id
//create connection  to  a  client
const socket = net.createConnection(
  { host: '127.0.0.1', port: 3008 },
  async () => {
    console.log('connected to  the  Server!')
    const ask = async () => {
      const message = await rl.question('Enter a  message > ')
      await movCursor(0, -1)
      //clear the  current  line  that  the cursor  is  in
      await clearLine(0)
      socket.write(`${id}-message-${message}`)
    }
    ask()
    // listen  on  the data written from  server and    display from  on  client
    socket.on('data', async data => {
      //when  we  are Getting a message
      // console.log(data.toString('utf-8'))
      console.log()
      //move  the cursor one  line  up
      await movCursor(0, -1)

      //clear  that   line  that  cursor just moved into
      await clearLine(0)

      if (data.toString('utf-8').substring(0, 2) === 'id') {
        //when  we  are  getting  the  Id ...

        id = data.toString('utf-8').substring(3) //everything  from  the  third character  up  until the end

        console.log(`Your  id  is ${id}!\n`)
      } else {
        console.log(data.toString('utf-8'))
      }

      ask()
    })
  }
)
socket.on('close', () => {
  console.log('Closed')
})

socket.on('end', () => {
  console.log('Connection')
})
