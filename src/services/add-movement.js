
import dillx from "dillx";

import { Cinnamon } from "cinnamon-library";

import { doLinesCollide } from "./do-lines-collide.service";

const jumpLinear = 2;
const jumpSide = 3;

export const addMovement = (cinnamon,edges) => {

    let movementLinear = null;
    let movementSide = null;

    const movementsLinear = [
// Forward
        () => {
            const dZ = Math.cos(cinnamon.dir_zx / Cinnamon.RADIANS) * jumpLinear;
            const dX = Math.sin(cinnamon.dir_zx / Cinnamon.RADIANS) * jumpLinear;
            let hits = false;
            edges.forEach(edge=>{
                if (hits) {
                    return;
                }
                hits = doLinesCollide(edge,{start:{x:cinnamon.x,z:cinnamon.z},end:{x:cinnamon.x+dX,z:cinnamon.z+dZ}})
            });
            if (hits) {
                return;
            }
            cinnamon.z += dZ;
            cinnamon.x += dX;
        },
// Back
        () => {
            const dZ = Math.cos(cinnamon.dir_zx / Cinnamon.RADIANS) * jumpLinear;
            const dX = Math.sin(cinnamon.dir_zx / Cinnamon.RADIANS) * jumpLinear;
            let hits = false;
            edges.forEach(edge=>{
                if (hits) {
                    return;
                }
                hits = doLinesCollide(edge,{start:{x:cinnamon.x,z:cinnamon.z},end:{x:cinnamon.x-dX,z:cinnamon.z-dZ}})
            });
            if (hits) {
                return;
            }
            cinnamon.z -= dZ;
            cinnamon.x -= dX;
        }
    ];
    const movementsSide = [
// Twist left
        () => {
            cinnamon.dir_zx -= jumpSide;
        },
// Twist right
        () => {
            cinnamon.dir_zx += jumpSide;
        }
    ];

    setInterval(()=>{
        if (movementLinear instanceof Function) {
            movementLinear();
        }
        if (movementSide instanceof Function) {
            movementSide();
        }
        if (movementLinear instanceof Function || movementSide instanceof Function) {
            cinnamon.reset();
            cinnamon.render();
            dillx.change(dillx.apps[0][0].childTemplates[0].childTemplates[3]);
            dillx.change(dillx.apps[0][0].childTemplates[0].childTemplates[1]);
        }
    },1000/15);

    const keyup = event=>{
        const key = event.which;
        if (key !== 37 && key !== 38 && key !== 39 && key !== 40) {
            return;
        }
        if (key === 37) {
            movementSide = null;
        }
        if (key === 38) {
            movementLinear = null;
        }
        if (key === 39) {
            movementSide = null;
        }
        if (key === 40) {
            movementLinear = null;
        }
    }

    const keydown = event=>{
        const key = event.which;
        if (key !== 37 && key !== 38 && key !== 39 && key !== 40) {
            return;
        }
        if (key === 37) {
            movementSide = movementsSide[0];
        }
        if (key === 38) {
            movementLinear = movementsLinear[0];
        }
        if (key === 39) {
            movementSide = movementsSide[1];
        }
        if (key === 40) {
            movementLinear = movementsLinear[1];
        }
    }

    document.body.addEventListener("keyup",keyup);
    document.body.addEventListener("keydown",keydown);

    return () => {
        keyup({which:37});
        keyup({which:38});
        keyup({which:39});
        keyup({which:40});
        document.body.removeEventListener("keyup",keyup);
        document.body.removeEventListener("keydown",keydown);
    }
}