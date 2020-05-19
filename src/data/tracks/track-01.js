
import { EasierTrack, createTrackPolygons, getEdges } from "../../services/track.service";

const track = new EasierTrack(-5,0,0,10)
    .piece(30,30)
    .piece(30,30)
    .piece(30,-60)
    .piece(30)
    .pieces;

export const track01 = {
    name: "test track",
    edges: getEdges(track),
    _3D: createTrackPolygons(track)
};
