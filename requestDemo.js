import pkg from 'webpage';
const { create } = pkg;
var page = create();

page.onLoadStarted = function() {
  var currentUrl = page.evaluate(function() {
    return window.location.href;
  });
  console.log('Current page ' + currentUrl + ' will be gone...');
  console.log('Now loading a new page...');
};
// import { create } from 'webpage'
// import pkg from 'system';
// const { args } = pkg;
// var page = create();
// var t;
// var address;

// if (args.length === 1) {
//   console.log('Usage: loadspeed.js <some URL>');
//   phantom.exit(1);
// } else {
//   t = Date.now();
//   address = args[1];
//   page.open(address, function (status) {
//     if (status !== 'success') {
//       console.log('FAIL to load the address');
//     } else {
//       t = Date.now() - t;
//       console.log('Page title is ' + page.evaluate(function () {
//         return document.title;
//       }));
//       console.log('Loading time ' + t + ' msec');
//     }
//     phantom.exit();
//   });
// }