// Synthetic B8-1 traffic only. Uses SDK automatic exposure logging, never forged exposures.
const { Statsig, StatsigUser } = require('@statsig/statsig-node-core');
const fs = require('node:fs');
const path = require('node:path');
async function main() {
  const mode = process.argv[2];
  if (!['baseline', 'smoke'].includes(mode)) throw new Error('Use baseline or smoke');
  const key = process.env.STATSIG_SERVER_SECRET;
  if (!key) throw new Error('STATSIG_SERVER_SECRET is required');
  const report = { project_id:'H7zq0iHv0scPEXRMGF1C3', mode, synthetic:true, captured_at:new Date().toISOString(), rows:[], events:{} };
  const sdk = new Statsig(key, { environment:'production' });
  const init = await sdk.initialize();
  if (!init.isSuccess) throw new Error('SDK initialization failed');
  try {
    if (mode === 'smoke' && !sdk.getExperimentList().includes('b8_1_guided_onboarding')) throw new Error('Launch the experiment before running smoke traffic');
    const n = mode === 'baseline' ? 30 : 1000;
    for (let i=1;i<=n;i++) {
      const id = `b8_1_${mode}_${String(i).padStart(4,'0')}`;
      const user = new StatsigUser({userID:id,custom:{test_fixture:'b8_1',lifecycle:'new'}});
      const gate = sdk.getFeatureGate(user,'b8_1_synthetic_new_users');
      if (!gate.value) throw new Error('Eligible synthetic user failed eligibility gate');
      let group = null, variant = 'standard', rule = gate.ruleID;
      if (mode === 'smoke') {
        const exp = sdk.getExperiment(user,'b8_1_guided_onboarding');
        group = exp.groupName; variant = exp.getValue('onboarding_variant','standard'); rule=exp.ruleID;
      }
      report.rows.push({userID:id,eligible:true,group,variant,rule});
      // Deterministic synthetic outcomes are instrumentation checks, not evidence of lift.
      if (mode === 'baseline' || group) {
        const events=[];
        if(i%2===0) events.push('b8_1_workspace_created');
        if(i%10===0) events.push('b8_1_onboarding_error');
        if(i%5===0) events.push('b8_1_help_requested');
        for (const event of events) {sdk.logEvent(user,event,null,{fixture:'b8_1',phase:mode});report.events[event]=(report.events[event]||0)+1;}
      }
    }
    for (const [label,custom] of [['existing',{test_fixture:'b8_1',lifecycle:'existing'}],['unrelated',{test_fixture:'other',lifecycle:'new'}]]) {
      const user = new StatsigUser({userID:`b8_1_negative_${mode}_${label}`,custom});
      const gate=sdk.getFeatureGate(user,'b8_1_synthetic_new_users');
      const exp=mode==='smoke'?sdk.getExperiment(user,'b8_1_guided_onboarding'):null;
      report.rows.push({userID:`b8_1_negative_${mode}_${label}`,eligible:gate.value,group:exp?.groupName||null,variant:exp?.getValue('onboarding_variant','standard')||'standard'});
      if(gate.value || exp?.groupName) throw new Error('Ineligible user was admitted');
    }
    const stage = new Statsig(key,{environment:'staging'});
    await stage.initialize();
    try {
      const u=new StatsigUser({userID:`b8_1_negative_${mode}_staging`,custom:{test_fixture:'b8_1',lifecycle:'new'}});
      const g=stage.getFeatureGate(u,'b8_1_synthetic_new_users');
      report.staging_gate=g.value;
      const e=mode==='smoke'?stage.getExperiment(u,'b8_1_guided_onboarding'):null;
      report.staging_group=e?.groupName||null;
      if(g.value || e?.groupName) throw new Error('Staging user was admitted');
    } finally {await stage.shutdown();}
    report.flush=await sdk.flushEvents();
    if(!report.flush.isSuccess) throw new Error('Event flush failed');
    report.groups=report.rows.filter(r=>r.eligible).reduce((a,r)=>{const k=r.group||'not_enrolled';a[k]=(a[k]||0)+1;return a;},{});
    report.note='SDK evaluation and successful event submission. Confirm ingestion separately in Statsig Events Explorer or Exposure Stream. Synthetic outcomes cannot establish experiment lift.';
    const dir=path.join(__dirname,'evidence',mode==='baseline'?'Run1-before':(process.env.B8_RUN_LABEL||'Run1-after'));
    fs.mkdirSync(dir,{recursive:true});
    fs.writeFileSync(path.join(dir,`B8-1_Statsig_${mode}_sdk.json`),JSON.stringify(report,null,2));
    console.log(JSON.stringify({mode,rows:report.rows.length,groups:report.groups,events:report.events,flush:report.flush,staging_gate:report.staging_gate}));
  } finally { await sdk.shutdown(); }
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
