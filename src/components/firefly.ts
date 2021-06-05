import {Position, Velocity,DirectionTurner, Dimension} from "../interfaces/firefly"
import {polarToCartesian,cartesianToPolar,inBound } from "../helpers/cordinatesConversion"
import {getRandomInt} from "../helpers/random"
import {circleToLine} from "../helpers/collision"
export class Firefly {
    position: Position;
    velocity: Velocity;
    color: string;
    size: Dimension;
    globalAlpha:number
    dyingRate: number;

    stepCounter:number
    randomMotion:boolean
    changeDirectionFrequency:number;
    directionTurner:DirectionTurner;

    constructor( position: Position | null, velocity: Velocity | null,directionTurner: DirectionTurner | null, changeDirectionFrequency: number | null,color: string | null, size: Dimension | null, dyingRate: number | null,randomMotion:boolean|null){
        this.position = position || {x:100, y:20}
        this.velocity = velocity || {speed:.05, direction:45} //direction in degree
        this.color = color || "red"
        this.size = size || {width:3, height:5}
        this.dyingRate =  dyingRate || 1.01
        this.globalAlpha = 1;

        this.stepCounter = 0
        this.randomMotion = randomMotion == null ? false : randomMotion
        this.changeDirectionFrequency = getRandomInt(30,changeDirectionFrequency)
        this.directionTurner = directionTurner || {magnitude:2,direction:20}
    }


    update(boundary,context:any){
        //clear the last firefly from frame  to show a animation effect
        // context.clearRect(this.position.x - this.size.width*2, this.position.y-this.size.width*2, this.size.width*4, this.size.width*4)

        if(this.randomMotion){
            this.changeDirecton()
        }
        this.resolve(boundary)

        let {x:vx,y:vy} = polarToCartesian(this.velocity.speed,this.velocity.direction)

        this.position.x+=vx;
        this.position.y+=vy;
        this.stepCounter++;  //firefly  walked one more step

        this.globalAlpha/=this.dyingRate;

    }
    resolve(boundary){
        let {x:x1,y:y1,width,height} = boundary
        let {x,y} = this.position
        let {x:vx,y:vy} = polarToCartesian(this.velocity.speed, this.velocity.direction)
        if(x + this.size.width  >=  width - this.size.width && vx > 0){
            let {x:new_vx,y:new_vy} = circleToLine({x:vx,y:vy},{x:1,y:0})
            let {r,theta} = cartesianToPolar(new_vx,new_vy)
            this.velocity.speed = r;
            this.velocity.direction = theta;

        }
        if(x - this.size.width <= this.size.width && vx <0){
            let {x:new_vx,y:new_vy} = circleToLine({x:vx,y:vy},{x:1,y:0})
            let {r,theta} = cartesianToPolar(new_vx,new_vy)
            this.velocity.speed = r;
            this.velocity.direction = theta;


        }
        if(y + this.size.width >=  height - this.size.width&& vy>0){
            let {x:new_vx,y:new_vy} = circleToLine({x:vx,y:vy},{x:0,y:1})
            let {r,theta} = cartesianToPolar(new_vx,new_vy)
            this.velocity.speed = r;
            this.velocity.direction = theta;
        }
        if(y - this.size.width <=  this.size.width && vy<0){
            let {x:new_vx,y:new_vy} = circleToLine({x:vx,y:vy},{x:0,y:1})
            let {r,theta} = cartesianToPolar(new_vx,new_vy)
            this.velocity.speed = r;
            this.velocity.direction = theta;
        }
    }
    draw(context:any){

        let {x,y} =this.position
        let {width, height} = this.size
        context.beginPath();
        context.globalAlpha = this.globalAlpha
        context.shadowBlur = 5;
        context.shadowColor = this.color;
        context.fillStyle = this.color
        context.arc(x, y, width, 0, Math.PI*2,false)
        context.fill()
        context.closePath()
    }

    changeDirecton(){
        let turnIndirection = getRandomInt(-1,1)//left , straight ,right
        if(this.changeDirectionFrequency && this.stepCounter == this.changeDirectionFrequency ){
            this.velocity.direction +=turnIndirection*this.directionTurner.direction
            this.velocity.direction = inBound(this.velocity.direction)
            this.stepCounter = 0 //reset the step counter to track when next it has change its direction
        }

    }


};