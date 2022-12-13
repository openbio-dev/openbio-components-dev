var __awaiter=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,o){function a(e){try{c(r.next(e))}catch(e){o(e)}}function s(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(a,s)}c((r=r.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}};OpenbioComponents.loadBundle("chunk-9e5f9309.js",["exports","./chunk-c2b72858.js","./chunk-e96cb8ad.js"],function(e,t,n){var r,i,o,a,s,c="http://"+t.constants.WS_HOST;n.getAppConfig().then(function(e){i=(r=e).serviceServerType+"://"+r.urls.apiService+":"+r.ports.apiService,o="http://"+r.urls.localService+":"+r.ports.localService,s=r.urls.authServicesUrl,a=!r.apiService&&!r.asyncPersistency}),e.getModalSettings=function(){return fetch(c+"/db/api/settings/"+t.constants.settingTypes.MODAL_SETTINGS,{method:"get",headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()})},e.authLog=function(e){return fetch(s+"/log/auth",{method:"post",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()})},e.fingerAuthenticate=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,fetch(s+"/auth?username=user01&password=E-(Q2hX:pmRugZQ",{method:"post",headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()})];case 1:return t.sent(),[2,fetch(s+"/finger/authenticate",{method:"post",body:JSON.stringify(e),headers:{"Content-Type":"application/json"},credentials:"include"}).then(function(e){return e.json()})]}})})},e.saveFingerFile=function(e,t){return __awaiter(this,void 0,void 0,function(){var s;return __generator(this,function(c){switch(c.label){case 0:return(s=new FormData).append("file",t),s.set("data",JSON.stringify(e)),i?[3,2]:[4,n.getAppConfig()];case 1:r=c.sent(),i=r.serviceServerType+"://"+r.urls.apiService+":"+r.ports.apiService,o="http://"+r.urls.localService+":"+r.ports.localService,a=!r.apiService&&!r.asyncPersistency,c.label=2;case 2:return[2,fetch((a?i:o)+"/db/api/biometries/finger-file",{method:"post",body:s}).then(function(e){return e.json()})]}})})},e.saveFingers=function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return i?[3,2]:[4,n.getAppConfig()];case 1:r=t.sent(),i=r.serviceServerType+"://"+r.urls.apiService+":"+r.ports.apiService,o="http://"+r.urls.localService+":"+r.ports.localService,a=!r.apiService&&!r.asyncPersistency,t.label=2;case 2:return[2,fetch((a?i:o)+"/db/api/biometries/fingers",{method:"post",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()})]}})})},e.getPeople=function(e,t){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(o){switch(o.label){case 0:return i?[3,2]:[4,n.getAppConfig()];case 1:r=o.sent(),i=r.serviceServerType+"://"+r.urls.apiService+":"+r.ports.apiService,s=r.urls.authServicesUrl,o.label=2;case 2:return[2,fetch(i+"/db/api/people-details/"+e+"/"+t,{method:"get",headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()})]}})})},e.getAnomalies=function(e,t){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(s){switch(s.label){case 0:return i?[3,2]:[4,n.getAppConfig()];case 1:r=s.sent(),i=r.serviceServerType+"://"+r.urls.apiService+":"+r.ports.apiService,o="http://"+r.urls.localService+":"+r.ports.localService,a=!r.apiService&&!r.asyncPersistency,s.label=2;case 2:return[2,fetch((a?i:o)+"/db/api/settings/anomalies/"+e+"?detached="+t).then(function(e){return e.json()})]}})})},e.getFlowOptions=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return i?[3,2]:[4,n.getAppConfig()];case 1:r=e.sent(),i=r.serviceServerType+"://"+r.urls.apiService+":"+r.ports.apiService,o="http://"+r.urls.localService+":"+r.ports.localService,a=!r.apiService&&!r.asyncPersistency,e.label=2;case 2:return[2,fetch((a?i:o)+"/device/flow-options").then(function(e){return e.json()})]}})})}});