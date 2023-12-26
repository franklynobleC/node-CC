const fs = require('node:fs')
const { performance } = require('node:perf_hooks')

const writeData = async () => {
  console.time('writeMany')
  const file = await fs.createWriteStream('testfile.txt')
  try {
    for (let i = 0; i <= 1000000; i++) {
      await file.write(i.toString() + ' ', err => {
        if (err) {
          console.log('error has  occurred')
        }
      })

      if (i === 1000000) {
        file.end()
        // console.log(file.write('data written'))

        return
      }
    }
  } catch (error) {
    console.log('error', error)
  }
  console.timeEnd('writeMany')
}

const benChmarkWriteData = async () => {
  const startTime = performance.now()
  await writeData()
  const endTime = performance.now()
  let executionTime = endTime - startTime

  console.log(`time taken to write data is : ${executionTime} milliseconds`)
  const timeInSeconds = executionTime / 1000

  console.log(`benchMark  is ${timeInSeconds}`)
}

benChmarkWriteData()
