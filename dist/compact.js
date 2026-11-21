(()=>{const pt=document.documentElement.lang==='pt-BR',t=(a,b)=>pt?b:a;
 const projects=document.querySelector('#projects');
 const make=(title,subtitle,ids)=>{const d=document.createElement('details');d.className='explore-panel project-explorer';const summary=document.createElement('summary');summary.append(document.createTextNode(title));const span=document.createElement('span');span.textContent=subtitle;summary.append(span);d.append(summary);ids.forEach(id=>{const el=document.getElementById(id);if(el)d.append(el);});return d;};
 const workflow=make(t('Explore the commercial workflow','Explorar o fluxo comercial'),t('Interactive journey and CRM simulation · fictional data','Jornada interativa e simulação de CRM · dados fictícios'),['sales-journey','demo']);
 const dashboard=make(t('Explore commercial analytics','Explorar os indicadores comerciais'),t('Prospecting, sales, CAC and retention · fictional data','Prospecção, vendas, CAC e retenção · dados fictícios'),['commercial-dashboard']);
 projects.after(workflow);workflow.after(dashboard);
 function reveal(hash){if(!hash||hash==='#')return;const el=document.getElementById(decodeURIComponent(hash.slice(1)));if(!el)return;let p=el;while(p){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement;}requestAnimationFrame(()=>el.scrollIntoView({block:'start'}));}
 document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(a)reveal(a.getAttribute('href'));});window.addEventListener('hashchange',()=>reveal(location.hash));if(location.hash)reveal(location.hash);
})();
