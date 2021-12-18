

![screen-capture (20)](https://user-images.githubusercontent.com/43696525/120792229-cd763b80-c552-11eb-85c2-7ceeda82793a.gif)



<p style="font-size: 1.5rem">
A React Component for building interactive animation of fireflies on websites. 
   <div>  
      <img alt="npm" src="https://img.shields.io/npm/dt/firefly-react?label=npm%20downloads">
      <img alt="npms.io (quality)" src="https://img.shields.io/npms-io/maintenance-score/firefly-react">
      <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/firefly-react">
      <img alt="GitHub" src="https://img.shields.io/github/license/endurance21/firefly-react">
      </div>
</p>

## LIVE Playgorund 
https://codesandbox.io/s/example-firefly-react-forked-9gsye?file=/src/App.js

## USAGE :

```js
npm i firefly-react
```

Import it into your React Project

```js
import Firefly from "firefly-react";
```
in app.js ( 1 line code and done 😎) :

```JSX


   <Firefly
      canvasWidth={200}  // you can choose any positive width suitable for your purpose
      canvasHeight={300} // you can choose any positive height suitable for your purpose
   />

```

## Customizations 

### Colors
One can add an Array of colors and the fireflies thus generated will get its color(can be hex-code or in rbga format) from this array in a random fashion :

```js
const colors = ["Blue ", "Green", "Red", "Orange"];
```


```JSX


   <Firefly
      canvasWidth={200}  // you can choose any positive width suitable for your purpose
      canvasHeight={300} // you can choose any positive height suitable for your purpose
      colors={colors}
   />


```

### Responsive
To make the canvas screen responsive, update the height and width of the canvas using `canvasHeight` and `canvaswidth` props.
Here is an example using react-hooks.

```JSX
const [canvasHeight, setCanvasHeight] = useState(window.innerHeight);
const [canvasWidth, setCanvasWidth] = useState(window.innerWidth);

window.addEventListener(
   "resize",
   (e) => {
   setCanvasHeight(window.innerHeight);
   setCanvasWidth(window.innerWidth);
   },
   false
);



   <Firefly
      canvasWidth={canvasWidth} 
      canvasHeight={canvasHeight} 
   />



```
### Css styling 
Use className prop to assign an className to the component and apply any custom css accordingly.
```JSX
  <Firefly
      className='firefly-react-example-classname' 
   />

```

```CSS
.firefly-react-example-classname{
  position: absolute;
  top: 0;
  left: 0;
  z-index:1
}
```

## Props :

| Props                    | Value                 | default             | description                                                                                                                                                      |
| ------------------------ | --------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| canvasWidth              | [0,SAFE-INT]          | HMTL CANVAS DEFAULT | sets width of the canvas                                                                                                                                         |
| canvasHeight             | [0-SAFE_INT]          | HMTL CANVAS DEFAULT | sets the height of the canvas                                                                                                                                    |
| colors                   | [ ]                   |  [ "#f15bb5","#f72585"]         | fireflies thus generated will be randomly alloted the colors from this array                                                                                     |
|className                   | string                   |  ""         | add a className to the canvas element                                                                                     |




## Want to Contribute ?

Contributing to Open source is self rewarding and i love being part of it , if you too are excited about it , i would love to collaborate ♥️ .
Currently we need help with :

- Using multithreading concepts to boost our canvas rendering
- particle pooling and hence performance optimization
- I do believe this project has immense potential to offer some good out there , so any proposal for new feature addition would be highly appreciated .
- Strong type checking and dynamic object validation would also make this library robust


## Quote
To learn and not to do is really not to learn. To know and not to do is really not to know.
<div>~Stephen R. Covey</div>

<br>
Thank you for reaching ♥️
