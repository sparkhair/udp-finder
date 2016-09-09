# udp-finder

##Installation
```bash
$ npm install udp-finder
```
##Usage
```js
var udpFinder = require('udp-finder');
var basePort = 3000; //port search starts from 3000
var portAmount = 5; //5 available ports to search for

udpFinder.getPort(basePort, function(err, port){
  //
  //`port` will be an available port
  //
  //
});

udpFinder.getPorts(portAmount, basePort, function(err, ports){
  //
  //`ports` will be an array of available ports 
  //
  //
});

```

`basePort` is where `udp-finder` starts its search from.
For `basePort`, it can take in object in this form `{port: 3000}`, or it can just be a `port number`(e.g. 3000).
`portAmount` is the number of available ports to search for.
Note that the `udp-finder` only search for `udp4` for now.

##Purpose
`udp-finder` will be useful to those who wants to search for a available udp4 port `on the local machine`.

##Run Test
```bash
$ cd node_modules/udp-finder
$ npm install
$ npm test
```
####Author : [Jake Lin](https://github.com/sparkhair)

####License: MIT
