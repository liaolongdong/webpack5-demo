import 'babel-polyfill'
import _ from 'lodash'
import request from '@/request'
import { saveUserSetEnv, setTitleEnv } from '@/request/utils'
// import printMe from './print';
import './iconfont'
import example from 'resource/example.txt'
import markdownText from 'resource/test-markdown.md'
// import { cube, testLog } from './math.js'
// import './style.css';
import './style.scss'
// import Icon from './photo.jpeg';
// import jsonData from 'resource/data.json'
// import xmlData from 'resource/data.xml'
import csvData from 'resource/data.csv'

if (process.env.NODE_ENV) {
  // 判断运行环境
  console.log(
    `%cLooks like we are in ${process.env.NODE_ENV} mode!`,
    'color: green;font-weight: bold',
  )
}

if (process.env.NODE_ENV !== 'production') {
  saveUserSetEnv()
  setTitleEnv()
}

// console.log('jsonData:', jsonData);
// console.log('xmlData:', xmlData);
console.log('csvData:', csvData)

// testLog();

// console.log('__webpack_public_path__ ', __webpack_public_path__);

console.log('document.baseURI ', document.baseURI)

console.log('ASSET_PATH', process.env.ASSET_PATH)

console.log('__dirname', __dirname)

console.log('__filename', __filename)

// a.fn();

function component() {
  const element = document.createElement('div')

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack', '廖小新'], ' ')
  // element.innerHTML = join(['Hello', 'webpack', '廖小新'], ' ');
  // element.innerHTML = [
  //     'Hello webpack!',
  //     '5 cubed is equal to ' + cube(5)
  // ].join('\n\n');
  element.classList.add('hello')

  // 将图像添加到我们已经存在的 div 中。
  // const myIcon = new Image();
  // myIcon.src = Icon;
  // element.appendChild(myIcon);

  const br = document.createElement('br')
  element.appendChild(br)

  const btn = document.createElement('button')
  btn.innerHTML = 'Click me and check the console!'
  // btn.onclick = printMe;
  element.appendChild(btn)

  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  btn.onclick = () =>
    import(/* webpackChunkName: "print" */ './print').then((module) => {
      // 注意当调用 ES6 模块的 import() 方法（引入模块）时，必须指向模块的 .default 值，因为它才是 promise 被处理后返回的实际的 module 对象。
      const print = module.default
      print()
    })

  const div = document.createElement('div')
  div.textContent = example
  element.appendChild(div)

  return element
}

document.body.appendChild(component())

document.querySelector('.markdown-container').innerHTML = markdownText

import(
  /* webpackChunkName: "dynamic-import-module" */ './dynamic-import-module'
)

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((json) => {
    console.log(
      "We retrieved some data! AND we're confident it will work on a variety of browser distributions.",
    )
    console.log(json)
  })
  .catch((error) =>
    console.error('Something went wrong when fetching this data: ', error),
  )

request
  .get('/user')
  .then((data) => {
    console.log(
      `%c环境配置测试对象：${JSON.stringify(data.data)}`,
      'color:green;font-size:18px',
    )
  })
  .catch((err) => {
    console.log(222, err)
  })

// if (module.hot) {
//     module.hot.accept('./print.js', function () {
//         console.log('%cAccepting the updated printMe module!', 'color: red');
//         printMe();
//     })
// }

// const worker = new Worker(new URL('./deep-thought.js',
//     import.meta.url));
// worker.postMessage({
//     question: 'The Answer to the Ultimate Question of Life, The Universe, and Everything.',
// });
// worker.onmessage = ({
//     data: {
//         answer
//     }
// }) => {
//     console.log(answer);
// };

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js').then(registration => {
//             console.log('SW registered: ', registration);
//         }).catch(registrationError => {
//             console.log('SW registration failed: ', registrationError);
//         });
//     });
// }
