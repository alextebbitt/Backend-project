const basicinfo = require('./basicinfo');
const users = require('./users');
const components = require('./components');
const { post, put } = require('..');
module.exports = {
    ...basicinfo,
    ...users,
    ...post,
    ...put,
    ...components
};