import React ,{ReactNode, useState, useEffect} from "react"
import useMouse from '@react-hook/mouse-position'

import {Firefly} from "./components/firefly"

import Canvas from "./components/canvas"

interface props {
    numberOfFireflies: number,
    colorArray: Array<string>,
    speed: number,
    blinkSpeed: number
}
interface MousePosition {
    x:number,
    y:number
}

export default function ReactFirefly(props: props):ReactNode {
    const [fireFlies, setFireFlies] = useState<Array<Firefly>|null>(null);
    // const [mousePosition, setMousePosition] = useState<MousePosition>();
    const ref = React.useRef(null)
    const mouse = useMouse(ref, {
        enterDelay: 100,
        leaveDelay: 100,
    })

   useEffect(()=>{


   },[mousePosition])

   animate(){
       requestAnimationFrame(animate)
       render()
   }


    return (<Canvas ref={ref}></Canvas>)
} 