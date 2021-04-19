export function circleToLine(velocity,line){
    let {x:x1,y:y1} = velocity
    let {x:x2,y:y2} = line
    let magnitude1 = Math.hypot(x1,y1);
    let  magnitude2 = Math.hypot(x2,y2)
    let  linesNormal = {x:-x2/magnitude2,y:y2/magnitude2}
    if(dotProduct(linesNormal,velocity) >0){
        linesNormal = {x:x2/magnitude2,y:-y2/magnitude2}
    }
    let linesTangent = {x:y2/magnitude2,y:x2/magnitude2}
    if(dotProduct(linesTangent,velocity > 0 )){
        linesTangent = {x:-y2/magnitude2,y:x2/magnitude2}
    }
   let sinTheta = Math.abs(dotProduct(linesNormal,velocity)/(magnitude2*magnitude1))
   let  cosTheta = Math.sqrt(1-sinTheta*sinTheta)
   let normalMagnitude = magnitude1*sinTheta;
   let tangentialMagnitude = magnitude2*cosTheta
   let normal = {x:linesNormal.x*normalMagnitude,y:linesNormal.y*normalMagnitude}
   let tangent = {x:linesTangent.x*tangentialMagnitude,y:linesTangent.y*tangentialMagnitude}

   return {x:normal.x+tangent.x,y:normal.y+tangent.y}

}
function dotProduct(vector1, vector2){

    return vector1.x *vector2.x + vector1.y *vector2.y
}