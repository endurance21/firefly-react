import React,{MutableRefObject} from "react"

type props = {
  canvasRef :any
  className:string
}

        
/**
 * React component wrapper for actual html5Canvas element.
 * @constructor
 */
export default function Canvas(props:props):JSX.Element{
  return (<canvas ref={props.canvasRef} className={props.className}></canvas>)
}
