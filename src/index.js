exports.Database = require('./classes/Database.js').Database;
exports.Events = {
    Connect: 'connect',
    Ready: 'connect',
    Disconnect: 'disconnect',
    Close: 'disconnect',
    Error: 'error',
    Acquire: 'acquire',
    Release: 'release',
    Connection: 'connection',
    Enqueue: 'enqueue'
};
