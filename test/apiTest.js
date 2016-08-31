'use strict';

describe('getPort usage', function(){
    it('should get a available udp port',function (done){
        var udpfinder = require('../lib/udp-finder');
        udpfinder.getPort(3000,function(err, port){
            if(err){
                //console.log(err);
                return done(err);
            }   
            port.should.be.within(3000, 5000);
            console.log("port is: ", port);
            done();
        }); 
    }); 
    it('should get a array of avaliable udp port', function(done){
        var udpfinder = require('../lib/udp-finder');
        udpfinder.getPorts(4,3000,function(err, ports){
            if(err){
                //console.log(err);
                return done(err);
            }   
            ports.should.have.length(4);
            console.log("port is: ", ports);
            done();
        }); 
    }); 
});
