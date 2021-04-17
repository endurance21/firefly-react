export function polarToCartesian(r:number, theta:number){

    let x = r*Math.cos(theta*Math.PI/180);
    let y = r*Math.sin(theta*Math.PI/180);
    return {x,y}
}

export function cartesianToPolar(x:number,y:number){

    let r = Math.sqrt(x*x + y*y)
    let theta = Math.atan2(y,x)*(180/Math.PI) // in degree
    return {r,theta}
}