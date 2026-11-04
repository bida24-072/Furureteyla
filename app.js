/* EDIT ME: WhatsApp number for orders (country code 267, no + or spaces) */
const CFG={wa:'267XXXXXXXX'};

/* EDIT ME: products. t: 'w' watch (gets 3D viewer), 'a' accessory. Prices are placeholders in Pula.
   cs case color, d dial color, bz bezel color, s strap color, sq true = square RM-style case */
const P=[
{id:1,n:'Rolex Submariner',b:'Rolex',t:'w',p:150000,cs:0xc9ced3,d:0x0b0b0b,bz:0x111111,s:0xb8bec4},
{id:2,n:'Rolex Datejust',b:'Rolex',t:'w',p:120000,cs:0xc9ced3,d:0xd9c28f,bz:0xc8a96a,s:0xb8bec4},
{id:3,n:'Rolex Daytona',b:'Rolex',t:'w',p:320000,cs:0xc9ced3,d:0xf1ede4,bz:0x1a1a1a,s:0xb8bec4},
{id:4,n:'Rolex GMT-Master II',b:'Rolex',t:'w',p:175000,cs:0xc9ced3,d:0x0b0b0b,bz:0x1d3f8f,s:0xb8bec4},
{id:5,n:'Richard Mille RM 011',b:'Richard Mille',t:'w',p:2500000,cs:0xdadde0,d:0x2a2a2a,bz:0x3a3a3a,s:0xff6a00,sq:1},
{id:6,n:'Richard Mille RM 67-02',b:'Richard Mille',t:'w',p:1800000,cs:0xf1f1f1,d:0x1f2933,bz:0xe8e8e8,s:0x2a6df4,sq:1},
{id:7,n:'Watch winder',b:'Accessory',t:'a',p:3500,cs:0x5a3b22,d:0x2b1b10},
{id:8,n:'Leather strap',b:'Accessory',t:'a',p:1200,cs:0x7a4a2a,d:0x3c2412},
{id:9,n:'Cleaning kit',b:'Accessory',t:'a',p:450,cs:0x9aa5a0,d:0x5e6b66},
{id:10,n:'Travel case',b:'Accessory',t:'a',p:1800,cs:0x222222,d:0x0e0e0e}];

const C=()=>{try{return JSON.parse(localStorage.getItem('ftw')||'{}')}catch(e){return{}}};
const S=c=>{try{localStorage.setItem('ftw',JSON.stringify(c))}catch(e){}cnt()};
const cnt=()=>document.querySelectorAll('.cn').forEach(e=>e.textContent=Object.values(C()).reduce((a,b)=>a+b,0));
const fmt=n=>'P '+n.toLocaleString('en-US');
const hx=n=>'#'+n.toString(16).padStart(6,'0');
function toast(t){let e=document.getElementById('toast');if(!e){e=document.createElement('div');e.id='toast';document.body.appendChild(e)}e.textContent=t;e.className='on';setTimeout(()=>e.className='',1800)}
function add(id){const c=C();c[id]=(c[id]||0)+1;S(c);toast('Added to cart')}
const card=p=>`<article class="card"><div class="dial" style="--c:${hx(p.cs)};--d:${hx(p.d)}"></div><h3>${p.n}</h3><p class="m">${p.b}</p><p class="pr">${fmt(p.p)}</p><div class="row">${p.t=='w'?`<button class="btn ghost" onclick="view(${p.id})">View in 3D</button>`:''}<button class="btn" onclick="add(${p.id})">Add to cart</button></div></article>`;
cnt();

/* 3D watch viewer: drag or swipe to rotate, cursor or finger tilts it, hands show real time */
function viewer(el){
const T=THREE,W=()=>el.clientWidth,H=()=>el.clientHeight;
const r=new T.WebGLRenderer({antialias:true,alpha:true});r.setPixelRatio(Math.min(devicePixelRatio,2));r.setSize(W(),H());
el.prepend(r.domElement);r.domElement.style.touchAction='pan-y';
const sc=new T.Scene(),cam=new T.PerspectiveCamera(35,W()/H(),.1,100);cam.position.z=12;
sc.add(new T.AmbientLight(0xffffff,.7));
const a=new T.DirectionalLight(0xffffff,1.3);a.position.set(3,4,6);sc.add(a);
const b=new T.PointLight(0xc8a96a,1.2,40);b.position.set(-5,-3,5);sc.add(b);
let g,hs,ry=0,rx=0,tx=0,ty=0,dr=false,lx=0,ly=0;
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
const M=(c,m=.8,ro=.25)=>new T.MeshStandardMaterial({color:c,metalness:m,roughness:ro});
const mesh=(geo,mat,x=0,y=0,z=0)=>{const m=new T.Mesh(geo,mat);m.position.set(x,y,z);g.add(m);return m};
function load(o){
if(g)sc.remove(g);g=new T.Group();sc.add(g);
const cs=M(o.cs),dl=M(o.d,.3,.5),bz=M(o.bz,.6,.3),st=M(o.s,.4,.6),gold=M(0xc8a96a,.9,.2);
if(o.sq){mesh(new T.BoxGeometry(3.4,4.2,.7),cs);mesh(new T.BoxGeometry(3.6,4.4,.3),bz,0,0,.2);mesh(new T.PlaneGeometry(2.8,3.6),dl,0,0,.42)}
else{mesh(new T.CylinderGeometry(2,2,.7,64),cs).rotation.x=Math.PI/2;mesh(new T.TorusGeometry(2,.2,16,64),bz,0,0,.35);mesh(new T.CircleGeometry(1.75,64),dl,0,0,.37);mesh(new T.CylinderGeometry(.18,.18,.4,16),cs,2.2).rotation.z=Math.PI/2}
mesh(new T.BoxGeometry(1.7,2.8,.35),st,0,3.4,-.05);mesh(new T.BoxGeometry(1.7,2.8,.35),st,0,-3.4,-.05);
for(let i=0;i<12;i++){const an=i/12*Math.PI*2;const t=mesh(new T.BoxGeometry(.08,i%3?.22:.4,.04),gold,Math.sin(an)*1.4,Math.cos(an)*1.4,.46);t.rotation.z=-an}
hs=[0,1,2].map(i=>{const p=new T.Group(),L=[.9,1.25,1.4][i],w=[.14,.1,.04][i];p.position.z=.5+i*.02;
const m=new T.Mesh(new T.BoxGeometry(w,L,.03),M(i==2?0xc8a96a:0xf1ede4,.5,.3));m.position.y=L/2;p.add(m);g.add(p);return p})}
function tick(t){
const d=new Date(),s=d.getSeconds()+d.getMilliseconds()/1e3,m=d.getMinutes()+s/60,h=d.getHours()%12+m/60,k=Math.PI*2;
if(hs){hs[0].rotation.z=-h/12*k;hs[1].rotation.z=-m/60*k;hs[2].rotation.z=-s/60*k}
if(g){if(!dr){ry+=(tx-ry)*.06;rx+=(ty-rx)*.06}g.rotation.y=ry+(still?0:Math.sin(t/1500)*.25);g.rotation.x=rx}
r.render(sc,cam);requestAnimationFrame(tick)}
const cv=r.domElement;
cv.addEventListener('pointerdown',e=>{dr=true;lx=e.clientX;ly=e.clientY});
addEventListener('pointerup',()=>{dr=false});
cv.addEventListener('pointermove',e=>{
if(dr){ry+=(e.clientX-lx)*.012;rx+=(e.clientY-ly)*.008;lx=e.clientX;ly=e.clientY;tx=ry;ty=rx}
else{tx=(e.offsetX/W()-.5)*1.2;ty=(e.offsetY/H()-.5)*.6}});
addEventListener('resize',()=>{r.setSize(W(),H());cam.aspect=W()/H();cam.updateProjectionMatrix()});
requestAnimationFrame(tick);
return{load}}
