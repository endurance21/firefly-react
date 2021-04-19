export function getRandomInt(min,max){
    if(min === null && max)
    return max
    if(max === null && min)
    return min
    let i = Math.floor(Math.random() * (max - min + 1)) + min;
    return i
}