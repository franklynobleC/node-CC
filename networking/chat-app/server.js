const net = require('net')
const server = net.createServer()

// an  array  of client   sockets

const clients = []

//server  would  be  connected,  on Event Name   "connection"
//socket  Object callback would  be  implemented
server.on('connection', socket => {
  //when ever  user is connected, create  id, get  the  length of  clients Array and assign them  the number
  console.log('A new connection to the server')

  const clientId = clients.length + 1

  clients.map(client => {
    client.socket.write(`User ${clientId} Joined!`)
  })



  socket.write(`id-${clientId}`)

  socket.on('data', data => {
    //write from server
    const dataString = data.toString('utf-8')
    //get  data  from  the  beginning  to   where character  appears   '-'
    const id = dataString.substring(0, dataString.indexOf('-'))
    const message = dataString.substring(dataString.indexOf('-message-') + 9)

    // loop  through  the  lists  of Sockets and sending  the  message  to  every single connection  that's  connected to  server
    //whenever  a  new connection  is  made,  push  something  into  the clientsArray
    clients.map(client => {
      // s.write(data)
      client.socket.write(`> User ${id}: ${message}`)
    })
  })

  //
  socket.on('close', () => {
    clients.map(client => {
      client.socket.write(`User   ${clientId} left!`)
    })
  })
  clients.push({ id: clientId.toString(), socket })
})

server.listen(3008, '127.0.0.1', () => {
  console.log('Server is running', server.address())
})
