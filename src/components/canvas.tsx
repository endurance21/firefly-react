import React,{MutableRefObject} from "react"
import "../styles.scss"
type props = {
  canvasRef :any
}
export default function Canvas(props):JSX.Element{
  return (<canvas ref={props.canvasRef} className="firefly-react-canvas"></canvas>)
}