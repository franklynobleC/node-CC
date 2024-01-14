const http = require('node:http')
const fs = require('node:fs/promises')

const server = http.createServer()

server.on('request', async (request, response) => {
  if (request.url === '/' && request.method === 'GET') {
    response.setHeader('Content-Type', 'text/html')

    const fileHandle = await fs.open('./public/index.html', 'r')
    const readFileStream = fileHandle.createReadStream()

    //read  from  read stream,  pipe  it and  send  it  to  the Client
    readFileStream.pipe(response)
    // response.write()
  }

  if (request.url === '/styles.css' && request.method === 'GET') {
    response.setHeader('Content-Type', 'text/css')

    const fileHandleStyles = await fs.open('./public/styles.css', 'r')
    const readFileStreamStyles = fileHandleStyles.createReadStream()

    //read  from  read stream,  pipe  it and  send  it  to  the Client
    //use  piping  to  handle  the  draining
    readFileStreamStyles.pipe(response)
    // response.write()
  }
  if (request.url === '/http/data-script.js' && request.method === 'GET') {
    response.setHeader('Content-Type', 'text/javascript')

    const fileHandleStyles = await fs.open('./../http/data-script.js', 'r')
    const readFileStreamStyles = fileHandleStyles.createReadStream()

    //read  from  read stream,  pipe  it and  send  it  to  the Client
    //use  piping  to  handle  the  draining
    readFileStreamStyles.pipe(response)
    // response.write()
  }
  if (request.url === '/login' && request.method === 'POST') {
    response.setHeader('Content-Type', 'application/json')
    response.statusCode = 200
    bodyResp = {
      messageD: 'User logging  in .....'
    }
    response.end(JSON.stringify({ message: bodyResp }))
  }
  if (request.url === '/user' && request.method === 'PUT') {
    response.setHeader('Content-Type', 'application/json')
    response.statusCode = 401
    bodyResp = {
      messageD: 'you first Have to Login .....'
    }
    response.end(JSON.stringify({ message: bodyResp }))
  }

  // upload  route
  if (request.url === '/upload?image' && request.method === 'POST') {
    const fileHandle = await fs.open('./storage/spices.jpg', 'w')
    const fileStream = fileHandle.createWriteStream()

    response.setHeader('Content-Type', 'application/json')
    request.pipe(fileStream)

    request.on('end', () => {
      response.end(JSON.stringify({ message: 'File SuccessFully Uploaded' }))
    })
  }
})

server.listen(8000, () => {
  console.log('address   Web Server is  live at http://localhost:8000')
})
