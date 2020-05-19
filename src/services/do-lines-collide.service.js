
const getGradient = (x,y) => y/x;

const getIntercept = (y,x,m) => y - m * x;

const getDistance = (x,y) => Math.pow(Math.pow(x,2) + Math.pow(y,2),1/2);

export const doLinesCollide = (lineA,lineB) => {

    lineA.m = getGradient(lineA.end.x - lineA.start.x,lineA.end.z - lineA.start.z);
    lineB.m = getGradient(lineB.end.x - lineB.start.x,lineB.end.z - lineB.start.z);

    if (lineA.m === Infinity) {
        lineA.m = 1000000;
    }
    if (lineB.m === Infinity) {
        lineB.m = 1000000;
    }

    if (lineA.m === -Infinity) {
        lineA.m = -1000000;
    }
    if (lineB.m === -Infinity) {
        lineB.m = -1000000;
    }

    lineB.c = getIntercept(lineB.start.z,lineB.start.x,lineB.m);
    lineA.c = getIntercept(lineA.start.z,lineA.start.x,lineA.m);

    if (lineA.m === lineB.m) {
        return false;
    }

    const x = (lineB.c - lineA.c) / (lineA.m - lineB.m);
    const y = ((lineA.c * lineB.m) - (lineB.c * lineA.m)) / (lineB.m - lineA.m);

    const distance1 = getDistance(lineA.end.x-lineA.start.x,lineA.end.z-lineA.start.z);
    const startDistance1 = getDistance(x-lineA.start.x,y-lineA.start.z);
    const endDistance1 = getDistance(x-lineA.end.x,y-lineA.end.z);

    const distance2 = getDistance(lineB.end.x-lineB.start.x,lineB.end.z-lineB.start.z);
    const startDistance2 = getDistance(x-lineB.start.x,y-lineB.start.z);
    const endDistance2 = getDistance(x-lineB.end.x,y-lineB.end.z);

    if (
        startDistance1 < distance1
        && endDistance1 < distance1
        && startDistance2 < distance2
        && endDistance2 < distance2
    ) {
        return true;
    }

    return false;
}
