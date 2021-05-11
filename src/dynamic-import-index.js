// 使用import()动态导入
// function getComponent() {
//     return import('lodash')
//         .then(({
//             default: _
//         }) => {
//             const element = document.createElement('div');

//             element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//             return element;
//         })
//         .catch((error) => 'An error occurred while loading the component');
// }

// 使用async/await
async function getComponent() {
  const element = document.createElement('div')
  const { default: _ } = await import('lodash')
  element.innerHTML = _.join(['Hello', 'webpack', '廖小新'], ' ')
  return element
}

getComponent().then((component) => {
  document.body.appendChild(component)
})
