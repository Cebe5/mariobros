// nivel.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.149/build/three.module.js';
import { mat, box, boxTex, brickTex, qblockTex, hitBlockTex } from './utils.js';
import { scene } from './escena.js';

export var collidables = [], coinMeshes = [], groundSegs = [];
export var POLE_X = 310;

// ── LEVEL DATA ────────────────────────────────────────────────────────
var collidables = [], coinMeshes = [], enemies = [], activePwups = [], particles = [];
// Ground segments stored separately for enemy edge detection
var groundSegs = []; // {minX, maxX}

// ── GROUND ────────────────────────────────────────────────────────────
export function makeGroundAt(x, w, yTop) {
  // Ground at custom height yTop (default 0)
  if (yTop === undefined) yTop = 0;
  var h = 2.2 + yTop;
  var m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, 6),
    new THREE.MeshStandardMaterial({ color: 0x6c3a10, roughness: 0.9 })
  );
  m.position.set(x + w/2, yTop - h/2, 0); m.receiveShadow = true;
  scene.add(m); collidables.push(m);
  var top = box(w, 0.2, 6, 0x5ab025);
  top.position.set(x + w/2, yTop + 0.1, 0); top.receiveShadow = true;
  scene.add(top); collidables.push(top);
  groundSegs.push({ minX: x, maxX: x + w, yTop: yTop });
}
export function makeGround(x, w) {
  var h = 2.2;
  var m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, 6),
    new THREE.MeshStandardMaterial({ color: 0x6c3a10, roughness: 0.9 })
  );
  m.position.set(x + w/2, -h/2, 0); m.receiveShadow = true;
  scene.add(m); collidables.push(m);
  var top = box(w, 0.2, 6, 0x5ab025);
  top.position.set(x + w/2, 0.1, 0); top.receiveShadow = true;
  scene.add(top); collidables.push(top);
  // Store ground range for enemy edge detection
  groundSegs.push({ minX: x, maxX: x + w, yTop: 0 });
}

// Check if a given X is over solid ground
export function isOverGround(x) {
  for (var i = 0; i < groundSegs.length; i++) {
    if (x >= groundSegs[i].minX && x <= groundSegs[i].maxX) return true;
  }
  return false;
}
export function groundTopAt(x) {
  for (var i = 0; i < groundSegs.length; i++) {
    if (x >= groundSegs[i].minX && x <= groundSegs[i].maxX) return (groundSegs[i].yTop || 0) + 0.2;
  }
  return 0.2;
}

// ── BRICK (cube 1x1x1, textured) ──────────────────────────────────────
export function makeBrick(x, y) {
  var m = boxTex(1, 1, 1, brickTex);
  m.position.set(x, y, 0); m.castShadow = true; m.receiveShadow = true;
  m.userData.type = 'brick'; m.userData.origY = y;
  scene.add(m); collidables.push(m); return m;
}

// ── QUESTION BLOCK (cube 1x1x1, textured) ─────────────────────────────
export function makeQ(x, y, content) {
  var m = boxTex(1, 1, 1, qblockTex);
  m.position.set(x, y, 0); m.castShadow = true; m.receiveShadow = true;
  m.userData.type = 'qblock'; m.userData.content = content || 'coin';
  m.userData.hit = false; m.userData.origY = y;
  scene.add(m); collidables.push(m); return m;
}

// ── PIPE ──────────────────────────────────────────────────────────────
export function makePipe(x, h) {
  if (!h) h = 2.2;
  function b(w,hh,d,c){ return new THREE.Mesh(new THREE.BoxGeometry(w,hh,d),new THREE.MeshStandardMaterial({color:c,roughness:0.65,metalness:0.1})); }

  // MAIN BODY — clean, no extra decoration strips
  var body=b(1.72,h,1.72,0x1a8818); body.position.set(x,h/2,0);
  body.castShadow=true; body.receiveShadow=true; body.userData.type='pipe';
  scene.add(body); collidables.push(body);



  // LIP (rim)
  var lip=b(2.14,0.625,2.14,0x126010); lip.position.set(x,h+0.3125,0);
  lip.castShadow=true; lip.receiveShadow=true;
  scene.add(lip); collidables.push(lip);

  // Lip top face (collidable — actual standing surface)
  var lipTop=b(2.12,0.09,2.12,0x1a8818); lipTop.position.set(x,h+0.625,0);
  lipTop.castShadow=true; lipTop.receiveShadow=true;
  scene.add(lipTop); collidables.push(lipTop);

  // OPENING (dark circle on top)
  var hole=new THREE.Mesh(new THREE.CylinderGeometry(0.76,0.76,0.12,20),
    new THREE.MeshStandardMaterial({color:0x030a03,roughness:1}));
  hole.position.set(x,h+0.676,0); scene.add(hole);
  // Inner walls
  var innerWall=new THREE.Mesh(new THREE.CylinderGeometry(0.78,0.78,0.14,20,1,true),
    new THREE.MeshStandardMaterial({color:0x071207,roughness:1,side:THREE.BackSide}));
  innerWall.position.set(x,h+0.625,0); scene.add(innerWall);
  // Inner rim
  var innerRim=new THREE.Mesh(new THREE.TorusGeometry(0.72,0.04,6,20),
    new THREE.MeshStandardMaterial({color:0x1a5018,roughness:0.5}));
  innerRim.rotation.x=Math.PI/2; innerRim.position.set(x,h+0.62,0); scene.add(innerRim);
}
// ── COIN ──────────────────────────────────────────────────────────────
export function makeCoin(x, y) {
  var wrapper = new THREE.Group();
  var pivot   = new THREE.Group();
  wrapper.add(pivot);

  // 0=vacío | 1=blanco | 2=amarillo muy claro | 3=amarillo | 4=dorado
  // 5=dorado oscuro | 6=negro | 7=amarillo medio
  var MC = [
    [0,0,0,0,0,6,6,6,6,6,6,0,0,0,0,0],
    [0,0,0,6,6,2,2,2,2,2,2,6,6,0,0,0],
    [0,0,6,2,1,1,2,3,3,2,2,2,3,6,0,0],
    [0,6,2,1,1,2,3,3,3,3,2,2,3,3,6,0],
    [6,2,1,1,2,3,3,7,7,3,3,2,2,3,3,6],
    [6,2,1,2,3,3,7,7,7,7,3,3,2,3,4,6],
    [6,2,2,3,3,7,7,4,4,7,7,3,3,4,4,6],
    [6,2,2,3,7,7,4,4,4,4,7,7,4,4,5,6],
    [6,2,2,3,7,4,4,4,4,4,4,7,4,5,5,6],
    [6,3,2,3,7,4,4,5,5,4,4,5,5,5,5,6],
    [6,3,3,4,4,5,5,5,5,5,5,5,5,5,6,0],
    [0,6,3,4,4,4,5,5,5,5,5,5,5,6,0,0],
    [0,0,6,6,4,5,5,5,5,5,5,5,6,0,0,0],
    [0,0,0,0,6,6,6,6,6,6,6,6,0,0,0,0]
  ];

  var coinColors = {
    1: 0xffffff,   // blanco brillo puro
    2: 0xfffde0,   // amarillo muy claro
    3: 0xffe833,   // amarillo vivo como Q block
    4: 0xffd700,   // dorado puro brillante
    5: 0xf0a000,   // dorado medio
    6: 0x221100,   // negro borde
    7: 0xffec00    // amarillo intenso
  };

  var cols = MC[0].length;
  var rows = MC.length;
  var offX = -cols / 2;
  var offY =  rows / 2;
  var sz   = 0.055;

  for (var vy = 0; vy < rows; vy++) {
    for (var vx = 0; vx < cols; vx++) {
      var v = MC[vy][vx];
      if (v === 0) continue;

      var depth = 3.0; // uniform thickness

      var cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, depth),
        new THREE.MeshStandardMaterial({
          color: coinColors[v],
          roughness: v === 6 ? 0.9 : 0.5,
          metalness: 0.0,
          emissive: new THREE.Color(coinColors[v]).multiplyScalar(0.12)
        })
      );
      cube.position.set(vx + offX, -vy + offY, 0);
      pivot.add(cube);
    }
  }

  // Central vertical bar on both sides — raised ridge effect
  var barHeight = (MC.length - 6) * 1.0;
  var barMat = new THREE.MeshStandardMaterial({ color: 0xffe033, roughness: 0.5, metalness: 0.0, emissive: new THREE.Color(0xffe033).multiplyScalar(0.10) });
  var barGeo = new THREE.BoxGeometry(2.2, barHeight, 3.0);
  var barFront = new THREE.Mesh(barGeo, barMat);
  barFront.position.set(0, 0, 1.0);
  pivot.add(barFront);
  var barBack = new THREE.Mesh(barGeo, barMat);
  barBack.position.set(0, 0, -1.0);
  pivot.add(barBack);

  pivot.scale.set(sz * 0.72, sz, sz); // narrower width, taller height
  wrapper.position.set(x, y, 0);
  wrapper.userData.baseY = y;
  wrapper.userData.collected = false;
  scene.add(wrapper);
  coinMeshes.push(wrapper);
  return wrapper;
}
// ── STAIR ─────────────────────────────────────────────────────────────
export function makeStair(x, y) {
  var m = box(1, 1, 6, 0x888888);
  m.position.set(x, y, 0); m.castShadow = true; m.receiveShadow = true;
  m.userData.type = 'stair'; scene.add(m); collidables.push(m);
}

// ── DECORATIONS ───────────────────────────────────────────────────────
function makeHill(x, z) {
  if (!z) z = 4.5;
  var m = new THREE.Mesh(new THREE.ConeGeometry(3.5,3,12), mat(0x52a825));
  m.position.set(x, 1.5, z); m.receiveShadow = true; scene.add(m);
  var m2 = new THREE.Mesh(new THREE.ConeGeometry(2,2,12), mat(0x52a825));
  m2.position.set(x+2.5, 1.0, z-0.5); scene.add(m2);
}
function makeCloud(x, y, z) {
  if (!z) z = -3.5;
  var puffs = [[0,0,1.1],[-0.9,-0.3,0.8],[0.9,-0.3,0.8],[0.1,0.6,0.75]];
  for (var i = 0; i < puffs.length; i++) {
    var p = puffs[i];
    var m = new THREE.Mesh(new THREE.SphereGeometry(p[2],8,6), mat(0xffffff,1));
    m.position.set(x+p[0], y+p[1], z); scene.add(m);
  }
}
export function makeCastle(x) {
  var base = box(8,8,6,0x999999); base.position.set(x,4,0);
  base.castShadow = true; base.receiveShadow = true;
  scene.add(base); collidables.push(base);
  for (var i = -2; i <= 2; i++) {
    var b = box(1,1.2,1.2,0x888888); b.position.set(x+i*1.4,8.6,0);
    scene.add(b); collidables.push(b);
  }
  var door = box(2,2.8,0.3,0x222266); door.position.set(x,1.4,3.1); scene.add(door);
  var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.09,10,8), mat(0xbbbbbb));
  pole.position.set(x-4.6,5,0); scene.add(pole);
  var fl = box(1.5,1.0,0.06,0x22cc22); fl.position.set(x-3.85,9.8,0); scene.add(fl);
}

// ── BUILD WORLD 1-1 ───────────────────────────────────────────────────
makeGround(0,   30);           // normal ground
makeGroundAt(30, 10, 1.5);    // first step up (+1.5)
makeGroundAt(40, 10, 3.5);    // second step up (+2 more = 3.5 total)
makeGround(50,  17);           // back to normal

// Ramp — pyramid layers (visual only) + individual step collidables
(function() {
  var D = 6;
  var gmat = new THREE.MeshStandardMaterial({color:0x6c3a10, roughness:0.9});
  var tmat = new THREE.MeshStandardMaterial({color:0x5ab025, roughness:0.8});

  // Visual layers — NOT collidable, just for appearance
  var layers = [
    {x0:67, x1:77, y0:-2.2, y1:0.4},
    {x0:68, x1:76, y0: 0.4, y1:0.8},
    {x0:69, x1:75, y0: 0.8, y1:1.2},
    {x0:70, x1:74, y0: 1.2, y1:1.6}
  ];
  for (var li = 0; li < layers.length; li++) {
    var L = layers[li];
    var dirt = new THREE.Mesh(
      new THREE.BoxGeometry(L.x1-L.x0, L.y1-L.y0, D), gmat);
    dirt.position.set((L.x0+L.x1)/2, (L.y0+L.y1)/2, 0);
    dirt.receiveShadow = true; scene.add(dirt);
    // NO collidables.push — visual only
  }

  // Per-step collidables: thin box at exact step height, 1 unit wide
  // These are the ONLY surfaces Mario can land on
  var cols = [
    {x:67,h:0.4},{x:68,h:0.8},{x:69,h:1.2},{x:70,h:1.6},
    {x:71,h:1.6},{x:72,h:1.6},{x:73,h:1.6},
    {x:74,h:1.2},{x:75,h:0.8},{x:76,h:0.4}
  ];
  for (var ci = 0; ci < cols.length; ci++) {
    var c = cols[ci];
    // Thin surface collidable only — Mario lands on top, never gets pushed up from side
    var phys = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.3, D),
      new THREE.MeshStandardMaterial({visible:false}));
    phys.position.set(c.x+0.5, c.h + 0.15, 0);
    scene.add(phys); collidables.push(phys);
    // Green cap (visible)
    var cap = new THREE.Mesh(new THREE.BoxGeometry(1, 0.2, D), tmat);
    cap.position.set(c.x+0.5, c.h+0.1, 0);
    cap.receiveShadow = true; scene.add(cap);
    groundSegs.push({minX:c.x, maxX:c.x+1, yTop:c.h});
  }
})();
makeGround(77, 17);
makeGround(100, 25);
makeGround(131, 63);
makeGround(200, 12);
makeGroundAt(212, 6, 1,5);           // normal ground
makeGroundAt(218, 6, 3);    // first step up (+1.5)    // second step up (+2 more = 3.5 total)
makeGround(224, 3);
makeGroundAt(227, 8, 3);
makeGroundAt(235, 6, 1,5);
makeGround(247,  30);  
makeGround(283,  45);     

         
makeQ(17,5,'coin'); makeQ(22,5,'mushroom'); makeQ(23,5);
makeBrick(45,8.5);
makeBrick(57,5); makeBrick(58,5); makeBrick(59,5); makeBrick(58,9);
makeQ(106,5,'mushroom'); makeBrick(112,5); makeQ(113,5,'coin'); makeBrick(114,5);
makeBrick(118,5); makeBrick(119,5);
makeBrick(142,6); makeBrick(143,6); makeBrick(144,6); makeBrick(145,6); makeBrick(146,6);
makeBrick(155,5); makeBrick(156,5); makeBrick(157,5); 
makeBrick(158,8); makeBrick(159,8); makeBrick(160,8); 
makeQ(161,5,'coin'); makeBrick(162,5); makeBrick(163,5); 
makePipe(86,2.2); makePipe(138,2.8); makePipe(172,2,8); makePipe(254,2.8);
makeBrick(178,5); makeBrick(182,5); makeBrick(186,5); 
makeQ(206,5,'coin');
makeBrick(224.5,2.7); makeBrick(225.5,2.7); makeBrick(226.5,2.7); 
makeQ(231,8,'coin');
makeBrick(257,6); makeBrick(258,6); makeBrick(259,6); makeBrick(260,6); makeBrick(261,6);


makeCoin(29, 3); makeCoin(30, 4); makeCoin(31, 4);
makeCoin(39, 5); makeCoin(40, 6); makeCoin(41, 6);
makeCoin(70.2, 5); makeCoin(71.2, 6); makeCoin(72.2, 6); makeCoin(73.2, 5);
makeCoin(96, 4); makeCoin(97, 5); makeCoin(98, 5); makeCoin(99, 4);
makeCoin(126.8, 4); makeCoin(127.8, 5); makeCoin(128.8, 5); makeCoin(129.8, 4);
makeCoin(140, 7); makeCoin(141, 8); makeCoin(142, 8);
makeCoin(195, 4); makeCoin(196, 5); makeCoin(197, 5); makeCoin(198, 4);
makeCoin(243, 6); makeCoin(244, 6); makeCoin(245, 5);


for (var s = 0; s < 8; s++) {
  for (var hs = 0; hs <= s; hs++) makeStair(300+s, 0.5+hs);
}
makeCastle(324);

var POLE_X = 310;
var fp = new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,13,8), mat(0xbbbbbb));
fp.position.set(POLE_X, 6.5, 0); scene.add(fp);
var fball = new THREE.Mesh(new THREE.SphereGeometry(0.3,8,8), mat(0xddcc00));
fball.position.set(POLE_X, 13.1, 0); scene.add(fball);
var fflag = box(1.8,1.2,0.06,0x22cc22); fflag.position.set(POLE_X+0.9, 12.1, 0); scene.add(fflag);

