import {build} from "esbuild";


await build({
    entryPoints:['src/index.ts'],
    bundle:true,
    platform:'node',
    target:"node20",
    outfile:'dist/index.js',
    // sourcemap:true,
    minify:true
})