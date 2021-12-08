/**
 * convert cordinate from polar to cartesian.
 * @param {Number} r - radius of polar point.
 * @param {Number} theta - angle of polar point.
 * @returns {Object} cartesian cordinate.
 */

export function polarToCartesian(r:number, theta:number){

    let x = r*Math.cos(theta*Math.PI/180);
    let y = r*Math.sin(theta*Math.PI/180);
    return {x,y}
}
/**
 * convert cordinate from cartesian to polar .  
 * @param {Number} x - x-cordinate of the pont.
 * @param {Number} y - y-cordinate of the point.
 * @returns {Object} polar cordinate.
 */

export function cartesianToPolar(x:number,y:number){

    let r = Math.sqrt(x*x + y*y)
    let theta = Math.atan2(y,x) // in degree
    theta = normalizeAngle(theta)
    return {r,theta}
}

/**
 *  normalizes the given angle 
 * @param {Number} theta - angle with x axis.
 * @returns {Number} the same angle if its positive and normalized if it is negatives
 */

export function normalizeAngle(theta){
 return radianToDegree((theta >= 0 ? theta : (2*Math.PI + theta)))
}


/**
 * Perfoms addition of two vector that are in polar forms.
 * @param {Object}   vector1 - first vector.
 * @param {Object}     vector2 - second vector.
 * @returns {Object} new vector in polar form.
 */
export function vectorSumPolar(vector1,vector2){
    let {r:r1,theta:theta1} = vector1
    let {r:r2,theta:theta2} = vector2
    let r = Math.sqrt(r1*r1 + r2*r2 + 2*r1*r2*Math.cos(degreeToRadian(theta1 - theta2)))
    let theta =  inBound(theta1 + normalizeAngle(Math.atan2(r2*Math.sin(degreeToRadian(theta2-theta1)), r1 +  r2*Math.cos(degreeToRadian(theta2-theta1)))))

    return {r,theta}

}

/**
 * converts degree to radian. 
 * @param {Number} degree - angle given in degree
 * @returns {Number} angle in Radian.
 */
export function degreeToRadian(degree){
    return degree*Math.PI/180
}
/**
 * converts radian to degree  
 * @param {Number} radian - angle given in radian.
 * @returns {Number} angle in degree.
 */
export function radianToDegree(radian){
    return inBound((radian*180/Math.PI))
}
/**
 * checks if angle becomes greater than 360 bound.
 * @param {Number} degree - angle given in degree
 * @returns {Number}    inbound angle
 */
export function inBound(degree){
    return (degree <=360 ? degree : degree % 360)
}
