const t=window.OpenbioComponents.h;import{a as e}from"./chunk-12b05e12.js";class r{getText(){return e(this.first,this.middle,this.last)}render(){return t("div",null,"Hello, World! I'm ",this.getText())}static get is(){return"my-component"}static get encapsulation(){return"shadow"}static get properties(){return{first:{type:String,attr:"first"},last:{type:String,attr:"last"},middle:{type:String,attr:"middle"}}}static get style(){return""}}export{r as MyComponent};