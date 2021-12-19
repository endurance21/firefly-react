/**
 * convert cordinate from polar to cartesian.
 * @param {Number} r - radius of polar point.
 * @param {Number} theta - angle of polar point.
 * @returns {Object} cartesian cordinate.
 */
export declare function polarToCartesian(r: number, theta: number): {
    x: number;
    y: number;
};
/**
 * convert cordinate from cartesian to polar .
 * @param {Number} x - x-cordinate of the pont.
 * @param {Number} y - y-cordinate of the point.
 * @returns {Object} polar cordinate.
 */
export declare function cartesianToPolar(x: number, y: number): {
    r: number;
    theta: number;
};
/**
 *  normalizes the given angle
 * @param {Number} theta - angle with x axis.
 * @returns {Number} the same angle if its positive and normalized if it is negatives
 */
export declare function normalizeAngle(theta: any): any;
/**
 * Perfoms addition of two vector that are in polar forms.
 * @param {Object}   vector1 - first vector.
 * @param {Object}     vector2 - second vector.
 * @returns {Object} new vector in polar form.
 */
export declare function vectorSumPolar(vector1: any, vector2: any): {
    r: number;
    theta: any;
};
/**
 * converts degree to radian.
 * @param {Number} degree - angle given in degree
 * @returns {Number} angle in Radian.
 */
export declare function degreeToRadian(degree: any): number;
/**
 * converts radian to degree
 * @param {Number} radian - angle given in radian.
 * @returns {Number} angle in degree.
 */
export declare function radianToDegree(radian: any): any;
/**
 * checks if angle becomes greater than 360 bound.
 * @param {Number} degree - angle given in degree
 * @returns {Number}    inbound angle
 */
export declare function inBound(degree: any): any;
