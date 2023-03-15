import { create } from 'phantom';

const url = 'https://tiger.tianyancha.com/company/19009957';

let phantom_instance = null;
let sitepage = null;
let start_time = null;
let end_time = null;
let interval_obj = null;
let loading_time = 0;
var closePage
create()
  .then(instance => {
    phantom_instance = instance;
    console.log('111111')
    return phantom_instance.createPage();
  })
  .then(page => {
    sitepage = page;
    console.log('22222')
    start_time = Date.now();
    closePage = page.close();
    console.log('page', page)
    return page.open(url);
  })
  .then(status => {
    console.log('status', status)
    // return new Promise( (resolve, reject) => {
    console.log('333333')
    if (status == 'success') {
      interval_obj = setInterval(function () {
        //tell the browser to return document.readyStatue
        console.log('444444')
        sitepage.evaluate(function () {
          console.log('document', document)
          return document.readyState;
        })
          .then(function (ready_state) {
            if (ready_state == "complete") {
              console.log('555555')
              end_time = Date.now();
              sitepage.close();
              clearInterval(interval_obj);
              loading_time = end_time - start_time;
              return resolve(loading_time);
            } else {
              console.log(ready_state);
            }
          })
      }, 1000);
    } else {
      return reject(status);
    }
    // });
  })
  .then(loading_time => {
    console.log('6666')
    console.log("[Speed Tester] Completed in : " + loading_time);
    closePage();
    phantom_instance.exit();
    return resolve({ time: loading_time });
  }).catch((error) => {
    console.log('777777')
    console.log(error);
    phantom_instance.exit();
  })