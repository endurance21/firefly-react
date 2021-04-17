import React,{useRef, useState, useEffect} from "react"
import useMouse from '@react-hook/mouse-position'

import Canvas from "./components/canvas"
import  {Firefly} from "./components/firefly"
import {cartesianToPolar} from "./helpers/cordinatesConversion"
import { Console } from "node:console"

type props ={
  numberOfBirths :number
}
const fireflies  :Firefly[] = []

const ReactFirefly = (props)=>{
  let {numberOfBirths} = props
  const canvas = useRef<HTMLCanvasElement>()
  const context = useRef(null)
  const requestRef = useRef(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
     context.current = canvas.current.getContext("2d")
    init()
    // animate()
    requestRef.current = requestAnimationFrame(animate);
    const setFromEvent = (e) =>{
      setMousePosition({ x: e.clientX, y: e.clientY });
      console.log(e.x,e.y)
    }
    canvas.current.addEventListener("mousemove", setFromEvent);
    return () => {
      cancelAnimationFrame(requestRef.current);
      canvas.current.removeEventListener("mousemove", setFromEvent);
    }
  }, []);

  useEffect(() => {
   giveBirth(mousePosition)
 }, [mousePosition]);

  const init = ()=>{
    canvas.current.width = window.innerWidth
    canvas.current.height = window.innerHeight
    giveBirth({x:300, y:400})

  }
  const animate = ()=>{
    requestRef.current = requestAnimationFrame(animate);
    context.current.clearRect(0,0,window.innerWidth,window.innerHeight)
    for(let i  = 0 ; i <  fireflies.length ; i++){
      fireflies[i].draw(context.current)
      fireflies[i].update()

        if(fireflies[i].globalAlpha < 0.001 ){
          console.log("sdf")
          delete fireflies[i]
        }

    }
    console.log(fireflies.length)

  }
  const giveBirth = (mouse)=>{
    let {x,y} = mouse
    if(x === null || y === null)
    return
    let {r, theta} = cartesianToPolar(x, y)
    for(let i = 0;i<numberOfBirths;i++){
      let velocity = {dr:(Math.random()*2 +.5),dtheta:(Math.random() - 0.5)}
      let firefly = new Firefly({r,theta},velocity,null,null,null,null)
      fireflies.push(firefly)
    }


  }
return (<Canvas canvasRef={canvas}></Canvas>)
}
export default ReactFirefly;
