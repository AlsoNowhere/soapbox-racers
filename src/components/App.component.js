
import dillx from "dillx";

import { Cinnamon } from "cinnamon-library";

import { distance } from "../constants/values";

import { addMovement } from "../services/add-movement";

import { track01 } from "../data/tracks/track-01";
import { track02 } from "../data/tracks/track-02";
import { track03 } from "../data/tracks/track-03";
import { track04 } from "../data/tracks/track-04";

let track = track04;

export const App = function(){

    this.oninit = function(){

        this.cinnamon = new Cinnamon(
            this.svgelement,
            distance.z
        )
        .addDefaultSettings(
            new Cinnamon.Settings(
                new Cinnamon.Point(0,3,0)
            )
        );

        this.cinnamon.addPolygons(track._3D);
        this.cinnamon.reset();
        this.cinnamon.render();
        this.reset = addMovement(this.cinnamon,track.edges);
    }

    this.cinnamon = null;
    this.svgelement = null;
    this.reset = null;

    this.dir_zx = function(){ return this.cinnamon.dir_zx; }
    this.x = function(){ return Math.round(this.cinnamon.x); }
    this.z = function(){ return Math.round(this.cinnamon.z); }
    this.cx = function(){ return Math.round(this.cinnamon.x) + 200; }
    this.cy = function(){ return 288 - (Math.round(this.cinnamon.z) - 50); }

    this.tracks = [
        track01,
        track02,
        track03,
        track04,
    ].map((x,i)=>({
        label: x.name,
        value: i,
        track: x
    }));

    this.onChange = function(){
        track = this._item.track;

        this.reset();
        this.cinnamon.x = 0;
        this.cinnamon.y = 3;
        this.cinnamon.z = 0;
        this.cinnamon.dir_zx = 0;
        this.cinnamon.dir_y = 0;

        this.cinnamon.polygons.length = 0;
        this.cinnamon.addPolygons(track._3D);
        this.cinnamon.reset();
        this.cinnamon.render();
        this.reset = addMovement(this.cinnamon,track.edges);

        document.activeElement && document.activeElement.blur();
    }

    return dillx(
        <main>
            <svg svgelement---></svg>
            <div class="fixed pinned top right">
                <p>ZX: {dir_zx}</p>
                <p>X: {x}</p>
                <p>Z: {z}</p>
                <form>
                    <fieldset>
                        <legend>Change track</legend>
                        <label dill-for="tracks">
                            <input type="radio" name="track" value-="value" checked-={this.track === track} change--="onChange" />
                            <span>{label}</span>
                        </label>
                    </fieldset>
                </form>
            </div>
        </main>
    );
}        
