'use strict';

const parse = require('co-busboy');
const path = require('path');
const fs = require('co-fs');
const saveTo = require('save-to');
const appDir = path.dirname(require.main.filename);

module.exports = function *(name) {
    let savedFile = '';
    const uuid = uid();
    const parts = parse(this, {
        autoFields: true
    });

    // list of all the files
    const files = [];
    let file;

    // yield each part as a stream
    let part;
    while (part = yield parts) {
        const tmpdir = path.join(appDir, 'media', uid());
        yield fs.mkdir(tmpdir);
        savedFile = uuid + '/' + part.filename;
        files.push(file = path.join(tmpdir, part.filename));
        yield saveTo(part, file);
    }

    console.log(files);

    this.body = yield {
        "status": "ok",
        "code": 200,
        "result": files
    };
};

function uid() {
    return Math.random().toString(36).slice(2);
}
