'use strict';

var fs = require('fs');
var uuid = require('uuid');

function createFileName (filename) {
  var nameArray = filename.split('.');
  var fileEnding = nameArray.pop();
  var newName = uuid.v4();
  return newName + '.' + fileEnding;
}

function handleUpload (request, reply) {
  var data = request.payload;
  if (data.file) {
    var name = createFileName(data.file.hapi.filename);
    var path = process.cwd() + "/uploads/" + name;
    var file = fs.createWriteStream(path);

    file.on('error', function (err) {
      console.error(err)
    });

    data.file.pipe(file);

    data.file.on('end', function (err) {
      if (err) {
        reply(err);
      } else {
        var ret = {
          filename: name,
          headers: data.file.hapi.headers
        }
        reply(ret);
      }
    })
  }
}

module.exports.handleUpload = handleUpload;