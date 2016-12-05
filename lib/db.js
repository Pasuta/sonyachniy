var fs = require('fs');

function parse(ent) {
    var path = __dirname + '/../db/' + ent + '.json';
    var obj = fs.readFileSync(path);
    if (!obj) throw err;
    obj = JSON.parse(obj);
    return obj;
}

function save(ent, key, value) {
    var path = __dirname + '/../db/' + ent + '.json';
    ent = parse(ent);
    ent[key].content = value;
    fs.writeFileSync(path, JSON.stringify(ent));
    return ent;
}

module.exports = {
    parse: parse,
    save: save
};