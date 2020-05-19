
import { EasierTrack, createTrackPolygons, getEdges } from "../../services/track.service";

const l = 50;

const track = new EasierTrack(-10,0,0,20)
    .piece(l/2,45)
    .piece(l,45)
    .piece(l,45)
    .piece(l,45)
    .piece(l,45)
    .piece(l,45)
    .piece(l,45)
    .piece(l,45)
    .piece(l/2)
    .pieces;

export const track02 = {
    name: "The Octagon",
    edges: getEdges(track),
    _3D: createTrackPolygons(track)
};
