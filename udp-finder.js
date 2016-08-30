'use strict';

var fs = require('fs'),
    os = require('os'),
    path = require('path'),
    debug = require('debug'),
    internals = {};

var dgram = require('dgram');

var debugTestPort = debug('portfinder:testPort'),
    debugGetPort = debug('portfinder:getPort');

internals.testPort = function(options, callback){
    if(!callback){
        callback = options;
        options = {};
    }

    options.port = options.port || exports.basePort;
    options.server = options || dgram.createSocket('udp4');

    debugTestPort("entered testPort(): trying port: ", options.port);

    function onListen(){
        debugTestPort("done with testPort(): OK, port: ", options.port);
       // options.server.removeListener('error', onError);
        options.server.close();
        callback(null, options.port);
    }   

    function onError(err){
        debugTestPort("done with testPort(): failed, port: ", options.port);
       // options.server.removeListener('listening', onListen);

        if (err.code !== 'EADDRINUSE' && err.code !== 'EACCES'){
            return callback(err);
        }   
        internals.testPort({
            port: exports.nextPort(options.port),
            server: options.server
        }, callback);
    }   
    options.server.on('error', onError);
    options.server.on('listening', onListen);
    options.server.bind(options.port);
};


exports.basePort = 8000;

exports.getPort = function(options, callback){
    if(!callback){
        callback = options;
        options = {}; 
    }   

    return internals.testPort({port: options.port}, function(err, port){
        if(err){
            debugGetPort("testPort() callback with an err: ", err.code);
        }
        else{
            debugGetPort("testPort() callback with a success for port: ", port);
        }
   });
};


