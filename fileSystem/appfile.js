//****** Promise  API *//
const fs = require('fs/promises')
try {
    fs.copyFile('file.txt', 'copied-promise.txt')
} catch (error) {
  console.log(error)
}

// *****     CallBack API  ****LINK -
// const fs = require('fs');
// fs.copyFile('file.txt', "copied-callback.txt", (error) => {
//   if (error) {
// console.log(error)
// }
// })

//**** Synchronous   API *** */
// const fs = require('fs');

// fs.copyFileSync('file.txt', 'copied-sync.txt')
