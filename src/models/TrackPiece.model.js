
export const TrackPiece = function(
    points,
    edges = []
){
    this.points = points;
    this.edges = edges;
    Object.freeze(this);
}

export const P = function(x,z){
    this.x = x;
    this.z = z;
    Object.freeze(this);
}

export const E = function(startX,startZ,endX,endZ){
    this.start = new P(startX,startZ);
    this.end = new P(endX,endZ);
    this.m = null;
    this.c = null;
    Object.seal(this);
}
