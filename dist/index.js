function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

import React, { useRef, useState, useEffect } from 'react';

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

___$insertStyle(".firefly-react-canvas {\n  height: 100%;\n  border: 1px solid red;\n}");

function Canvas(props) {
  return /*#__PURE__*/React.createElement("canvas", {
    ref: props.canvasRef,
    className: "firefly-react-canvas"
  });
}

function polarToCartesian(r, theta) {
    let x = r * Math.cos(theta * Math.PI / 180);
    let y = r * Math.sin(theta * Math.PI / 180);
    return { x, y };
}
function cartesianToPolar(x, y) {
    let r = Math.sqrt(x * x + y * y);
    let theta = Math.atan2(y, x); // in degree
    theta = normalizeAngle(theta);
    return { r, theta };
}
function normalizeAngle(theta) {
    return radianToDegree((theta >= 0 ? theta : (2 * Math.PI + theta)));
}
function radianToDegree(radian) {
    return inBound((radian * 180 / Math.PI));
}
function inBound(degree) {
    return (degree <= 360 ? degree : degree % 360);
}

function getRandomInt(min, max) {
    if (min === null && max)
        return max;
    if (max === null && min)
        return min;
    let i = Math.floor(Math.random() * (max - min + 1)) + min;
    return i;
}

function circleToLine(velocity, line) {
    let { x: x1, y: y1 } = velocity;
    let { x: x2, y: y2 } = line;
    let magnitude1 = Math.hypot(x1, y1);
    let magnitude2 = Math.hypot(x2, y2);
    let linesNormal = { x: -x2 / magnitude2, y: y2 / magnitude2 };
    if (dotProduct(linesNormal, velocity) > 0) {
        linesNormal = { x: x2 / magnitude2, y: -y2 / magnitude2 };
    }
    let linesTangent = { x: y2 / magnitude2, y: x2 / magnitude2 };
    if (dotProduct(linesTangent, velocity > 0)) {
        linesTangent = { x: -y2 / magnitude2, y: x2 / magnitude2 };
    }
    let sinTheta = Math.abs(dotProduct(linesNormal, velocity) / (magnitude2 * magnitude1));
    let cosTheta = Math.sqrt(1 - sinTheta * sinTheta);
    let normalMagnitude = magnitude1 * sinTheta;
    let tangentialMagnitude = magnitude2 * cosTheta;
    let normal = { x: linesNormal.x * normalMagnitude, y: linesNormal.y * normalMagnitude };
    let tangent = { x: linesTangent.x * tangentialMagnitude, y: linesTangent.y * tangentialMagnitude };
    return { x: normal.x + tangent.x, y: normal.y + tangent.y };
}
function dotProduct(vector1, vector2) {
    return vector1.x * vector2.x + vector1.y * vector2.y;
}

class Firefly {
    constructor(position, velocity, directionTurner, changeDirectionFrequency, color, size, dyingRate, randomMotion) {
        this.position = position || { x: 100, y: 20 };
        this.velocity = velocity || { speed: .05, direction: 45 }; //direction in degree
        this.color = color || "red";
        this.size = size || { width: 3, height: 5 };
        this.dyingRate = dyingRate || 1.01;
        this.globalAlpha = 1;
        this.stepCounter = 0;
        this.randomMotion = randomMotion == null ? false : randomMotion;
        this.changeDirectionFrequency = getRandomInt(30, changeDirectionFrequency);
        this.directionTurner = directionTurner || { magnitude: 2, direction: 20 };
    }
    update(boundary) {
        if (this.randomMotion) {
            this.changeDirecton();
        }
        this.resolve(boundary);
        let { x: vx, y: vy } = polarToCartesian(this.velocity.speed, this.velocity.direction);
        this.position.x += vx;
        this.position.y += vy;
        this.stepCounter++; //firefly  walked one more step
        this.globalAlpha /= this.dyingRate;
    }
    resolve(boundary) {
        let { x: x1, y: y1, width, height } = boundary;
        let { x, y } = this.position;
        let { x: vx, y: vy } = polarToCartesian(this.velocity.speed, this.velocity.direction);
        if (x + this.size.width >= width - this.size.width && vx > 0) {
            let { x: new_vx, y: new_vy } = circleToLine({ x: vx, y: vy }, { x: 1, y: 0 });
            let { r, theta } = cartesianToPolar(new_vx, new_vy);
            this.velocity.speed = r;
            this.velocity.direction = theta;
        }
        if (x - this.size.width <= this.size.width && vx < 0) {
            let { x: new_vx, y: new_vy } = circleToLine({ x: vx, y: vy }, { x: 1, y: 0 });
            let { r, theta } = cartesianToPolar(new_vx, new_vy);
            this.velocity.speed = r;
            this.velocity.direction = theta;
        }
        if (y + this.size.width >= height - this.size.width && vy > 0) {
            let { x: new_vx, y: new_vy } = circleToLine({ x: vx, y: vy }, { x: 0, y: 1 });
            let { r, theta } = cartesianToPolar(new_vx, new_vy);
            this.velocity.speed = r;
            this.velocity.direction = theta;
        }
        if (y - this.size.width <= this.size.width && vy < 0) {
            let { x: new_vx, y: new_vy } = circleToLine({ x: vx, y: vy }, { x: 0, y: 1 });
            let { r, theta } = cartesianToPolar(new_vx, new_vy);
            this.velocity.speed = r;
            this.velocity.direction = theta;
        }
    }
    draw(context) {
        let { x, y } = this.position;
        let { width, height } = this.size;
        context.beginPath();
        context.globalAlpha = this.globalAlpha;
        context.shadowBlur = 5;
        context.shadowColor = "red";
        context.fillStyle = this.color;
        context.arc(x, y, width, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
    }
    changeDirecton() {
        let turnIndirection = getRandomInt(-1, 1); //left , straight ,right
        if (this.changeDirectionFrequency && this.stepCounter == this.changeDirectionFrequency) {
            this.velocity.direction += turnIndirection * this.directionTurner.direction;
            this.velocity.direction = inBound(this.velocity.direction);
            this.stepCounter = 0; //reset the step counter to track when next it has change its direction
        }
    }
}

const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function () {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        }
        else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
};

var fireflies = [];
var giveBirth = throttle(function (mouse, numberOfBirths, colors, changeDirectionFrequency, randomMotion) {
  var x = mouse.x,
      y = mouse.y;
  if (x === null || y === null) return;

  for (var i = 0; i < numberOfBirths; i++) {
    var velocity = {
      speed: getRandomInt(2, 3),
      direction: getRandomInt(0, 360)
    };
    var color = colors[getRandomInt(0, colors.length)];
    var directionTurner = {
      magnitude: getRandomInt(1, 4),
      direction: getRandomInt(5, 10)
    };
    var firefly = new Firefly({
      x: x,
      y: y
    }, velocity, directionTurner, changeDirectionFrequency, color, null, null, randomMotion);
    fireflies.push(firefly);
  }
}, 200);

var setFromEvent = function setFromEvent(e, setMousePosition, boundary) {
  setMousePosition({
    x: e.clientX - boundary.current.x,
    y: e.clientY - boundary.current.y
  });
};

var ReactFirefly = function ReactFirefly(props) {
  var numberOfBirths = props.numberOfBirths,
      canvasWidth = props.canvasWidth,
      canvasHeight = props.canvasHeight,
      colors = props.colors,
      changeDirectionFrequency = props.changeDirectionFrequency,
      randomMotion = props.randomMotion;

  if (numberOfBirths === null) {
    numberOfBirths = 2;
  }

  var canvas = useRef();
  var context = useRef(null);
  var requestRef = useRef(0);
  var boundary = useRef({
    x: 0,
    y: 0,
    width: canvasWidth,
    height: canvasHeight
  });

  var _useState = useState({
    x: 0,
    y: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      mousePosition = _useState2[0],
      setMousePosition = _useState2[1];

  useEffect(function () {
    init();
    animate();
    return function () {
      cancelAnimationFrame(requestRef.current);
      canvas.current.removeEventListener("mousemove", function (e) {
        return setFromEvent(e, setMousePosition, boundary);
      });
      canvas.current.addEventListener("mousemove", function (e) {
        return setFromEvent(e, setMousePosition, boundary);
      });
      window.removeEventListener("scroll", setBoundary);
    };
  }, []);
  useEffect(function () {
    giveBirth(mousePosition, numberOfBirths, colors, changeDirectionFrequency, randomMotion);
  }, [mousePosition]);

  var init = function init() {
    canvas.current.width = canvasWidth;
    canvas.current.height = canvasHeight;
    context.current = canvas.current.getContext("2d");
    setBoundary();
    giveBirth({
      x: 300,
      y: 400
    }, numberOfBirths, colors, changeDirectionFrequency, randomMotion);
    canvas.current.addEventListener("mousemove", function (e) {
      return setFromEvent(e, setMousePosition, boundary);
    });
    window.addEventListener("scroll", setBoundary);
  };

  var setBoundary = function setBoundary() {
    var rect = canvas.current.getBoundingClientRect();
    var x = rect.left;
    var y = rect.top;
    boundary.current.x = x;
    boundary.current.y = y;
    boundary.current.width = canvasWidth;
    boundary.current.height = canvasHeight;
  };

  var animate = function animate() {
    requestRef.current = requestAnimationFrame(animate);
    context.current.clearRect(0, 0, boundary.current.width, boundary.current.height);

    for (var i = 0; i < fireflies.length; i++) {
      fireflies[i].draw(context.current);
      fireflies[i].update(boundary.current);

      if (fireflies[i].globalAlpha < 0.01) {
        fireflies.splice(i, 1); //remove the dead firefly from array
      }
    }
  };

  return /*#__PURE__*/React.createElement(Canvas, {
    canvasRef: canvas
  });
};

export default ReactFirefly;
