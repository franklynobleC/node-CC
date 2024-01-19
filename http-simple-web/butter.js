const http = require('node:http')
const fs = require('node:fs/promises')
class Butter {
  /**
 *
 {
 "get/": () => {...},
 "post/upload": () => {...}
 }
//  *
// @memberof Butter
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

      //set the Status Code Of the Response
      res.status = code => {
        res.statusCode =  code
        return res
      }

      //set content Type and Return, and  send JSON Data
      //Send    a json Data   back to The Client    (for small,  json  data, less than  the HighWaterMark Value(highwaterMark Value:  is The Size Of The Stream))
      res.json = data => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(data))
      }

      //        if  the routes Object does  not  have a key  of  req.method     + req.url, return  404

      if (!this.routes[req.method.toLocaleLowerCase() + req.url]) {
        return res
          .status(404)
          .json({ error: `Cannot  ${req.method}  ${req.url}` })
      }

      //else  return  this
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
