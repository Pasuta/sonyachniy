'use strict';

const parse = require('co-busboy');
const path = require('path');
const fs = require('co-fs');
const saveTo = require('save-to');
const appDir = path.dirname(require.main.filename);
const Promise = require("bluebird");
const Photo = Promise.promisifyAll(require('../../../models/photo'));
const filePath = path.join(appDir, 'public', 'site', 'images', 'media');

module.exports = function *() {
    const parts = parse(this);

    const files = [];
    let file;
    let album;

    let part;
    while (part = yield parts) {
        if (!part.filename) {
            album = part[1];
            continue;
        }
        const uid = Math.random().toString(36).slice(2);
        const imagePath = path.join('site', 'images', 'media', uid, part.filename);
        const finalFilePlace = path.join(filePath, uid, part.filename);
        const tmpdir = path.join(filePath, uid);
        yield fs.mkdir(tmpdir);
        files.push(file = imagePath);
        yield saveTo(part, finalFilePlace);
    }

    for (let f in files) {
        const d = {
            'path': '/' + files[f],
            _album: album,
            'order': 0
        };
        const photo = new Photo(d);
        const save = Promise.promisifyAll(photo);
        yield save.saveAsync();
    }

    this.body = yield {
        "status": "ok",
        "code": 200,
        "result": files
    };
};
