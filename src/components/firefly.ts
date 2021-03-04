import { textSpanIsEmpty } from "typescript";
import {Position, Velocity, Dimension} from "./interfaces"
export class Firefly {
    position: Position;
    velocity: Velocity;
    color: string;
    size: Dimension;
    life: number;
    lifeExpectancy: number;

    constructor( position: Position, velocity: Velocity, color: string | "red", size: Dimension, life: number, lifeExpectancy: number){
        this.position = position
        this.velocity = velocity
        this.color = color
        this.size = size 
        this.life = life
        this.lifeExpectancy = lifeExpectancy
    }


    update(){
        this.position.r+=this.velocity.dr;
        this.position.theta+=this.velocity.dtheta;

        this.life*=this.lifeExpectancy;
    }

    draw(){

    }
    

};