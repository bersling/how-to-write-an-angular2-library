const mu = require('mu2');
const fs = require('fs');
const https = require('https');

console.log('=== BUILD SITEMAP && robots ===');
function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

copyFile('./sitemap.xml', './dist/sitemap.xml', function(err) {
  if (err) {
    console.error('Error on copying sitemap.xml:', err);
  }
});
copyFile('./robots.txt', './dist/robotx.txt', function(err) {
  if (err) {
    console.error('Error on copying robots', err);
  }
});

console.log('=== COMPILE MUSTACHE ===');
mu.root = __dirname + '/src';
var data = require('./src/data.json');
var wstream = fs.createWriteStream('./dist/how-to-write-an-angular2-library.html');
mu.compileAndRender('index.html', data)
    .on('data', function (data) {
      wstream.write(data.toString());
    });

var wstream2 = fs.createWriteStream('./dist/index.html');
mu.compileAndRender('index.html', data)
    .on('data', function (data) {
      wstream2.write(data.toString());
    });
