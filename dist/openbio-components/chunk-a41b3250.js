import{b as r,c as e}from"./chunk-b9a2c549.js";var n=e(r(function(r,e){Object.defineProperty(e,"__esModule",{value:!0}),e.changeDpiBlob=function(r,e){var n=r.slice(0,33);return new Promise(function(t,a){var i=new FileReader;i.onload=function(){var n=new Uint8Array(i.result),a=r.slice(33),o=s(n,e,r.type);t(new Blob([o,a],{type:r.type}))},i.readAsArrayBuffer(n)})},e.changeDpiDataUrl=function(r,e){var n,u,A=r.split(","),c=A[0],v=A[1],l=void 0,d=void 0,h=!1;if(-1!==c.indexOf(t)){l=t;var y=(-1===(u=(n=v).indexOf(i))&&(u=n.indexOf(o)),-1===u&&(u=n.indexOf(f)),u);y>=0?(d=4*Math.ceil((y+28)/3),h=!0):d=44}-1!==c.indexOf(a)&&(l=a,d=24);for(var g=v.substring(0,d),p=v.substring(d),w=atob(g),b=new Uint8Array(w.length),C=0;C<b.length;C++)b[C]=w.charCodeAt(C);var m=s(b,e,l,h);return[c,",",btoa(String.fromCharCode.apply(String,function(r){if(Array.isArray(r)){for(var e=0,n=Array(r.length);e<r.length;e++)n[e]=r[e];return n}return Array.from(r)}(m))),p].join("")};var n=void 0,t="image/png",a="image/jpeg",i="AAlwSFlz",o="AAAJcEhZ",f="AAAACXBI",u="p".charCodeAt(0),A="H".charCodeAt(0),c="Y".charCodeAt(0),v="s".charCodeAt(0);function s(r,e,i,o){if(i===a)return r[13]=1,r[14]=e>>8,r[15]=255&e,r[16]=e>>8,r[17]=255&e,r;if(i===t){var f=new Uint8Array(13);e*=39.3701,f[0]=u,f[1]=A,f[2]=c,f[3]=v,f[4]=e>>>24,f[5]=e>>>16,f[6]=e>>>8,f[7]=255&e,f[8]=f[4],f[9]=f[5],f[10]=f[6],f[11]=f[7],f[12]=1;var s=function(r){var e=-1;n||(n=function(){for(var r=new Int32Array(256),e=0;e<256;e++){for(var n=e,t=0;t<8;t++)n=1&n?3988292384^n>>>1:n>>>1;r[e]=n}return r}());for(var t=0;t<r.length;t++)e=n[255&(e^r[t])]^e>>>8;return-1^e}(f),l=new Uint8Array(4);if(l[0]=s>>>24,l[1]=s>>>16,l[2]=s>>>8,l[3]=255&s,o){var d=function(r){for(var e=r.length-1;e>=4;e--)if(9===r[e-4]&&r[e-3]===u&&r[e-2]===A&&r[e-1]===c&&r[e]===v)return e-3}(r);return r.set(f,d),r.set(l,d+13),r}var h=new Uint8Array(4);h[0]=0,h[1]=0,h[2]=0,h[3]=9;var y=new Uint8Array(54);return y.set(r,0),y.set(h,33),y.set(f,37),y.set(l,50),y}}}));export{n as a};