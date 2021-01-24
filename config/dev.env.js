'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    //BASE_API: '"http://100.101.80.31:8099"'
    // BASE_API: '"http://admin-api.macrozheng.com"'
    //BASE_API: '"http://cffz0225.oicp.net:50850"'
    BASE_API: '"http://192.168.2.105:8099"'


})