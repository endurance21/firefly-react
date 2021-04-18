import {Position, Velocity,Acceleration, Dimension} from "../interfaces/firefly"
import {polarToCartesian,cartesianToPolar } from "../helpers/cordinatesConversion"
import {getRandomInt} from "../helpers/random"
export class Firefly {
    position: Position;
    velocity: Velocity;
    acceleration:Acceleration;
    color: string;
    size: Dimension;
    life: number;
    globalAlpha:number
    dyingRate: number;

    constructor( position: Position | null, velocity: Velocity | null,acceleration:Acceleration|null, color: string | null, size: Dimension | null, life: number | null, dyingRate: number | null){
        this.position = position || {x:100, y:20}
        this.velocity = velocity || {speed:.05, direction:45} //direction in degree
        this.acceleration = acceleration || {magnitude:0.5,direction:12}
        this.color = color || "red"
        this.size = size || {width:5, height:5}
        this.life = life || 2000 // 2 seconds
        this.dyingRate =  dyingRate || 1.01
        this.globalAlpha = 1;
    }


    update(boundary){
        if(this.velocity.direction >=360){
            this.velocity.direction = this.velocity.direction % 360
        }
        this.resolve(boundary)
        let direction = this.velocity.direction
        let limit ;
        if(direction >270 && direction <=360){
            limit = {min:270,max:360}
        }else if(direction>=0&&direction<=90){
            limit = {min:0,max:90}
        }
        else if(direction>90&& direction<=180){
            limit = {min:90,max:180}
        }
        else if(direction>180&&direction<=270){
            limit = {min:180,max:270}
        }else{
            console.log(direction)
        }
        let random = getRandomInt(1,20)
        if(random == 5){
            this.velocity = {speed:getRandomInt(2,3),direction:getRandomInt(limit.min,limit.max)}
            // if(this.velocity.direction >=360){
            //     this.velocity.direction = this.velocity.direction % 360
            // }
        }
        let {x:vx,y:vy} = polarToCartesian(this.velocity.speed,this.velocity.direction)
        // let {x:ax,y:ay} = polarToCartesian(this.acceleration.magnitude,this.acceleration.direction)
        // vx+=ax;
        // vy+=ay;

        this.position.x+=vx;
        this.position.y+=vy;

        this.globalAlpha/=this.dyingRate;
        // let {r,theta} = cartesianToPolar(vx,vy)

    }
    resolve(boundary){
        let {x:x1,y:y1,width,height} = boundary
        let {x,y} = this.position
        if(x + this.size.width  >= x1 + width - this.size.width){
            this.velocity.direction = 180 - 2*this.velocity.direction

        }
        if(x - this.size.width <= x1+this.size.width){
            this.velocity.direction = 180 - 2*this.velocity.direction

        }
        if(y + this.size.width >= y1 + height - this.size.width){
            this.velocity.direction = 180 - 2*this.velocity.direction
        }
        if(y - this.size.width <= y1 + this.size.width){
            this.velocity.direction = 180 - 2*this.velocity.direction
        }
    }
    draw(context:any){

        let {x,y} =this.position
        let {width, height} = this.size
        context.beginPath();
        context.globalAlpha = this.globalAlpha
        context.shadowBlur = 5;
        context.shadowColor = "red";
        context.fillStyle = this.color
        context.arc(x, y, width, 0, Math.PI*2,false)
        context.fill()
        context.closePath()
    }


};