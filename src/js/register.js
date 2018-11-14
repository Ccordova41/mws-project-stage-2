Service Worker Added
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }, function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}
//Added Background Sync 

// if ('serviceWorker' in navigator && 'SyncManager' in window) {
//   navigator.serviceWorker.ready.then(function(reg) {
//     return reg.sync.register('syncFavorite');
//     console.log('ServiceWorker registration successful with scope: ', registration.scope);
//   }).catch(function() {
//     // system was unable to register for a sync,
//     console.log('ServiceWorker registration failed: ', err);
//     // this could be an OS-level restriction
//     postDataFromThePage();
//   });
// } else {
//   // serviceworker/sync not supported
//   postDataFromThePage();
// }
