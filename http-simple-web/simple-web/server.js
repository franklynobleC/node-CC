const Butter = require('./butter')

const PORT = 4060

const server = new Butter()
server.listen(PORT, () => {
  console.log(`server has  started   on  port  ${PORT}`)
})
