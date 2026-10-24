export function normalizeGuide(value) {
 const step=Number(value?.step),demo=Number(value?.demoStage);
 return {complete:value?.complete===true,step:Number.isFinite(step)?Math.max(0,Math.min(3,Math.floor(step))):0,demoStage:Number.isFinite(demo)?Math.max(0,Math.min(2,Math.floor(demo))):0};
}
export function recommendedMission(missions,work={}) {return missions.find(m=>!work[m.id]?.result?.passed)||null;}
export function missionStage(work) {
 const saved=work?.stage;
 if(Number.isInteger(saved)&&saved>=0&&saved<=2)return saved===2&&!work?.result?1:saved;
 return work?.result?2:Object.values(work?.answers||{}).some(Boolean)?1:0;
}

