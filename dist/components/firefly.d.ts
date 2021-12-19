import { Position, Velocity, DirectionTurner, Dimension } from "../interfaces/firefly";
/**
 * Represents the firefly
 * @class
 */
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
    /**
     * Represents firfly constructor.
     * @constructor
     */
    constructor(position: Position | null, velocity: Velocity | null, directionTurner: DirectionTurner | null, changeDirectionFrequency: number | null, color: string | null, size: Dimension | null, dyingRate: number | null, randomMotion: boolean | null);
    /**
     * Updates the state of individual firefly
     * clears the last firefly from frame  to show a animation effect
     * @param {Object} contains the position and dimention of the canvas
     */
    update(boundary: any): void;
    /**
     * resolves any possible collision with other firefly
     * @param {Object} contains the position and dimention of the canvas
     */
    resolve(boundary: any): void;
    /**
     *  draws the the firefly onto the canvas
     * @param {Object} standard canvas2d context
     */
    draw(context: any): void;
    /**
     * Changes the direction of the firefly.
     * It turns the current velocity vector by some random amount ensuring the smooth walk simulation.
     */
    changeDirecton(): void;
}
