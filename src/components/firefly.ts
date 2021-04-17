import {Position, Velocity, Dimension} from "../interfaces/firefly"
import {polarToCartesian } from "../helpers/cordinatesConversion"
export class Firefly {
    position: Position;
    velocity: Velocity;
    color: string;
    size: Dimension;
    life: number;
    globalAlpha:number
    dyingRate: number;

    constructor( position: Position | null, velocity: Velocity | null , color: string | null, size: Dimension | null, life: number | null, dyingRate: number | null){
        this.position = position || {r:100, theta:20}
        this.velocity = velocity || {dr:.5, dtheta:0.2}
        this.color = color || "red"
        this.size = size || {width:5, height:5}
        this.life = life || 2000 // 2 seconds
        this.dyingRate =  dyingRate || 1.1
        this.globalAlpha = 1;
    }


    update(){
        this.position.r+=this.velocity.dr;
        this.position.theta+=this.velocity.dtheta;

        this.globalAlpha/=this.dyingRate;
    }

    draw(context:any){
        if(!context)
        return
        let {x,y} = polarToCartesian(this.position.r, this.position.theta)
        let {width, height} = this.size
        context.beginPath();
        context.globalAlpha = this.globalAlpha
        context.shadowBlur = 2;
        context.shadowColor = "white";
        context.fillStyle = this.color
        context.arc(x, y, width, 0, Math.PI*2,false)
        context.fill()
        context.closePath()
    }


};