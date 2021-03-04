

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

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Firefly = /** @class */ (function () {
    function Firefly() {
    }
    Firefly.prototype.update = function () {
        this.position.r += this.velocity.dr;
        this.position.theta += this.velocity.dtheta;
        this.life *= this.lifeExpectancy;
    };
    Firefly.prototype.draw = function () {
    };
    return Firefly;
}());

function Canvas() {
    return (React__default['default'].createElement("canvas", { className: "firefly-react-canvas" }));
}

console.log(Canvas);
console.log(Firefly);
//# sourceMappingURL=index.js.map
