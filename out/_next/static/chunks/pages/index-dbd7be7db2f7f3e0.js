(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return s(3212)}])},3212:function(e,n,s){"use strict";s.r(n),s.d(n,{default:function(){return Z}});var l=s(5893),i=s(6979),t=s(4418),r=s(302),a=s(7754),o=s(295),d=s(6154),x=s(7294),c=s(4238),h=s(204),u=s(3100),j=s(9564),g=s(7523),p=s(1649),f=s(5434);function m(){let[e,n]=(0,x.useState)(0);return(0,x.useEffect)(()=>{let e=setInterval(()=>{n(e=>e>=3?0:e+1)},300);return()=>clearInterval(e)},[]),(0,l.jsx)(l.Fragment,{children:".".repeat(e)})}var b=s(4151),y=s(5291),v=s(4629),z=s(191),C=s(3438),S=s(6880);function W(e){let{app:n,open:s,onClose:i}=e;return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(b.u_,{isOpen:s,onClose:i,children:[(0,l.jsx)(y.Z,{}),(0,l.jsxs)(v.h,{children:[(0,l.jsx)(z.x,{children:"Log de erro"}),(0,l.jsx)(C.o,{}),(0,l.jsx)(S.f,{pb:6,overflow:"auto",children:(0,l.jsx)("pre",{children:n.deployError})})]})]})})}function I(e){let{app:n,open:s,onClose:i}=e;return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(b.u_,{isOpen:s,onClose:i,children:[(0,l.jsx)(y.Z,{}),(0,l.jsxs)(v.h,{children:[(0,l.jsx)(z.x,{children:"Informa\xe7\xf5es"}),(0,l.jsx)(C.o,{}),(0,l.jsxs)(S.f,{pb:6,overflow:"auto",children:[(0,l.jsx)(j.x,{fontSize:"lg",fontWeight:700,mt:2,children:"Nome"}),(0,l.jsx)(j.x,{fontWeight:400,children:n.displayName}),(0,l.jsx)(j.x,{fontSize:"lg",fontWeight:700,mt:2,children:"ID"}),(0,l.jsx)(j.x,{fontWeight:400,children:n.id}),(0,l.jsx)(j.x,{fontSize:"lg",fontWeight:700,mt:2,children:"Git Branch"}),(0,l.jsx)(j.x,{fontWeight:400,children:n.gitBranch}),(0,l.jsx)(j.x,{fontSize:"lg",fontWeight:700,mt:2,children:"Diret\xf3rio"}),(0,l.jsx)(j.x,{fontWeight:400,children:n.folderAbsolutePath}),(0,l.jsx)(j.x,{fontSize:"lg",fontWeight:700,mt:2,children:"Diret\xf3rio de backups"}),(0,l.jsx)(j.x,{fontWeight:400,children:n.backupAbsolutePath}),(0,l.jsx)(j.x,{fontSize:"lg",fontWeight:700,mt:2,children:"Nome do servi\xe7o do systemd"}),(0,l.jsx)(j.x,{fontWeight:400,children:n.systemdServiceName}),(0,l.jsx)(j.x,{fontSize:"lg",fontWeight:700,mt:2,children:"Desfazer deploy quando falhar"}),(0,l.jsx)(j.x,{fontWeight:400,children:n.undoWhenFailed?"Sim":"N\xe3o"}),(0,l.jsx)(j.x,{fontSize:"lg",fontWeight:700,mt:2,children:"Comandos"}),(0,l.jsxs)(j.x,{children:[(0,l.jsx)("b",{children:"Parar aplica\xe7\xe3o:"})," ",n.stopCommand]}),(0,l.jsxs)(j.x,{children:[(0,l.jsx)("b",{children:"Iniciar aplica\xe7\xe3o:"})," ",n.startCommand]}),(0,l.jsxs)(j.x,{children:[(0,l.jsx)("b",{children:"Resetar reposit\xf3rio:"})," ",n.resetCommand]}),(0,l.jsxs)(j.x,{children:[(0,l.jsx)("b",{children:"Limpar arquivos:"})," ",n.cleanCommand]}),(0,l.jsxs)(j.x,{children:[(0,l.jsx)("b",{children:"Baixar atualiza\xe7\xf5es:"})," ",n.pullCommand]}),(0,l.jsxs)(j.x,{children:[(0,l.jsx)("b",{children:"Instalar depend\xeancias:"})," ",n.installCommand]}),(0,l.jsxs)(j.x,{children:[(0,l.jsx)("b",{children:"Fazer o build:"})," ",n.buildCommand]})]})]})]})})}var F=s(6953),k=s(6303),E=s(6887),w=s(989);function _(e){let{log:n,setLog:s}=e;return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(b.u_,{isOpen:!!n,onClose:()=>s(""),children:[(0,l.jsx)(y.Z,{}),(0,l.jsxs)(v.h,{children:[(0,l.jsx)(z.x,{children:"Visualizador de logs"}),(0,l.jsx)(C.o,{}),(0,l.jsx)(S.f,{pb:6,overflow:"auto",children:(0,l.jsx)("pre",{children:n})})]})]})})}function N(e){let{logs:n}=e,[s,i]=(0,x.useState)("");return(0,l.jsxs)(F.v,{isLazy:!0,children:[(0,l.jsx)(g.u,{label:"Logs",children:(0,l.jsx)(k.j,{hidden:!n.reset&&!n.clean&&!n.pull&&!n.install&&!n.build,children:(0,l.jsx)(r.h,{"aria-label":"Logs",variant:"ghost",ml:2,color:"inherit",children:(0,l.jsx)(f.gbF,{size:24})})})}),(0,l.jsxs)(E.q,{zIndex:"2",children:[(0,l.jsx)(w.s,{hidden:!n.reset,icon:(0,l.jsx)(f.gbF,{}),onClick:()=>i(n.reset),children:"Reset logs"}),(0,l.jsx)(w.s,{hidden:!n.clean,icon:(0,l.jsx)(f.gbF,{}),onClick:()=>i(n.clean),children:"Clean logs"}),(0,l.jsx)(w.s,{hidden:!n.pull,icon:(0,l.jsx)(f.gbF,{}),onClick:()=>i(n.pull),children:"Pull logs"}),(0,l.jsx)(w.s,{hidden:!n.install,icon:(0,l.jsx)(f.gbF,{}),onClick:()=>i(n.install),children:"Install logs"}),(0,l.jsx)(w.s,{hidden:!n.build,icon:(0,l.jsx)(f.gbF,{}),onClick:()=>i(n.build),children:"Build logs"})]}),(0,l.jsx)(_,{log:s,setLog:i})]})}let D={stop:[0,"Parando aplica\xe7\xe3o","blue",f.l74,!0,0],backup:[5,"Fazendo backup","blue",f.fg0,!0,0],reset:[20,"Resetando c\xf3digos","blue",f.Zgl,!0,0],clean:[23,"Limpando arquivos extras","blue",f.Zgl,!0,0],pull:[26,"Baixando vers\xe3o mais recente","blue",f.qm7,!0,0],install:[35,"Instalando depend\xeancias","blue",f.RUY,!0,0],build:[70,"Fazendo build","blue",f.b9P,!0,0],start:[95,"Iniciando aplica\xe7\xe3o","blue",f.Nhx,!0,0],undo:[0,"Desfazendo altera\xe7\xf5es","orange",f.TsG,!0,0],error:[100,"Erro ao fazer deploy","red",f.Fbu,!1,2],restored:[100,"Deploy restaurado","orange",f.wI4,!1,2],success:[100,"Deploy finalizado com sucesso","green",f.vB0,!1,2],none:[0,"Aguardando deployments","gray",f.uAz,!1,3],queue:[0,"Em fila","gray",f.gye,!1,1]};function R(e){let{app:n}=e,s=n.pendingDeploy&&!D[n.status][4]?"queue":n.status,[i,t,a,o,d]=D[s];return(0,l.jsxs)(c.Z,{p:3,color:a+".500",position:"relative",transition:".3s ease",mb:5,style:{clear:"both"},children:[(0,l.jsxs)(h.k,{gap:3,children:[(0,l.jsx)(h.k,{align:"center",display:["none","flex"],children:(0,l.jsx)(u.xu,{p:4,borderColor:a+".500",borderWidth:2,borderRadius:"full",children:(0,l.jsx)(o,{size:40})})}),(0,l.jsxs)(u.xu,{flex:"1",children:[(0,l.jsxs)(j.x,{fontSize:"2xl",display:"flex",alignItems:"center",flexWrap:"wrap",children:[n.displayName,(0,l.jsx)(p.gxx,{style:{marginLeft:"10px",marginRight:"4px"}}),(0,l.jsx)(j.x,{fontWeight:500,children:n.gitBranch})]}),(0,l.jsxs)(j.x,{display:"flex",alignItems:"center",children:[(0,l.jsx)(f.Wi4,{style:{marginRight:"4px"}}),n.folderAbsolutePath]}),(0,l.jsxs)(j.x,{display:"flex",alignItems:"center",hidden:!n.deployStartTime,children:[(0,l.jsx)(p.i95,{style:{marginRight:"4px"}}),new Date(n.deployStartTime).toLocaleString()]}),(0,l.jsxs)(j.x,{display:"flex",alignItems:"center",hidden:!n.deployTime,children:[(0,l.jsx)(f.dKE,{style:{marginRight:"4px"}}),"Tempo: ",n.deployTime," segundos"]}),(0,l.jsxs)(j.x,{display:"flex",alignItems:"center",hidden:"queue"===s||!n.pendingDeploy,children:[(0,l.jsx)(f.gye,{style:{marginRight:"4px"}}),"Outro deploy em fila"]}),(0,l.jsxs)(j.x,{fontSize:"md",fontWeight:200,children:[t,d&&(0,l.jsx)(m,{})]})]}),(0,l.jsxs)(h.k,{align:"center",direction:["column","row"],children:[(0,l.jsx)(L,{app:n}),(0,l.jsx)(N,{logs:n.logs}),(0,l.jsx)(g.u,{label:"Editar",children:(0,l.jsx)(r.h,{"aria-label":"Editar",variant:"ghost",ml:2,color:"inherit",children:(0,l.jsx)(f.zmo,{size:24})})}),(0,l.jsx)(q,{app:n})]})]}),(0,l.jsx)(u.xu,{position:"absolute",left:"0",top:"0",bg:a+".100",opacity:.3,w:i+"%",h:"full",zIndex:0,pointerEvents:"none",transition:"all .3s ease, width 2s ease",borderRadius:"var(--card-radius)"})]})}function L(e){let{app:n}=e,[s,i]=(0,x.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(g.u,{label:"Log de erro",children:(0,l.jsx)(r.h,{"aria-label":"Log de erro",variant:"ghost",ml:2,color:"red.500",onClick:()=>i(!0),hidden:!n.deployError,children:(0,l.jsx)(f.Fbu,{size:24})})}),(0,l.jsx)(W,{app:n,open:s,onClose:()=>i(!1)})]})}function q(e){let{app:n}=e,[s,i]=(0,x.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(g.u,{label:"Informa\xe7\xf5es",children:(0,l.jsx)(r.h,{"aria-label":"Informa\xe7\xf5es",variant:"ghost",ml:2,color:"inherit",onClick:()=>i(!0),children:(0,l.jsx)(f.I5p,{size:24})})}),(0,l.jsx)(I,{app:n,open:s,onClose:()=>i(!1)})]})}var P=s(483);function O(e){let{setData:n}=e,s=(0,P.useEventSource)({source:"realtime",options:{withCredentials:!0}});return(0,P.useEventSourceListener)({source:s,startOnInit:!0,event:{name:"update",listener:e=>{let{data:s}=e,{id:l,data:i}=s;for(let e of i){let[s,i]=e;n(e=>{if(!e)return e;let n=e.apps.map(e=>(null==e?void 0:e.id)!==l?e:(s.startsWith("logs.")?(e.logs[s.slice(5)]=i,e.logs={...e.logs}):e[s]=i,{...e}));return{...e,apps:[...n]}})}}}},[s]),null}var T=s(9008),B=s.n(T);function Z(){var e,n;let[s,c]=(0,x.useState)(),[h,u]=(0,x.useState)(!0),[j,g]=(0,x.useState)(),p=()=>{u(!0),g(null),d.Z.get("state").then(e=>{let{data:n}=e;c(n)}).catch(e=>{g(e)}).finally(()=>{u(!1)})};(0,x.useEffect)(()=>{p()},[]);let m=null==s?void 0:s.apps.sort((e,n)=>e.displayName.localeCompare(n.displayName)).sort((e,n)=>{let s=e.pendingDeploy&&!D[e.status][4]?"queue":e.status,l=n.pendingDeploy&&!D[n.status][4]?"queue":n.status;return D[s][5]-D[l][5]});return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(B(),{children:(0,l.jsx)("title",{children:"Sistema de deploy autom\xe1tico via GitHub"})}),(0,l.jsxs)(i.W,{maxW:"5xl",my:5,children:[(0,l.jsxs)(t.X,{fontWeight:500,mb:5,children:[(0,l.jsx)(r.h,{"aria-label":"Atualizar",onClick:p,variant:"ghost",float:"right",ml:3,children:(0,l.jsx)(f.la_,{size:24})}),"Sistema de deploy autom\xe1tico via GitHub"," "]}),h&&(0,l.jsx)(a.M,{my:10,style:{clear:"both"},children:(0,l.jsx)(o.$,{})}),j&&(0,l.jsxs)(l.Fragment,{children:["ERRO: ",(null==j?void 0:null===(e=j.response)||void 0===e?void 0:null===(n=e.data)||void 0===n?void 0:n.message)||(null==j?void 0:j.message)]}),!h&&!j&&(null==m?void 0:m.map(e=>(0,l.jsx)(R,{app:e},e.id))),(0,l.jsx)(O,{setData:c})]})]})}}},function(e){e.O(0,[228,866,712,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);