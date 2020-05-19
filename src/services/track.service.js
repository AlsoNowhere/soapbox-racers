
import { Cinnamon } from "cinnamon";

import { TrackPiece, P, E } from "../models/TrackPiece.model";

const edgeHeight = 1;

export const createTrackPolygons = track => {
    const arr = [];
    track.forEach(piece=>{
        arr.push(new Cinnamon.Polygon(piece.points.map(point=>new Cinnamon.Point(point.x,0,point.z)),{colour:"#444"}));
        piece.edges.forEach(edge=>{
            arr.push(new Cinnamon.Polygon([
                new Cinnamon.Point(edge.start.x,0,edge.start.z),
                new Cinnamon.Point(edge.start.x,edgeHeight,edge.start.z),
                new Cinnamon.Point(edge.end.x,edgeHeight,edge.end.z),
                new Cinnamon.Point(edge.end.x,0,edge.end.z),
            ],{colour:"green"}));
        });
    });

    return arr;
};

export const getEdges = track => track.reduce((a,b)=>(a.push(...b.edges),a),[]);

const easyTrack = (x1,z1,x2,z2,x3,z3,x4,z4) => new TrackPiece([ new P(x1,z1), new P(x2,z2), new P(x3,z3), new P(x4,z4) ], [ new E(x2,z2,x3,z3), new E(x1,z1,x4,z4) ]);

export const EasierTrack = function(x,z,angle=0,width=10){
    this.x1 = x;
    this.z1 = z;
    this.x2 = x + Math.cos(angle / Cinnamon.RADIANS) * width;
    this.z2 = z + Math.sin(angle / Cinnamon.RADIANS) * width;
    this.angle = angle;
    this.width = width;

    this.pieces = [];

    this.piece = function(length,dAngle=0){
        const dX = Math.sin(this.angle / Cinnamon.RADIANS) * length;
        const dZ = Math.cos(this.angle / Cinnamon.RADIANS) * length;
        const newObj = {
            x1: this.x1 + dX,
            z1: this.z1 + dZ,
            x2: this.x2 + dX,
            z2: this.z2 + dZ
        }
        this.pieces.push(
            easyTrack(
                this.x1,this.z1,
                this.x2,this.z2,
                newObj.x2,newObj.z2,
                newObj.x1,newObj.z1,
            )
        );
        const {x1,z1,x2,z2} = newObj;
        this.x1 = newObj.x1;
        this.z1 = newObj.z1;
        this.x2 = newObj.x2;
        this.z2 = newObj.z2;
        this.angle += dAngle;
        if (dAngle > 0) {
            this.x1 = this.x2 - Math.cos(this.angle / Cinnamon.RADIANS) * this.width;
            this.z1 = this.z2 + Math.sin(this.angle / Cinnamon.RADIANS) * this.width;
            this.pieces.push(
                new TrackPiece([ new P(x1,z1), new P(x2,z2), new P(this.x1,this.z1) ], [ new E(x1,z1,this.x1,this.z1) ])
            );
        }
        else if (dAngle < 0) {
            this.x2 = this.x1 + Math.cos(-this.angle / Cinnamon.RADIANS) * this.width;
            this.z2 = this.z1 + Math.sin(-this.angle / Cinnamon.RADIANS) * this.width;
            this.pieces.push(
                new TrackPiece([ new P(x1,z1), new P(x2,z2), new P(this.x2,this.z2) ], [ new E(x2,z2,this.x2,this.z2) ])
            );
        }
        return this;
    }

    this.setWidth = function(width){
        this.width = width;
        return this;
    }
}