

// now  this  code  will  be  pushed to  the Event Loop, stack,  then  the Execution would  move  to
//the Next  Line(which  is  the For loop, after which, it would  come back  to  the Event Loop  call Stack,)
//and execute  this Code (in  the SettimeOutCode)
setTimeout(() => {
  console.log('Done')
}, 1)
// console.log('Hello')
for (let i = 0; i < 9000000000;i++) {}