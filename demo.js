import { create } from 'phantom';

let phantom_instance = null;
let sitepage = null;

//创建phantom实例
create()
  .then(instance => {
    phantom_instance = instance;
    return phantom_instance.createPage(); // 创建Browser实例
  })
  .then(page => {
    sitepage = page;
    page.open('https://tiger.tianyancha.com/company/19009957', function () {
      sitepage.render('company-test.png');
      sitepage.close(); //释放page所占用的内存
      phantom_instance.exit(); //终止了 phantom 的执行,否则程序将永远不会终止
    });
  })