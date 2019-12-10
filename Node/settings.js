// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

(function() {
"use strict";
  
  module.exports = {
  
    // Replace with your own subscription key, service region (e.g., "westus"),
    // and recognition language.
    subscriptionKey:   "c5e8879905634b19887831b42fd94419",
    serviceRegion:     "westus", // e.g., "westus"
    language:          "es-MX",
  
    // Replace with the full path to a wav file you want to recognize.
    filename:          "C:\\Users\\C250715\\Documents\\Node\\audio\\Kaiser_English_Spanish.wav", // 16000 Hz, Mono
  
    // Replace with your own Language Understanding subscription key (endpoint
    // key), region, and app ID in case you want to run the intent sample.
    luSubscriptionKey: "YourLanguageUnderstandingSubscriptionKey",
    luServiceRegion:   "YourLanguageUnderstandingServiceRegion",
    luAppId:           "YourLanguageUnderstandingAppId",
  };
  }());
    