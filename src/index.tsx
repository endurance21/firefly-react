import React, { useRef, useState, useEffect } from "react";
import Canvas from "./components/canvas";
import { Firefly } from "./components/firefly";
import { getRandomInt } from "./helpers/random";
import { throttle } from "./helpers/throttle";

type props = {
  canvasWidth: number;
  canvasHeight: number;
  colors: string[];
  className: string;
};
/**
 *  The single array data structure to store all fireflies.
 */
const fireflies: Firefly[] = [];

/**
 *  throtlled function , so that it smartly avoid redundant function call and hence avoid 
 * to give birth so many fireflies in one mouse move or so.
 * @function
 */
const giveBirth: any = throttle(function (
  mouse,
  numberOfBirths,
  colors,
  changeDirectionFrequency,
  randomMotion,
) {
  let { x, y } = mouse;
  if (x === null || y === null) return;
  for (let i = 0; i < numberOfBirths; i++) {
    let velocity = { speed: getRandomInt(2, 3), direction: getRandomInt(0, 360) };
    let color = colors[getRandomInt(0, colors.length)];
    let directionTurner = { magnitude: getRandomInt(1, 4), direction: getRandomInt(5, 10) };
    let firefly = new Firefly(
      { x, y },
      velocity,
      directionTurner,
      changeDirectionFrequency,
      color,
      null,
      null,
      randomMotion,
    );
    fireflies.push(firefly);
  }
},
95);
/**
 *  setting the correct cordinates where to generate the fireflies relative to the canvas
 * @function
 */
const setFromEvent = (e, setMousePosition, boundary) => {
  setMousePosition({ x: e.clientX - boundary.current.x, y: e.clientY - boundary.current.y });
};

/**
 *  The main React component which orchastrates everything
 * from particle generatio, collision resolution to  animation and
 * painting canvas.
 */

const ReactFirefly = (props: props) => {
  let numberOfBirths = 2;
  let { canvasWidth, canvasHeight, colors, className } = props;

  let changeDirectionFrequency = 20;
  let randomMotion = true;

  if (!colors || colors.length == 0) {
    colors = ["#f15bb5", "#f72585"];
  }

  const canvas = useRef<HTMLCanvasElement>();
  const context = useRef(null);
  const requestRef = useRef(0);
  const boundary = useRef({ x: 0, y: 0, width: canvasWidth, height: canvasHeight });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    init();
    animate();

    return () => {
      cancelAnimationFrame(requestRef.current);
      canvas.current.removeEventListener("mousemove", (e) =>
        setFromEvent(e, setMousePosition, boundary),
      );
      canvas.current.addEventListener("mousemove", (e) =>
        setFromEvent(e, setMousePosition, boundary),
      );
      window.removeEventListener("scroll", setBoundary);
    };
  }, []);

  useEffect(() => {
    resizeCanvas();
    setBoundary();
  }, [props]);

  useEffect(() => {
    giveBirth(mousePosition, numberOfBirths, colors, changeDirectionFrequency, randomMotion);
  }, [mousePosition]);

  /**
 *  This function initilizes the whole state of the project 
 * including canvas context to initial give firefly generations.
 * @function
 */
  const init = () => {
    resizeCanvas();
    context.current = canvas.current.getContext("2d");

    setBoundary();

    giveBirth(
      { x: canvasWidth / 2, y: canvasHeight / 2 - 25 },
      25,
      colors,
      changeDirectionFrequency,
      randomMotion,
    );

    canvas.current.addEventListener("mousemove", (e) =>
      setFromEvent(e, setMousePosition, boundary),
    );
    window.addEventListener("scroll", setBoundary);
  };

  /**
 *  wrapper function to just resize the canvas dimension 
 * @function
 */
  const resizeCanvas = () => {
    canvas.current.width = canvasWidth;
    canvas.current.height = canvasHeight;
  };
  /**
 *  whenever user resizes the canvas in the application this handler
 * takes care of new boundary of the canvas and updates accordinglyß
 * @function
 */
  const setBoundary = () => {
    let rect = canvas.current.getBoundingClientRect();
    let x = rect.left;
    let y = rect.top;
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
  const animate = () => {
    requestRef.current = requestAnimationFrame(animate);
    context.current.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < fireflies.length; i++) {
      fireflies[i].update(boundary.current);
      fireflies[i].draw(context.current);

      if (fireflies[i].globalAlpha < 0.01) {
        fireflies.splice(i, 1); //remove the dead firefly from array
      }
    }
  };

  return <Canvas canvasRef={canvas} className={className}></Canvas>;
};
export default ReactFirefly;
