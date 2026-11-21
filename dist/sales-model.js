/* Synthetic commercial teaching model. No customer data or external integrations. */
const SalesModel=(()=>{
  const period={start:'2026-07-01',end:'2026-09-30'};
  const cycles=[35,42,28,50,31,46,38,54,29,44,33,50];
  const values=[24,36,48,18,60,30,42,54,24,36,48,60];
  const opportunities=Array.from({length:24},(_,i)=>({
    id:i+1,contact:i+1,customer:'Example account '+(i+1),
    state:i<12?'won':i<20?'lost':'open',
    proposed:i<16||i===20||i===21,
    contractValue:i<12?values[i]*1000:i>=20?[24000,48000,36000,18000][i-20]:30000,
    cycleDays:i<12?cycles[i]:null,
    probability:i>=20?[20,40,60,0][i-20]:null
  }));
  const contacts=Array.from({length:240},(_,i)=>({id:i+1,replied:i<120,interested:i<72,booked:i<60,held:i<48}));
  const activities=contacts.flatMap((c,i)=>[{contact:c.id,channel:'LinkedIn'},{contact:c.id,channel:'Email'},{contact:c.id,channel:i<120?'LinkedIn':'WhatsApp'}]);
  const defaults={marketing:12000,sales:18000,tools:3000,agency:3000,success:6000,accountManagement:4000,retentionPrograms:2000};
  // Existing-customer cohort: 20 at the start; 18 retained; no new customers included.
  const retention={startingCustomers:20,retainedCustomers:18,startingRevenue:200000,churnedRevenue:20000,contraction:10000,expansion:30000};
  const divide=(n,d)=>d>0?n/d:null;
  const sum=(a,key)=>a.reduce((s,x)=>s+x[key],0);
  function calculate(input=defaults,data={contacts,activities,opportunities,retention}){
    const costs=Object.fromEntries(Object.keys(defaults).map(k=>[k,Math.max(0,Math.min(10000000,Number(input[k])||0))]));
    const cs=data.contacts,ops=data.opportunities,acts=data.activities,r=data.retention;
    const reached=new Set(acts.map(x=>x.contact)).size,replied=cs.filter(x=>x.replied).length,interested=cs.filter(x=>x.interested).length;
    const booked=cs.filter(x=>x.booked).length,held=cs.filter(x=>x.held).length,won=ops.filter(x=>x.state==='won'),lost=ops.filter(x=>x.state==='lost'),open=ops.filter(x=>x.state==='open');
    const proposals=ops.filter(x=>x.proposed).length,newCustomers=new Set(won.map(x=>x.customer)).size;
    const acquisition=costs.marketing+costs.sales+costs.tools+costs.agency;
    const retentionCost=costs.success+costs.accountManagement+costs.retentionPrograms;
    const contractValue=sum(won,'contractValue'),deliveryBudget=contractValue*.6;
    return{costs,reached,activities:acts.length,replied,interested,booked,held,opportunities:ops.length,proposals,won:won.length,lost:lost.length,open:open.length,newCustomers,
      responseRate:divide(replied,reached),interestRate:divide(interested,replied),attendance:divide(held,booked),opportunityRate:divide(ops.length,held),proposalRate:divide(proposals,ops.length),winRate:divide(won.length,won.length+lost.length),cohortWinRate:divide(won.length,ops.length),proposalToWin:divide(won.length,proposals),
      contractValue,averageTicket:divide(contractValue,won.length),cycleDays:divide(sum(won,'cycleDays'),won.length),pipelineValue:sum(open,'contractValue'),weightedPipeline:open.reduce((s,o)=>s+o.contractValue*o.probability/100,0),
      acquisition,cac:divide(acquisition,newCustomers),costBooked:divide(acquisition,booked),costHeld:divide(acquisition,held),costOpportunity:divide(acquisition,ops.length),marketingCostReached:divide(costs.marketing,reached),deliveryBudget,grossMargin:divide(contractValue-deliveryBudget,contractValue),grossProfitBudget:contractValue-deliveryBudget,
      retention:r,retentionCost,costPerRetained:divide(retentionCost,r.retainedCustomers),customerRetention:divide(r.retainedCustomers,r.startingCustomers),customerChurn:divide(r.startingCustomers-r.retainedCustomers,r.startingCustomers),grr:divide(r.startingRevenue-r.churnedRevenue-r.contraction,r.startingRevenue),nrr:divide(r.startingRevenue-r.churnedRevenue-r.contraction+r.expansion,r.startingRevenue),endingRevenue:r.startingRevenue-r.churnedRevenue-r.contraction+r.expansion,
      channels:['LinkedIn','Email','WhatsApp'].map(channel=>({channel,activities:acts.filter(x=>x.channel===channel).length,reached:new Set(acts.filter(x=>x.channel===channel).map(x=>x.contact)).size}))
    };
  }
  return{period,contacts,activities,opportunities,retention,defaults,calculate};
})();
