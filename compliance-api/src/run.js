var fs = require('fs')

// node run.js __tests__/testData/checks3 __tests__/testData/checks4 1000

function moveFiles(dirname, target) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      console.log('Error reading files')
      return
    }
    if (filenames.length > 0) {
      fs.rename(
        `${dirname}/${filenames[0]}`,
        `${target}/${filenames[0]}`,
        function() {},
      )
      console.log(filenames[0])
    } else {
      process.exit()
    }
  })
}

setInterval(function() {
  moveFiles(process.argv[2], process.argv[3])
}, process.argv[4])
