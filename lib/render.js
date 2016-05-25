/**
 * Module dependencies.
 */

var views = require('co-views');

module.exports = {
    'site': views(__dirname + '/../views/site', {
        map: { html: 'swig' }
    }),
    'admin': views(__dirname + '/../views/admin', {
        map: { html: 'swig' }
    })
};