const fs = require('fs');

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', function(err){
    if(err) return console.error(err);
  })
}

module.exports = {
  writeDataToFile
}