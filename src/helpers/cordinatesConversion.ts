export function polarToCartesian(r:number, theta:number){

    let x = r*Math.cos(theta*Math.PI/180);
    let y = r*Math.sin(theta*Math.PI/180);
    return {x,y}
}

export function cartesianToPolar(x:number,y:number){

    let r = Math.sqrt(x*x + y*y)
    let theta = Math.atan2(y,x) // in degree
    theta = normalizeAngle(theta)
    return {r,theta}
}

export function normalizeAngle(theta){
 return radianToDegree((theta >= 0 ? theta : (2*Math.PI + theta)))
}

export function vectorSumPolar(vector1,vector2){
    let {r:r1,theta:theta1} = vector1
    let {r:r2,theta:theta2} = vector2
    let r = Math.sqrt(r1*r1 + r2*r2 + 2*r1*r2*Math.cos(degreeToRadian(theta1 - theta2)))
    let theta =  inBound(theta1 + normalizeAngle(Math.atan2(r2*Math.sin(degreeToRadian(theta2-theta1)), r1 +  r2*Math.cos(degreeToRadian(theta2-theta1)))))

    return {r,theta}

}


export function degreeToRadian(degree){
    return degree*Math.PI/180
}
export function radianToDegree(radian){
    return inBound((radian*180/Math.PI))
}
export function inBound(degree){
    return (degree <=360 ? degree : degree % 360)
}