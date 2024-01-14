const http = require('node:http')
const fs = require('node:fs/promises')
class Butter {
  /**
 *
 {
 "get/": () => {...},
 "post/upload": () => {...}
 }
 * @memberof Butter
 this.routes['get/']()
*
 */
  constructor () {
    this.server = http.createServer()
    this.routes = {}

    this.server.on('request', (req, res) => {
      //send a file back to  the client
      res.sendFile = async (path, mime) => {
        const fileHandle = await fs.open(path, 'r')
        const fileStream = fileHandle.createReadStream()

        res.setHeader('Content-Type', mime)

        //pipe  to  stream to response
        fileStream.pipe(res)
      }
      this.routes[req.method.toLocaleLowerCase() + req.url](req, res)
    })
  }

  route (method, path, cb) {
    this.routes[method + path] = cb
  }

  listen = (port, cb) => {
    this.server.listen(port, () => {
      console.log('callback called..., from  callback  listen')
      cb()
    })
  }
}

module.exports = Butter
