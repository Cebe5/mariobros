// enemigos.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.149/build/three.module.js';
import { scene } from './escena.js';

export var enemies = [], activePwups = [];

<<<<<<< HEAD
// GOOMBA
=======
// ── GOOMBA (faithful DS style) ────────────────────────────────────────
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
export function makeGoomba(x) {
  var g = new THREE.Group();
  function b(w,h,d,c){ return new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color:c,roughness:0.78,metalness:0})); }

<<<<<<< HEAD
  // PIES
=======
  // FEET
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var ftL=b(0.46,0.2,0.6,0x2a1000); ftL.position.set(-0.24,0.1,0.05); g.add(ftL);
  var ftSL=b(0.44,0.06,0.58,0x1a0800); ftSL.position.set(-0.24,0.01,0.05); g.add(ftSL);
  var ftTL=b(0.4,0.15,0.18,0x1a0800); ftTL.position.set(-0.24,0.1,0.33); g.add(ftTL);
  var ftHL=b(0.3,0.07,0.36,0x3d1a00); ftHL.position.set(-0.24,0.18,0.04); g.add(ftHL);
  var tn0=b(0.09,0.09,0.06,0x0a0500); tn0.position.set(-0.34,0.12,0.4); g.add(tn0);
  var tn1=b(0.09,0.09,0.06,0x0a0500); tn1.position.set(-0.24,0.12,0.4); g.add(tn1);
  var tn2=b(0.09,0.09,0.06,0x0a0500); tn2.position.set(-0.14,0.12,0.4); g.add(tn2);
  var ftR=ftL.clone(); ftR.position.x=0.24; g.add(ftR);
  var ftSR=ftSL.clone(); ftSR.position.x=0.24; g.add(ftSR);
  var ftTR=ftTL.clone(); ftTR.position.x=0.24; g.add(ftTR);
  var ftHR=ftHL.clone(); ftHR.position.x=0.24; g.add(ftHR);
  var tn3=b(0.09,0.09,0.06,0x0a0500); tn3.position.set(0.14,0.12,0.4); g.add(tn3);
  var tn4=b(0.09,0.09,0.06,0x0a0500); tn4.position.set(0.24,0.12,0.4); g.add(tn4);
  var tn5=b(0.09,0.09,0.06,0x0a0500); tn5.position.set(0.34,0.12,0.4); g.add(tn5);

<<<<<<< HEAD
  // CUERPO
=======
  // BODY
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var bodyBot=b(0.82,0.3,0.72,0x7a3a00); bodyBot.position.y=0.33; g.add(bodyBot);
  var bodyBHL=b(0.6,0.22,0.5,0x9a5010); bodyBHL.position.set(0,0.35,-0.04); g.add(bodyBHL);
  var bodyMid=b(0.92,0.3,0.78,0x8b4500); bodyMid.position.y=0.58; g.add(bodyMid);
  var bodyMHL=b(0.64,0.22,0.54,0xaa6020); bodyMHL.position.set(0,0.6,-0.04); g.add(bodyMHL);
  var bsdL=b(0.1,0.56,0.7,0x5a2800); bsdL.position.set(-0.44,0.46,0); g.add(bsdL);
  var bsdR=bsdL.clone(); bsdR.position.x=0.44; g.add(bsdR);

<<<<<<< HEAD
  // CABEZA
=======
  // HEAD
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var head=b(1.06,0.66,0.84,0x8b4500); head.position.y=0.88; g.add(head);
  var htop=b(1.02,0.2,0.8,0x3d1a00); htop.position.y=1.1; g.add(htop);
  var htopHL=b(0.5,0.12,0.4,0x5a2800); htopHL.position.set(-0.15,1.18,0); g.add(htopHL);
  var hchin=b(0.9,0.12,0.76,0x6a3200); hchin.position.y=0.6; g.add(hchin);
  var hface=b(0.88,0.5,0.06,0x9a5010); hface.position.set(0,0.85,0.42); g.add(hface);
  var hsdL=b(0.1,0.62,0.8,0x5a2800); hsdL.position.set(-0.5,0.88,0); g.add(hsdL);
  var hsdR=hsdL.clone(); hsdR.position.x=0.5; g.add(hsdR);

<<<<<<< HEAD
  // OJOS
=======
  // EYES
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var ewL=b(0.28,0.24,0.07,0xffffff); ewL.position.set(-0.26,0.9,0.44); g.add(ewL);
  var ewR=ewL.clone(); ewR.position.x=0.26; g.add(ewR);
  var eiL=b(0.18,0.18,0.07,0x330000); eiL.position.set(-0.27,0.88,0.46); g.add(eiL);
  var eiR=eiL.clone(); eiR.position.x=0.27; g.add(eiR);
  var epL=b(0.1,0.12,0.07,0x000000); epL.position.set(-0.27,0.87,0.48); g.add(epL);
  var epR=epL.clone(); epR.position.x=0.27; g.add(epR);
  var esL=b(0.06,0.06,0.05,0xffffff); esL.position.set(-0.22,0.92,0.49); g.add(esL);
  var esR=esL.clone(); esR.position.x=0.22; g.add(esR);
  var ebagL=b(0.28,0.07,0.06,0x3d1800); ebagL.position.set(-0.26,0.79,0.44); g.add(ebagL);
  var ebagR=ebagL.clone(); ebagR.position.x=0.26; g.add(ebagR);

<<<<<<< HEAD
  // CEJAS
=======
  // EYEBROWS
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var brL=b(0.32,0.12,0.07,0x1a0800); brL.position.set(-0.26,1.04,0.44); brL.rotation.z=0.55; g.add(brL);
  var brR=brL.clone(); brR.position.x=0.26; brR.rotation.z=-0.55; g.add(brR);
  var brL2=b(0.24,0.09,0.07,0x0a0400); brL2.position.set(-0.28,1.09,0.44); brL2.rotation.z=0.5; g.add(brL2);
  var brR2=brL2.clone(); brR2.position.x=0.28; brR2.rotation.z=-0.5; g.add(brR2);

<<<<<<< HEAD
  // BOCA
=======
  // MOUTH
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var mth=b(0.62,0.08,0.07,0x1a0800); mth.position.set(0,0.72,0.44); g.add(mth);
  var fgL=b(0.12,0.18,0.07,0xffffff); fgL.position.set(-0.16,0.62,0.44); g.add(fgL);
  var fgR=fgL.clone(); fgR.position.x=0.16; g.add(fgR);
  var fgsL=b(0.1,0.06,0.06,0xcccccc); fgsL.position.set(-0.16,0.57,0.44); g.add(fgsL);
  var fgsR=fgsL.clone(); fgsR.position.x=0.16; g.add(fgsR);

  g.position.set(x, 0.2, 0);
  g.traverse(function(c){ if(c.isMesh){c.castShadow=true;c.receiveShadow=true;} });
  scene.add(g);
<<<<<<< HEAD
  return { mesh:g, vel:new THREE.Vector3(-0.04,0,0), alive:true, squashT:0, startX:x, range:5, type:'goomba' };
}
// KOOPA
=======
  return { mesh:g, vel:new THREE.Vector3(-0.04,0,0), alive:true, squashT:0, startX:x, range:7, type:'goomba' };
}
// ── KOOPA (faithful DS style) ─────────────────────────────────────────
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
export function makeKoopa(x) {
  var g = new THREE.Group();
  function b(w,h,d,c){ return new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color:c,roughness:0.75,metalness:0.05})); }

<<<<<<< HEAD
  // PIES
=======
  // FEET / CLAWS
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var ftL=b(0.36,0.22,0.52,0xb0a000); ftL.position.set(-0.22,0.11,0.04); g.add(ftL);
  var ftSL=b(0.34,0.07,0.5,0x807000); ftSL.position.set(-0.22,0.01,0.04); g.add(ftSL);
  var cl0=b(0.09,0.1,0.15,0x707000); cl0.position.set(-0.32,0.1,0.28); g.add(cl0);
  var cl1=b(0.09,0.1,0.15,0x707000); cl1.position.set(-0.22,0.1,0.3); g.add(cl1);
  var cl2=b(0.09,0.1,0.15,0x707000); cl2.position.set(-0.12,0.1,0.28); g.add(cl2);
  var ftR=ftL.clone(); ftR.position.x=0.22; g.add(ftR);
  var ftSR=ftSL.clone(); ftSR.position.x=0.22; g.add(ftSR);
  var cl3=cl0.clone(); cl3.position.x=0.32; g.add(cl3);
  var cl4=cl1.clone(); cl4.position.x=0.22; g.add(cl4);
  var cl5=cl2.clone(); cl5.position.x=0.12; g.add(cl5);

<<<<<<< HEAD
  // PIERNAS
  var legL=b(0.3,0.3,0.36,0x88cc44); legL.position.set(-0.22,0.33,0.04); g.add(legL);
  var legR=legL.clone(); legR.position.x=0.22; g.add(legR);

  // CAPARAZON
  var shell=b(0.78,0.78,0.76,0x1e7018); shell.position.y=0.57; g.add(shell);
  var shellHL=b(0.48,0.66,0.2,0x28a022); shellHL.position.set(-0.1,0.6,-0.2); g.add(shellHL);
  var shellSd=b(0.1,0.74,0.72,0x145010); shellSd.position.set(0.36,0.57,0); g.add(shellSd);
=======
  // LEGS
  var legL=b(0.3,0.3,0.36,0x88cc44); legL.position.set(-0.22,0.33,0.04); g.add(legL);
  var legR=legL.clone(); legR.position.x=0.22; g.add(legR);

  // SHELL
  var shell=b(0.78,0.78,0.76,0x1e7018); shell.position.y=0.57; g.add(shell);
  var shellHL=b(0.48,0.66,0.2,0x28a022); shellHL.position.set(-0.1,0.6,-0.2); g.add(shellHL);
  var shellSd=b(0.1,0.74,0.72,0x145010); shellSd.position.set(0.36,0.57,0); g.add(shellSd);
  // Ridges
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var r0=b(0.8,0.07,0.78,0x145010); r0.position.y=0.3; g.add(r0);
  var r1=b(0.8,0.07,0.78,0x145010); r1.position.y=0.5; g.add(r1);
  var r2=b(0.8,0.07,0.78,0x145010); r2.position.y=0.7; g.add(r2);
  var r3=b(0.8,0.07,0.78,0x145010); r3.position.y=0.9; g.add(r3);
<<<<<<< HEAD
=======
  // Yellow rims
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var rimT=b(0.84,0.12,0.8,0xd4a800); rimT.position.y=0.96; g.add(rimT);
  var rimB=b(0.82,0.12,0.78,0xd4a800); rimB.position.y=0.2; g.add(rimB);
  var rimL=b(0.1,0.76,0.78,0xd4a800); rimL.position.set(-0.4,0.57,0); g.add(rimL);
  var rimR=rimL.clone(); rimR.position.x=0.4; g.add(rimR);
<<<<<<< HEAD
=======
  // Shell back hex pattern
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var hex0=b(0.24,0.2,0.06,0x2a9028); hex0.position.set(-0.1,0.66,-0.38); g.add(hex0);
  var hex1=b(0.24,0.2,0.06,0x2a9028); hex1.position.set(0.1,0.44,-0.38); g.add(hex1);
  var hex2=b(0.24,0.2,0.06,0x2a9028); hex2.position.set(-0.1,0.44,-0.38); g.add(hex2);

<<<<<<< HEAD
  // BARRIGA
=======
  // BELLY
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var belly=b(0.52,0.64,0.12,0xfffacc); belly.position.set(0,0.54,0.39); g.add(belly);
  var bellyHL=b(0.32,0.44,0.08,0xffffff); bellyHL.position.set(-0.04,0.56,0.42); g.add(bellyHL);
  var bellyLn=b(0.06,0.56,0.1,0xe8ddb0); bellyLn.position.set(0.1,0.54,0.4); g.add(bellyLn);

<<<<<<< HEAD
  // BRAZOS
=======
  // ARMS
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var arL=b(0.22,0.16,0.34,0x88cc44); arL.position.set(-0.48,0.76,0.1); g.add(arL);
  var arR=arL.clone(); arR.position.x=0.48; g.add(arR);
  var handL=b(0.2,0.2,0.28,0xb0a000); handL.position.set(-0.5,0.63,0.1); g.add(handL);
  var handR=handL.clone(); handR.position.x=0.5; g.add(handR);
  var hcl0=b(0.08,0.1,0.12,0x807000); hcl0.position.set(-0.52,0.56,0.22); g.add(hcl0);
  var hcl1=b(0.08,0.1,0.12,0x807000); hcl1.position.set(-0.44,0.56,0.22); g.add(hcl1);
  var hcl2=hcl0.clone(); hcl2.position.x=0.52; g.add(hcl2);
  var hcl3=hcl1.clone(); hcl3.position.x=0.44; g.add(hcl3);

<<<<<<< HEAD
  // CUELLO
  var neck=b(0.36,0.28,0.36,0x88cc44); neck.position.set(0,1.04,0.1); g.add(neck);

  // CABEZA
  var head=b(0.6,0.52,0.56,0x88cc44); head.position.set(0,1.32,0.12); g.add(head);
  var headHL=b(0.36,0.4,0.12,0xa0e060); headHL.position.set(-0.06,1.32,0.02); g.add(headHL);
  var headSd=b(0.1,0.5,0.52,0x608830); headSd.position.set(0.27,1.32,0.12); g.add(headSd);
=======
  // NECK
  var neck=b(0.36,0.28,0.36,0x88cc44); neck.position.set(0,1.04,0.1); g.add(neck);

  // HEAD
  var head=b(0.6,0.52,0.56,0x88cc44); head.position.set(0,1.32,0.12); g.add(head);
  var headHL=b(0.36,0.4,0.12,0xa0e060); headHL.position.set(-0.06,1.32,0.02); g.add(headHL);
  var headSd=b(0.1,0.5,0.52,0x608830); headSd.position.set(0.27,1.32,0.12); g.add(headSd);
  // Snout
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var snout=b(0.42,0.3,0.2,0xa0e060); snout.position.set(0,1.22,0.36); g.add(snout);
  var snoutHL=b(0.26,0.18,0.1,0xc0ff80); snoutHL.position.set(-0.06,1.26,0.4); g.add(snoutHL);
  var nostL=b(0.08,0.08,0.07,0x6aaa30); nostL.position.set(-0.1,1.28,0.47); g.add(nostL);
  var nostR=b(0.08,0.08,0.07,0x6aaa30); nostR.position.set(0.1,1.28,0.47); g.add(nostR);

<<<<<<< HEAD
  // OJOS
=======
  // EYES
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var ewL=b(0.2,0.22,0.07,0xffffff); ewL.position.set(-0.17,1.38,0.44); g.add(ewL);
  var ewR=ewL.clone(); ewR.position.x=0.17; g.add(ewR);
  var eiL=b(0.12,0.15,0.07,0x2244aa); eiL.position.set(-0.16,1.36,0.46); g.add(eiL);
  var eiR=eiL.clone(); eiR.position.x=0.16; g.add(eiR);
  var epL=b(0.07,0.1,0.07,0x111111); epL.position.set(-0.16,1.35,0.48); g.add(epL);
  var epR=epL.clone(); epR.position.x=0.16; g.add(epR);
  var esL=b(0.05,0.05,0.05,0xffffff); esL.position.set(-0.13,1.39,0.49); g.add(esL);
  var esR=esL.clone(); esR.position.x=0.13; g.add(esR);
  var ebL=b(0.22,0.08,0.06,0x4a7820); ebL.position.set(-0.17,1.5,0.44); g.add(ebL);
  var ebR=ebL.clone(); ebR.position.x=0.17; g.add(ebR);

<<<<<<< HEAD
  // PICO
=======
  // BEAK / LIPS
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var lipT=b(0.38,0.07,0.08,0x88aa44); lipT.position.set(0,1.14,0.45); g.add(lipT);
  var lipB=b(0.34,0.07,0.08,0x6a8830); lipB.position.set(0,1.08,0.44); g.add(lipB);
  var toothL=b(0.08,0.1,0.07,0xffffcc); toothL.position.set(-0.08,1.1,0.46); g.add(toothL);
  var toothR=toothL.clone(); toothR.position.x=0.08; g.add(toothR);

  g.position.set(x, 0.2, 0);
  g.traverse(function(c){ if(c.isMesh){c.castShadow=true;c.receiveShadow=true;} });
  scene.add(g);
<<<<<<< HEAD
  return { mesh:g, vel:new THREE.Vector3(-0.032,0,0), alive:true, squashT:0, startX:x, range:5, type:'koopa' };
}
var espawns = [
  // Segment 0-30
  {t:'g',x:10},{t:'k',x:20},
  // Segment 50-67
  {t:'g',x:55},{t:'k',x:62},
  // Segment 77-94
  {t:'g',x:79},{t:'k',x:84},{t:'g',x:90},
  // Segment 100-125
  {t:'k',x:103},{t:'g',x:110},{t:'k',x:118},{t:'g',x:124},
  // Segment 131-194
  {t:'g',x:133},{t:'k',x:140},{t:'g',x:148},{t:'k',x:155},
  {t:'g',x:162},{t:'k',x:170},{t:'g',x:178},
  // Segment 200-212
  {t:'k',x:204},{t:'g',x:209},
  // Segment 247-277
  {t:'g',x:250},{t:'k',x:258},{t:'g',x:264},{t:'k',x:272},
  // Segment 283-308
  {t:'g',x:286},{t:'k',x:293}
=======
  return { mesh:g, vel:new THREE.Vector3(-0.032,0,0), alive:true, squashT:0, startX:x, range:8, type:'koopa' };
}
var espawns = [
  {t:'g',x:28},{t:'g',x:84},
  {t:'g',x:88},{t:'g',x:114},{t:'g',x:130},
  {t:'k',x:145},{t:'g',x:155},{t:'k',x:168},
  {t:'g',x:256},{t:'k',x:262},{t:'k',x:285}
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
];
for (var ei = 0; ei < espawns.length; ei++) {
  var es = espawns[ei];
  enemies.push(es.t === 'g' ? makeGoomba(es.x) : makeKoopa(es.x));
}

<<<<<<< HEAD
// CHAMPIÑON
export function spawnMushroom(x, y) {
  var wrapper = new THREE.Group();

=======
// ── MUSHROOM ──────────────────────────────────────────────────────────
export function spawnMushroom(x, y) {
  // Wrapper group — this is what moves through the world
  var wrapper = new THREE.Group();

  // Inner pivot group — voxels centered here so rotation.y spins in place
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var pivot = new THREE.Group();
  wrapper.add(pivot);

  var colors = {
    1: 0xffffff,
    2: 0xe52521,
    3: 0x000000,
    4: 0xb71c1c
  };

  var M = [
    [0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0],
    [0,0,0,1,1,2,2,2,2,1,1,1,1,0,0,0],
    [0,0,1,1,1,2,2,2,2,1,1,1,1,1,0,0],
    [0,1,1,1,2,2,2,2,2,2,1,1,1,1,1,0],
    [0,1,1,2,2,1,1,1,1,2,2,1,1,1,1,0],
    [2,2,2,2,1,1,1,1,1,1,2,2,2,2,2,2],
    [2,2,2,2,1,1,1,1,1,1,2,2,1,1,2,2],
    [1,1,2,2,1,1,1,1,1,1,2,1,1,1,1,2],
    [1,1,1,2,2,1,1,1,1,2,2,1,1,1,1,2],
    [1,1,1,2,2,2,2,2,2,2,2,2,1,1,2,2],
    [1,1,2,2,3,3,3,3,3,3,3,3,2,2,2,2],
    [0,3,3,3,1,1,3,1,1,3,1,1,3,3,3,0],
    [0,0,3,1,1,1,3,1,1,3,1,1,1,3,0,0],
    [0,0,3,1,1,1,1,1,1,1,1,1,1,3,0,0],
    [0,0,0,3,1,1,1,1,1,1,1,1,3,0,0,0],
    [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0]
  ];

<<<<<<< HEAD
=======
  // Add voxels to pivot, centered: offset by -cols/2 and +rows/2
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var offX = -M[0].length / 2;
  var offY =  M.length    / 2;

  for (var vy = 0; vy < M.length; vy++) {
    for (var vx = 0; vx < M[vy].length; vx++) {
      var v = M[vy][vx];
      if (v === 0) continue;
      var cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: colors[v], roughness: 0.7, emissive: new THREE.Color(colors[v]).multiplyScalar(0.18) })
      );
<<<<<<< HEAD
      var cx = vx + offX;
      var cy = -vy + offY;
      var capRows = 14;
      var isCap = vy <= capRows;
      if (isCap) {
        var distX = (vx - M[0].length / 2) / (M[0].length / 2);
        var distY = (vy - capRows / 2) / (capRows / 2);
        var domeX = Math.max(0, 1.0 - distX * distX);
        var taper = Math.max(0.45, 1.0 - distY * distY * 1.2);
        var depth = 0.4 + domeX * taper * 12.6;
        if (vy === 0) depth = Math.max(0.4, depth - 2.0);
        if (vy === 2) depth += 2.0;
        if (vy === 3) depth += 1.0;
        if (vy === 5 || vy === 6 || vy === 7 || vy === 8) depth = Math.max(0.4, depth - 1.0);
=======
      // Position with centering applied to the child, so pivot.rotation works correctly
      var cx = vx + offX;
      var cy = -vy + offY;
      // Dome shape: depth depends on distance from center
      var capRows = 14; // rows 0-14 = cap dome, 15 = stem
      var isCap = vy <= capRows;
      if (isCap) {
        // Ellipsoid: X controls width curve, Y controls vertical taper
        var distX = (vx - M[0].length / 2) / (M[0].length / 2);
        var distY = (vy - capRows / 2) / (capRows / 2);
        var domeX = Math.max(0, 1.0 - distX * distX);
        var taper = Math.max(0.45, 1.0 - distY * distY * 1.2); // some volume top/bottom
        var depth = 0.4 + domeX * taper * 12.6;
        if (vy === 0) depth = Math.max(0.4, depth - 2.0); // first row
        if (vy === 2) depth += 2.0; // third row
        if (vy === 3) depth += 1.0; // fourth row
        if (vy === 5 || vy === 6 || vy === 7 || vy === 8) depth = Math.max(0.4, depth - 1.0); // rows 6-9
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
      } else {
        var depth = 0.5;
      }
      cube.scale.z = depth;
      cube.position.set(cx, cy, 0);
      pivot.add(cube);
    }
  }

<<<<<<< HEAD
  var sz = 0.082;
=======
  // Scale pivot to game world size (smaller)
  var sz = 0.082;
  // Central vertical bar on both sides — raised ridge effect
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var barHeight = (M.length - 6) * 1.0;
  var barMat = new THREE.MeshStandardMaterial({ color: 0xffe033, roughness: 0.5, metalness: 0.0, emissive: new THREE.Color(0xffe033).multiplyScalar(0.10) });
  var barGeo = new THREE.BoxGeometry(2.2, barHeight, 3.0);
  var barFront = new THREE.Mesh(barGeo, barMat);
  barFront.position.set(0, 0, 1.0);
  pivot.add(barFront);
  var barBack = new THREE.Mesh(barGeo, barMat);
  barBack.position.set(0, 0, -1.0);
  pivot.add(barBack);

<<<<<<< HEAD
  pivot.scale.set(sz, sz * 0.90, sz);

  var halfH = (M.length / 2) * sz * 0.90;
  pivot.position.y = halfH;

  wrapper.position.set(x, y, 0);

  var emergeEnd = y + 0.1;
  wrapper.position.y = y;
=======
  pivot.scale.set(sz, sz * 0.90, sz); // slightly flattened vertically // narrower width, taller height // uniform scale, depth handles Z variation

  // Offset pivot up so the BOTTOM of mushroom sits at wrapper.position.y
  // M has 16 rows, half = 8 * sz * scaleY ≈ 0.59 units
  var halfH = (M.length / 2) * sz * 0.90;
  pivot.position.y = halfH;

  // Place wrapper at world position
  wrapper.position.set(x, y, 0);

  // Emerge from just above block top
  var emergeEnd = y + 0.1;
  wrapper.position.y = y; // start at block top
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee

  wrapper.userData.baseY        = emergeEnd;
  wrapper.userData.collected    = false;
  wrapper.userData.emerging     = true;
  wrapper.userData.emergeTarget = emergeEnd;

  wrapper.traverse(function(c){ if(c.isMesh){ c.castShadow=true; c.receiveShadow=true; } });
  scene.add(wrapper);

  var pu = { mesh: wrapper, vel: new THREE.Vector3(0,0,0), collected: false };
  activePwups.push(pu);
  return wrapper;
}
<<<<<<< HEAD

// ESTRELLA
export function spawnStar(x, y) {
  var wrapper = new THREE.Group();
  var pivot   = new THREE.Group();
  wrapper.add(pivot);

  var starColors = {
    1: 0x000000,  
    2: 0xffeb3b,  
    3: 0xf38f00   
  };

  var M = [
    [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,2,2,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,2,2,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0],
    [1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1],
    [1,3,2,2,2,2,2,2,2,2,2,2,2,2,3,1],
    [0,1,3,2,2,2,1,2,2,1,2,2,2,3,1,0],
    [0,0,1,3,2,2,1,2,2,1,2,2,3,1,0,0],
    [0,0,0,1,3,2,1,2,2,1,2,3,1,0,0,0],
    [0,0,0,1,3,2,2,2,2,2,2,3,1,0,0,0],
    [0,0,1,3,2,2,2,2,2,2,2,2,3,1,0,0],
    [0,0,1,3,2,2,2,3,3,2,2,2,3,1,0,0],
    [0,1,3,2,2,3,3,1,1,3,3,2,2,3,1,0],
    [0,1,3,3,3,1,1,0,0,1,1,3,3,3,1,0],
    [1,3,3,1,1,0,0,0,0,0,0,1,1,3,3,1],
    [1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1]
  ];

  var offX = -M[0].length / 2;
  var offY =  M.length    / 2;
  var sz   = 0.082;

  for (var vy = 0; vy < M.length; vy++) {
    for (var vx = 0; vx < M[vy].length; vx++) {
      var v = M[vy][vx];
      if (v === 0) continue;
      var cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
          color: starColors[v],
          roughness: 0.5,
          emissive: new THREE.Color(starColors[v]).multiplyScalar(v === 2 ? 0.3 : v === 3 ? 0.2 : 0.0)
        })
      );
      // Slight dome depth so it looks 3D when spinning
      var distX = (vx - M[0].length / 2) / (M[0].length / 2);
      var distY = (vy - M.length    / 2) / (M.length    / 2);
      var dome  = Math.max(0, 1.0 - distX * distX - distY * distY);
      cube.scale.z = 0.4 + dome * 5.0;
      cube.position.set(vx + offX, -vy + offY, 0);
      pivot.add(cube);
    }
  }

  pivot.scale.set(sz, sz, sz);

  var halfH = (M.length / 2) * sz;
  pivot.position.y = halfH;

  wrapper.position.set(x, y, 0);

  var emergeEnd = y + 0.1;
  wrapper.position.y = y;

  wrapper.userData.baseY        = emergeEnd;
  wrapper.userData.collected    = false;
  wrapper.userData.emerging     = true;
  wrapper.userData.emergeTarget = emergeEnd;
  wrapper.userData.type         = 'star';

  wrapper.traverse(function(c){ if(c.isMesh){ c.castShadow=true; c.receiveShadow=true; } });
  scene.add(wrapper);

  var pu = { mesh: wrapper, vel: new THREE.Vector3(0,0,0), collected: false };
  activePwups.push(pu);
  return wrapper;
}

=======
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
