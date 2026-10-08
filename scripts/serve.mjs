import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { root } from './catalog.mjs';
const base=path.join(root,'dist');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.gif':'image/gif','.mp4':'video/mp4','.webm':'video/webm'};
http.createServer(async(req,res)=>{
 try{const url=new URL(req.url,'http://localhost');let name=decodeURIComponent(url.pathname);if(name.endsWith('/'))name+='index.html';const filename=path.resolve(base,'.'+name);if(!filename.startsWith(base+path.sep)){res.writeHead(403);res.end();return;}const data=await readFile(filename);res.writeHead(200,{'Content-Type':mime[path.extname(filename)]||'application/octet-stream'});res.end(data);}
 catch{res.writeHead(404,{'Content-Type':mime['.html']});res.end(await readFile(path.join(base,'404.html')));}
}).listen(4173,'127.0.0.1',()=>console.log('Depois do Deploy: http://127.0.0.1:4173'));
