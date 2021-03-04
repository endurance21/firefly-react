import { Position, Velocity, Dimension } from "./interfaces";
export declare class Firefly {
    position: Position;
    velocity: Velocity;
    color: string;
    size: Dimension;
    life: number;
    lifeExpectancy: number;
    update(): void;
    draw(): void;
}
