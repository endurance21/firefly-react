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

/**
 * React component wrapper for actual html5Canvas element.
 * @constructor
 */

function Canvas(props) {
  return /*#__PURE__*/React.createElement("canvas", {
    ref: props.canvasRef,
    className: props.className
  });
}

/**
 * convert cordinate from polar to cartesian.
 * @param {Number} r - radius of polar point.
 * @param {Number} theta - angle of polar point.
 * @returns {Object} cartesian cordinate.
 */
function polarToCartesian(r, theta) {
    let x = r * Math.cos((theta * Math.PI) / 180);
    let y = r * Math.sin((theta * Math.PI) / 180);
    return { x, y };
}
/**
 * convert cordinate from cartesian to polar .
 * @param {Number} x - x-cordinate of the pont.
 * @param {Number} y - y-cordinate of the point.
 * @returns {Object} polar cordinate.
 */
function cartesianToPolar(x, y) {
    let r = Math.sqrt(x * x + y * y);
    let theta = Math.atan2(y, x); // in degree
    theta = normalizeAngle(theta);
    return { r, theta };
}
/**
 *  normalizes the given angle
 * @param {Number} theta - angle with x axis.
 * @returns {Number} the same angle if its positive and normalized if it is negatives
 */
function normalizeAngle(theta) {
    return radianToDegree(theta >= 0 ? theta : 2 * Math.PI + theta);
}
/**
 * converts radian to degree
 * @param {Number} radian - angle given in radian.
 * @returns {Number} angle in degree.
 */
function radianToDegree(radian) {
    return inBound((radian * 180) / Math.PI);
}
/**
 * checks if angle becomes greater than 360 bound.
 * @param {Number} degree - angle given in degree
 * @returns {Number}    inbound angle
 */
function inBound(degree) {
    return (degree <= 360 ? degree : degree % 360);
}

/**
 * genrates  a random number between given range
 * @param {Number} min - lower bound
 *  @param {Number} max - upper bound
 * @returns {Number} a random generated integer
 */
function getRandomInt(min, max) {
    if (min === null && max)
        return max;
    if (max === null && min)
        return min;
    let i = Math.floor(Math.random() * (max - min + 1)) + min;
    return i;
}

/**
 * Represents the firefly
 * @class
 */
class Firefly {
    /**
     * Represents firfly constructor.
     * @constructor
     */
    constructor(position, velocity, directionTurner, changeDirectionFrequency, color, size, dyingRate, randomMotion) {
        this.position = position || { x: 100, y: 20 };
        this.velocity = velocity || { speed: 0.05, direction: 45 }; //direction in degree
        this.color = color || "red";
        this.size = size || { width: 3, height: 5 };
        this.dyingRate = dyingRate || 1.01;
        this.globalAlpha = 1;
        this.stepCounter = 0;
        this.randomMotion = randomMotion == null ? false : randomMotion;
        this.changeDirectionFrequency = getRandomInt(30, changeDirectionFrequency);
        this.directionTurner = directionTurner || { magnitude: 2, direction: 20 };
    }
    /**
     * Updates the state of individual firefly
     * clears the last firefly from frame  to show a animation effect
     * @param {Object} contains the position and dimention of the canvas
     */
    update(boundary) {
        if (this.randomMotion) {
            this.changeDirecton();
        }
        this.resolve(boundary);
        let { x: vx, y: vy } = polarToCartesian(this.velocity.speed, this.velocity.direction);
        this.position.x += vx;
        this.position.y += vy;
        this.stepCounter++; //firefly  walked one more step
        this.globalAlpha /= this.dyingRate; // reducing firefly opacity to simulate dying effect
    }
    /**
     * resolves any possible collision with other firefly
     * @param {Object} contains the position and dimention of the canvas
     */
    resolve(boundary) {
        let { x: x1, y: y1, width, height } = boundary;
        let { x, y } = this.position;
        let { x: vx, y: vy } = polarToCartesian(this.velocity.speed, this.velocity.direction);
        if (x + this.size.width >= width - this.size.width && vx > 0) {
            let new_vx = -vx;
            let new_vy = vy;
            let { r, theta } = cartesianToPolar(new_vx, new_vy);
            this.velocity.speed = r;
            this.velocity.direction = theta;
        }
        if (x - this.size.width <= this.size.width && vx < 0) {
            let new_vx = -vx;
            let new_vy = vy;
            let { r, theta } = cartesianToPolar(new_vx, new_vy);
            this.velocity.speed = r;
            this.velocity.direction = theta;
        }
        if (y + this.size.width >= height - this.size.width && vy > 0) {
            let new_vx = vx;
            let new_vy = -vy;
            let { r, theta } = cartesianToPolar(new_vx, new_vy);
            this.velocity.speed = r;
            this.velocity.direction = theta;
        }
        if (y - this.size.width <= this.size.width && vy < 0) {
            let new_vx = vx;
            let new_vy = -vy;
            let { r, theta } = cartesianToPolar(new_vx, new_vy);
            this.velocity.speed = r;
            this.velocity.direction = theta;
        }
    }
    /**
     *  draws the the firefly onto the canvas
     * @param {Object} standard canvas2d context
     */
    draw(context) {
        let { x, y } = this.position;
        let { width, height } = this.size;
        context.beginPath();
        context.globalAlpha = this.globalAlpha;
        context.shadowBlur = 5;
        context.shadowColor = this.color;
        context.fillStyle = this.color;
        context.arc(x, y, width, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
    }
    /**
     * Changes the direction of the firefly.
     * It turns the current velocity vector by some random amount ensuring the smooth walk simulation.
     */
    changeDirecton() {
        let turnIndirection = getRandomInt(-1, 1); //left , straight ,right
        if (this.changeDirectionFrequency && this.stepCounter == this.changeDirectionFrequency) {
            this.velocity.direction += turnIndirection * this.directionTurner.direction;
            this.velocity.direction = inBound(this.velocity.direction);
            this.stepCounter = 0; //reset the step counter to track when next it has change its direction
        }
    }
}

/**
 *standard function to implement the concept of throttling
 *if we move a mouse , every pixel we move it fires the mouse move event and in one 1second we would be moving too many pixels
 *which will inturn fire the mouse move event too many times which will produce too many particles at one time, which will
 *slow the rendering due to memory and runtime constraints of machine it is running on
 *so we need to deliberatly miss some mouse event fires
 *for example if in one move it fires the event 100 times we will only take 4-5 events thus improving the runtime rendering by lowering the number of particles generated
 *It also look visually appealing
 * @param {Function} func - the function argument tha need to throttled
 * @param {Number} limit - the allowed time limit
 * @returns {Function}  a function closure
 */
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
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
};

/**
 *  The single array data structure to store all fireflies.
 */

var fireflies = [];
/**
 *  throtlled function , so that it smartly avoid redundant function call and hence avoid
 * to give birth so many fireflies in one mouse move or so.
 * @function
 */

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
}, 95);
/**
 *  setting the correct cordinates where to generate the fireflies relative to the canvas
 * @function
 */

var setFromEvent = function setFromEvent(e, setMousePosition, boundary) {
  setMousePosition({
    x: e.clientX - boundary.current.x,
    y: e.clientY - boundary.current.y
  });
};
/**
 *  The main React component which orchastrates everything
 * from particle generatio, collision resolution to  animation and
 * painting canvas.
 */


var ReactFirefly = function ReactFirefly(props) {
  var numberOfBirths = 2;
  var canvasWidth = props.canvasWidth,
      canvasHeight = props.canvasHeight,
      colors = props.colors,
      className = props.className;
  var changeDirectionFrequency = 20;
  var randomMotion = true;

  if (!colors || colors.length == 0) {
    colors = ["#f15bb5", "#f72585"];
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
    resizeCanvas();
    setBoundary();
  }, [props]);
  useEffect(function () {
    giveBirth(mousePosition, numberOfBirths, colors, changeDirectionFrequency, randomMotion);
  }, [mousePosition]);
  /**
  *  This function initilizes the whole state of the project
  * including canvas context to initial give firefly generations.
  * @function
  */

  var init = function init() {
    resizeCanvas();
    context.current = canvas.current.getContext("2d");
    setBoundary();
    giveBirth({
      x: canvasWidth / 2,
      y: canvasHeight / 2 - 25
    }, 25, colors, changeDirectionFrequency, randomMotion);
    canvas.current.addEventListener("mousemove", function (e) {
      return setFromEvent(e, setMousePosition, boundary);
    });
    window.addEventListener("scroll", setBoundary);
  };
  /**
  *  wrapper function to just resize the canvas dimension
  * @function
  */


  var resizeCanvas = function resizeCanvas() {
    canvas.current.width = canvasWidth;
    canvas.current.height = canvasHeight;
  };
  /**
  *  whenever user resizes the canvas in the application this handler
  * takes care of new boundary of the canvas and updates accordinglyß
  * @function
  */


  var setBoundary = function setBoundary() {
    var rect = canvas.current.getBoundingClientRect();
    var x = rect.left;
    var y = rect.top;
    boundary.current.x = x;
    boundary.current.y = y;
    boundary.current.width = canvasWidth;
    boundary.current.height = canvasHeight;
  };
  /**
  *  This is animation engine of the whole project
  * it updates position of every firefly and is
  * also responsible for painting to the canvas
  * @function
  */


  var animate = function animate() {
    requestRef.current = requestAnimationFrame(animate);
    context.current.clearRect(0, 0, canvasWidth, canvasHeight);

    for (var i = 0; i < fireflies.length; i++) {
      fireflies[i].update(boundary.current);
      fireflies[i].draw(context.current);

      if (fireflies[i].globalAlpha < 0.01) {
        fireflies.splice(i, 1); //remove the dead firefly from array
      }
    }
  };

  return /*#__PURE__*/React.createElement(Canvas, {
    canvasRef: canvas,
    className: className
  });
};

export default ReactFirefly;
