const { unlink, watch, open, mkdir } = require('fs/promises')

const { appendFile, fs, close, rename } = require('node:fs')

const testFile = async () => {
  const CREATE_FILE = 'create the file'
  const DELETE_FILE = 'delete the file'
  const RENAME_FILE = 'rename the file'
  const ADD_TO_FILE = 'add to the file'

  //create a file
  const createFile = async path => {
    try {
      // we want to check whether or not  we already have  the  file
      const existingFileHandle = await open(path, 'r')
      existingFileHandle.close()

      //we already have  the file that  file
      return console.log(`The file  ${path} already exists`)
    } catch (error) {
      // we  do not have  the file,  now  we should  create  it
      const newFileHandle = await open(path, 'w')
      console.log('A new file was created successfully created')
      newFileHandle.close()
    }
  }

  //exercise  success
  //** DELETING  FILE  PATH */
  const deleteFile = async path => {
    try {
      const checkFilePathExist = await open(path, 'r')
      if (checkFilePathExist) {
        let file = './' + path
        if (!file) {
          console.log('file  path does  not exist:')
          return
        }
        console.log(`Deleting  ${path}...`)
        await unlink(file)
        console.log(`file was successfully deleted ${path},${file}`)
      } else {
        console.log('file does  not exist')
        return
      }
    } catch (error) {
      console.log('file does  not exist', error)
    }
  }

  const renameFile = async (path, newPath) => {
    try {
      rename(path, newPath, error => {
        if (error) {
          if ((error.code = 'ENOENT')) {
            console.log('file or directory does  not Exist')
            return
          } else {
            console.log('an Error Occurred', error)
          }
        }
        console.log('file was  successfully renamed changed', newPath)
      })
    } catch (error) {
      console.log('error Occurred in catch  block', error)
    }
  }

  const addToFile = async (path, content) => {
    let file = './' + path
    console.log('path  is', file)

    await appendFile(file, content, err => {
      if (err) {
        console.log('error appending File', err)
      }
      console.log('file was Successfully  Added')
      console.log(file)
    })
  }
  // createFile('test')

  const commandFileHandler = await open('./command.txt', 'r')
  //inherit On  method from the eventEmitter from
  commandFileHandler.on('change', async () => {
    //we want  to read  file content

    //get   file size:

    const size = (await commandFileHandler.stat()).size
    //allocate  the Buffer size
    const buff = Buffer.alloc(size)

    // The location at which  we want  to start  filling  our  buffer
    const offset = 0

    //how  many  bytes  we want  to read
    const length = buff.byteLength
    //the position we want to start  reading  the file from
    const position = 0

    // we always  want to  read  the whole  content from  beginning  to  the end
    await commandFileHandler.read(buff, offset, length, position)

    //decoder  01  => meaningful
    const command = buff.toString('utf-8')

    //create a file
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1)
      createFile(filePath)
    }

    //Delete a file
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1)
      deleteFile(filePath)
    }

    //Delete  the File <Path>

    //Rename file
    //Rename file <path> to  new</path>
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(' to ')
      const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx)
      const newFilePath = command.substring(_idx + 4)
      renameFile(oldFilePath, newFilePath)
    }

    //addToFile
    // add to  the  file   <path> this content: </path>

    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(' this content: ')
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx)
      const content = command.substring(_idx + 15)
      addToFile(filePath, content)
    }
    //encoder meaningful => 01

    /*** Decode  the file  */
  })

  //watcher
  try {
    const watcher = watch('./command.txt')
    for await (const event of watcher) {
      console.log(event)
      if (event.eventType === 'change') {
        // the file was  changed
        console.log('file was changed')
        //emit  the  event
        commandFileHandler.emit('change')
      }
    }
  } catch (error) {
    console.log(error)
  }
}

testFile()
