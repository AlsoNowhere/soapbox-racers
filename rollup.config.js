
// import { uglify } from "rollup-plugin-uglify";
import resolve from "@rollup/plugin-node-resolve";
import { dillx } from "rollup-plugin-dillx";

const output = {
    file: "./dist/app.js",
    format: "iife"
};

export default {
    input: "./src/main.js",
    output,
    plugins: [
        // process.env.BUILD === "production" && uglify(),
        dillx(),
        resolve()
    ],
    watch: {
        exclude: "node_modules/**"
    }
};
