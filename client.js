// AMD compatible
define([], function(){
  var racer = require("racer");
  
  // This isn't browserifiable directly
  //require("racer-browserchannel/lib/browser");
  /////// copied from lib/browser
  //var racer = require('racer');
  var BCSocket = require('./node_modules/racer-browserchannel/node_modules/browserchannel/dist/bcsocket-uncompressed').BCSocket;
  // TODO: this is normally done in the browserify
  var CLIENT_OPTIONS = {reconnect: true, base: "/racer/channel"}
  racer.Model.prototype._createSocket = function() {
    var base = CLIENT_OPTIONS.base || '/channel';
    return new BCSocket(base, CLIENT_OPTIONS);
  };
  ////////////

  racer.load = function(url, cb) {
    var xhr = new XMLHttpRequest();
    racer._model = null;

    xhr.onload = function() {
      var model = racer.createModel(JSON.parse(this.responseText))
      cb(null, model);
    };
    xhr.open("get", url, true);
    xhr.send();
  };

  console.log("middleware racer", racer)
  //module.exports = racer;
  return racer

})