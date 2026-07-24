(function(){
  'use strict';
  const THEMES={
    agresiva:{label:'Agresiva',vars:{bg:'#0B1220',bg2:'#24324A',surface:'#F8FAFC',surface2:'#E8EEF7',head:'#172033',ink:'#111827',muted:'#475467',border:'#526179',primary:'#1677FF',secondary:'#FF7A00',onHead:'#FFFFFF',onPrimary:'#FFFFFF',success:'#12B76A',warning:'#F79009',danger:'#F04438'}},
    moderna:{label:'Moderna',vars:{bg:'#EAF2FF',bg2:'#D9E7FF',surface:'#FFFFFF',surface2:'#F2F6FC',head:'#102A43',ink:'#102A43',muted:'#52667A',border:'#A9BDD2',primary:'#2563EB',secondary:'#06B6D4',onHead:'#FFFFFF',onPrimary:'#FFFFFF',success:'#16A34A',warning:'#D97706',danger:'#DC2626'}},
    tenue:{label:'Tenue',vars:{bg:'#F3F0EA',bg2:'#E7E1D8',surface:'#FFFCF7',surface2:'#F6F1E9',head:'#5E6259',ink:'#292D2A',muted:'#687068',border:'#B8B4A8',primary:'#587B7F',secondary:'#B07D62',onHead:'#FFFFFF',onPrimary:'#FFFFFF',success:'#4F7C5B',warning:'#A66A2C',danger:'#A64646'}},
    vibrante:{label:'Vibrante',vars:{bg:'#170B3B',bg2:'#35106D',surface:'#FFF9FF',surface2:'#F5E9FF',head:'#24104F',ink:'#21112D',muted:'#665070',border:'#9A75C2',primary:'#7C3AED',secondary:'#EC4899',onHead:'#FFFFFF',onPrimary:'#FFFFFF',success:'#00A878',warning:'#F59E0B',danger:'#EF233C'}},
    clasica:{label:'Clásica',vars:{bg:'#E8EDF2',bg2:'#D8E0E8',surface:'#FFFFFF',surface2:'#F4F6F8',head:'#17365D',ink:'#1F2937',muted:'#5B6573',border:'#9CA8B5',primary:'#1F4E78',secondary:'#C49A3A',onHead:'#FFFFFF',onPrimary:'#FFFFFF',success:'#2E7D32',warning:'#A66B00',danger:'#B42318'}}
  };
  const STYLE=`
  :root{--t-bg:#0B1220;--t-bg2:#24324A;--t-surface:#F8FAFC;--t-surface2:#E8EEF7;--t-head:#172033;--t-ink:#111827;--t-muted:#475467;--t-border:#526179;--t-primary:#1677FF;--t-secondary:#FF7A00;--t-on-head:#fff;--t-on-primary:#fff;--t-success:#12B76A;--t-warning:#F79009;--t-danger:#F04438}
  body{background:linear-gradient(145deg,var(--t-bg),var(--t-bg2))!important;color:var(--t-ink)!important;transition:background .25s ease}
  header.bg-glass{background:var(--t-head)!important;border-color:var(--t-primary)!important}
  header h1,header .text-white,header button span{color:var(--t-on-head)!important}
  .bg-glass,#step-1,#step-2,#step-strategy,#discipline-client-detail{background:color-mix(in srgb,var(--t-surface) 97%,transparent)!important;color:var(--t-ink)!important;border-color:var(--t-border)!important}
  #step-1 .text-white,#step-2 .text-white,#discipline-client-detail .text-white{color:var(--t-ink)!important}
  #step-1 .text-slate-300,#step-1 .text-slate-400,#step-1 .text-slate-500,#step-2 .text-slate-300,#step-2 .text-slate-400,#step-2 .text-slate-500{color:var(--t-muted)!important}
  .text-neon-cyan{color:var(--t-primary)!important;text-shadow:none!important}.text-neon-orange{color:var(--t-warning)!important;text-shadow:none!important}.text-neon-red{color:var(--t-danger)!important;text-shadow:none!important}.text-neon-green{color:var(--t-success)!important;text-shadow:none!important}
  .advisor-card-btn,.apple-depth-card,.discipline-kpi-card,.segment-chart-card,.operational-block{background:var(--t-surface)!important;color:var(--t-ink)!important;border-color:var(--t-border)!important}
  .depth-card-head,#client-list>div{background:linear-gradient(145deg,var(--t-head),color-mix(in srgb,var(--t-head) 72%,var(--t-primary)))!important}.depth-card-head .depth-name,#client-list>div>div:first-child>div:nth-child(2){color:var(--t-on-head)!important;-webkit-text-fill-color:var(--t-on-head)!important}
  .depth-metric,.discipline-kpi-item,.operational-card{background:var(--t-surface2)!important;border-color:var(--t-border)!important;color:var(--t-ink)!important}
  .strategy-card{background:linear-gradient(145deg,var(--t-head),color-mix(in srgb,var(--t-head) 76%,var(--t-primary)))!important;border-color:var(--t-primary)!important}.strategy-card h3,.strategy-card .text-white{color:var(--t-on-head)!important}.strategy-card p{color:#E5E7EB!important}
  button[class*="bg-[#00f3ff]"],button[class*="from-[#00f3ff]"]{background:var(--t-primary)!important;color:var(--t-on-primary)!important;border-color:var(--t-primary)!important}
  button[class*="bg-[#0f172a]"],button[class*="bg-[#001233]"]{background:var(--t-head)!important;color:var(--t-on-head)!important;border-color:var(--t-border)!important}
  #theme-selector{background:var(--t-surface)!important;color:var(--t-ink)!important;border:1px solid var(--t-primary)!important;min-width:130px}
  .glow-red,.urgency-red{background:var(--t-danger)!important}.glow-orange,.urgency-amber{background:var(--t-warning)!important}.glow-green,.urgency-green{background:var(--t-success)!important}
  canvas{background:var(--t-surface)!important;border-color:var(--t-border)!important}
  `;
  function applyTheme(name){
    const theme=THEMES[name]||THEMES.agresiva;
    Object.entries(theme.vars).forEach(([k,v])=>document.documentElement.style.setProperty('--t-'+k.replace(/[A-Z]/g,m=>'-'+m.toLowerCase()),v));
    document.documentElement.dataset.theme=name; localStorage.setItem('ica-theme',name);
    const select=document.getElementById('theme-selector');if(select&&select.value!==name)select.value=name;
  }
  function init(){
    const style=document.createElement('style');style.id='theme-manager-style';style.textContent=STYLE;document.head.appendChild(style);
    const select=document.getElementById('theme-selector');
    if(select){select.innerHTML=Object.entries(THEMES).map(([k,v])=>`<option value="${k}">${v.label}</option>`).join('');select.addEventListener('change',e=>applyTheme(e.target.value));}
    applyTheme(localStorage.getItem('ica-theme')||'agresiva');
  }
  window.ICAThemes={applyTheme,themes:THEMES};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
