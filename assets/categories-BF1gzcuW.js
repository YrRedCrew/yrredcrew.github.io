import{_ as j}from"./YunCard.vue_vue_type_script_setup_true_lang-DAcOL4KL.js";import{_ as E}from"./YunPostCollapse.vue_vue_type_style_index_0_lang-Dc238u-c.js";import{d as V,u as K,a as q,k as $,C as A,v as R,ae as N,V as U,l as S,o as t,e as i,g as f,t as b,f as r,F as g,i as P,af as D,c as y,w as p,m as B,j as m,z as F,I as T,ag as x,a7 as W,ab as H,ac as M,r as O,ad as G,aa as J}from"./app-DYthNE-R.js";import{_ as Q}from"./YunPageHeader.vue_vue_type_script_setup_true_lang-BhN51dU1.js";const X={class:"category-list-item inline-flex items-center cursor-pointer"},Z={key:0,"i-ri-folder-add-line":""},I={key:1,style:{color:"var(--va-c-primary)"},"i-ri-folder-reduce-line":""},ee={key:0},te={m:"l-1",font:"serif black"},oe=V({__name:"YunCategory",props:{parentKey:{},category:{},level:{},collapsable:{type:Boolean,default:!0}},setup(Y){const u=Y,_=K(),n=q(),v=$(()=>{const e=n.query.category||"";return Array.isArray(e)?[e]:e.split("/")}),o=A(u.collapsable),{t:c}=R(),{locale:k}=R();function z(e){const s=k.value==="zh-CN"?"zh":k.value;return e[`title_${s}`]?e[`title_${s}`]:e.title}const d=A(),{show:l}=N(d);function C(e){_.push({query:{category:e}}),l()}return U(()=>{const e=document.querySelector(".post-collapse-container");e&&(d.value=e)}),(e,s)=>{const h=S("YunCategory",!0),w=S("RouterLink");return t(),i(g,null,[f("li",X,[f("span",{class:"folder-action inline-flex",onClick:s[0]||(s[0]=a=>o.value=!o.value)},[o.value?(t(),i("div",Z)):(t(),i("div",I))]),f("span",{class:"category-name",m:"l-1",onClick:s[1]||(s[1]=a=>C(e.parentKey))},b(e.category.name==="Uncategorized"?r(c)("category.uncategorized"):e.category.name)+" ["+b(e.category.total)+"] ",1)]),o.value?B("v-if",!0):(t(),i("ul",ee,[(t(!0),i(g,null,P(e.category.children.values(),(a,L)=>(t(),i("li",{key:L,class:"post-list-item",m:"l-4"},[r(D)(a)?(t(),y(h,{key:0,"parent-key":e.parentKey?`${e.parentKey}/${a.name}`:a.name,category:a,collapsable:!v.value.includes(a.name)},null,8,["parent-key","category","collapsable"])):(t(),i(g,{key:1},[a.title?(t(),y(w,{key:0,to:a.path||"",class:"inline-flex items-center"},{default:p(()=>[s[2]||(s[2]=f("div",{"i-ri-file-text-line":""},null,-1)),f("span",te,b(z(a)),1)]),_:2},1032,["to"])):B("v-if",!0)],64))]))),128))]))],64)}}}),ne=V({__name:"YunCategories",props:{categories:{},level:{default:0},collapsable:{type:Boolean,default:!0}},setup(Y){const u=q(),_=$(()=>{const n=u.query.category||"";return Array.isArray(n)?[n]:n.split("/")});return(n,v)=>{const o=oe;return t(!0),i(g,null,P(n.categories.values(),c=>(t(),i("ul",{key:c.name,class:"category-list",m:"l-4"},[m(o,{"parent-key":c.name,category:c,level:n.level+1,collapsable:!_.value.includes(c.name)},null,8,["parent-key","category","level","collapsable"])]))),128)}}}),ae={text:"center",class:"yun-text-light",p:"2"},ce=V({__name:"categories",setup(Y){const{t:u}=R(),_=F(),n=T(),v=q(),o=$(()=>v.query.category||""),c=x(),k=$(()=>_.postList.filter(l=>l.categories&&o.value!=="Uncategorized"?typeof l.categories=="string"?l.categories===o.value:l.categories.join("/").startsWith(o.value)&&l.categories[0]===o.value.split("/")[0]:!l.categories&&o.value==="Uncategorized"?l.categories===void 0:!1)),z=W(n);return H([M({"@type":"CollectionPage"})]),(d,l)=>{const C=J,e=Q,s=ne,h=S("RouterView"),w=E,a=j;return t(),i(g,null,[d.$slots["sidebar-child"]?(t(),y(C,{key:0},{default:p(()=>[O(d.$slots,"sidebar-child")]),_:3})):(t(),y(C,{key:1})),m(h,null,{default:p(({Component:L})=>[(t(),y(G(L),null,{"main-header":p(()=>[m(e,{title:r(z)||r(u)("menu.categories"),icon:r(n).icon||"i-ri-folder-2-line",color:r(n).color},null,8,["title","icon","color"])]),"main-content":p(()=>[f("div",ae,b(r(u)("counter.categories",Array.from(r(c).children).length)),1),m(s,{categories:r(c).children},null,8,["categories"]),m(h)]),"main-nav-before":p(()=>[o.value?(t(),y(a,{key:0,class:"post-collapse-container",m:"t-4",w:"full"},{default:p(()=>[m(e,{title:o.value==="Uncategorized"?r(u)("category.uncategorized"):o.value.split("/").join(" / "),icon:"i-ri-folder-open-line"},null,8,["title"]),m(w,{w:"full",m:"b-4",p:"x-20 lt-sm:x-5",posts:k.value},null,8,["posts"])]),_:1})):B("v-if",!0)]),_:2},1024))]),_:1})],64)}}});export{ce as default};
