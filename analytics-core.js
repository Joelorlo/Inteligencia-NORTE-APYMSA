(function(){
  'use strict';
  const MONTHS={enero:0,febrero:1,marzo:2,abril:3,mayo:4,junio:5,julio:6,agosto:7,septiembre:8,octubre:9,noviembre:10,diciembre:11};
  const money=v=>{if(typeof v==='number')return Number.isFinite(v)?v:0;const n=parseFloat(String(v??'').replace(/[^\d.-]/g,''));return Number.isFinite(n)?n:0};
  const normalize=v=>String(v??'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
  function periodKey(year,month){return `${year}-${String(month+1).padStart(2,'0')}`}
  function extractFinancialHistory(row){
    const history={};
    Object.entries(row||{}).forEach(([key,value])=>{
      const m=normalize(key).match(/^(venta|cuota|objetivoenfoque)(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)(20\d{2})$/);
      if(!m)return;const p=periodKey(Number(m[3]),MONTHS[m[2]]);if(!history[p])history[p]={venta:0,cuota:0,objetivoEnfoque:0};
      history[p][m[1]==='objetivoenfoque'?'objetivoEnfoque':m[1]]=money(value);
    });return history;
  }
  function value(client,year,month,metric){const p=periodKey(year,month);return Number(client?.financiero?.[p]?.[metric]||0)}
  function ytd(client,year,metric,throughMonth){let total=0;for(let m=0;m<=throughMonth;m++)total+=value(client,year,m,metric);return total}
  function projection(venta,cuota,elapsed,total){const projected=elapsed>0?(venta/elapsed)*total:0;return{projected,pct:cuota>0?projected/cuota*100:0,deficit:Math.max(cuota-venta,0)}}
  function growth(current,previous){return previous>0?(current-previous)/previous*100:(current>0?100:0)}
  window.ICAAnalytics={MONTHS,money,normalize,periodKey,extractFinancialHistory,value,ytd,projection,growth};
})();
