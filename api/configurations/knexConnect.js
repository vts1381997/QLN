
var config = require ('../configurations/config')
var Knex = require('knex')({
    client: 'oracledb',
    connection: {
        host: '103.74.122.203',
        user: 'Qln',
        password: 'Qln123',
        database: 'FSCHCM'
    }
});


module.exports = Knex