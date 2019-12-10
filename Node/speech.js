// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// pull in the required packages.
var sdk = require("microsoft-cognitiveservices-speech-sdk");

(function() {
"use strict";

module.exports = {
  main: function(settings, audioStream) {

    // now create the audio-config pointing to our stream and
    // the speech config specifying the language.
    var audioConfig = sdk.AudioConfig.fromStreamInput(audioStream);
    var speechConfig = sdk.SpeechConfig.fromSubscription(settings.subscriptionKey, settings.serviceRegion);

    // setting the recognition.
    speechConfig.speechRecognitionLanguage = settings.language;

    // create the speech recognizer.
    var recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    //need to monitor events to see the results

    //live streaming intermediate results
    // recognizer.recognizing = function (s, e) {
    //   var str = "Intermediate Text: " + e.result.text;
    //   console.log(str);
    // };

    // Final results
    recognizer.recognized = function (s, e) {
        // Didn't work boyos
        if (e.result.reason === sdk.ResultReason.NoMatch) {
            var noMatchDetail = sdk.NoMatchDetails.fromResult(e.result);
            console.log("\r\nDidn't find a match: " + sdk.NoMatchReason[noMatchDetail.reason]);
        } else {
        console.log("\r\nNext Line: " + e.result.text);
        }
    };

    //two possible states, Error or EndOfStream
    recognizer.canceled = function (s, e) {
        var str = "(cancel) Reason: " + sdk.CancellationReason[e.reason];
        //if it was because of an error
        if (e.reason === sdk.CancellationReason.Error) {
            str += ": " + e.errorDetails;
            console.log(str);
        }
        //We've reached the end of the file, stop the recognizer
        else {
            recognizer.stopContinuousRecognitionAsync(function() {
            console.log("End of file.");

            recognizer.close();
            recognizer = undefined;
            },
            function(err) {
            console.trace("err - " + err);
            recognizer.close();
            recognizer = undefined;
            })
        }
    };

    // start the recognizer and wait for a result.
    recognizer.startContinuousRecognitionAsync(
    function () {
        console.log("Starting speech recognition");
    },
    function (err) {
        console.trace("err - " + err);

        recognizer.close();
        recognizer = undefined;
    });
  }
}
}());
