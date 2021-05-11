// export default function print() {
//     console.log('I get called from print.js!');
//     // 抛出错误
//     consoll.log('I get called from print.js!');
// }

// export default function print(text) {
//     console.log(text);
// };

// export default function printMe() {
//     console.log('%cUpdating print.js。。。', 'color: green');
// }

console.log(
  'The print.js module has loaded! See the network tab in dev tools...',
)

export default () => {
  console.log('Button Clicked: Here\'s "some text"!')
}
