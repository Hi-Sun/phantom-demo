import { create } from 'phantom';

const url = 'https://tiger.tianyancha.com/company/19009957';

let phantom_instance = null;
let sitepage = null;
let start_time = null;
let end_time = null;
let LoadStartTime = null, LoadFinishTime = null;
let loading_time = 0;
//创建phantom实例
create()
  .then(instance => {
    phantom_instance = instance;
    return phantom_instance.createPage(); // 创建Browser实例
  })
  .then(page => {
    sitepage = page;
    page.on('onLoadStarted', function () {
      LoadStartTime = +new Date();
      console.info('onLoadStarted', +new Date());
    });
    page.on('onLoadFinished', function () {
      LoadFinishTime = +new Date();
      console.log('ResourceLoadTime: ', LoadFinishTime - LoadStartTime);
      console.info('onLoadFinished', +new Date());
    });
    page.on('onResourceRequested', function () {
      console.info('onResourceRequested', +new Date());
    });
    page.on('onResourceReceived', function () {
      console.info('onResourceReceived', +new Date());
    });
    page.property('viewportSize', {
      width: 1280,
      height: 1024
    });
    start_time = Date.now();
    return page.open(url);
  })
  .then(status => {
    if (status === 'success') {
      end_time = Date.now();
      loading_time = end_time - start_time;
      console.log('loading_time: ', loading_time);
      const performance = window.performance;
      console.log('performance', performance)
      return sitepage.property('content');
    } else {
      return new Error('Unable to access network')
    }
  })
  .then(content => {
    // console.log(content)
    sitepage.close(); //释放page所占用的内存
    phantom_instance.exit(); //终止了 phantom 的执行,否则程序将永远不会终止
  })
  .catch(error => {
    console.log(error);
    phantom_instance.exit();
  });