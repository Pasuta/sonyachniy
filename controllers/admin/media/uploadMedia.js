'use strict';

var parse = require('co-busboy');
var path = require('path');
var fs = require('co-fs');
var saveTo = require('save-to');
const appDir = path.dirname(require.main.filename);


module.exports = function *() {
    console.log('x');
    // var parts = parse(this, {
    //     autoFields: true // saves the fields to parts.field(s)
    // });
    //
    // console.log(parts);
    // parse the multipart body
    // var savedFile = '';
    // var uuid = uid();
    // var parts = parse(this, {
    //     autoFields: true // saves the fields to parts.field(s)
    // });
    //
    // // create a temporary folder to store files
    // var tmpdir = path.join(appDir, 'media', uid());
    //
    // // make the temporary directory
    // yield fs.mkdir(tmpdir);
    //
    // console.log(1);
    // // list of all the files
    // var files = [];
    // var file;
    //
    // // yield each part as a stream
    // var part;
    // console.log(2);
    // console.log(parts);
    // while (part = yield parts) {
    //     // filename for this part
    //     savedFile = uuid + '/' + part.filename;
    //     console.log(savedFile);
    //     files.push(file = path.join(tmpdir, part.filename));
    //     // save the file
    //     yield saveTo(part, file);
    // }
    //
    // // return all the filenames as an array
    // // after all the files have finished downloading
    // // console.log(savedFile);
    // this.body = yield {
    //     "filepath": savedFile
    // };
};

function uid() {
    return Math.random().toString(36).slice(2);
}
