import { Position, Velocity, DirectionTurner, Dimension } from "../interfaces/firefly";
export declare class Firefly {
    position: Position;
    velocity: Velocity;
    color: string;
    size: Dimension;
    globalAlpha: number;
    dyingRate: number;
    stepCounter: number;
    randomMotion: boolean;
    changeDirectionFrequency: number;
    directionTurner: DirectionTurner;
    constructor(position: Position | null, velocity: Velocity | null, directionTurner: DirectionTurner | null, changeDirectionFrequency: number | null, color: string | null, size: Dimension | null, dyingRate: number | null, randomMotion: boolean | null);
    update(boundary: any): void;
    resolve(boundary: any): void;
    draw(context: any): void;
    changeDirecton(): void;
}
