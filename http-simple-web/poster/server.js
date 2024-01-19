const Butter = require('../butter')

//sample Object in  this  array would  look  like

//{userId:1, token:234439}
const SESSIONS = []

const USERS = [
  { id: 1, name: 'Liam', username: 'liamBrown', password: 'data1' },
  {
    id: 2,
    name: 'MerediTh Green',
    username: 'Marquee sky',
    password: 'string'
  },
  { id: 3, name: 'Ben', username: 'Ben.poet', password: 'data1' }
]

const POSTS = [
  {
    id: 1,
    title: 'This is A Post',
    body: 'sit amet consectetur adipisicing elit.Blanditiis temporibus totam doloremque quaerat ut, explicabo ex at itaquetenetur aperiam illo! Atque temporibus quam doloremque excepturi repellat modi',
    userId: 1
  }
]

const PORT = 8000

const server = new Butter()

//----Files Routes -----//
//**

server.route('get', '/', (req, resp) => {
  resp.sendFile('./public/index.html', 'text/html')
})
server.route('get', '/login', (req, resp) => {
  resp.sendFile('./public/index.html', 'text/html')
})
server.route('get', '/profile', (req, resp) => {
  resp.sendFile('./public/index.html', 'text/html')
})
server.route('get', '/styles.css', (req, resp) => {
  resp.sendFile('./public/styles.css', 'text/css')
})
server.route('get', '/scripts.js', (req, resp) => {
  resp.sendFile('./public/scripts.js', 'text/javascript')
})
//----JSON Routes -----//

server.route('post', '/api/login', (req, res) => {
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString('utf-8')
  })

  req.on('end', () => {
    //user JSON  parser to  convert Body To JSON
    body = JSON.parse(body)

    const username = body.username
    const password = body.password

    //Check  if  the User exists
    const user = USERS.find(user => user.username === username)
    //Check the  password if  the user was  found
    if (user && user.password === password) {
      //At  this  Point, We Know That  the Client is  how  they say  they are

      // Generate a random,  10 digit token

      const token = Math.floor(Math.random() * 10000000000).toString()

      //Save     the generated token
      SESSIONS.push({ userId: user.id, token: token })
      res.setHeader('Set-Cookie', `token=${token}; Path=/;`)
      res.status(200).json({ message: 'Logged in successful!' })
    } else {
      res.status(401).json({ error: 'Invalid username of  password' })
    }
  })
})

server.route('get', '/api/user', (req, res) => {
  // console.log(req.headers.cookie.split())
  const token = req.headers.cookie.split('=')[1]

  console.log('splitted Data', token)

  const session = SESSIONS.find(session => session.token === token)
  console.log('after sessions', session)
  if (session) {
    //send  the  user's  profile info
    console.log('Sending user  info ...')
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
})

server.route('get', '/api/posts', (req, resp) => {
  const posts = POSTS.map(post => {
    const user = USERS.find(user => user.id === post.userId)

    post.author = user.name
    return post
  })
  resp.status(200).json(posts)
})

server.listen(PORT, () => {
  console.log('Server has  started on  port: ' + PORT)
})
