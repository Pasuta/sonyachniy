'use strict';

const parse = require('co-busboy');
const path = require('path');
const saveTo = require('save-to');
const appDir = path.dirname(require.main.filename);
const filePath = path.join(appDir, 'public', 'download');
const fs = require('fs');

module.exports = function *() {

    const parts = parse(this, {
        autoFields: true
    });

    const files = [];

    const filesToDel = fs.readdirSync(filePath);

    for (const f of filesToDel) {
        fs.unlinkSync(path.join(filePath, f));
    }

    let part;
    while (part = yield parts) {
        const finalFilePlace = path.join(filePath, part.filename);
        files.push(finalFilePlace);
        yield saveTo(part, finalFilePlace);
    }

    this.body = yield {
        "status": "ok",
        "code": 200,
        "result": files
    };
};

