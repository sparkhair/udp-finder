'use strict';

var fs = require('fs'),
    os = require('os'),
    path = require('path'),
    async = require('async'),
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

    options.port = options.port || internals.basePort;
    options.server = dgram.createSocket('udp4');

    debugTestPort("entered testPort(): trying port: ", options.port);

    function onListen(){
        debugTestPort("done with testPort(): OK, port: ", options.port);
        options.server.close();
        callback(null, options.port);
    }   

    function onError(err){
        debugTestPort("done with testPort(): failed, port: ", options.port);

        if (err.code !== 'EADDRINUSE' && err.code !== 'EACCES'){
            return callback(err);
        }  
        options.server.close();
        internals.testPort({
            port: options.port + 1
        }, callback);
    }   
    options.server.on('error', onError);
    options.server.on('listening', onListen);
    options.server.bind(options.port);
};


internals.basePort = 8000;

exports.getPort = function(options, callback){
    if(!callback){
        callback = options;
        options = {}; 
    } 
    else if(typeof options !== 'object'){
        var tmp = options;
        options = {};
        options.port = tmp;
    }

    return internals.testPort({port: options.port}, function(err, port){
        if(err){
            debugGetPort("testPort() callback with an err: ", err.code);
        }
        else{
            debugGetPort("testPort() callback with a success for port: ", port);
            return callback(null, port);
        }
   });
};

exports.getPorts = function(count, options, callback){
    if(!callback){
        callback = options;
        options = {}; 
    } 
    else if (typeof options !== 'object'){
        var tmp = options;
        options = {};
        options.port = tmp;
    }

    var lastPort = null;
    async.timesSeries(count, function(index, asyncCallback){
        if(lastPort){
            options.port = lastPort + 1;
        }   
        exports.getPort(options, function(err, port){
            if(err){
                asyncCallback(err);
            }   
            else{
                lastPort = port;
                asyncCallback(null, port);
            }   
    
        }); 
    }, callback);
};

