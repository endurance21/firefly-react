export declare function polarToCartesian(r: number, theta: number): {
    x: number;
    y: number;
};
export declare function cartesianToPolar(x: number, y: number): {
    r: number;
    theta: number;
};
export declare function normalizeAngle(theta: any): any;
export declare function vectorSumPolar(vector1: any, vector2: any): {
    r: number;
    theta: any;
};
export declare function degreeToRadian(degree: any): number;
export declare function radianToDegree(radian: any): any;
export declare function inBound(degree: any): any;
