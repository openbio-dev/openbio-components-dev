function t(t,e,i,h,a){const n=t&&t.getContext("2d");if(n){if(!e)return void n.clearRect(0,0,460,300);const r=new Image,c="data:image/charset=UTF-8;png;base64,"+e;n.drawVerticalLine=function(t,e,i,h){this.fillStyle=h,this.fillRect(t,e,1,i)};const d=function(t,e){const r=e.width/e.height,c=t.width/t.height;let d,g,o,s;r<c?(o=(t.width-(g=e.width*((d=t.height)/e.height)))/2,s=0):r>c?(o=0,s=(t.height-(d=e.height*((g=t.width)/e.width)))/2):(d=t.height,g=t.width,o=0,s=0);const l=n.createImageData(t.width,t.height);for(let t=l.data.length;--t>=0;)l.data[t]=0;n.putImageData(l,0,0),n.drawImage(e,o,s,g,d),h&&i&&n.drawVerticalLine(.575*h,o-60,d,i>1?"green":"red"),0===i&&n.drawVerticalLine(0,0,d,"white"),a&&a.eyes.length>0&&a.eyes.forEach(t=>{n.strokeStyle="red",n.beginPath(),n.arc(t.x,t.y,5,0,2*Math.PI),n.stroke()})};r.onload=function(){d(t,r)},r.src=c}}export{t as s};