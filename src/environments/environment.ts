// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDyglFaLUJOwxHwqnSLAVT6aUgwYbz9tgE",
    authDomain: "imagenes-21817.firebaseapp.com",
    projectId: "imagenes-21817",
    storageBucket: "imagenes-21817.appspot.com",
    messagingSenderId: "572326278942",
    appId: "1:572326278942:web:7172033231b7f6ded8fb0f",
    measurementId: "G-VVWE439VJN"
  }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


