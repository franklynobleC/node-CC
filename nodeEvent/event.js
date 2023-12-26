const EventEmitter  =  require('events')
class myEmitter extends EventEmitter {}
const myE = new myEmitter()

myE.on('foo', () => {
  console.log('An Event occurred 1')
})

myE.on('foo', () => {
  console.log('An Event occurred 2')
})

myE.once('bar', () => {
  console.log('An Event occurred with Bar')

})
myE.emit('bar',)
myE.emit('bar',)
myE.emit('bar',)
myE.emit('bar',)
myE.emit('foo', "some text")
