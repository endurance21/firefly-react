import React ,{ FC ,useRef,useState,useEffect} from "react"
import useMouse from '@react-hook/mouse-position'

// import {Firefly} from "./components/firefly"

import Canvas from "./components/canvas"

// interface props {
//     numberOfFireflies: number,
//     colorArray: Array<string>,
//     speed: number,
//     blinkSpeed: number
// }

function ReactFirefly() :JSX.Element {
    const [mousePosition, setMousePosition] = useState(0);
    useEffect(() => {
        console.log("i am born ");
        setInterval(() => {
 
          setMousePosition(tmp => tmp+1);
      }, 1000);
    }, []);
    // const canvasRef = useRef<HTMLCanvasElement| null>(null)
    // const mouse = useMouse(canvasRef, {
    //     enterDelay: 100,
    //     leaveDelay: 100,
    // })
    
    return (
 
     <div>
        {mousePosition}
 
     </div>
    )
    // const [fireFlies, setFireFlies] = useState<Array<Firefly>|null>(null);
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

export default ReactFirefly