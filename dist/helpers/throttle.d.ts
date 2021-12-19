/**
 *standard function to implement the concept of throttling
 *if we move a mouse , every pixel we move it fires the mouse move event and in one 1second we would be moving too many pixels
 *which will inturn fire the mouse move event too many times which will produce too many particles at one time, which will
 *slow the rendering due to memory and runtime constraints of machine it is running on
 *so we need to deliberatly miss some mouse event fires
 *for example if in one move it fires the event 100 times we will only take 4-5 events thus improving the runtime rendering by lowering the number of particles generated
 *It also look visually appealing
 * @param {Function} func - the function argument tha need to throttled
 * @param {Number} limit - the allowed time limit
 * @returns {Function}  a function closure
 */
export declare const throttle: (func: any, limit: any) => () => void;
