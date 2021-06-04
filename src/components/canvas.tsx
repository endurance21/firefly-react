import React,{MutableRefObject} from "react"
type props = {
  canvasRef :any
  className:string
}
export default function Canvas(props:props):JSX.Element{
  return (<canvas ref={props.canvasRef} className={props.className}></canvas>)
}