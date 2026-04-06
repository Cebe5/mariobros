// jugador.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.149/build/three.module.js';
import { scene } from './escena.js';

export var mario, mS;

// ── MARIO MODEL (more detailed) ───────────────────────────────────────
export function buildMario() {
  var g = new THREE.Group();
  function b(w,h,d,c,r){ r=r||0.8;
    return new THREE.Mesh(new THREE.BoxGeometry(w,h,d),
      new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:0.05})); }
  function sph(r,c){
    return new THREE.Mesh(new THREE.SphereGeometry(r,12,10),
      new THREE.MeshStandardMaterial({color:c,roughness:0.75,metalness:0.05})); }

  // ── LEG GROUPS (pivot at hip) — shoes INSIDE so they move together ──
  // Left leg group: pivot at y=0.05 (hip height)
  var lgL = new THREE.Group(); lgL.position.set(-0.2, 0.05, 0);
  var lgLmain = b(0.3,0.52,0.4,0x1a3d8c); lgLmain.position.y=-0.26; lgL.add(lgLmain);
  var lgLkn   = b(0.28,0.1,0.38,0x2050b8); lgLkn.position.y=-0.08; lgL.add(lgLkn);
  var lgLcr   = b(0.06,0.48,0.38,0x122870); lgLcr.position.set(0.1,-0.26,0); lgL.add(lgLcr);
  // Left shoe (attached to bottom of left leg group)
  var shLbase = b(0.4,0.18,0.62,0x3d1500);  shLbase.position.set(0,-0.6,0.06); lgL.add(shLbase);
  var shLtoe  = b(0.36,0.13,0.18,0x2a0e00); shLtoe.position.set(0,-0.6,0.38); lgL.add(shLtoe);
  var shLheel = b(0.34,0.1,0.12,0x2a0e00);  shLheel.position.set(0,-0.6,-0.22); lgL.add(shLheel);
  var shLsole = b(0.42,0.06,0.64,0x1a0800); shLsole.position.set(0,-0.68,0.06); lgL.add(shLsole);
  var shLhl   = b(0.28,0.06,0.3,0x5a2200);  shLhl.position.set(0,-0.5,0.04); lgL.add(shLhl);
  g.add(lgL);

  // Right leg group: pivot at y=0.05
  var lgR = new THREE.Group(); lgR.position.set(0.2, 0.05, 0);
  var lgRmain = b(0.3,0.52,0.4,0x1a3d8c); lgRmain.position.y=-0.26; lgR.add(lgRmain);
  var lgRkn   = b(0.28,0.1,0.38,0x2050b8); lgRkn.position.y=-0.08; lgR.add(lgRkn);
  var lgRcr   = b(0.06,0.48,0.38,0x122870); lgRcr.position.set(-0.1,-0.26,0); lgR.add(lgRcr);
  // Right shoe
  var shRbase = b(0.4,0.18,0.62,0x3d1500);  shRbase.position.set(0,-0.6,0.06); lgR.add(shRbase);
  var shRtoe  = b(0.36,0.13,0.18,0x2a0e00); shRtoe.position.set(0,-0.6,0.38); lgR.add(shRtoe);
  var shRheel = b(0.34,0.1,0.12,0x2a0e00);  shRheel.position.set(0,-0.6,-0.22); lgR.add(shRheel);
  var shRsole = b(0.42,0.06,0.64,0x1a0800); shRsole.position.set(0,-0.68,0.06); lgR.add(shRsole);
  var shRhl   = b(0.28,0.06,0.3,0x5a2200);  shRhl.position.set(0,-0.5,0.04); lgR.add(shRhl);
  g.add(lgR);

  // ── BODY (fixed to main group) ─────────────────────────────────────
  var bodyLow = b(0.76,0.46,0.5,0x1a3d8c); bodyLow.position.set(0,0.27,0); g.add(bodyLow);
  var bsdL    = b(0.08,0.44,0.48,0x112870); bsdL.position.set(-0.36,0.27,0); g.add(bsdL);
  var bsdR    = bsdL.clone(); bsdR.position.x=0.36; g.add(bsdR);
  var bodyUp  = b(0.72,0.38,0.48,0xd42020); bodyUp.position.set(0,0.68,0); g.add(bodyUp);
  var ssdL    = b(0.08,0.36,0.46,0x9e1010); ssdL.position.set(-0.34,0.68,0); g.add(ssdL);
  var ssdR    = ssdL.clone(); ssdR.position.x=0.34; g.add(ssdR);
  var sfHL    = b(0.3,0.32,0.05,0xe83030); sfHL.position.set(0,0.68,0.25); g.add(sfHL);
  // Overalls bib
  var bib    = b(0.48,0.48,0.06,0x1a3d8c); bib.position.set(0,0.28,0.26); g.add(bib);
  var bibHL  = b(0.3,0.3,0.05,0x2050b8);   bibHL.position.set(0,0.3,0.28); g.add(bibHL);
  var strapL = b(0.12,0.38,0.06,0x1a3d8c); strapL.position.set(-0.14,0.68,0.25); g.add(strapL);
  var strapR = strapL.clone(); strapR.position.x=0.14; g.add(strapR);
  var btnL   = sph(0.05,0xffcc00); btnL.position.set(-0.14,0.82,0.27); g.add(btnL);
  var btnR   = sph(0.05,0xffcc00); btnR.position.set(0.14,0.82,0.27); g.add(btnR);

  // ── ARM GROUPS (pivot at shoulder) ─────────────────────────────────
  // Left arm group: pivot at shoulder (x=-0.5, y=0.87)
  var aL = new THREE.Group(); aL.position.set(-0.5, 0.87, 0);
  var aLmain = b(0.24,0.54,0.32,0xd42020); aLmain.position.y=-0.27; aL.add(aLmain);
  var aLsd   = b(0.06,0.52,0.3,0x9e1010);  aLsd.position.set(-0.12,-0.27,0); aL.add(aLsd);
  var aLslv  = b(0.26,0.06,0.3,0xaa1818);  aLslv.position.y=-0.5; aL.add(aLslv);
  var aLcf   = b(0.28,0.1,0.3,0xffd8a8);   aLcf.position.y=-0.58; aL.add(aLcf);
  var aLgv   = b(0.32,0.3,0.34,0xffffff);  aLgv.position.y=-0.73; aL.add(aLgv);
  var aLth   = sph(0.09,0xffffff); aLth.position.set(0.06,-0.68,0.12); aL.add(aLth);
  g.add(aL);

  // Right arm group: pivot at shoulder (x=0.5, y=0.87)
  var aR = new THREE.Group(); aR.position.set(0.5, 0.87, 0);
  var aRmain = b(0.24,0.54,0.32,0xd42020); aRmain.position.y=-0.27; aR.add(aRmain);
  var aRsd   = b(0.06,0.52,0.3,0x9e1010);  aRsd.position.set(0.12,-0.27,0); aR.add(aRsd);
  var aRslv  = b(0.26,0.06,0.3,0xaa1818);  aRslv.position.y=-0.5; aR.add(aRslv);
  var aRcf   = b(0.28,0.1,0.3,0xffd8a8);   aRcf.position.y=-0.58; aR.add(aRcf);
  var aRgv   = b(0.32,0.3,0.34,0xffffff);  aRgv.position.y=-0.73; aR.add(aRgv);
  var aRth   = sph(0.09,0xffffff); aRth.position.set(-0.06,-0.68,0.12); aR.add(aRth);
  g.add(aR);

  // ── HEAD (fixed) ───────────────────────────────────────────────────
  var head   = b(0.78,0.72,0.66,0xffd8a8,0.75); head.position.set(0,1.4,0); g.add(head);
  var hdTop  = b(0.76,0.14,0.64,0xffe0b8); hdTop.position.set(0,1.71,0); g.add(hdTop);
  var chin   = b(0.62,0.14,0.5,0xffcca0);  chin.position.set(0,1.07,0.06); g.add(chin);
  var chkL   = b(0.18,0.2,0.1,0xffaaaa);   chkL.position.set(-0.3,1.3,0.31); g.add(chkL);
  var chkR   = chkL.clone(); chkR.position.x=0.3; g.add(chkR);
  // Ears
  var earL   = b(0.1,0.26,0.34,0xffd8a8); earL.position.set(-0.4,1.38,0); g.add(earL);
  var earR   = earL.clone(); earR.position.x=0.4; g.add(earR);
  var earInL = b(0.06,0.17,0.22,0xf0b090); earInL.position.set(-0.42,1.38,0); g.add(earInL);
  var earInR = earInL.clone(); earInR.position.x=0.42; g.add(earInR);
  var tragL  = sph(0.05,0xf0b090); tragL.position.set(-0.42,1.32,0.06); g.add(tragL);
  var tragR  = tragL.clone(); tragR.position.x=0.42; g.add(tragR);
  // Eyes
  var ewL = b(0.22,0.2,0.06,0xffffff); ewL.position.set(-0.2,1.47,0.34); g.add(ewL);
  var ewR = ewL.clone(); ewR.position.x=0.2; g.add(ewR);
  var eiL = b(0.14,0.16,0.06,0x3355cc); eiL.position.set(-0.19,1.45,0.36); g.add(eiL);
  var eiR = eiL.clone(); eiR.position.x=0.19; g.add(eiR);
  var epL = b(0.08,0.1,0.06,0x111111);  epL.position.set(-0.18,1.44,0.37); g.add(epL);
  var epR = epL.clone(); epR.position.x=0.18; g.add(epR);
  var esL = b(0.05,0.05,0.04,0xffffff); esL.position.set(-0.14,1.48,0.38); g.add(esL);
  var esR = esL.clone(); esR.position.x=0.14; g.add(esR);
  var elL = b(0.22,0.06,0.05,0xffd8a8); elL.position.set(-0.2,1.38,0.34); g.add(elL);
  var elR = elL.clone(); elR.position.x=0.2; g.add(elR);
  var ecL = b(0.24,0.05,0.05,0xffc090); ecL.position.set(-0.2,1.55,0.33); g.add(ecL);
  var ecR = ecL.clone(); ecR.position.x=0.2; g.add(ecR);
  // Eyebrows
  var ebL = b(0.24,0.09,0.06,0x3a1000); ebL.position.set(-0.2,1.59,0.33); ebL.rotation.z=0.25; g.add(ebL);
  var ebR = ebL.clone(); ebR.position.x=0.2; ebR.rotation.z=-0.25; g.add(ebR);
  // Nose
  var nose     = sph(0.17,0xffaa50); nose.scale.set(1.3,0.9,1.1); nose.position.set(0,1.33,0.37); g.add(nose);
  var noseBase = b(0.22,0.12,0.06,0xffb878); noseBase.position.set(0,1.26,0.34); g.add(noseBase);
  var nostL    = sph(0.04,0xe09040); nostL.position.set(-0.08,1.28,0.44); g.add(nostL);
  var nostR    = sph(0.04,0xe09040); nostR.position.set(0.08,1.28,0.44); g.add(nostR);
  // Mustache
  var mstL = b(0.3,0.15,0.1,0x3a1000); mstL.position.set(-0.24,1.21,0.34); mstL.rotation.z=0.12; g.add(mstL);
  var mstR = mstL.clone(); mstR.position.x=0.24; mstR.rotation.z=-0.12; g.add(mstR);
  var mstC = b(0.2,0.13,0.1,0x3a1000); mstC.position.set(0,1.23,0.35); g.add(mstC);
  var mcL  = b(0.18,0.1,0.08,0x3a1000); mcL.position.set(-0.26,1.15,0.34); mcL.rotation.z=-0.25; g.add(mcL);
  var mcR  = mcL.clone(); mcR.position.x=0.26; mcR.rotation.z=0.25; g.add(mcR);
  var mcC  = b(0.12,0.09,0.08,0x3a1000); mcC.position.set(0,1.16,0.35); g.add(mcC);
  // Hat
  var hbrim   = b(0.98,0.13,0.84,0xd42020); hbrim.position.set(0,1.79,0.02); g.add(hbrim);
  var hbrimU  = b(1.0,0.06,0.86,0xaa1010);  hbrimU.position.set(0,1.72,0.02); g.add(hbrimU);
  var hbrimHL = b(0.7,0.05,0.6,0xe83030);   hbrimHL.position.set(-0.05,1.85,0.0); g.add(hbrimHL);
  var htop    = b(0.76,0.42,0.68,0xd42020); htop.position.set(0,2.02,0); g.add(htop);
  var htsdL   = b(0.08,0.4,0.66,0x9e1010);  htsdL.position.set(-0.36,2.02,0); g.add(htsdL);
  var htsdR   = htsdL.clone(); htsdR.position.x=0.36; g.add(htsdR);
  var hback   = b(0.74,0.38,0.1,0xd42020);  hback.position.set(0,2.02,-0.34); g.add(hback);
  var mlogo   = b(0.26,0.22,0.06,0xffffff); mlogo.position.set(0,2.02,0.35); g.add(mlogo);
  var mlogoIn = b(0.15,0.13,0.07,0xd42020); mlogoIn.position.set(0,2.01,0.36); g.add(mlogoIn);

  g.traverse(function(c){ if(c.isMesh){c.castShadow=true;c.receiveShadow=true;} });
  // Store limb groups for animation
  g.userData.lgL = lgL;
  g.userData.lgR = lgR;
  g.userData.aL  = aL;
  g.userData.aR  = aR;
  return g;
}
var mario = buildMario();
scene.add(mario);
var mS = { vel:new THREE.Vector3(), canJump:false, animT:0, invincible:0, big:false, isDead:false, growing:false, growTimer:0 };

export function resetMario() {
  mario.position.set(2, 1.1, 0);
  mario.rotation.set(0,0,0); mario.scale.set(1,1,1); mario.visible = true;
  mS.vel.set(0,0,0); mS.canJump = false; mS.isDead = false; mS.invincible = 0; mS.growing = false; mS.growTimer = 0;
  mS.isJumping = false;
  var ud = mario.userData;
  if(ud.lgL){ ud.lgL.rotation.set(0,0,0); }
  if(ud.lgR){ ud.lgR.rotation.set(0,0,0); }
  if(ud.aL){  ud.aL.rotation.set(0,0,0);  }
  if(ud.aR){  ud.aR.rotation.set(0,0,0);  }
}
resetMario();

