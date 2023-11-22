(function(o,s){typeof exports=="object"&&typeof module<"u"?s(exports):typeof define=="function"&&define.amd?define(["exports"],s):(o=typeof globalThis<"u"?globalThis:o||self,s(o["vite-zero-env-plugin"]={}))})(this,function(o){"use strict";function s(e={envPath:".",indexPath:"./index.html",defaultDesc:!1,envDesc:()=>""}){let t={},i={};return e.envPath||(e.envPath="."),e.indexPath||(e.indexPath="./index.html"),{name:"vite-zero-env-plugin",config(c,n){console.log(__dirname),t=c,i=n},buildStart(){const c=m(e.envPath+`/.env.${i.mode}`);h(c,e.indexPath),g.call(this,e.indexPath,e.defaultDesc?x:e.envDesc,t,i)}}}function m(e){return require("fs").readFileSync(e,"utf-8").split(`
`).filter(n=>n.trim()!=="").reduce((n,f)=>{const[r,d]=f.split("=");return n[r.trim()]=d.trim(),n},{})}function h(e,t){const i=require("fs"),n=i.readFileSync(t,"utf-8").replace(/<env%(.*)%env>/g,(f,r)=>(console.log(`
     zero-env-plugin: inject ${r} to index.html
    `),e[r.trim()]||r));i.writeFileSync(t,n)}function g(e,t=()=>"",i,c){const n=require("fs"),f=n.readFileSync("./package.json","utf-8"),{version:r,name:d}=JSON.parse(f);let l=t({date:new Date().toLocaleString(),mode:c.mode,version:r,name:d});if(!l)return;l=`<!--zero-env ${l} zero-env-->`;const a=n.readFileSync(e,"utf-8"),v=a.match(/<!--zero-env([\s\S]*?)zero-env-->/);let u="";v?u=a.replace(v[0],l):u=a.replace(/<!DOCTYPE html>/g,l+`
<!DOCTYPE html>`),n.writeFileSync(e,u)}function x(e){return`
    发布日期：${e.date}
    项目名称：${e.name}
    环境：${e.mode}
    版本：${e.version}
    `}o.ZeroEnv=s,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
