const fs = require('fs');

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', function(err){
    if(err) return console.error(err);
  })
}

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body ='';
      req.on('data', chunk => {
        body += chunk.toString();
      }).on('end', () =>{
        resolve(body);
      })
    } catch(err) {
      console.log(err);
    }
  })
}

module.exports = {
  writeDataToFile,
  getPostData
}