/* STAY DRY ROOFING — interactions */
(function(){
"use strict";
var $=function(s,c){return (c||document).querySelector(s)};
var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- fine rain, hero only ---------- */
(function rain(){
  var cv=$("#rain"); if(!cv) return;
  var ctx=cv.getContext("2d"), drops=[], running=true, scheduled=false;
  function size(){
    var r=cv.parentElement.getBoundingClientRect(), d=Math.min(window.devicePixelRatio||1,2);
    cv.width=r.width*d; cv.height=r.height*d; ctx.setTransform(d,0,0,d,0,0);
  }
  function seed(){
    drops=[]; var w=cv.width/(Math.min(window.devicePixelRatio||1,2));
    var n=Math.floor(w/14);
    for(var i=0;i<n;i++) drops.push({x:Math.random()*w,y:Math.random()*600,s:2+Math.random()*3,l:10+Math.random()*16,o:.08+Math.random()*.16});
  }
  function tick(){
    var d=Math.min(window.devicePixelRatio||1,2), w=cv.width/d, h=cv.height/d;
    ctx.clearRect(0,0,w,h); ctx.lineWidth=1;
    for(var i=0;i<drops.length;i++){var p=drops[i];
      ctx.strokeStyle="rgba(165,195,225,"+p.o+")";
      ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x-3,p.y+p.l); ctx.stroke();
      p.y+=p.s; p.x-=.4;
      if(p.y>h){p.y=-20;p.x=Math.random()*w;}
    }
    if(running&&!reduceMotion) requestAnimationFrame(tick); else scheduled=false;
  }
  function onVis(entries){ entries.forEach(function(e){ running=e.isIntersecting; if(running&&!reduceMotion&&!scheduled){scheduled=true; tick();} }); }
  size(); seed();
  if(!reduceMotion){ new IntersectionObserver(onVis,{threshold:0}).observe(cv); scheduled=true; tick(); }
  window.addEventListener("resize",function(){size();seed();});
})();

/* ---------- reveals (backstop: everything completes < 3.5s, no interaction) ---------- */
(function reveals(){
  var els=$$("[data-blur],[data-reveal]");
  function all(){ els.forEach(function(e){e.classList.add("in")}); }
  if("IntersectionObserver" in window && !reduceMotion){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){e.target.classList.add("in"); io.unobserve(e.target);} }); },{threshold:.12});
    els.forEach(function(e){io.observe(e)});
    setTimeout(all,3500);
  } else all();
})();

/* ---------- rainfall counter: 52 in/yr, server-rendered, animates up ---------- */
(function counter(){
  var el=$("#rain-counter"); if(!el) return;
  if(reduceMotion) return;
  var target=52, t0=null;
  function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/1400,1);
    el.textContent=Math.round(target*(1-Math.pow(1-p,3)));
    if(p<1) requestAnimationFrame(step); }
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){requestAnimationFrame(step); io.disconnect();} }); });
  io.observe(el);
})();

/* ---------- live Tampa time + open chip ---------- */
(function clock(){
  var t=$("#tampa-time"), chip=$("#open-chip"), txt=$("#open-text"); if(!t) return;
  function update(){
    try{
      var now=new Date();
      var parts=new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",hour:"numeric",minute:"2-digit",weekday:"short",hour12:true}).formatToParts(now);
      var g=function(k){var p=parts.find(function(x){return x.type===k});return p?p.value:""};
      t.textContent=g("hour")+":"+g("minute")+" "+g("dayPeriod")+" Tampa time";
      var hr=parseInt(new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",hour:"numeric",hour12:false}).format(now),10);
      var day=new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",weekday:"short"}).format(now);
      var open=(day!=="Sat"&&day!=="Sun"&&hr>=9&&hr<17);
      txt.textContent=open?"OPEN NOW":"NEXT DISPATCH 9 AM";
      chip.classList.toggle("closed",!open);
    }catch(e){ t.textContent="Tampa, FL"; }
  }
  update(); setInterval(update,30000);
})();

/* ---------- 4-step inspection stepper ---------- */
(function stepper(){
  var form=$("#book"); if(!form) return;
  var steps=$$(".step",form), next=$("#step-next"), back=$("#step-back"),
      fill=$("#progress-fill"), done=$("#step-done"), summary=$("#done-summary"),
      mailto=$("#done-mailto"), state=$("#done-state");
  var cur=1, answers={job:"",zip:"",size:"",when:"",name:"",phone:"",urgent:false};

  function show(n){
    cur=n;
    steps.forEach(function(s){ s.hidden = +s.dataset.step!==n; });
    back.hidden = n===1;
    next.disabled = !valid(n);
    next.textContent = n===4 ? "Get my free roof check →" : "Continue →";
    fill.style.width=(n/4*100)+"%";
  }
  function valid(n){
    if(n===1) return !!answers.job;
    if(n===2) return /^\d{5}$/.test(answers.zip);
    if(n===3) return !!answers.size;
    if(n===4) return !!answers.when && answers.name.trim().length>0 && answers.phone.replace(/\D/g,"").length>=7;
    return false;
  }
  $$('.step[data-step="1"] .choice',form).forEach(function(b){
    b.addEventListener("click",function(){
      $$('.step[data-step="1"] .choice',form).forEach(function(x){x.setAttribute("aria-pressed","false")});
      b.setAttribute("aria-pressed","true"); answers.job=b.dataset.val; next.disabled=false;
    });
  });
  $$('.step[data-step="3"] .choice',form).forEach(function(b){
    b.addEventListener("click",function(){
      $$('.step[data-step="3"] .choice',form).forEach(function(x){x.setAttribute("aria-pressed","false")});
      b.setAttribute("aria-pressed","true"); answers.size=b.dataset.val; next.disabled=false;
    });
  });
  $$('.step[data-step="4"] .choice',form).forEach(function(b){
    b.addEventListener("click",function(){
      $$('.step[data-step="4"] .choice',form).forEach(function(x){x.setAttribute("aria-pressed","false")});
      b.setAttribute("aria-pressed","true"); answers.when=b.dataset.val; next.disabled=!valid(4);
    });
  });
  $("#f-zip").addEventListener("input",function(e){ answers.zip=e.target.value.replace(/\D/g,"").slice(0,5); e.target.value=answers.zip; next.disabled=!valid(2); });
  $("#f-name").addEventListener("input",function(e){ answers.name=e.target.value; next.disabled=!valid(4); });
  $("#f-phone").addEventListener("input",function(e){ answers.phone=e.target.value; next.disabled=!valid(4); });
  var urgent=$("#urgent-toggle");
  urgent.addEventListener("click",function(){
    var on=urgent.getAttribute("aria-pressed")!=="true";
    urgent.setAttribute("aria-pressed",on); answers.urgent=on;
  });
  back.addEventListener("click",function(){
    if(cur===4&&answers.urgent&&!answers.size) show(1); else show(Math.max(1,cur-1));
  });
  next.addEventListener("click",function(){
    if(cur===1&&answers.urgent){ show(4); return; }        /* emergency path skips qualification */
    if(cur===4){ finish(); return; }
    show(cur+1);
  });
  function finish(){
    steps.forEach(function(s){s.hidden=true});
    $(".step-nav",form).hidden=true; $(".progress",form).style.display="none";
    var bits=[answers.job,answers.zip,answers.size,answers.when].filter(Boolean).join(" · ");
    summary.innerHTML="<strong>"+esc(answers.name)+"</strong> — "+esc(bits)+(answers.urgent?' · <strong style="color:var(--accent)">URGENT</strong>':"");
    var body="Name: "+answers.name+"%0D%0APhone: "+answers.phone+"%0D%0AJob: "+answers.job+"%0D%0AZIP: "+answers.zip+"%0D%0AHome: "+answers.size+"%0D%0ACallback: "+answers.when+(answers.urgent?"%0D%0AURGENT: water coming in now":"");
    mailto.href="mailto:office@staydryroofingoftampabay.com?subject="+encodeURIComponent("Free roof check — "+answers.job+" ("+answers.zip+")")+"&body="+body;
    done.hidden=false;
    mailto.addEventListener("click",function(){
      state.textContent="Opening your email…";
      setTimeout(function(){ state.textContent="Request ready — a tech replies today. Avg. callback 6 min."; },900);
    },{once:true});
  }
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
  show(1);
})();

/* ---------- damage picker ---------- */
(function damage(){
  var data={
    leak:{pro:"Likely a flashing or vent-boot failure.",body:"We trace the entry point, seal it, and photograph the fix for you. Most repairs run $349–$700 and finish the same day.",price:"from $349",time:"done same-day"},
    shingles:{pro:"Wind-lifted shingles break the seal strip.",body:"We replace the run, re-seal the course, and check the ridge line. Most runs $349–$900, done in one visit.",price:"from $349",time:"one visit"},
    ponding:{pro:"Ponding on a flat or low-slope section.",body:"We re-slope with tapered insulation or add a drain so water leaves the roof. Quoted on inspection — the inspection is free.",price:"free inspection",time:"quoted same-day"},
    storm:{pro:"Don't climb up there yourself.",body:"We tarp it today so nothing else gets wet, then document everything the way your insurer wants it. Tarp + inspection free with the repair.",price:"tarp + inspection free",time:"tarped today"}
  };
  var chips=$$(".dchip"), pro=$("#damage-pro"), body=$("#damage-body"), price=$("#damage-price"), time=$("#damage-time");
  chips.forEach(function(c){
    c.addEventListener("click",function(){
      chips.forEach(function(x){x.classList.remove("is-active");x.setAttribute("aria-selected","false")});
      c.classList.add("is-active"); c.setAttribute("aria-selected","true");
      var d=data[c.dataset.damage];
      pro.textContent=d.pro; body.textContent=d.body; price.textContent=d.price; time.textContent=d.time;
    });
  });
})();

/* ---------- mobile menu ---------- */
(function menu(){
  var btn=$("#hamburger"), m=$("#mobile-menu"); if(!btn) return;
  function close(){ m.hidden=true; m.classList.remove("open"); btn.setAttribute("aria-expanded","false"); btn.setAttribute("aria-label","Open menu"); }
  btn.addEventListener("click",function(){
    var open=m.hidden;
    if(open){ m.hidden=false; requestAnimationFrame(function(){m.classList.add("open")}); btn.setAttribute("aria-expanded","true"); btn.setAttribute("aria-label","Close menu"); }
    else close();
  });
  $$("a",m).forEach(function(a){a.addEventListener("click",close)});
  document.addEventListener("keydown",function(e){ if(e.key==="Escape"&&!m.hidden) close(); });
})();

/* ---------- sticky mobile bar: show after hero, hide over final CTA ---------- */
(function mbar(){
  var bar=$("#mobile-bar"), hero=$(".hero"), fin=$("#contact"); if(!bar) return;
  var pastHero=false, overFin=false;
  function upd(){ bar.classList.toggle("show", pastHero && !overFin); }
  new IntersectionObserver(function(es){ pastHero=!es[0].isIntersecting && es[0].boundingClientRect.top<0; upd(); },{threshold:0}).observe(hero);
  new IntersectionObserver(function(es){ overFin=es[0].isIntersecting; upd(); },{threshold:.12}).observe(fin);
})();

/* ---------- footer year ---------- */
(function(){ var y=$("#year"); if(y) y.textContent=new Date().getFullYear(); })();
})();
