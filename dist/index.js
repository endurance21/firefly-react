import React, { useState, useEffect } from 'react';

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

//     numberOfFireflies: number,
//     colorArray: Array<string>,
//     speed: number,
//     blinkSpeed: number
// }

function ReactFirefly() {
  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      mousePosition = _useState2[0],
      setMousePosition = _useState2[1];

  useEffect(function () {
    console.log("i am born ");
    setInterval(function () {
      setMousePosition(function (tmp) {
        return tmp + 1;
      });
    }, 1000);
  }, []); // const canvasRef = useRef<HTMLCanvasElement| null>(null)
  // const mouse = useMouse(canvasRef, {
  //     enterDelay: 100,
  //     leaveDelay: 100,
  // })

  return /*#__PURE__*/React.createElement("div", null, mousePosition); // const [fireFlies, setFireFlies] = useState<Array<Firefly>|null>(null);
  // const [mousePosition, setMousePosition] = useState<{x:number,y:number}>({x:1,y:2});
  // useEffect(() => {
  //     console.log("i am born ")
  // }, []);
  // // const canvasRef = useRef<HTMLCanvasElement| null>(null)
  // // const mouse = useMouse(canvasRef, {
  // //     enterDelay: 100,
  // //     leaveDelay: 100,
  // // })
  // setInterval(()=>{
  //     let tmp = {
  //         x:mousePosition.x+1,
  //         y:mousePosition.y+1
  //     }
  //     setMousePosition(tmp)
  // },300)
  // return (<div>
  //     {mousePosition.x}
  //     <Canvas></Canvas>
  //     </div>
  // )
}

export default ReactFirefly;
