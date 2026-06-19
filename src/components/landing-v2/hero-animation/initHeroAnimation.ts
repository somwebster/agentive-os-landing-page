/* eslint-disable */
// Auto-generated from Hero Animation (standalone).html
export type LandingV2HeroAnimProgress = {
  step: number;
  stepProgress: number;
  overallProgress: number;
};

export function initLandingV2HeroAnimation(
  root: HTMLElement,
  options: { onProgress?: (state: LandingV2HeroAnimProgress) => void } = {},
): { run: () => void; cleanup: () => void } {
  const onProgress = options.onProgress;
  const get = (id: string) => root.querySelector('#' + id) as HTMLElement | null;
  if (!root.querySelector('#scene')) return { run: () => {}, cleanup: () => {} };
  const scene = get('scene');
  const W = ()=>scene.clientWidth, H = ()=>scene.clientHeight;
  const cx = ()=>W()/2, cy = ()=>H()/2;

  /* ---------- tweaks ---------- */
  const TWEAKS = /*EDITMODE-BEGIN*/{
    "speed": 1,
    "accent": "#DD6B2E",
    "bg": "warm",
    "depth3d": 1,
    "hoverFocus": 1,
    "autoLoop": true
  }/*EDITMODE-END*/;

  const ACCENTS = ["#DD6B2E","#E0552E","#CF8A2C","#C2603A"];
  const BG_THEMES = {
    warm:{bg:"#F1EBE2", bg2:"#ECE4D8"},
    sand:{bg:"#EEE2CF", bg2:"#E3D4BB"},
    mist:{bg:"#ECEDEF", bg2:"#E0E4E8"}
  };
  let speed=1, depth3d=1, hoverFocus=1, autoLoop=true;
  function applyTweaks(){
    root.style.setProperty('--orange', TWEAKS.accent);
    const th=BG_THEMES[TWEAKS.bg]||BG_THEMES.warm;
    root.style.setProperty('--bg', th.bg);
    root.style.setProperty('--bg-2', th.bg2);
    speed = +TWEAKS.speed || 1;
    depth3d = +TWEAKS.depth3d;
    hoverFocus = +TWEAKS.hoverFocus;
    autoLoop = !!TWEAKS.autoLoop;
  }
  applyTweaks();

  /* ---------- source tiles ---------- */
  const sources = [
    {l:"Docs",   bg:"#EAF1FB", fg:"#3B73C4", g:"doc"},
    {l:"Sheets", bg:"#E6F3EC", fg:"#2F9E63", g:"sheet"},
    {l:"Images", bg:"#F3ECFB", fg:"#8E78C4", g:"image"},
    {l:"Meta Ads",bg:"#E8F0FE", fg:"#3F6FD8", g:"meta"},
    {l:"Google Ads",bg:"#FBEEE6", fg:"#DD6B2E", g:"ads"},
    {l:"Slack",  bg:"#F6ECF6", fg:"#A23E8E", g:"slack"},
    {l:"CRM",    bg:"#FDF2E2", fg:"#C99024", g:"crm"},
    {l:"Drive",  bg:"#EAF6F3", fg:"#2E9E8C", g:"drive"}
  ];
  const glyphs = {
    doc:'<rect x="6" y="3" width="18" height="24" rx="3" fill="CUR"/><path d="M10 11h10M10 15h10M10 19h6" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
    sheet:'<rect x="4" y="5" width="22" height="20" rx="3" fill="CUR"/><path d="M4 12h22M11 5v20M19 5v20" stroke="#fff" stroke-width="1.4"/>',
    image:'<rect x="4" y="5" width="22" height="20" rx="3" fill="CUR"/><circle cx="11" cy="12" r="2.4" fill="#fff"/><path d="M5 23l6-6 4 4 4-5 6 7" stroke="#fff" stroke-width="2" fill="none" stroke-linejoin="round"/>',
    meta:'<path d="M6 20c2-9 6-9 9 0 3 9 7 9 9 0" stroke="CUR" stroke-width="3.4" fill="none" stroke-linecap="round"/>',
    ads:'<path d="M15 3l11 22H4L15 3z" fill="CUR"/><circle cx="9" cy="22" r="3" fill="#fff"/>',
    slack:'<rect x="6" y="6" width="7" height="7" rx="2" fill="CUR"/><rect x="17" y="6" width="7" height="7" rx="2" fill="CUR" opacity=".55"/><rect x="6" y="17" width="7" height="7" rx="2" fill="CUR" opacity=".55"/><rect x="17" y="17" width="7" height="7" rx="2" fill="CUR"/>',
    crm:'<circle cx="15" cy="11" r="5" fill="CUR"/><path d="M5 26c0-5.5 4.5-8 10-8s10 2.5 10 8" fill="CUR"/>',
    drive:'<path d="M11 4h8l9 16h-8L11 4z" fill="CUR"/><path d="M3 22l4-7 4 7H3z" fill="CUR" opacity=".6"/><path d="M11 24l4-7 4 7h-8z" fill="CUR" opacity=".8"/>'
  };
  const tilesEl = get('tiles');
  const tileNodes = [];
  function buildTiles(){
    tilesEl.innerHTML='';
    tileNodes.length=0;
    const R = Math.min(W(),H())*0.40;
    sources.forEach((s,i)=>{
      const ang = (-90 + i*(360/sources.length)) * Math.PI/180;
      const ox = cx() + Math.cos(ang)*R*(1+ (i%2?0.12:-0.05));
      const oy = cy() + Math.sin(ang)*R*0.92;
      const t = document.createElement('div');
      t.className='tile';
      t.innerHTML = '<div class="ic" style="background:'+s.bg+'"><svg viewBox="0 0 30 30">'+glyphs[s.g].replace(/CUR/g,s.fg)+'</svg></div><div class="lbl">'+s.l+'</div>';
      tilesEl.appendChild(t);
      tileNodes.push({el:t, ox, oy, ang});
      t.style.left = ox+'px'; t.style.top = oy+'px';
    });
  }

  /* ---------- graph model ---------- */
  const cats = [
    {name:"Product",   r:42, ang:-90,  dist:0.30, c:"#C99024", bg:"#FBF1DE"},
    {name:"Brands",    r:34, ang:-22,  dist:0.34, c:"#2F9E63", bg:"#E6F3EC"},
    {name:"Campaigns", r:48, ang:38,   dist:0.31, c:"#DD6B2E", bg:"#FBEADF", target:true},
    {name:"Audiences", r:33, ang:108,  dist:0.34, c:"#8E78C4", bg:"#EFE8FA"},
    {name:"Insights",  r:38, ang:170,  dist:0.30, c:"#3B73C4", bg:"#E7F0FB"},
    {name:"Content",   r:30, ang:232,  dist:0.33, c:"#A23E8E", bg:"#F6ECF6"}
  ];
  const nodesEl = get('nodes');
  const edgesEl = get('edges');
  let catEls=[], dotEls=[], edgeEls=[], centerEl=null, layout=[];
  let proxNodes=[]; // {el,gx,gy,kind,baseOp} for cursor-proximity 3D

  function buildGraph(){
    nodesEl.innerHTML=''; edgesEl.innerHTML='';
    catEls=[]; dotEls=[]; edgeEls=[]; layout=[]; proxNodes=[];
    const base = Math.min(W(),H());
    const C = {x:cx(), y:cy()};

    // center
    centerEl = document.createElement('div');
    centerEl.className='node center';
    centerEl.style.width='62px'; centerEl.style.height='62px';
    centerEl.style.left=C.x+'px'; centerEl.style.top=C.y+'px';
    centerEl.innerHTML='<svg width="58%" height="58%" viewBox="0 0 24 24" aria-label="You"><circle cx="12" cy="8.4" r="4.1" fill="#F4EFE7"/><path d="M3.8 21c0-4.5 3.7-7.1 8.2-7.1s8.2 2.6 8.2 7.1z" fill="#F4EFE7"/></svg>';
    nodesEl.appendChild(centerEl);
    proxNodes.push({el:centerEl, gx:C.x, gy:C.y, kind:'center', baseOp:1});

    const catPos=[];
    cats.forEach((cat)=>{
      const a = cat.ang*Math.PI/180;
      const d = base*cat.dist;
      const x = C.x + Math.cos(a)*d;
      const y = C.y + Math.sin(a)*d*0.9;
      catPos.push({x,y,cat});
      // edge center->cat
      addEdge(C.x,C.y,x,y,'line');
      const el = document.createElement('div');
      el.className='node cat'+(cat.target?' target':'');
      el.style.width=cat.r*2+'px'; el.style.height=cat.r*2+'px';
      el.style.left=x+'px'; el.style.top=y+'px';
      el.innerHTML='<div class="glyph" style="background:'+cat.bg+'"><svg width="60%" height="60%" viewBox="0 0 12 12"><circle cx="6" cy="6" r="4" fill="none" stroke="'+cat.c+'" stroke-width="1.6"/><circle cx="6" cy="6" r="1.4" fill="'+cat.c+'"/></svg></div><span class="name">'+cat.name+'</span>';
      nodesEl.appendChild(el);
      catEls.push({el,x,y,cat});
      proxNodes.push({el, gx:x, gy:y, kind:'cat', baseOp:1});
    });

    // mesh dots around each cat + outer ring
    catPos.forEach(({x,y})=>{
      const n = 5+Math.floor(Math.random()*3);
      for(let i=0;i<n;i++){
        const a = Math.random()*Math.PI*2;
        const rr = 38+Math.random()*54;
        const dx = x+Math.cos(a)*rr, dy=y+Math.sin(a)*rr*0.9;
        addDot(dx,dy, 4+Math.random()*4);
        addEdge(x,y,dx,dy,'line');
      }
    });
    // outer faint ring
    const ringN=46;
    for(let i=0;i<ringN;i++){
      const a=(i/ringN)*Math.PI*2;
      const rr=base*0.46*(0.96+Math.random()*0.08);
      const dx=C.x+Math.cos(a)*rr, dy=C.y+Math.sin(a)*rr*0.82;
      addDot(dx,dy, 3+Math.random()*3, true);
    }
  }
  function addEdge(x1,y1,x2,y2){
    const ln = document.createElementNS('http://www.w3.org/2000/svg','line');
    ln.setAttribute('x1',x1); ln.setAttribute('y1',y1);
    ln.setAttribute('x2',x2); ln.setAttribute('y2',y2);
    const len = Math.hypot(x2-x1,y2-y1);
    ln.style.setProperty('--len',len);
    edgesEl.appendChild(ln);
    edgeEls.push(ln);
  }
  function addDot(x,y,r,faint){
    const d=document.createElement('div');
    d.className='node dot';
    d.style.width=r*2+'px'; d.style.height=r*2+'px';
    d.style.left=x+'px'; d.style.top=y+'px';
    d.dataset.faint = faint?'1':'0';
    nodesEl.appendChild(d);
    dotEls.push(d);
    proxNodes.push({el:d, gx:x, gy:y, kind:'dot', baseOp:faint?0.32:0.7});
  }

  /* ---------- workflow model ---------- */
  const wfCards = [
    {id:"s1", sub:"workflow inputs", ic:"#3B73C4", bg:"#E7F0FB", label:"Trigger", field:"New support request", dim:false, pill:null},
    {id:"s2", sub:"LLM · classify", ic:"#8E78C4", bg:"#EFE8FA", label:"Prompt", field:"Detect intent + urgency", dim:false, pill:"gemini-2.5"},
    {id:"s3", sub:"knowledge base", ic:"#2F9E63", bg:"#E6F3EC", label:"Tool", field:"Search Knowledge Base", dim:false, pill:null},
    {id:"s4", sub:"LLM · draft reply", ic:"#8E78C4", bg:"#EFE8FA", label:"Prompt", field:"Compose helpful response", dim:false, pill:"{{steps.s2}}"},
    {id:"s5", sub:"human-in-the-loop", ic:"#DD6B2E", bg:"#FBEADF", label:"Mode", field:"Approve / edit", dim:false, pill:null, sel:true},
    {id:"out",sub:"send reply", ic:"#211E1A", bg:"#ECE4D8", label:"Output", field:"{{steps.s4.result}}", dim:true, pill:null}
  ];
  const flowNodes = get('flowNodes');
  const flowEdges = get('flowEdges');
  let wfEls=[], wfEdges=[];
  function buildFlow(){
    flowNodes.innerHTML=''; flowEdges.innerHTML='';
    wfEls=[]; wfEdges=[];
    const cols=3, gapX=Math.min(250,(W()-200)/3+30), gapY=200;
    const totalW=(cols-1)*gapX+200;
    const startX=cx()-totalW/2;
    const startY=cy()-gapY*0.75;
    const pos=[];
    wfCards.forEach((c,i)=>{
      const col=i%cols, row=Math.floor(i/cols);
      const x=startX+col*gapX, y=startY+row*gapY;
      pos.push({x,y});
      const el=document.createElement('div');
      el.className='wf'+(c.sel?' sel':'');
      el.style.left=x+'px'; el.style.top=y+'px';
      el.innerHTML=
        '<div class="wf-head"><div class="wf-ic" style="background:'+c.bg+'">'+
        '<svg width="14" height="14" viewBox="0 0 14 14"><rect x="2.5" y="2.5" width="9" height="9" rx="2.5" fill="none" stroke="'+c.ic+'" stroke-width="1.6"/></svg></div>'+
        '<div><div class="wf-id">'+c.id+'</div><div class="wf-sub">'+c.sub+'</div></div>'+
        '<svg class="wf-trash" width="13" height="13" viewBox="0 0 13 13"><path d="M2 3h9M5 3V1.6h3V3M3.2 3l.6 8h5.4l.6-8" stroke="#938A7D" stroke-width="1.1" fill="none" stroke-linecap="round"/></svg></div>'+
        '<div class="wf-body"><div class="wf-label">'+c.label+'</div>'+
        '<div class="wf-field'+(c.dim?' dim':'')+'">'+c.field+'</div>'+
        (c.pill?'<div style="margin-top:8px"><span class="wf-pill">'+c.pill+'</span></div>':'')+
        '</div>';
      flowNodes.appendChild(el);
      wfEls.push(el);
    });
    // connectors following s1->s2->s3->s4->s5->out
    for(let i=0;i<pos.length-1;i++){
      const a=pos[i], b=pos[i+1];
      const ax=a.x+200, ay=a.y+34, bx=b.x, by=b.y+34;
      // if next row wraps, route down
      let d;
      if(b.y>a.y){ d='M '+(a.x+100)+' '+(a.y+150)+' C '+(a.x+100)+' '+(a.y+185)+', '+(b.x+100)+' '+(b.y-35)+', '+(b.x+100)+' '+(b.y)+''; }
      else { d='M '+ax+' '+ay+' C '+(ax+30)+' '+ay+', '+(bx-30)+' '+by+', '+bx+' '+by; }
      const p=document.createElementNS('http://www.w3.org/2000/svg','path');
      p.setAttribute('d',d);
      const len=p.getTotalLength?400:400;
      flowEdges.appendChild(p);
      const L=p.getTotalLength();
      p.style.strokeDasharray=L; p.style.strokeDashoffset=L; p.style.opacity='0';
      p.dataset.len=L;
      wfEdges.push(p);
    }
  }

  /* ---------- steps for thinking ---------- */
  const subSteps = [
    {t1:"Mapping intents",     t2:"Defined triage routing"},
    {t1:"Wiring knowledge",    t2:"Connected Search KB"},
    {t1:"Drafting responses",  t2:"Added reply composer"},
    {t1:"Adding guardrails",   t2:"Inserted human approval"}
  ];
  const stepsEl=get('steps');
  let stepEls=[];
  function buildSteps(){
    stepsEl.innerHTML=''; stepEls=[];
    subSteps.forEach(s=>{
      const el=document.createElement('div');
      el.className='step';
      el.innerHTML='<div class="dot"></div><div class="txt"><div class="t1">'+s.t1+'</div><div class="t2">'+s.t2+'</div></div>';
      stepsEl.appendChild(el);
      stepEls.push(el);
    });
  }

  /* ---------- animation helpers ---------- */
  const T = []; // timeouts
  let gen = 0; // generation token — only the latest run's callbacks fire
  function at(ms, fn){
    const myGen = gen;
    T.push(setTimeout(()=>{ if(myGen===gen) fn(); }, ms/speed));
  }
  function clearAll(){ gen++; T.forEach(clearTimeout); T.length=0; }
  const ease='cubic-bezier(.34,.01,.2,1)';

  const cursorEl=get('cursor');
  const graphWrap=get('graphWrap');
  const seedEl=get('seed');
  const panel=get('panel');
  const thinking=get('thinking');
  const flow=get('flow');
  const glow=get('glow');
  const msgEl=get('msg');
  const caret=get('caret');
  const sentBubble=get('sentBubble');
  const sendBtn=get('send');
  const cap=get('cap');
  const fill=get('fill');

  function setCursor(x,y,dur){
    cursorEl.style.transition='transform '+dur+'ms '+ease;
    cursorEl.style.transform='translate('+x+'px,'+y+'px)';
    // drive proximity target so nodes react under the scripted cursor
    scriptDrive=true; scrX=x; scrY=y;
    if(dur<=30){ curX=x; curY=y; }
  }

  function reset(){
    clearAll();
    stopProgressLoop();
    onProgress?.({ step: 0, stepProgress: 0, overallProgress: 0 });
    parallaxOn=false;
    scriptDrive=false;
    graphWrap.style.transform='translate(0,0) scale(.92)';
    glow.classList.remove('on');
    // tiles
    buildTiles();
    tileNodes.forEach(t=>{t.el.style.transition='none'; t.el.style.opacity='0'; t.el.style.transform='translate(-50%,-50%) scale(.55)';});
    seedEl.style.transition='none'; seedEl.style.transform='translate(-50%,-50%) scale(0)'; seedEl.style.opacity='0'; seedEl.style.boxShadow='0 0 0 0 rgba(221,107,46,.5)';
    // graph
    buildGraph();
    graphWrap.style.transition='none'; graphWrap.style.opacity='0'; graphWrap.style.filter='none'; graphWrap.style.transform='translate(0,0) scale(.92)';
    [centerEl,...catEls.map(c=>c.el)].forEach(e=>{e.style.transition='none'; e.style.transform='translate(-50%,-50%) scale(0)';});
    dotEls.forEach(d=>{d.style.transition='none'; d.style.transform='translate(-50%,-50%) scale(0)'; d.style.opacity='0';});
    edgeEls.forEach(l=>{l.style.transition='none'; l.style.strokeDashoffset=getComputedStyle(l).getPropertyValue('--len'); l.style.opacity='0';});
    catEls.forEach(c=>c.el.classList.remove('lit'));
    // cursor
    cursorEl.style.transition='none'; cursorEl.style.opacity='0'; cursorEl.style.transform='translate('+(cx()-180)+'px,'+(cy()+200)+'px)';
    // panel
    panel.style.transition='none'; panel.style.opacity='0'; panel.style.transform='translate(-50%,-42%) scale(.96)';
    msgEl.innerHTML='<span class="caret" id="caret"></span>';
    sendBtn.classList.remove('armed');
    sentBubble.style.transition='none'; sentBubble.style.opacity='0';
    // thinking
    thinking.style.transition='none'; thinking.style.opacity='0'; thinking.style.transform='translate(-50%,-40%) scale(.97)';
    buildSteps();
    // flow
    buildFlow();
    flow.style.transition='none'; flow.style.opacity='0';
    wfEls.forEach(e=>{e.style.transition='none'; e.style.opacity='0'; e.style.transform='scale(.86)';});
    fill.style.transition='none'; fill.style.width='0%';
    // force reflow
    void scene.offsetWidth;
  }

  const TOTAL=20500;
  const STEP_BOUNDARIES = [0, 8300, 15868, TOTAL];
  let progressRaf: number | null = null;

  function stopProgressLoop() {
    if (progressRaf !== null) {
      cancelAnimationFrame(progressRaf);
      progressRaf = null;
    }
  }

  function emitProgress(elapsed: number) {
    const overallProgress = Math.min(1, elapsed / TOTAL);
    let step = 0;
    if (elapsed >= STEP_BOUNDARIES[2]) step = 2;
    else if (elapsed >= STEP_BOUNDARIES[1]) step = 1;

    const stepStart = STEP_BOUNDARIES[step];
    const stepEnd = STEP_BOUNDARIES[step + 1];
    const stepProgress = Math.min(1, Math.max(0, (elapsed - stepStart) / (stepEnd - stepStart)));

    onProgress?.({ step, stepProgress, overallProgress });
  }

  function startProgressLoop(runGen: number) {
    stopProgressLoop();
    const startTime = performance.now();

    function tick() {
      if (runGen !== gen) return;
      const elapsed = (performance.now() - startTime) * speed;
      emitProgress(elapsed);
      if (elapsed < TOTAL) {
        progressRaf = requestAnimationFrame(tick);
      }
    }

    emitProgress(0);
    tick();
  }

  function progress(){
    fill.style.transition='width '+(TOTAL/speed)+'ms linear';
    fill.style.width='100%';
  }

  function run(){
    reset();
    progress();
    const runGen = gen;
    startProgressLoop(runGen);

    /* PHASE 1 — ingest */
    cap.textContent='Ingest';
    tileNodes.forEach((t,i)=>{
      at(120+i*90, ()=>{
        t.el.style.transition='transform .7s '+ease+', opacity .5s ease';
        t.el.style.opacity='1';
        t.el.style.transform='translate(-50%,-50%) scale(1)';
      });
    });
    // gather to center \u2014 travel via transform (smooth), fade out only on arrival
    at(1900, ()=>{
      const ccx=cx(), ccy=cy();
      tileNodes.forEach((t,i)=>{
        const dx=ccx - t.ox, dy=ccy - t.oy;
        t.el.style.transition='transform .95s cubic-bezier(.55,0,.25,1), opacity .35s ease .62s';
        t.el.style.transform='translate(calc(-50% + '+dx.toFixed(1)+'px), calc(-50% + '+dy.toFixed(1)+'px)) scale(.32) rotate('+((i%2?1:-1)*18)+'deg)';
        t.el.style.opacity='0';
      });
    });
    // seed appears + pulse
    at(2650, ()=>{
      seedEl.style.transition='transform .5s '+ease+', opacity .3s ease';
      seedEl.style.opacity='1';
      seedEl.style.transform='translate(-50%,-50%) scale(1)';
      glow.classList.add('on');
    });
    at(2950, ()=>{
      seedEl.style.transition='transform .6s ease, box-shadow .7s ease';
      seedEl.style.boxShadow='0 0 0 26px rgba(221,107,46,0)';
    });

    /* PHASE 2 — graph bloom */
    at(3200, ()=>{
      cap.textContent='Knowledge graph';
      seedEl.style.transition='opacity .4s ease'; seedEl.style.opacity='0';
      graphWrap.style.transition='opacity .6s ease, transform .9s '+ease;
      graphWrap.style.opacity='1';
      graphWrap.style.transform='translate(0,0) scale(1)';
      centerEl.style.transition='transform .6s '+ease;
      centerEl.style.transform='translate(-50%,-50%) scale(1)';
    });
    // edges draw
    at(3450,()=>{
      edgeEls.forEach((l,i)=>{
        at(i*8,()=>{
          l.style.transition='stroke-dashoffset .8s ease, opacity .5s ease';
          l.style.strokeDashoffset='0';
          l.style.opacity = l.previousSibling? '.6':'.6';
        });
      });
    });
    // cats pop
    at(3700,()=>{
      catEls.forEach((c,i)=>{
        at(i*110,()=>{
          c.el.style.transition='transform .6s cubic-bezier(.34,1.4,.5,1)';
          c.el.style.transform='translate(-50%,-50%) scale(1)';
        });
      });
    });
    // dots fade
    at(3900,()=>{
      dotEls.forEach((d,i)=>{
        at(i*9,()=>{
          d.style.transition='transform .5s '+ease+', opacity .5s ease';
          d.style.transform='translate(-50%,-50%) scale(1)';
          d.style.opacity = d.dataset.faint==='1' ? '.32':'.7';
        });
      });
    });

    /* gentle drift / parallax suggestion while idle */
    at(5200,()=>{ enableParallax(true); });

    /* PHASE 3 — cursor moves & clicks Campaigns */
    at(5600,()=>{
      cap.textContent='Select node';
      cursorEl.style.transition='opacity .3s ease';
      cursorEl.style.opacity='1';
    });
    at(5750,()=> setCursor(cx()-160, cy()+170, 10));
    at(5900,()=> setCursor(cx()+40, cy()+60, 1100));
    const camp = catEls.find(c=>c.cat.target);
    at(7000,()=> setCursor(camp.x-6, camp.y-4, 700));
    at(7750,()=>{
      camp.el.classList.add('lit');
      ringPulse(camp.x,camp.y, camp.cat.r);
      cursorEl.style.transition='transform .12s ease';
      cursorEl.style.transform='translate('+(camp.x-6)+'px,'+(camp.y-4)+'px) scale(.85)';
    });
    at(7900,()=> cursorEl.style.transform='translate('+(camp.x-6)+'px,'+(camp.y-4)+'px) scale(1)');

    /* PHASE 4 — composer */
    at(8300,()=>{
      cap.textContent='Compose';
      enableParallax(false);
      graphWrap.style.transition='opacity .7s ease, filter .7s ease, transform .9s '+ease;
      graphWrap.style.opacity='.18';
      graphWrap.style.filter='blur(3px)';
      graphWrap.style.transform='scale(1.04)';
      cursorEl.style.transition='opacity .4s ease'; cursorEl.style.opacity='0';
      panel.style.transition='opacity .6s ease, transform .7s '+ease;
      panel.style.opacity='1';
      panel.style.transform='translate(-50%,-50%) scale(1)';
    });
    // type message
    const text="Help me create a customer support agent";
    at(9100,()=> typeText(text, 9100));
    // arm + send
    at(9100+text.length*42+500,()=> sendBtn.classList.add('armed'));
    const sendAt=9100+text.length*42+950;
    at(sendAt,()=>{
      // morph: user bubble + collapse composer
      sentBubble.textContent=text;
      sentBubble.style.transition='opacity .5s ease, transform .6s '+ease;
      sentBubble.style.opacity='1';
      sentBubble.style.transform='translate(-50%,-86px)';
      panel.style.transition='opacity .45s ease, transform .5s ease';
      panel.style.opacity='0';
      panel.style.transform='translate(-50%,-46%) scale(.97)';
    });

    /* PHASE 5 — thinking */
    const thinkAt=sendAt+550;
    at(thinkAt,()=>{
      cap.textContent='Reasoning';
      thinking.style.transition='opacity .55s ease, transform .6s '+ease;
      thinking.style.opacity='1';
      thinking.style.transform='translate(-50%,-50%) scale(1)';
    });
    subSteps.forEach((s,i)=>{
      at(thinkAt+500+i*620,()=>{
        const e=stepEls[i];
        e.style.transition='opacity .4s ease, transform .4s ease';
        e.style.opacity='1'; e.style.transform='translateY(0)';
        at(420,()=> e.classList.add('done'));
      });
    });

    /* PHASE 6 — workflow */
    const flowAt=thinkAt+500+subSteps.length*620+650;
    at(flowAt,()=>{
      cap.textContent='Workflow built';
      thinking.style.transition='opacity .5s ease, transform .55s ease';
      thinking.style.opacity='0';
      thinking.style.transform='translate(-50%,-54%) scale(.97)';
      sentBubble.style.transition='opacity .5s ease'; sentBubble.style.opacity='0';
      flow.style.transition='opacity .4s ease'; flow.style.opacity='1';
    });
    at(flowAt+250,()=>{
      wfEls.forEach((e,i)=>{
        at(i*150,()=>{
          e.style.transition='opacity .5s ease, transform .6s cubic-bezier(.34,1.3,.5,1)';
          e.style.opacity='1'; e.style.transform='scale(1)';
        });
      });
      wfEdges.forEach((p,i)=>{
        at(300+i*150,()=>{
          p.style.transition='stroke-dashoffset .7s ease, opacity .4s ease';
          p.style.strokeDashoffset='0'; p.style.opacity='.8';
        });
      });
    });

    /* loop */
    if(autoLoop) at(TOTAL, run);
  }

  function typeText(text, startMs){
    let i=0;
    function step(){
      if(i>text.length) return;
      const shown=text.slice(0,i);
      msgEl.innerHTML = shown.replace(/&/g,'&amp;').replace(/</g,'&lt;') + '<span class="caret"></span>';
      i++;
      if(i<=text.length) T.push(setTimeout(step,42/speed));
    }
    step();
  }

  function ringPulse(x,y,r){
    const p=document.createElement('div');
    p.className='ring-pulse';
    p.style.left=x+'px'; p.style.top=y+'px';
    p.style.width=r*2+'px'; p.style.height=r*2+'px';
    nodesEl.appendChild(p);
    requestAnimationFrame(()=>{
      p.style.transition='transform .7s ease, opacity .7s ease';
      p.style.opacity='.7';
      p.style.transform='translate(-50%,-50%) scale(2.4)';
      setTimeout(()=>{p.style.opacity='0';},120);
      setTimeout(()=>p.remove(),800);
    });
  }

  /* parallax + 3D cursor proximity */
  let parallaxOn=false, mx=0, my=0, curX=0, curY=0, driftT=0, raf=null, proxStart=0;
  let scriptDrive=false, scrX=0, scrY=0; // scripted cursor drives node proximity too
  function enableParallax(on){
    if(on && !parallaxOn){
      proxStart=performance.now();
      if(curX===0 && curY===0){ curX=cx(); curY=cy(); }
    }
    parallaxOn=on;
    if(on && !raf) loop();
    if(!on){ graphWrap.style.transition='transform .6s ease'; }
  }
  function loop(){
    driftT+=0.012;
    if(parallaxOn){
      if(scriptDrive){
        curX += (scrX-curX)*0.16;
        curY += (scrY-curY)*0.16;
        mx=(curX/W()-0.5)*2; my=(curY/H()-0.5)*2;
      }
      const ramp=Math.min(1,(performance.now()-proxStart)/700);
      // 3D plane tilt toward cursor + gentle idle drift
      const tiltX=(-my*5.5*depth3d).toFixed(2);
      const tiltY=(mx*6.5*depth3d).toFixed(2);
      const dx=mx*12 + Math.sin(driftT)*5;
      const dy=my*12 + Math.cos(driftT*0.8)*4;
      graphWrap.style.transition='transform .3s ease-out';
      graphWrap.style.transform='translate('+dx.toFixed(1)+'px,'+dy.toFixed(1)+'px) rotateX('+tiltX+'deg) rotateY('+tiltY+'deg)';
      // per-node depth: near cursor grows + lifts, far shrinks + recedes
      const R=250;
      for(const n of proxNodes){
        const d=Math.hypot(n.gx-curX, n.gy-curY);
        const infl=Math.max(0, 1-d/R);
        const eased=infl*infl*(3-2*infl); // smoothstep
        const sc=1 + ramp*hoverFocus*(-0.16 + 0.62*eased);
        const z=(ramp*depth3d*eased*52).toFixed(1);
        n.el.style.transform='translate(-50%,-50%) translateZ('+z+'px) scale('+sc.toFixed(3)+')';
        if(n.kind==='dot') n.el.style.opacity=(n.baseOp + ramp*eased*0.4).toFixed(2);
        n.el.style.zIndex = eased>0.04 ? String(20+Math.round(eased*30)) : '';
      }
      raf=requestAnimationFrame(loop);
    } else { raf=null; }
  }
  function onMouseMove(e: MouseEvent){
    scriptDrive=false; // real cursor takes over
    const r=scene.getBoundingClientRect();
    curX=e.clientX-r.left; curY=e.clientY-r.top;
    mx=(curX/r.width-0.5)*2;
    my=(curY/r.height-0.5)*2;
  }
  window.addEventListener('mousemove', onMouseMove);

  return {
    run,
    cleanup: () => {
      clearAll();
      stopProgressLoop();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
    },
  };
}
