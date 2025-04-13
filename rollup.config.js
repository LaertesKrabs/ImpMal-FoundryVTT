import fs from "fs";
import foundryPath from "./foundry-path.js";
import copy from "rollup-plugin-copy-watch";
import postcss from "rollup-plugin-postcss";
import jscc from "rollup-plugin-jscc";

let manifest = JSON.parse(fs.readFileSync("./system.json"));

let systemPath = foundryPath(manifest.id, manifest.compatibility.verified);

console.log("Bundling to " + systemPath);

export default {
    input: [`./src/${manifest.id}.js`],
    output: {
        dir : systemPath
    },
    watch : {
        clearScreen: true
    },
    plugins: [
        jscc({      
            values : {_ENV :  process.env.NODE_ENV}
        }),
        copy({
            targets : [
                {src : "./template.json", dest : systemPath},
                {src : "./system.json", dest : systemPath},
                {src : "./static/*", dest : systemPath},
            ],
            watch: process.env.NODE_ENV == "production" ? false : ["./static/*/**", "system.json", "template.json"]
        }),
        postcss({
            extract : `${manifest.id}.css`,
            plugins: []
        })
    ]
};