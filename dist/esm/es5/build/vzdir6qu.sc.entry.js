import{h}from"../openbio-components.core.js";import"./chunk-e4627dab.js";import{a as format}from"./chunk-0ec96311.js";var MyComponent=function(){function e(){}return e.prototype.getText=function(){return format(this.first,this.middle,this.last)},e.prototype.render=function(){return h("div",null,"Hello, World! I'm ",this.getText())},Object.defineProperty(e,"is",{get:function(){return"my-component"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{first:{type:String,attr:"first"},last:{type:String,attr:"last"},middle:{type:String,attr:"middle"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return""},enumerable:!0,configurable:!0}),e}();export{MyComponent};