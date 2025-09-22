"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[408],{2784:function(e,t,a){a.r(t),a.d(t,{default:function(){return n}});var r=a(7437),s=a(9102),o=a.n(s),i=a(2265);function n(){var e,t,a,s;let[n,l]=(0,i.useState)(!1),[d,c]=(0,i.useState)(!1),[u,p]=(0,i.useState)("type"),[f,m]=(0,i.useState)(null),[x,h]=(0,i.useState)(""),[b,y]=(0,i.useState)(""),[g,v]=(0,i.useState)(!1);if((0,i.useEffect)(()=>{l(!0)},[]),!n)return null;let j=[{id:"bug",label:"Report Bug",icon:"\uD83D\uDC1B",description:"Something not working?",placeholder:"Tell us what went wrong..."},{id:"feature",label:"Request Feature",icon:"✨",description:"Have an idea?",placeholder:"What feature would you like to see?"},{id:"praise",label:"Give Praise",icon:"\uD83D\uDC9C",description:"Love something?",placeholder:"What made you happy?"},{id:"question",label:"Ask Question",icon:"❓",description:"Need help?",placeholder:"What would you like to know?"}],w=async e=>{e.preventDefault(),v(!0),await new Promise(e=>setTimeout(e,1500)),h(""),y(""),m(null),p("type"),v(!1),c(!1)},k=e=>{m(e),p("message")};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("button",{onClick:()=>c(!d),"aria-label":"Open feedback widget",className:"jsx-94ab69ee1a687f4a "+"fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110 ".concat(d?"rotate-45":""),children:(0,r.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",className:"jsx-94ab69ee1a687f4a w-6 h-6 mx-auto",children:d?(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12",className:"jsx-94ab69ee1a687f4a"}):(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 6v6m0 0v6m0-6h6m-6 0H6",className:"jsx-94ab69ee1a687f4a"})})}),d&&(0,r.jsx)("div",{className:"jsx-94ab69ee1a687f4a fixed bottom-24 right-6 z-40 w-[420px] max-w-[calc(100vw-3rem)]",children:(0,r.jsx)("div",{className:"jsx-94ab69ee1a687f4a bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-800/50 overflow-hidden animate-slideUp",children:"type"===u?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"jsx-94ab69ee1a687f4a p-6 pb-4 border-b border-slate-800/50",children:[(0,r.jsx)("h3",{className:"jsx-94ab69ee1a687f4a text-xl font-light text-white mb-1",children:"How can we help?"}),(0,r.jsx)("p",{className:"jsx-94ab69ee1a687f4a text-slate-400 text-sm",children:"Choose an option below"})]}),(0,r.jsx)("div",{className:"jsx-94ab69ee1a687f4a grid grid-cols-2 gap-3 p-6",children:j.map(e=>(0,r.jsxs)("button",{onClick:()=>k(e.id),className:"jsx-94ab69ee1a687f4a group relative p-5 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/30 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105",children:[(0,r.jsx)("div",{className:"jsx-94ab69ee1a687f4a text-3xl mb-2",children:e.icon}),(0,r.jsx)("div",{className:"jsx-94ab69ee1a687f4a text-sm font-medium text-slate-200",children:e.label}),(0,r.jsx)("div",{className:"jsx-94ab69ee1a687f4a text-xs text-slate-400 mt-1",children:e.description}),(0,r.jsx)("div",{className:"jsx-94ab69ee1a687f4a absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/0 to-violet-600/0 group-hover:from-purple-600/5 group-hover:to-violet-600/5 transition-all duration-300 pointer-events-none"})]},e.id))})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"jsx-94ab69ee1a687f4a p-6 pb-4 border-b border-slate-800/50",children:[(0,r.jsxs)("button",{onClick:()=>p("type"),className:"jsx-94ab69ee1a687f4a flex items-center text-slate-400 hover:text-white mb-3 transition-colors",children:[(0,r.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",className:"jsx-94ab69ee1a687f4a w-4 h-4 mr-2",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7",className:"jsx-94ab69ee1a687f4a"})}),"Back"]}),(0,r.jsxs)("div",{className:"jsx-94ab69ee1a687f4a flex items-center",children:[(0,r.jsx)("span",{className:"jsx-94ab69ee1a687f4a text-3xl mr-3",children:null===(e=j.find(e=>e.id===f))||void 0===e?void 0:e.icon}),(0,r.jsxs)("div",{className:"jsx-94ab69ee1a687f4a",children:[(0,r.jsx)("h3",{className:"jsx-94ab69ee1a687f4a text-lg font-light text-white",children:null===(t=j.find(e=>e.id===f))||void 0===t?void 0:t.label}),(0,r.jsx)("p",{className:"jsx-94ab69ee1a687f4a text-slate-400 text-sm",children:null===(a=j.find(e=>e.id===f))||void 0===a?void 0:a.description})]})]})]}),(0,r.jsxs)("form",{onSubmit:w,className:"jsx-94ab69ee1a687f4a p-6 space-y-4",children:[(0,r.jsx)("div",{className:"jsx-94ab69ee1a687f4a",children:(0,r.jsx)("textarea",{value:x,onChange:e=>h(e.target.value),required:!0,rows:4,placeholder:null===(s=j.find(e=>e.id===f))||void 0===s?void 0:s.placeholder,autoFocus:!0,className:"jsx-94ab69ee1a687f4a w-full px-4 py-3 bg-slate-800/30 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"})}),(0,r.jsx)("div",{className:"jsx-94ab69ee1a687f4a",children:(0,r.jsx)("input",{type:"email",value:b,onChange:e=>y(e.target.value),placeholder:"Email (optional)",className:"jsx-94ab69ee1a687f4a w-full px-4 py-3 bg-slate-800/30 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"})}),(0,r.jsx)("button",{type:"submit",disabled:!x.trim()||g,className:"jsx-94ab69ee1a687f4a w-full py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-lg hover:from-purple-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200",children:g?(0,r.jsxs)("span",{className:"jsx-94ab69ee1a687f4a flex items-center justify-center",children:[(0,r.jsxs)("svg",{fill:"none",viewBox:"0 0 24 24",className:"jsx-94ab69ee1a687f4a animate-spin -ml-1 mr-3 h-5 w-5 text-white",children:[(0,r.jsx)("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4",className:"jsx-94ab69ee1a687f4a opacity-25"}),(0,r.jsx)("path",{fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",className:"jsx-94ab69ee1a687f4a opacity-75"})]}),"Sending..."]}):"Send Feedback"}),(0,r.jsxs)("p",{className:"jsx-94ab69ee1a687f4a text-xs text-slate-500 text-center",children:["Or email"," ",(0,r.jsx)("a",{href:"mailto:support@firstaidforads.com",className:"jsx-94ab69ee1a687f4a text-purple-400 hover:text-purple-300 transition-colors",children:"support@firstaidforads.com"})]})]})]})})}),(0,r.jsx)(o(),{id:"94ab69ee1a687f4a",children:"@-webkit-keyframes slideUp{from{opacity:0;-webkit-transform:translatey(20px);transform:translatey(20px)}to{opacity:1;-webkit-transform:translatey(0);transform:translatey(0)}}@-moz-keyframes slideUp{from{opacity:0;-moz-transform:translatey(20px);transform:translatey(20px)}to{opacity:1;-moz-transform:translatey(0);transform:translatey(0)}}@-o-keyframes slideUp{from{opacity:0;-o-transform:translatey(20px);transform:translatey(20px)}to{opacity:1;-o-transform:translatey(0);transform:translatey(0)}}@keyframes slideUp{from{opacity:0;-webkit-transform:translatey(20px);-moz-transform:translatey(20px);-o-transform:translatey(20px);transform:translatey(20px)}to{opacity:1;-webkit-transform:translatey(0);-moz-transform:translatey(0);-o-transform:translatey(0);transform:translatey(0)}}.animate-slideUp.jsx-94ab69ee1a687f4a{-webkit-animation:slideUp.3s ease-out;-moz-animation:slideUp.3s ease-out;-o-animation:slideUp.3s ease-out;animation:slideUp.3s ease-out}"})]})}},622:function(e,t,a){var r=a(2265),s=Symbol.for("react.element"),o=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,n=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function d(e,t,a){var r,o={},d=null,c=null;for(r in void 0!==a&&(d=""+a),void 0!==t.key&&(d=""+t.key),void 0!==t.ref&&(c=t.ref),t)i.call(t,r)&&!l.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===o[r]&&(o[r]=t[r]);return{$$typeof:s,type:e,key:d,ref:c,props:o,_owner:n.current}}t.Fragment=o,t.jsx=d,t.jsxs=d},7437:function(e,t,a){e.exports=a(622)},5925:function(e,t,a){let r,s;a.r(t),a.d(t,{CheckmarkIcon:function(){return Z},ErrorIcon:function(){return q},LoaderIcon:function(){return Y},ToastBar:function(){return en},ToastIcon:function(){return et},Toaster:function(){return eu},default:function(){return ep},resolveValue:function(){return N},toast:function(){return F},useToaster:function(){return B},useToasterStore:function(){return I}});var o,i=a(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,p=(e,t)=>{let a="",r="",s="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?a=o+" "+i+";":r+="f"==o[1]?p(i,o):o+"{"+p(i,"k"==o[1]?"":t)+"}":"object"==typeof i?r+=p(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=p.p?p.p(o,i):o+":"+i+";")}return a+(t&&s?t+"{"+s+"}":s)+r},f={},m=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+m(e[a]);return t}return e},x=(e,t,a,r,s)=>{var o;let i=m(e),n=f[i]||(f[i]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(i));if(!f[n]){let t=i!==e?e:(e=>{let t,a,r=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?r.shift():t[3]?(a=t[3].replace(u," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(u," ").trim();return r[0]})(e);f[n]=p(s?{["@keyframes "+n]:t}:t,a?"":"."+n)}let l=a&&f.g?f.g:null;return a&&(f.g=f[n]),o=f[n],l?t.data=t.data.replace(l,o):-1===t.data.indexOf(o)&&(t.data=r?o+t.data:t.data+o),n},h=(e,t,a)=>e.reduce((e,r,s)=>{let o=t[s];if(o&&o.call){let e=o(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+r+(null==o?"":o)},"");function b(e){let t=this||{},a=e.call?e(t.p):e;return x(a.unshift?a.raw?h(a,[].slice.call(arguments,1),t.p):a.reduce((e,a)=>Object.assign(e,a&&a.call?a(t.p):a),{}):a,l(t.target),t.g,t.o,t.k)}b.bind({g:1});let y,g,v,j=b.bind({k:1});function w(e,t){let a=this||{};return function(){let r=arguments;function s(o,i){let n=Object.assign({},o),l=n.className||s.className;a.p=Object.assign({theme:g&&g()},n),a.o=/ *go\d+/.test(l),n.className=b.apply(a,r)+(l?" "+l:""),t&&(n.ref=i);let d=e;return e[0]&&(d=n.as||e,delete n.as),v&&d[0]&&v(n),y(d,n)}return t?t(s):s}}var k=e=>"function"==typeof e,N=(e,t)=>k(e)?e(t):e,E=(r=0,()=>(++r).toString()),C=()=>{if(void 0===s&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");s=!e||e.matches}return s},O=new Map,_=e=>{if(O.has(e))return;let t=setTimeout(()=>{O.delete(e),L({type:4,toastId:e})},1e3);O.set(e,t)},S=e=>{let t=O.get(e);t&&clearTimeout(t)},$=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&S(t.toast.id),{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return e.toasts.find(e=>e.id===a.id)?$(e,{type:1,toast:a}):$(e,{type:0,toast:a});case 3:let{toastId:r}=t;return r?_(r):e.toasts.forEach(e=>{_(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+s}))}}},z=[],D={toasts:[],pausedAt:void 0},L=e=>{D=$(D,e),z.forEach(e=>{e(D)})},T={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},I=(e={})=>{let[t,a]=(0,i.useState)(D);(0,i.useEffect)(()=>(z.push(a),()=>{let e=z.indexOf(a);e>-1&&z.splice(e,1)}),[t]);let r=t.toasts.map(t=>{var a,r;return{...e,...e[t.type],...t,duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||T[t.type],style:{...e.style,...null==(r=e[t.type])?void 0:r.style,...t.style}}});return{...t,toasts:r}},P=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||E()}),U=e=>(t,a)=>{let r=P(t,e,a);return L({type:2,toast:r}),r.id},F=(e,t)=>U("blank")(e,t);F.error=U("error"),F.success=U("success"),F.loading=U("loading"),F.custom=U("custom"),F.dismiss=e=>{L({type:3,toastId:e})},F.remove=e=>L({type:4,toastId:e}),F.promise=(e,t,a)=>{let r=F.loading(t.loading,{...a,...null==a?void 0:a.loading});return e.then(e=>(F.success(N(t.success,e),{id:r,...a,...null==a?void 0:a.success}),e)).catch(e=>{F.error(N(t.error,e),{id:r,...a,...null==a?void 0:a.error})}),e};var A=(e,t)=>{L({type:1,toast:{id:e,height:t}})},M=()=>{L({type:5,time:Date.now()})},B=e=>{let{toasts:t,pausedAt:a}=I(e);(0,i.useEffect)(()=>{if(a)return;let e=Date.now(),r=t.map(t=>{if(t.duration===1/0)return;let a=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(a<0){t.visible&&F.dismiss(t.id);return}return setTimeout(()=>F.dismiss(t.id),a)});return()=>{r.forEach(e=>e&&clearTimeout(e))}},[t,a]);let r=(0,i.useCallback)(()=>{a&&L({type:6,time:Date.now()})},[a]),s=(0,i.useCallback)((e,a)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:o}=a||{},i=t.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[t]);return{toasts:t,handlers:{updateHeight:A,startPause:M,endPause:r,calculateOffset:s}}},H=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,R=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,q=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${R} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${W} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,V=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Y=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${V} 1s linear infinite;
`,G=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Q=j`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Z=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${G} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Q} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,J=w("div")`
  position: absolute;
`,K=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,X=j`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ee=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${X} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,et=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?i.createElement(ee,null,t):t:"blank"===a?null:i.createElement(K,null,i.createElement(Y,{...r}),"loading"!==a&&i.createElement(J,null,"error"===a?i.createElement(q,{...r}):i.createElement(Z,{...r})))},ea=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,er=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,es=w("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,eo=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ei=(e,t)=>{let a=e.includes("top")?1:-1,[r,s]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[ea(a),er(a)];return{animation:t?`${j(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},en=i.memo(({toast:e,position:t,style:a,children:r})=>{let s=e.height?ei(e.position||t||"top-center",e.visible):{opacity:0},o=i.createElement(et,{toast:e}),n=i.createElement(eo,{...e.ariaProps},N(e.message,e));return i.createElement(es,{className:e.className,style:{...s,...a,...e.style}},"function"==typeof r?r({icon:o,message:n}):i.createElement(i.Fragment,null,o,n))});o=i.createElement,p.p=void 0,y=o,g=void 0,v=void 0;var el=({id:e,className:t,style:a,onHeightUpdate:r,children:s})=>{let o=i.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return i.createElement("div",{ref:o,className:t,style:a},s)},ed=(e,t)=>{let a=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...r}},ec=b`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,eu=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:s,containerStyle:o,containerClassName:n})=>{let{toasts:l,handlers:d}=B(a);return i.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(a=>{let o=a.position||t,n=ed(o,d.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}));return i.createElement(el,{id:a.id,key:a.id,onHeightUpdate:d.updateHeight,className:a.visible?ec:"",style:n},"custom"===a.type?N(a.message,a):s?s(a):i.createElement(en,{toast:a,position:o}))}))},ep=F}}]);