# color-palette

ant.design 的 colorPalette javascript移植版本

```shell script
npm i @kne/color-palette
```

# 使用说明

```js
import colorPalette from '@kne/color-palette';
import range from 'lodash/range';

console.log(range(0, 10).map((i)=>{
    return colorPalette('#1890ff',i+1);
})); 
/*
[
  '#e6f7ff', '#bae7ff',
  '#91d5ff', '#69c0ff',
  '#40a9ff', '#1890ff',
  '#096dd9', '#0050b3',
  '#003a8c', '#002766'
]
*/
```
