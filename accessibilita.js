
(function(){
  'use strict';
  const root=document.documentElement;
  const settings=['large','spacing','high-contrast','reduce-motion'];
  const classes={large:'a11y-large',spacing:'a11y-spacing','high-contrast':'a11y-high-contrast','reduce-motion':'a11y-reduce-motion'};
  function get(k){try{return localStorage.getItem('onda-a11y-'+k)==='1'}catch(e){return false}}
  function set(k,v){try{localStorage.setItem('onda-a11y-'+k,v?'1':'0')}catch(e){}}
  function apply(k,v){root.classList.toggle(classes[k],v);const b=document.querySelector('[data-a11y="'+k+'"]');if(b)b.setAttribute('aria-pressed',String(v));}
  settings.forEach(k=>apply(k,get(k)));
  const launcher=document.querySelector('.a11y-launcher');
  const panel=document.querySelector('.a11y-panel');
  if(launcher&&panel){
    launcher.addEventListener('click',()=>{const opening=panel.hidden;panel.hidden=!opening;launcher.setAttribute('aria-expanded',String(opening));if(opening){const h=panel.querySelector('h2');if(h){h.setAttribute('tabindex','-1');h.focus();}}});
    panel.querySelectorAll('[data-a11y]').forEach(btn=>btn.addEventListener('click',()=>{const k=btn.dataset.a11y;const v=!root.classList.contains(classes[k]);apply(k,v);set(k,v);}));
    const reset=panel.querySelector('[data-a11y-reset]');
    if(reset)reset.addEventListener('click',()=>{settings.forEach(k=>{apply(k,false);set(k,false)});});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){panel.hidden=true;launcher.setAttribute('aria-expanded','false');launcher.focus();}});
  }
  const menu=document.querySelector('.menu'), links=document.querySelector('.links');
  if(menu&&links){
    if(!links.id) links.id='site-menu';
    menu.setAttribute('aria-controls',links.id);menu.setAttribute('aria-expanded',String(links.classList.contains('open')));
    menu.addEventListener('click',()=>{const open=!links.classList.contains('open');links.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));});
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&links.classList.contains('open')){links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus();}});
    document.addEventListener('click',e=>{if(links.classList.contains('open')&&!links.contains(e.target)&&!menu.contains(e.target)){links.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
  }
})();
