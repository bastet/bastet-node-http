var express = require('express');
var router = express.Router();
var os = require('os');
var ifaces = os.networkInterfaces();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(getIP());
});

module.exports = router;

function getIP() {
    var IP = "no ip";
    Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        IP = (ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        IP = iface.address;
      }
    });
  });
  return IP;
}