// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

(function() {
  "use strict";
  
  // pull in the required packages.
  var sdk = require("microsoft-cognitiveservices-speech-sdk");
  var fs = require("fs");
  
  var settings = require("./settings");
  var speech = require("./speech");
  var translate = require("./translation");
  
  function openPushStream(filename) {
      // create the push stream we need for the speech sdk.
      var pushStream = sdk.AudioInputStream.createPushStream();
  
      // open the file and push it to the push stream.
      fs.createReadStream(filename).on('data', function(arrayBuffer) {
          pushStream.write(arrayBuffer.buffer);
      }).on('end', function() {
          pushStream.close();
      });
  
      return pushStream;
  }
  
  if (process.argv.length > 3) {
      settings.filename = process.argv[3];
  }
  
  if (process.argv.length > 2) {
      switch (process.argv[2]) {
          case "translate":
              console.log("Now translating from: " + settings.filename);
              translate.main(settings, openPushStream(settings.filename));
              break;
  
          case "speech":
          default:
              console.log("Now recognizing speech from: " + settings.filename);
              speech.main(settings, openPushStream(settings.filename));
              break;
      }
  }
  else {
      console.log("usage: index.js [speech|intent|translate] {filename}");
  }
}());
  