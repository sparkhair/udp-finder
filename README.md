# udp-finder

##Installation
```
$ npm install udp-finder
```
##Usage
```js
var udpFinder = require('udp-finder');

udpFinder.getPort(basePort,function(err, port){
  //
  //`port` will be an available port
  //
  //
});

udpFinder.getPorts(portAmount,basePort,function(err, ports){
  //
  //`ports` will be an array of available ports 
  //
  //
});

```
`basePort` is where `udp-finder` starts its search from.
`portAmount` is the number of available ports to search for.
Note that the `udp-finder` only search for `udp4` for now.

##Purpose
`udp-finder` will be useful to those who wants to search for a available udp4 port `on the local machine`.
####Author : [Jake Lin](https://github.com/sparkhair)

####License: MIT
