var fs = require('fs');

function parse(ent) {
    var path = __dirname + '/../db/' + ent + '.json';
    var obj = fs.readFileSync(path);
    if (!obj) throw err;
    obj = JSON.parse(obj);
    return obj;
}

function save() {
    
}

module.exports = {
    parse: parse,
    save: save
};