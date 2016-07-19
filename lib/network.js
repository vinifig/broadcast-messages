'use strict';
const os = require('os');
const Netmask = require('netmask').Netmask;


var getIPV4Adresses = function(){
    var interfaces = os.networkInterfaces();
    var enderecos = [];
    for (var i in interfaces) {
        for (var j in interfaces[i]) {
            var address = interfaces[i][j];
            if (address.family === 'IPv4' && !address.internal) {
                enderecos.push(address);
            }
        }
    }
    return enderecos;
}

var getBroadcastAddress = function(){
  var block = new Netmask(getIPV4Adresses()[0].netmask + '/24');
  return block.broadcast;
}

var getUserAddress = function(){
  return getIPV4Adresses().reduce(function(last, now){
    return last.concat(now.address);
  }, []);
}

exports.getBroadcastAddress = getBroadcastAddress;
exports.getUserAddress = getUserAddress;
