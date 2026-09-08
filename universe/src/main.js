import {
  WebGLRenderer as Yp,
  SRGBColorSpace as Nt,
  ShaderMaterial as jt,
  Vector2 as Ke,
  Mesh as nn,
  PlaneGeometry as Ki,
  BufferGeometry as Bt,
  BufferAttribute as vt,
  Points as ls,
  AdditiveBlending as Ui,
  LineBasicMaterial as al,
  LineSegments as su,
  Float32BufferAttribute as Zt,
  PointsMaterial as ol,
  Scene as eu,
  PerspectiveCamera as Gt,
  Group as Di,
  Vector3 as F,
  Color as Xe,
  MathUtils as wc
} from "three";
import { CosmicAudio as jp } from "./audio.js";
import "./styles.css";
const rn = [{ zh: "极早期宇宙", en: "The primordial universe", age: "约 10⁻⁴³ 秒", ageEn: "~10⁻⁴³ seconds", tag: "THE EDGE OF THE KNOWN", scale: "量子尺度 / QUANTUM", temp: "极端高温", zhText: "在我们能够追溯的最早时刻，宇宙处于极热、极密的状态，空间本身正在演化。", enText: "At the edge of what we can describe, the universe is extremely hot and dense. Space itself evolves.", zhVoice: "让我们回到时间的深处。这里没有爆炸的中心，也没有宇宙之外的空旷舞台。我们所能追溯的早期宇宙，处处极热、极密。更早发生了什么，仍是未知。", enVoice: "Travel to the edge of known time. There is no central explosion, and no empty stage outside the universe. The early cosmos is hot and dense everywhere. What happened earlier remains unknown.", note: "普朗克时期是现有理论的边界；画面为概念示意，并非对宇宙起点的观测。", noteEn: "The Planck era marks a limit of current theory. This is a conceptual view, not an observation of the origin." }, { zh: "暴胀时期", en: "Cosmic inflation", age: "约 10⁻³⁶–10⁻³² 秒", ageEn: "~10⁻³⁶–10⁻³² seconds", tag: "SPACE ITSELF EXPANDS", scale: "空间膨胀 / EXPANSION", temp: "快速演化", zhText: "在暴胀模型中，空间经历极其迅速的近指数膨胀，微小涨落被拉伸到巨大尺度。", enText: "In inflationary models, space expands almost exponentially, stretching tiny fluctuations to immense scales.", zhVoice: "想象空间中每一段距离，都在同时被拉长。这不是物质向外炸开，而是空间本身迅速膨胀。微小的量子涨落，可能就这样成为未来宇宙结构的种子。", enVoice: "Imagine distances throughout space stretching together. Matter is not exploding outward. Space itself expands rapidly. Tiny quantum fluctuations may become the seeds of future cosmic structure.", note: "暴胀是解释观测的理论框架，具体机制与起止时间尚不确定。网格没有物理中心或边界。", noteEn: "Inflation is a theoretical framework; its mechanism and timing remain uncertain. The grid has no physical center or edge." }, { zh: "基本粒子形成", en: "A sea of particles", age: "约 10⁻¹²–10⁻⁶ 秒", ageEn: "~10⁻¹²–10⁻⁶ seconds", tag: "ENERGY BECOMES MATTER", scale: "亚原子尺度 / SUBATOMIC", temp: "约 10¹⁵–10¹² K", zhText: "暴胀结束后的再加热使宇宙充满粒子与辐射；冷却中的夸克、胶子和轻子不断相互作用。", enText: "Reheating fills the universe with particles and radiation. Quarks, gluons and leptons interact as it cools.", zhVoice: "暴胀结束后，能量转化为炽热的粒子与辐射。夸克、胶子和电子等粒子，构成沸腾的海洋。空间继续膨胀，温度逐渐降低。", enVoice: "After inflation, energy becomes a hot bath of particles and radiation. Quarks, gluons and electrons fill the cosmos. As space expands, this restless sea gradually cools.", note: "粒子颜色仅用于区分种类；此时还没有原子、恒星或星系。", noteEn: "Colors distinguish particle types. Atoms, stars and galaxies do not yet exist." }, { zh: "质子与中子出现", en: "Protons & neutrons", age: "约 10⁻⁶ 秒起", ageEn: "From ~10⁻⁶ seconds", tag: "THE BUILDING BLOCKS", scale: "约 10⁻¹⁵ m / NUCLEON", temp: "约 10¹² K", zhText: "随着宇宙冷却，夸克被束缚在强相互作用形成的复合粒子中，包括质子和中子。", enText: "As the universe cools, the strong interaction binds quarks into composite particles, including protons and neutrons.", zhVoice: "大约百万分之一秒之后，夸克被束缚在一起，形成质子和中子。它们将成为原子核的组成部分。但宇宙仍然太热，还无法留住完整的原子。", enVoice: "Around a millionth of a second later, quarks become bound into protons and neutrons. These will build atomic nuclei. The universe is still far too hot for complete atoms.", note: "三粒子组合是简化示意，真实核子还包含胶子与不断变化的夸克海。", noteEn: "Three-particle groups are simplified. Real nucleons also contain gluons and a changing sea of quarks." }, { zh: "原初核合成", en: "Primordial nucleosynthesis", age: "约 3–20 分钟", ageEn: "~3–20 minutes", tag: "THE FIRST NUCLEI", scale: "原子核尺度 / NUCLEI", temp: "约 10⁹ K", zhText: "质子和中子结合，形成氘、氦与微量锂的原子核；大量质子保留下来，成为氢核。", enText: "Protons and neutrons build deuterium, helium and traces of lithium nuclei. Many protons remain as hydrogen nuclei.", zhVoice: "宇宙诞生几分钟后，质子与中子终于能组成轻元素的原子核。氢和氦，成为普通物质的主角。继续冷却的宇宙，很快关上了这座最早的核反应炉。", enVoice: "Within minutes, protons and neutrons can assemble into light nuclei. Hydrogen and helium dominate ordinary matter. Continued cooling soon closes this first cosmic nuclear furnace.", note: "原初核合成形成的是原子核；中性原子要等到约38万年后。", noteEn: "Nucleosynthesis makes nuclei. Neutral atoms form much later, around 380,000 years." }, { zh: "中性原子形成", en: "The first neutral atoms", age: "约 38 万年", ageEn: "~380,000 years", tag: "THE COSMIC FOG CLEARS", scale: "原子尺度 / ATOMIC", temp: "约 3,000 K", zhText: "电子与原子核结合，形成以氢为主的中性原子，自由电子减少，宇宙逐渐变得透明。", enText: "Electrons join nuclei to form neutral atoms, mostly hydrogen. With fewer free electrons, the universe becomes transparent.", zhVoice: "三十八万年后，温度降到约三千开尔文。电子能够与原子核结合。随着自由电子减少，反复散射光的迷雾散去，光终于可以穿越遥远的空间。", enVoice: "After 380,000 years, the temperature falls to about three thousand kelvin. Electrons join nuclei. With fewer free electrons to scatter light, the cosmic fog clears.", note: "电子云为概率分布的示意，电子并不沿经典行星轨道绕核运行。", noteEn: "Electron clouds represent probability distributions, not planetary orbits around a nucleus." }, { zh: "宇宙的第一缕余光", en: "The cosmic microwave background", age: "约 38 万年", ageEn: "~380,000 years", tag: "AN ECHO THAT STILL REACHES US", scale: "大尺度辐射场 / RADIATION", temp: "当时约 3,000 K", zhText: "与中性原子形成几乎同时，原有光子不再频繁散射；这份古老余辉今天被红移为微波背景。", enText: "Alongside recombination, existing photons stop scattering frequently. Expansion redshifts this ancient light into today’s microwave background.", zhVoice: "这不是新点燃的一道闪光，而是早已存在的光子，终于开始自由远行。空间的膨胀拉长了它们的波长。今天，我们仍能在各个方向接收到这份微波余辉。", enVoice: "This is not a newly ignited flash. Existing photons can finally travel freely. Expanding space stretches their wavelengths. Today we receive this microwave afterglow from every direction.", note: "与上一章属于同一时代，分章是为了分别解释物质与光。色差为放大的温度起伏示意。", noteEn: "This overlaps the previous chapter in time. Colors exaggerate tiny temperature fluctuations; this is not a measured sky map." }, { zh: "宇宙黑暗时代", en: "The cosmic dark ages", age: "约 38 万–1 亿年", ageEn: "~380,000–100 million years", tag: "BEFORE THE FIRST STAR", scale: "气体云尺度 / GAS CLOUDS", temp: "持续冷却", zhText: "恒星尚未点亮。氢氦气体在暗物质的引力作用下，缓慢汇入更稠密的区域。", enText: "No stars shine yet. Under gravity, hydrogen and helium slowly gather in denser regions shaped by dark matter.", zhVoice: "漫长的黑暗开始了。没有恒星，也没有星系的灯火。但引力从未停息。气体沿着暗物质塑造的结构聚集，静静地孕育第一代恒星。", enVoice: "A long darkness begins. There are no stars to light it. Yet gravity never rests. Gas gathers within structures shaped by dark matter, preparing the birth of the first stars.", note: "微弱光点代表气体密度采样，不是恒星；暗物质和气体结构以可见颜色示意。", noteEn: "Faint points sample gas density, not stars. Dark matter and gas structure are shown in illustrative colors." }, { zh: "第一批恒星点亮", en: "The first light", age: "约 1–2 亿年", ageEn: "~100–200 million years", tag: "THE COSMIC DAWN", scale: "恒星与气体云 / STELLAR", temp: "星核可达数千万 K", zhText: "致密气体坍缩，核心启动核聚变，第一批恒星照亮宇宙，并逐步电离周围的氢气。", enText: "Dense gas collapses until fusion ignites. The first stars light the universe and begin ionizing the surrounding hydrogen.", zhVoice: "在最稠密的气体云中，引力点燃核聚变。第一批恒星，终于照亮宇宙。它们的紫外光开始改变周围的气体，为宇宙的黎明揭开帷幕。", enVoice: "Inside dense clouds, gravity brings gas to the heat of nuclear fusion. The first stars ignite. Their ultraviolet light begins to transform surrounding gas. Cosmic dawn has arrived.", note: "第一批恒星的确切诞生时间仍不确定；1–2亿年是常见模型估计。", noteEn: "The exact timing is uncertain; 100–200 million years is a common model estimate." }, { zh: "星系与宇宙网", en: "Galaxies & the cosmic web", age: "约 4 亿–100 亿年", ageEn: "~400 million–10 billion years", tag: "GRAVITY WRITES THE STRUCTURE", scale: "星系 → 宇宙网 / GALACTIC", temp: "冷热物质并存", zhText: "星系在引力作用下成长、合并，逐渐组成丝状结构、星系团和空洞交织的宇宙网。", enText: "Galaxies grow and merge under gravity, tracing a cosmic web of filaments, clusters and vast voids.", zhVoice: "恒星汇入星系，星系成长、合并。跨越数十亿年，引力将物质编织成丝状结构和星系团，其间是辽阔的空洞。我们熟悉的旋臂，是后来逐渐形成的风景。", enVoice: "Stars gather in galaxies that grow and merge. Over billions of years, gravity weaves matter into filaments and clusters, separated by vast voids. Familiar spiral arms emerge over time.", note: "跨越数十亿年的缩时示意；成熟旋涡星系不代表最早星系的典型形态。", noteEn: "A time-lapse spanning billions of years. Mature spirals do not represent the earliest galaxies." }, { zh: "今天，仍在膨胀", en: "An ever-expanding universe", age: "约 138 亿年", ageEn: "~13.8 billion years", tag: "THE STORY IS STILL UNFOLDING", scale: "可观测宇宙 / OBSERVABLE", temp: "微波背景 2.725 K", zhText: "宇宙在大尺度上加速膨胀，星系群之间的距离继续增长；引力束缚的系统不随之整体膨胀。", enText: "Cosmic expansion accelerates on large scales. Distances between galaxy groups grow, while gravitationally bound systems stay together.", zhVoice: "一百三十八亿年之后，宇宙的故事仍在继续。在最大尺度上，膨胀正在加速。星系之间的广阔空间不断增长，而恒星和星系仍被引力系在一起。我们，也是这段历史的一部分。", enVoice: "After 13.8 billion years, the story continues. On the largest scales, expansion is accelerating. Space between galaxy groups grows, while bound systems stay together. We too are part of this history.", note: "宇宙没有已知的膨胀中心。138亿年是年龄，不是可观测宇宙的半径。", noteEn: "There is no known center of expansion. 13.8 billion years is an age, not the observable universe’s radius." }], kt = 26, di = rn.length * kt;
const Do = `
attribute vec3 target; attribute vec3 tint; attribute vec3 targetTint; attribute vec3 web; attribute vec3 webCenter; attribute float seed;
uniform float blend; uniform float time; uniform float expansion; uniform float motion; uniform float pointScale; uniform float webMix; uniform float bound;
varying vec3 vColor; varying float vSeed;
void main(){
 vec3 p=mix(mix(position,target,blend),web,webMix);
 p += motion * vec3(sin(time*.35+seed*140.),cos(time*.27+seed*73.),sin(time*.18+seed*97.));
 p=mix(p*expansion,p+webCenter*(expansion-1.),bound);
 vec4 mv=modelViewMatrix*vec4(p,1.);
 gl_Position=projectionMatrix*mv;
 gl_PointSize=clamp((1.1+pow(seed,12.)*9.)*pointScale*125./max(8.,-mv.z),1.,55.);
 vColor=mix(mix(tint,targetTint,blend),vec3(.34,.52,.76),webMix*.55); vSeed=seed;
}`, $p = `
precision highp float;
varying vec3 vColor; varying float vSeed; uniform float time; uniform float brightness; uniform float dawn;
void main(){
 vec2 uv=gl_PointCoord-.5; float r=length(uv)*2.;
 if(r>1.) discard;
 float core=exp(-r*r*24.); float halo=pow(max(0.,1.-r),3.)*.38;
 float twinkle=.86+.14*sin(time*.75+vSeed*290.);
 float ignition=mix(1.,smoothstep(vSeed*.8,vSeed*.8+.2,dawn),step(0.,dawn));
 gl_FragColor=vec4(vColor*brightness*twinkle,(core+halo)*.9*ignition);
}`, Kp = `
precision highp float;
uniform vec2 resolution; uniform float time; uniform float era; uniform float opacity;
float hash(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float noise(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float f=0.,a=.5;for(int i=0;i<5;i++){f+=a*noise(p);p=p*2.03+4.2;a*=.5;}return f;}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*resolution)/resolution.y;
 vec3 p=vec3(uv*2.1,time*.008);
 float n=fbm(p+vec3(fbm(p*1.7),fbm(p+3.),0.));
 float veins=pow(fbm(p*3.+n*3.),3.);
 float early=1.-smoothstep(1.5,3.,era);
 float cmb=exp(-pow((era-6.)*1.5,2.));
 float dark=exp(-pow((era-7.)*1.5,2.));
 vec3 blue=vec3(.09,.13,.24);vec3 purple=vec3(.3,.12,.20);vec3 amber=vec3(.66,.26,.09);
 vec3 c=mix(blue,purple,smoothstep(.4,.75,n));
 c=mix(c,amber,early); c=mix(c,mix(vec3(.045,.14,.29),vec3(.58,.23,.07),smoothstep(.40,.60,n)),cmb*.9);
 float band=exp(-pow((uv.y+.32*uv.x-.08)*2.4,2.));
 float light=(veins*2.+n*.11)*mix(band,.9,max(early,cmb));
 c*=light*(1.-dark*.84)*opacity;
 gl_FragColor=vec4(c+vec3(.004,.007,.015),1.);
}`;
function Lo() {
  let i = 92741;
  return () => (i = i * 1664525 + 1013904223 >>> 0, i / 4294967296);
}
class Zp {
  constructor(e) {
    this.container = e, this.count = matchMedia("(max-width: 700px)").matches ? 26e3 : 52e3, this.renderer = new Yp({ antialias: false, alpha: false, powerPreference: "high-performance" }), this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6)), this.renderer.setClearColor(329744), this.renderer.outputColorSpace = Nt, this.renderer.domElement.setAttribute("aria-label", "宇宙演化实时三维科学示意动画"), e.appendChild(this.renderer.domElement), this.camera.position.set(0, 0, 115), this.nebula = new jt({ uniforms: { resolution: { value: new Ke() }, time: { value: 0 }, era: { value: 9 }, opacity: { value: 1.25 } }, vertexShader: "void main(){gl_Position=vec4(position.xy,0.999,1.);}", fragmentShader: Kp, depthWrite: false, depthTest: false });
    const t = new nn(new Ki(2, 2), this.nebula);
    t.frustumCulled = false, t.renderOrder = -2, this.scene.add(t);
    for (let u = 0; u < 11; u++) this.fields.push(this.makeField(u));
    const n = new Bt();
    n.setAttribute("position", new vt(this.fields[9].positions.slice(), 3)), n.setAttribute("target", new vt(this.fields[9].positions.slice(), 3)), n.setAttribute("tint", new vt(this.fields[9].colors.slice(), 3)), n.setAttribute("targetTint", new vt(this.fields[9].colors.slice(), 3)), n.setAttribute("web", new vt(this.fields[10].positions, 3)), n.setAttribute("webCenter", new vt(this.fields[10].centers, 3));
    const r = Lo(), s = Float32Array.from({ length: this.count }, () => r());
    n.setAttribute("seed", new vt(s, 1)), this.material = new jt({ vertexShader: Do, fragmentShader: $p, uniforms: { blend: { value: 1 }, time: { value: 0 }, expansion: { value: 1 }, motion: { value: 0.05 }, pointScale: { value: 1 }, brightness: { value: 1.1 }, webMix: { value: 0 }, dawn: { value: -1 }, bound: { value: 0 } }, transparent: true, depthWrite: false, blending: Ui }), this.particles = new ls(n, this.material), this.particles.frustumCulled = false, this.group.add(this.particles), this.scene.add(this.group);
    const a = new Bt();
    for (const u of Object.keys(n.attributes)) a.setAttribute(u, n.getAttribute(u));
    a.setIndex(Array.from({ length: 2e3 }, (u, d) => Math.floor(d * this.count / 2e3))), this.dust = new jt({ vertexShader: Do.replace("clamp((1.1+pow(seed,12.)*9.)*pointScale*125./max(8.,-mv.z),1.,55.)", "clamp((45.+seed*80.)*pointScale*125./max(8.,-mv.z),12.,170.)"), fragmentShader: "varying vec3 vColor; varying float vSeed;uniform float haze;void main(){float r=length(gl_PointCoord-.5)*2.;if(r>1.)discard;gl_FragColor=vec4(vColor,pow(1.-r,3.)*haze);}", uniforms: { ...this.material.uniforms, haze: { value: 0.038 } }, transparent: true, depthWrite: false, blending: Ui });
    const o = new ls(a, this.dust);
    o.frustumCulled = false, this.group.add(o);
    const c = [];
    for (let u = -100; u <= 100; u += 10) for (let d = -50; d <= 50; d += 25) c.push(u, d, -90, u, d, 50), c.push(-100, d, u, 100, d, u);
    this.gridMat = new al({ color: 13931867, transparent: true, opacity: 0, depthWrite: false, blending: Ui }), this.grid = new su(new Bt().setAttribute("position", new Zt(c, 3)), this.gridMat), this.scene.add(this.grid);
    const l = [];
    for (let u = 0; u < 1600; u++) l.push((r() - 0.5) * 650, (r() - 0.5) * 420, -70 - r() * 240);
    this.starMat = new ol({ color: 12768241, size: 0.22, transparent: true, opacity: 0.75, depthWrite: false }), this.stars = new ls(new Bt().setAttribute("position", new Zt(l, 3)), this.starMat), this.scene.add(this.stars), window.addEventListener("resize", () => this.resize()), this.resize(), e.addEventListener("pointermove", (u) => {
      this.pointer.x = u.clientX / innerWidth - 0.5, this.pointer.y = u.clientY / innerHeight - 0.5;
    });
  }
  container;
  renderer;
  scene = new eu();
  camera = new Gt(48, 1, 0.1, 900);
  group = new Di();
  particles;
  material;
  nebula;
  dust;
  fields = [];
  current = 9;
  transition = 1;
  era = 9;
  grid;
  gridMat;
  stars;
  starMat;
  nodeCount = 0;
  frames = 0;
  fps = 60;
  pointer = { x: 0, y: 0 };
  count;
  targetIntro = true;
  makeField(e) {
    const t = Lo(), n = new Float32Array(this.count * 3), r = new Float32Array(this.count * 3), s = new Float32Array(this.count * 3), a = Array.from({ length: 40 }, () => new F((t() - 0.5) * 190, (t() - 0.5) * 108, (t() - 0.5) * 100)), o = [];
    a.forEach((c, l) => a.map((u, d) => ({ b: u, j: d, d: c.distanceTo(u) })).filter((u) => u.j !== l).sort((u, d) => u.d - d.d).slice(0, 3).forEach(({ b: u }) => o.push([c, u])));
    for (let c = 0; c < this.count; c++) {
      const l = t(), u = t(), d = t(), f = t(), m = t();
      let _ = 0, x = 0, p = 0, h = new Xe();
      if (e < 3) _ = (l - 0.5) * 235, x = (u - 0.5) * 145, p = (d - 0.5) * 145, h.setHSL(e === 2 ? f > 0.5 ? 0.57 : 0.04 : 0.07 + f * 0.06, 0.55 + m * 0.25, 0.42 + m * 0.4);
      else if (e <= 5) {
        const T = Math.floor(c / Math.floor(this.count / 38)), E = T * 2.39996, P = Math.cos(E) * Math.sqrt(T / 38) * 91, R = Math.sin(E) * Math.sqrt(T / 38) * 47, w = Math.sin(T * 8.43) * 28, I = c % (e === 3 ? 3 : 4), S = I * 2.4, M = e === 5 && l > 0.2, D = M ? 3.2 + Math.pow(l, 0.55) * 4 : Math.pow(l, 0.65) * 1.25, z = u * Math.PI * 2, V = 2 * d - 1, $ = Math.sqrt(1 - V * V);
        _ = P + Math.cos(z) * $ * D + (M ? 0 : Math.cos(S) * 1.2), x = R + Math.sin(z) * $ * D + (M ? 0 : Math.sin(S) * 1.2), p = w + V * D, h.setHSL(M || I % 2 ? 0.57 : 0.065, 0.7, M ? 0.2 + m * 0.2 : 0.5 + m * 0.2);
      } else if (e === 6) {
        _ = (l - 0.5) * 240, x = (u - 0.5) * 145, p = (d - 0.5) * 140;
        const T = Math.sin(_ * 0.06 + Math.sin(x * 0.08) * 2) + Math.cos(x * 0.12 + p * 0.04);
        h.setHSL(T > 0 ? 0.07 : 0.57, 0.75, 0.14 + m * 0.3);
      } else if (e === 7 || e === 8 || e === 10) {
        const [T, E] = o[c % o.length], P = t(), R = e === 7 ? 5.2 : e === 8 ? 3.5 : 1.6;
        _ = T.x + (E.x - T.x) * P + (l - 0.5) * R, x = T.y + (E.y - T.y) * P + (u - 0.5) * R, p = T.z + (E.z - T.z) * P + (d - 0.5) * R;
        const w = c % 40;
        if (e === 8 && l > 0.91 && (_ = a[w].x + (u - 0.5) * 1.2, x = a[w].y + (d - 0.5) * 1.2, p = a[w].z + (m - 0.5) * 1.2), e === 10 && l > 0.67) {
          const I = a[w], S = Math.pow(u, 1.7) * 5, M = d * Math.PI * 2 + S * 0.8;
          _ = I.x + Math.cos(M) * S, x = I.y + Math.sin(M) * S * 0.45, p = I.z + (m - 0.5) * 0.8;
        }
        h.setHSL(e === 7 ? 0.6 : e === 8 ? l > 0.91 ? 0.1 : 0.58 : l > 0.67 ? 0.1 : 0.56, 0.5, e === 7 ? 0.045 + m * 0.09 : e === 8 ? l > 0.91 ? 0.85 : 0.1 + m * 0.2 : 0.25 + m * 0.4);
      } else {
        const T = Math.pow(l, 1.3) * 55, P = c % 4 * Math.PI * 0.5 + T * 0.125 + (u - 0.5) * (0.8 + T * 9e-3);
        _ = Math.cos(P) * T, p = Math.sin(P) * T, x = (d - 0.5) * (1.1 + Math.exp(-T * 0.17) * 3), f > 0.93 && (_ = (l - 0.5) * 155, p = (u - 0.5) * 140, x = (d - 0.5) * 70);
        const R = Math.min(1, T / 40);
        h.setRGB(1 - R * 0.62, 0.66 - R * 0.17, 0.3 + R * 0.57), h.multiplyScalar(0.55 + m * 0.85), T > 15 && m > 0.75 && h.setRGB(0.48, 0.67, 1);
        const w = x, I = p;
        x = w * 0.84 - I * 0.54, p = w * 0.54 + I * 0.84;
        const S = _;
        x = x * 0.91 + S * 0.25, _ = S * 0.96 - x * 0.15;
      }
      n.set([_, x, p], c * 3), r.set([h.r, h.g, h.b], c * 3);
      const A = e === 10 && l > 0.67 ? a[c % 40] : new F(_, x, p);
      s.set([A.x, A.y, A.z], c * 3);
    }
    return { positions: n, colors: r, centers: s };
  }
  setEpoch(e, t = false) {
    if (e === this.current && !t) return;
    const n = this.particles.geometry, r = this.material.uniforms.blend.value, s = this.material.uniforms.webMix.value;
    for (const [a, o] of [["position", "target"], ["tint", "targetTint"]]) {
      const c = n.getAttribute(a), l = n.getAttribute(o);
      for (let u = 0; u < c.array.length; u++) c.array[u] = c.array[u] * (1 - r) + l.array[u] * r, a === "position" && (c.array[u] = c.array[u] * (1 - s) + this.fields[10].positions[u] * s);
      c.needsUpdate = true;
    }
    n.getAttribute("target").set(this.fields[e].positions).needsUpdate = true, n.getAttribute("targetTint").set(this.fields[e].colors).needsUpdate = true, this.material.uniforms.webMix.value = 0, this.current = e, this.transition = t ? 1 : 0, t && (n.getAttribute("position").set(this.fields[e].positions).needsUpdate = true, n.getAttribute("tint").set(this.fields[e].colors).needsUpdate = true, this.era = e, this.starMat.opacity = e < 8 ? 0 : 0.75);
  }
  resize() {
    const e = this.container.clientWidth, t = this.container.clientHeight;
    this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t), this.nebula.uniforms.resolution.value.set(e * this.renderer.getPixelRatio(), t * this.renderer.getPixelRatio()), this.material.uniforms.pointScale.value = this.renderer.getPixelRatio() * (e < 700 ? 0.83 : 1);
  }
  render(e, t, n, r) {
    this.frames++, this.transition = Math.min(1, this.transition + e * 0.65);
    const s = this.transition * this.transition * (3 - 2 * this.transition);
    this.material.uniforms.blend.value = s, this.era += (this.current - this.era) * Math.min(1, e * 1.6), this.material.uniforms.time.value = t, this.nebula.uniforms.time.value = t, this.nebula.uniforms.era.value = this.era;
    const a = this.current < 3, o = this.current === 10, c = this.current === 1 ? 0.8 + n * 1.3 : a ? 0.92 + n * 0.14 : o ? 0.94 + n * 0.2 : 1;
    this.material.uniforms.expansion.value += (c - this.material.uniforms.expansion.value) * Math.min(1, e * 3), this.material.uniforms.motion.value = a ? 0.7 : this.current === 7 ? 0.14 : 0.035, this.material.uniforms.brightness.value = this.current === 8 ? 1.5 : 1.15, this.material.uniforms.dawn.value = this.current === 8 ? Math.min(1, n * 1.5 + 0.1) : -1, this.material.uniforms.webMix.value = this.current === 9 && !r ? wc.smoothstep(n, 0.42, 0.93) * s : 0, this.material.uniforms.bound.value = this.current === 10 ? s : 0, this.dust.uniforms.haze.value = this.current === 7 ? 0.018 : this.current < 3 ? 0.05 : this.current === 9 ? 0.065 : this.current === 10 ? 0.035 : 0.025;
    const l = this.current === 1 ? 0.13 : 0;
    this.gridMat.opacity += (l - this.gridMat.opacity) * Math.min(1, e * 2), this.grid.scale.setScalar(this.material.uniforms.expansion.value);
    const u = this.current >= 8 ? 0.75 : 0;
    this.starMat.opacity += (u - this.starMat.opacity) * Math.min(1, e * 2);
    const d = this.camera.aspect < 0.85, f = r ? d ? 4 : 29 : 0;
    this.group.position.x += (f - this.group.position.x) * Math.min(1, e * 2);
    const m = r && d ? 14 : 4;
    this.group.position.y += (m - this.group.position.y) * Math.min(1, e * 2), this.group.rotation.y = Math.sin(t * 0.015) * 0.12 + this.pointer.x * 0.035, this.group.rotation.z = Math.sin(t * 0.011) * 0.045;
    const _ = r ? d ? 155 : 105 : d ? 172 : 120;
    this.camera.position.z += (_ - this.camera.position.z) * Math.min(1, e * 1.3), this.camera.position.x += (this.pointer.x * 3 - this.camera.position.x) * Math.min(1, e * 0.8), this.camera.position.y += (this.pointer.y * 2 - this.camera.position.y) * Math.min(1, e * 0.8), this.renderer.render(this.scene, this.camera);
  }
}
const Jp = { play: '<path d="m9 5 11 7-11 7z"/>', pause: '<path d="M8 5v14M16 5v14"/>', prev: '<path d="M5 5v14m14-14-10 7 10 7z"/>', next: '<path d="M19 5v14M5 5l10 7-10 7z"/>', replay: '<path d="M3 10a9 9 0 1 1 2 9M3 4v6h6"/>', full: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>', audio: '<path d="M4 10v4m4-8v12m4-15v18m4-15v12m4-8v4"/>', chapters: '<path d="M9 5h12M9 12h12M9 19h12M3 5h.01M3 12h.01M3 19h.01"/>', close: '<path d="m6 6 12 12M6 18 18 6"/>', arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>', info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-11v1"/>', orbit: '<circle cx="12" cy="12" r="8"/><ellipse cx="12" cy="12" rx="12" ry="4" transform="rotate(-35 12 12)"/>' }, Et = (i) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Jp[i]}</svg>`, de = (i) => document.querySelector(i), ze = (i, e) => `<span data-zh="${i}" data-en="${e}">${i}</span>`;
de("#app").innerHTML = `
<main id="experience" class="intro-mode">
  <div id="cosmos"></div><div class="vignette"></div><div class="film-grain"></div>
  <header class="topbar">
    <a class="brand" href="#" aria-label="COSMOS 返回开场">${Et("orbit")}<span>COSMOS<small>宇宙演化档案</small></span></a>
    <div class="header-center">AN INTERACTIVE JOURNEY THROUGH TIME</div>
    <nav class="top-actions" aria-label="页面设置">
      <button id="chapters-button" aria-haspopup="dialog" aria-label="章节 / Chapters">${Et("chapters")}<span>${ze("章节", "Chapters")}</span></button>
      <button id="science-button" class="icon-button" aria-label="科学说明 / Science notes">${Et("info")}</button>
      <span class="separator"></span><button id="language" class="language-button" aria-label="中英文切换 / Switch language">中 <span>/ EN</span></button>
      <button id="audio-button" class="icon-button" aria-label="音频设置 / Audio settings" aria-expanded="false">${Et("audio")}<i class="audio-dot"></i></button>
      <button id="fullscreen" class="icon-button" aria-label="全屏 / Fullscreen">${Et("full")}</button>
    </nav>
  </header>
  <section id="intro" aria-label="宇宙之旅开场">
    <div class="intro-copy"><div class="eyebrow"><span class="gold-line"></span> A STORY 13.8 BILLION YEARS IN THE MAKING</div>
      <h1><span>宇宙的诞生</span><span class="intro-subtitle">从量子涨落到星辰大海</span></h1>
      <p class="english-title">Birth of the Universe:<br>From Quantum Fluctuations to the Cosmic Web</p>
      <p class="intro-description">${ze("时间的起点，星辰的来处。", "The beginning of time. The origin of everything.")}<br>${ze("穿越 138 亿年，见证宇宙如何成为今天的模样。", "Travel through 13.8 billion years of cosmic evolution.")}</p>
      <button id="begin" class="begin-button">${Et("play")}${ze("开启宇宙之旅", "Begin the cosmic journey")}${Et("arrow")}</button>
      <div class="intro-meta"><span>11 ${ze("个宇宙纪元", "COSMIC EPOCHS")}</span><b>·</b><span>≈ 5 ${ze("分钟沉浸旅程", "MINUTE JOURNEY")}</span><b>·</b><span>${ze("建议佩戴耳机", "HEADPHONES RECOMMENDED")}</span></div>
    </div>
    <div class="intro-coordinate"><span class="crosshair">+</span><span>OUR COSMIC HOME<small>${ze("每一颗星，都有一个起点。", "Every star has a beginning.")}</small></span></div>
    <div class="side-mark">PAST · PRESENT · INFINITY</div>
  </section>
  <section id="journey" hidden aria-label="宇宙演化播放器">
    <div class="scene-top"><span class="scene-status"><i></i>${ze("宇宙演化进行中", "COSMIC EVOLUTION")}</span><span id="scene-scale"></span></div>
    <div class="epoch-counter"><span id="epoch-number">01</span><small>/ 11</small><div id="epoch-tag"></div></div>
    <div class="scene-caption" id="scene-caption"><div class="eyebrow" id="epoch-age"></div><h2 id="epoch-title"></h2><div id="epoch-english"></div><p id="subtitle-primary"></p><p id="subtitle-secondary"></p></div>
    <div class="scene-detail"><span>${ze("宇宙温度", "TEMPERATURE")}</span><strong id="temperature"></strong><div class="tiny-line"></div><span>${ze("科学可视化 · 非等比例", "SCIENTIFIC ILLUSTRATION · NOT TO SCALE")}</span></div>
    <div class="chapter-step"><button id="previous" class="icon-button" aria-label="上一阶段 / Previous chapter">${Et("prev")}</button><span id="step-name"></span><button id="next" class="icon-button" aria-label="下一阶段 / Next chapter">${Et("next")}</button></div>
  </section>
  <footer class="timeline-panel">
    <div class="timeline-heading"><div><span class="timeline-title">${ze("宇宙时间轴", "COSMIC TIMELINE")}</span><span class="time-scale-label">${ze("分段时间尺度", "SEGMENTED TIME SCALE")}</span></div><span class="timeline-hint">${ze("每一段，都是一个新宇宙", "EVERY EPOCH, A NEW UNIVERSE")}</span><span class="playback-clock" id="clock">00:00 <em>/ 04:46</em></span></div>
    <div class="timeline-track"><div class="track-line"></div><div class="track-fill" id="track-fill"></div><div class="track-ticks">${rn.map((i, e) => `<button class="epoch-dot" data-epoch="${e}" style="left:${e / 11 * 100}%" aria-label="${i.zh} ${i.age}" title="${i.zh} · ${i.age}"></button>`).join("")}</div><input id="timeline" type="range" min="0" max="286" step="0.01" value="0" aria-label="拖动宇宙演化时间轴 / Seek cosmic time" aria-valuetext="尚未开始"><div class="timeline-labels"><span style="left:0">10⁻⁴³ ${ze("秒", "s")}</span><span style="left:36.36%">3 ${ze("分钟", "min")}</span><span style="left:50%">38 ${ze("万年", "×10⁴ yr")}</span><span style="left:72.72%">1 ${ze("亿年", "×10⁸ yr")}</span><span style="right:0">138 ${ze("亿年", "×10⁸ yr")}</span></div></div>
    <div class="bottom-bar"><div class="player-buttons"><button id="play" class="play-control" aria-label="自动播放 / Play">${Et("play")}${ze("自动播放", "Play")}</button><button id="restart" class="restart-button" aria-label="重新播放 / Replay">${Et("replay")}<span>${ze("重新播放", "Replay")}</span></button><span class="separator"></span><button id="speed" aria-label="播放速度 / Playback speed">1×</button></div><span class="player-note">${ze("空间在膨胀，故事在继续。", "SPACE EXPANDS. THE STORY CONTINUES.")}</span><button id="notes-button" class="notes-button">${ze("关于这段旅程", "About this journey")} ↗</button></div>
  </footer>
  <aside id="audio-panel" hidden><div class="panel-heading"><span>${ze("声音与解说", "Sound & narration")}</span><button class="icon-button" id="audio-close" aria-label="关闭音频设置">${Et("close")}</button></div>
  ${[["zh", "中文解说", "Chinese narration"], ["en", "英文解说", "English narration"], ["music", "背景音乐", "Ambient music"], ["effects", "转场音效", "Sound effects"]].map(([i, e, t]) => `<label class="audio-row"><span>${ze(e, t)}<small>${i === "zh" ? "中文 · 普通话" : i === "en" ? "English" : i === "music" ? "AMBIENT SOUNDSCAPE" : "CINEMATIC TRANSITIONS"}</small></span><input id="audio-${i}" type="checkbox" role="switch"><span class="switch-ui"></span></label>`).join("")}
  <p class="audio-note">${ze("使用设备支持的中英文语音解说。双语均开启时依次播放。音乐与音效为艺术设计。", "Uses available Chinese and English voices on your device. Both languages play sequentially. Music and effects are artistic sound design.")}</p></aside>
  <dialog id="chapter-dialog"><div class="dialog-top"><div class="eyebrow">THE CHAPTERS</div><button data-close="chapter-dialog" class="icon-button" aria-label="关闭章节">${Et("close")}</button></div><h2>${ze("138 亿年的故事", "A story of 13.8 billion years")}</h2><p class="dialog-intro">${ze("选择一个纪元，让旅程从那里继续。", "Choose an epoch and continue the journey from there.")}</p><div class="chapter-list">${rn.map((i, e) => `<button data-chapter="${e}"><span class="chapter-index">${String(e + 1).padStart(2, "0")}</span><span class="chapter-name">${ze(i.zh, i.en)}<small>${i.en}</small></span><span class="chapter-age">${ze(i.age, i.ageEn)}</span>${Et("arrow")}</button>`).join("")}</div></dialog>
  <dialog id="science-dialog"><div class="dialog-top"><div class="eyebrow">A NOTE ON THE SCIENCE</div><button data-close="science-dialog" class="icon-button" aria-label="关闭科学说明">${Et("close")}</button></div><h2>${ze("理解这段宇宙旅程", "Understanding this journey")}</h2><div class="science-content"><p>${ze("宇宙大爆炸描述的是早期宇宙从高温高密状态膨胀、冷却的过程。空间在各处整体膨胀，没有一个物质向外炸开的中心。", "The hot Big Bang describes an early hot, dense universe expanding and cooling. Space expands everywhere, without a central explosion.")}</p><p>${ze("时间轴按章节分段，各章长度代表叙事时长，不与真实时间成比例。拖动会改变章节内部的视觉演化；年龄标签表示该章对应的时代范围。", "The timeline is segmented by chapter. Length represents storytelling time, not proportional cosmic time. Scrubbing changes visual evolution within each epoch; age labels show the epoch’s time range.")}</p><p>${ze("画面中的颜色、尺度与镜头是科学概念的艺术示意，并非数值模拟或真实观测。微波背景与原子形成基本同时，星系和宇宙网则经历了持续的成长。", "Colors, scales and camera motions illustrate scientific concepts; this is not a numerical simulation or an observation. Recombination and photon decoupling overlap, while galaxies and the cosmic web grow over time.")}</p><div class="current-science-note" id="current-note"></div><h3>${ze("延伸阅读", "Explore the science")}</h3><a href="https://science.nasa.gov/universe/overview/" target="_blank" rel="noopener">NASA · The Universe’s History ↗</a><a href="https://science.nasa.gov/mission/webb/science-overview/science-explainers/what-were-the-first-stars-like/" target="_blank" rel="noopener">NASA / Webb · The First Stars ↗</a><a href="https://home.cern/science/physics/early-universe" target="_blank" rel="noopener">CERN · The Early Universe ↗</a><p class="keyboard-help">${ze("快捷键：空格 播放/暂停 · ← → 上下章 · F 全屏 · Esc 关闭面板", "Shortcuts: Space play/pause · ← → chapters · F fullscreen · Esc close panels")}</p></div></dialog>
  <div id="toast" role="status" aria-live="polite"></div>
</main>`;
let ft = "zh", Rt = false, ct = false, Ft = 0, $e = 0, Fi = 1, Ot = null, Uo = 0, sa = performance.now(), Io = 0, _n = false, vi = false, qn = false, No = 0, yr = 0, ms = 0;
const xi = (i) => {
  de("#toast").textContent = i, de("#toast").classList.add("visible"), clearTimeout(No), No = window.setTimeout(() => de("#toast").classList.remove("visible"), 5e3);
}, Ge = new jp(xi, rn);
try {
  Ot = new Zp(de("#cosmos"));
} catch {
  xi("WebGL 不可用，已启用简化星空；建议在支持 WebGL 的浏览器中体验。"), de("#cosmos").classList.add("fallback");
}
const Fo = (i) => `${String(Math.floor(i / 60)).padStart(2, "0")}:${String(Math.floor(i % 60)).padStart(2, "0")}`;
function Ti() {
  const i = rn[$e];
  de("#epoch-number").textContent = String($e + 1).padStart(2, "0"), de("#epoch-tag").textContent = i.tag, de("#epoch-age").textContent = (ft === "zh" ? "宇宙年龄 · " : "COSMIC AGE · ") + (ft === "zh" ? i.age : i.ageEn), de("#epoch-title").textContent = ft === "zh" ? i.zh : i.en, de("#epoch-english").textContent = ft === "zh" ? i.en : i.zh, de("#subtitle-primary").textContent = ft === "zh" ? i.zhText : i.enText, de("#subtitle-secondary").textContent = ft === "zh" ? i.enText : i.zhText, de("#temperature").textContent = ft === "zh" ? i.temp : { 极端高温: "Extremely hot", 快速演化: "Rapid evolution", 持续冷却: "Still cooling", 冷热物质并存: "Hot & cold matter" }[i.temp] || i.temp.replace("当时约 ", "Then ~").replace("约 ", "~").replace("微波背景 ", "CMB ").replace("星核可达数千万 K", "Core: tens of millions K"), de("#scene-scale").textContent = ft === "zh" ? i.scale : i.scale.split(" / ")[1], de("#step-name").textContent = `${String($e + 1).padStart(2, "0")} / 11`, de("#current-note").textContent = ft === "zh" ? i.note : i.noteEn, de("#previous").disabled = $e === 0, de("#next").disabled = $e === 10, document.querySelectorAll("[data-epoch]").forEach((e, t) => {
    e.classList.toggle("active", t === $e && Rt), e.classList.toggle("visited", t < $e && Rt);
  }), document.querySelectorAll("[data-chapter]").forEach((e, t) => {
    e.classList.toggle("selected", t === $e && Rt), e.setAttribute("aria-current", String(t === $e && Rt));
  }), de("#timeline").setAttribute("aria-valuetext", `${i.zh}，${i.age} / ${i.en}, ${i.ageEn}`);
}
function _a() {
  de("#play").innerHTML = Et(ct ? "pause" : "play") + (ft === "zh" ? ct ? "暂停" : "自动播放" : ct ? "Pause" : "Play"), de("#play").setAttribute("aria-label", ft === "zh" ? ct ? "暂停" : "自动播放" : ct ? "Pause" : "Play"), de(".scene-status").classList.toggle("paused", !ct), de(".scene-status").innerHTML = "<i></i>" + (ft === "zh" ? ct ? "宇宙演化进行中" : "时间已暂停" : ct ? "COSMIC EVOLUTION" : "TIME IS PAUSED");
}
function va() {
  Rt || (Rt = true, de("#experience").classList.remove("intro-mode"), de("#intro").hidden = true, de("#journey").hidden = false, Ge.init(), Ot?.setEpoch(0, true), de("#cosmos").animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1500, easing: "ease-out" }), Ti());
}
function xn(i) {
  Rt || va(), i && Ft >= di && vn(0), ct = i, i ? (Ge.resume(), _n && (Ge.narrate(rn[$e]), _n = false)) : Ge.pause(), _a();
}
function vn(i) {
  va(), Ft = Math.max(0, Math.min(di, i)), $e = Math.min(10, Math.floor(Ft / kt)), Ot?.setEpoch($e), Ge.cancel(), _n = true, Ti(), xa(), ct && !vi && (Ge.narrate(rn[$e]), _n = false, Ge.chime($e));
}
function xa() {
  vi || (de("#timeline").value = String(Ft)), de("#track-fill").style.width = `${Ft / di * 100}%`, de("#clock").innerHTML = `${Fo(Ft)} <em>/ ${Fo(di)}</em>`;
}
function Qp() {
  va(), vn(0), xn(true);
}
de("#begin").onclick = () => {
  _n = true, xn(true), de("#play").focus();
};
de("#play").onclick = () => {
  Rt || (_n = true), xn(!ct);
};
de("#restart").onclick = Qp;
de("#previous").onclick = () => vn(($e - 1) * kt);
de("#next").onclick = () => vn(($e + 1) * kt);
de(".brand").onclick = (i) => {
  i.preventDefault(), Ge.cancel(), Ge.pause(), Rt = false, ct = false, Ft = 0, $e = 0, de("#intro").hidden = false, de("#journey").hidden = true, de("#experience").classList.add("intro-mode"), Ot?.setEpoch(9), _a(), xa(), Ti();
};
function em() {
  de("#speed").onclick = () => {
    Fi = [0.5, 1, 1.5, 2][([0.5, 1, 1.5, 2].indexOf(Fi) + 1) % 4], de("#speed").textContent = `${Fi}×`;
  };
}
em();
const ki = de("#timeline");
ki.addEventListener("pointerdown", () => {
  vi = true, qn = ct, Ge.cancel();
});
ki.addEventListener("input", () => {
  vn(Number(ki.value));
});
function Ma() {
  vi && (vi = false, qn && (Ge.narrate(rn[$e]), _n = false));
}
ki.addEventListener("change", Ma);
window.addEventListener("pointerup", Ma);
ki.addEventListener("pointercancel", Ma);
document.querySelectorAll("[data-epoch]").forEach((i) => i.onclick = () => {
  vn(Number(i.dataset.epoch) * kt);
});
function Sa(i) {
  qn = ct, ct && xn(false), de(`#${i}`).showModal(), de("#audio-panel").hidden = true;
}
de("#chapters-button").onclick = () => Sa("chapter-dialog");
de("#science-button").onclick = () => Sa("science-dialog");
de("#notes-button").onclick = () => Sa("science-dialog");
document.querySelectorAll("[data-close]").forEach((i) => i.onclick = () => de(`#${i.dataset.close}`).close());
document.querySelectorAll("dialog").forEach((i) => {
  i.addEventListener("close", () => {
    qn && (xn(true), qn = false);
  }), i.addEventListener("click", (e) => {
    if (e.target === i) {
      const t = i.getBoundingClientRect();
      (e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && i.close();
    }
  });
});
document.querySelectorAll("[data-chapter]").forEach((i) => i.onclick = () => {
  const e = qn;
  qn = false, de("#chapter-dialog").close(), vn(Number(i.dataset.chapter) * kt), e && xn(true);
});
function Ea(i) {
  de("#audio-panel").hidden = !i, de("#audio-button").setAttribute("aria-expanded", String(i));
}
de("#audio-button").onclick = () => Ea(de("#audio-panel").hidden);
de("#audio-close").onclick = () => Ea(false);
for (const i of ["zh", "en", "music", "effects"]) de(`#audio-${i}`).onchange = (e) => {
  const t = e.target.checked;
  i === "music" ? Ge.setMusic(t) : Ge[i] = t, (i === "zh" || i === "en") && (Ge.available ? Rt && ct ? Ge.narrate(rn[$e]) : (Ge.cancel(), _n = true) : (xi("此浏览器没有语音合成功能；双语字幕仍可使用。"), Ge[i] = false, e.target.checked = false)), i === "effects" && t && Ge.chime($e), de("#audio-button").classList.toggle("enabled", Ge.zh || Ge.en || Ge.music || Ge.effects);
};
de("#language").onclick = () => {
  ft = ft === "zh" ? "en" : "zh", document.documentElement.lang = ft === "zh" ? "zh-CN" : "en", document.querySelectorAll("[data-zh]").forEach((i) => i.textContent = ft === "zh" ? i.dataset.zh : i.dataset.en), de("#language").innerHTML = ft === "zh" ? "中 <span>/ EN</span>" : "<span>中 /</span> EN", Ti(), _a();
};
async function ml() {
  try {
    document.fullscreenElement ? await document.exitFullscreen() : document.documentElement.requestFullscreen ? await document.documentElement.requestFullscreen() : xi("此浏览器不支持全屏，请隐藏地址栏以扩大画面。");
  } catch {
    xi("未能进入全屏 / Fullscreen unavailable.");
  }
}
de("#fullscreen").onclick = () => {
  ml();
};
document.addEventListener("fullscreenchange", () => de("#fullscreen").setAttribute("aria-pressed", String(!!document.fullscreenElement)));
window.addEventListener("keydown", (i) => {
  if (i.key === "Escape") {
    Ea(false);
    return;
  }
  document.querySelector("dialog[open]") || i.target.matches("input,button,a") || (i.code === "Space" && (i.preventDefault(), Rt || (_n = true), xn(!ct)), i.code === "ArrowRight" && vn(Math.min(10, $e + 1) * kt), i.code === "ArrowLeft" && vn(Math.max(0, $e - 1) * kt), i.key.toLowerCase() === "f" && ml());
});
document.addEventListener("visibilitychange", () => {
  document.hidden && ct && xn(false), sa = performance.now();
});
window.addEventListener("pagehide", () => {
  Ge.cancel(), Ge.pause();
});
Ti();
function gl(i) {
  const e = Math.min(0.065, (i - sa) / 1e3);
  if (sa = i, (!Rt || ct) && (Uo += e), ct && !vi) {
    const t = ($e + 1) * kt, n = Ft + e * Fi;
    Ft = Ge.speaking ? Math.min(n, t - 0.02) : Math.min(di, n);
    const r = Math.min(10, Math.floor(Ft / kt));
    r !== $e && ($e = r, Ot?.setEpoch($e), Ti(), Ge.narrate(rn[$e]), Ge.chime($e)), Ft >= di && (xn(false), xi(ft === "zh" ? "旅程抵达今天。宇宙的故事，仍在继续。" : "You have reached today. The cosmic story continues."));
  }
  Ot?.render(e, Uo, Math.min(1, (Ft - $e * kt) / kt), !Rt), yr += e, ms++, i - Io > 150 && (xa(), Io = i), yr > 1 && (Ot && (Ot.fps = Math.round(ms / yr)), yr = 0, ms = 0), requestAnimationFrame(gl);
}
requestAnimationFrame(gl);
Object.defineProperty(window, "__COSMOS__", { get: () => ({ started: Rt, playing: ct, position: Ft, chapter: $e, speed: Fi, webgl: !!Ot, frames: Ot?.frames, fps: Ot?.fps, particles: Ot?.count, transition: Ot?.transition, lang: ft, audio: { zh: Ge.zh, en: Ge.en, music: Ge.music, effects: Ge.effects, speaking: Ge.speaking, context: Ge.ctx?.state } }) });
