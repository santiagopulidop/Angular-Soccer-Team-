// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Se añade la cofiguracion de la realtime database de fire base
  // Luego se ejecuta en la consola 'npm i -s firebase angularfire2'
  firebase: {
    apiKey: 'AIzaSyDLYYf2DYRns_FRbxWCxUkEyLkp8PmPR7Y',
    authDomain: 'angularts-platzi-sp.firebaseapp.com',
    databaseURL: 'https://angularts-platzi-sp.firebaseio.com',
    projectId: 'angularts-platzi-sp',
    storageBucket: 'angularts-platzi-sp.appspot.com',
    messagingSenderId: '486541325324',
    appId: '1:486541325324:web:68e6b79f60224c53f86a29',
    measurementId: 'G-PGDPPSXBBG',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
