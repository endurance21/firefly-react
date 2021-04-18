import React,{useRef, useState, useEffect} from "react"
import Canvas from "./components/canvas"
import  {Firefly} from "./components/firefly"
import {cartesianToPolar} from "./helpers/cordinatesConversion"
import {getRandomInt} from "./helpers/random"
import {throttle} from "./helpers/throttle"

type props ={
  numberOfBirths :number
  width:number
  height:number
  colors:[]
}

const fireflies  :Firefly[] = []
const giveBirth :any = throttle(function (mouse,numberOfBirths,colors){
  let {x,y} = mouse
  if(x === null || y === null)
  return
  for(let i = 0;i<numberOfBirths;i++){
    let velocity = {speed:getRandomInt(2,3),direction:getRandomInt(0,360)}
    let color = colors[getRandomInt(0,colors.length)]
    let acceleration = {magnitude:getRandomInt(2,3),direction:getRandomInt(-1,1)*getRandomInt(0,90)}
    let firefly = new Firefly({x,y},velocity,acceleration,color,null,null,null)
    fireflies.push(firefly)
  }


} , 200)
const ReactFirefly = (props)=>{
  let {numberOfBirths, width, height,colors} = props

  const canvas = useRef<HTMLCanvasElement>()
  const context = useRef(null)
  const requestRef = useRef(0)
  const boundary = useRef({x:0,y:0,width,height})
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    init()
    animate()
    // requestRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestRef.current);
      canvas.current.removeEventListener("mousemove", setFromEvent);
    }
  }, []);

  useEffect(() => {
   giveBirth(mousePosition,numberOfBirths, colors)
 }, [mousePosition]);

  const setFromEvent = (e) =>{
    setMousePosition({ x: e.clientX, y: e.clientY });
  }

  const init = ()=>{
    canvas.current.width = width
    canvas.current.height = height
    context.current = canvas.current.getContext("2d")
    canvas.current.addEventListener("mousemove", setFromEvent);
    let rect = canvas.current.getBoundingClientRect();
    let x = rect.left;
    let y = rect.top
    boundary.current.x = x;
    boundary.current.y = y;
    boundary.current.width = width;
    boundary.current.height = height

    giveBirth({x:300, y:400},numberOfBirths,colors)

  }
  const animate = ()=>{
    requestRef.current = requestAnimationFrame(animate);
    context.current.clearRect(0,0,window.innerWidth,window.innerHeight)

    for(let i  = 0 ; i <  fireflies.length ; i++){
      fireflies[i].draw(context.current)
      fireflies[i].update(boundary.current)

        if(fireflies[i].globalAlpha < 0.01 ){
          fireflies.splice(i,1) //remove the dead firefly from array
        }

    }

  }

return (<Canvas canvasRef={canvas} ></Canvas>)
}
export default ReactFirefly;
