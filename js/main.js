// main.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.149/build/three.module.js';
import { mat, matTex, box, boxTex, brickTex, qblockTex, hitBlockTex } from './utils.js';
import { scene, camera, renderer, sun, fillLight } from './escena.js';
import { keys, camTheta, camPhi, camRadius } from './controles.js';
import { score, coinCount, lives, timeLeft, gameActive, timerHandle, flagDone,
<<<<<<< HEAD
         hudCoins, hudTime, hudLives, msgEl, bowserEl, bowserTxt, fpsEl,
=======
         hudCoins, hudTime, hudLives, msgEl, bowserEl, bowserTxt,
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
         addScore, addCoin, showMsg, showBowser,
         setLives, setGameActive, setTimerHandle, setTimeLeft, setFlagDone } from './hud.js';
import { collidables, coinMeshes, groundSegs, POLE_X, isOverGround } from './nivel.js';
import { mario, mS, resetMario } from './jugador.js';
<<<<<<< HEAD
import { enemies, activePwups, spawnStar } from './enemigos.js';
=======
import { enemies, activePwups } from './enemigos.js';
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
import { particles, _b1, _b2, prevVelY, setPrevVelY, spawnParticles, getMarioBox, resolvePlayer, checkBlockHits } from './colisiones.js';




<<<<<<< HEAD
// ACTUALIZAR ENEMIGOS
=======
// ── ENEMIES UPDATE — enemies fall off edges ───────────────────────────
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
function updateEnemies() {
  getMarioBox();
  for (var i = 0; i < enemies.length; i++) {
    var en = enemies[i];
    if (!en.alive) {
      if (en.squashT > 0) { en.squashT--; if (en.squashT === 0) scene.remove(en.mesh); }
      continue;
    }
    if (Math.abs(en.mesh.position.x - mario.position.x) > 40) continue;

<<<<<<< HEAD
    en.vel.y -= 0.02;
    en.mesh.position.addScaledVector(en.vel, 1);

=======
    // Gravity
    en.vel.y -= 0.02;
    en.mesh.position.addScaledVector(en.vel, 1);

    // Ground snap
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
    if (en.mesh.position.y < 0.2) {
      if (isOverGround(en.mesh.position.x)) { en.mesh.position.y = 0.2; en.vel.y = 0; }
      if (en.mesh.position.y < -6) { en.alive = false; scene.remove(en.mesh); continue; }
    }

<<<<<<< HEAD
=======
    // Patrol + edge detection
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
    var nextX = en.mesh.position.x + en.vel.x * 8;
    if (Math.abs(en.mesh.position.x - en.startX) > en.range || !isOverGround(nextX)) {
      en.vel.x *= -1;
    }
    en.mesh.rotation.y = en.vel.x < 0 ? Math.PI : 0;

<<<<<<< HEAD
=======
    // Platform collisions
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
    _b2.setFromObject(en.mesh);
    for (var p = 0; p < collidables.length; p++) {
      var pb = new THREE.Box3().setFromObject(collidables[p]);
      if (!_b2.intersectsBox(pb)) continue;
      var ox2=Math.min(_b2.max.x,pb.max.x)-Math.max(_b2.min.x,pb.min.x);
      var oy2=Math.min(_b2.max.y,pb.max.y)-Math.max(_b2.min.y,pb.min.y);
      var oz2=Math.min(_b2.max.z,pb.max.z)-Math.max(_b2.min.z,pb.min.z);
      if (oy2<ox2&&oy2<oz2) { if(en.mesh.position.y>collidables[p].position.y){en.mesh.position.y+=oy2;en.vel.y=0;} }
      else if (ox2<oz2) { en.vel.x *= -1; }
    }

<<<<<<< HEAD
    // COLISIONES ENEMIGOS
=======
    // ── ENEMY vs ENEMY collision (push apart, reverse direction) ──
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
    for (var j = 0; j < enemies.length; j++) {
      if (i === j) continue;
      var en2 = enemies[j];
      if (!en2.alive) continue;
      var dx = en.mesh.position.x - en2.mesh.position.x;
      var dz = en.mesh.position.z - en2.mesh.position.z;
      var dist = Math.sqrt(dx*dx + dz*dz);
<<<<<<< HEAD
      var minDist = 1.4;
      if (dist < minDist && dist > 0.01) {
=======
      var minDist = 1.1; // minimum separation distance
      if (dist < minDist && dist > 0.01) {
        // Push apart
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
        var push = (minDist - dist) / 2;
        en.mesh.position.x  += (dx/dist) * push;
        en.mesh.position.z  += (dz/dist) * push;
        en2.mesh.position.x -= (dx/dist) * push;
        en2.mesh.position.z -= (dz/dist) * push;
<<<<<<< HEAD
=======
        // Reverse X velocities on collision
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
        en.vel.x  *= -1;
        en2.vel.x *= -1;
      }
    }

<<<<<<< HEAD
    // COLISIONES JUGADOR
    _b2.setFromObject(en.mesh);
    if (_b1.intersectsBox(_b2)) {
      var enTop=_b2.max.y, plBot=_b1.min.y;
      if (mS.starMode > 0 && !mS.isDead) {
        // Star power: kill enemy on contact, no bounce needed
        en.alive=false; en.squashT=45;
        en.mesh.scale.set(1.2,0.22,1.2); en.mesh.position.y=0.2;
        addScore(200); showMsg('+200',600);
        spawnParticles(en.mesh.position,0x7a4400,6,false);
      } else if (plBot > enTop-0.28 && mS.vel.y <= 0 && !mS.isDead) {
=======
    // Player collision
    _b2.setFromObject(en.mesh);
    if (_b1.intersectsBox(_b2)) {
      var enTop=_b2.max.y, plBot=_b1.min.y;
      if (plBot > enTop-0.28 && mS.vel.y <= 0 && !mS.isDead) {
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
        en.alive=false; en.squashT=45;
        en.mesh.scale.set(1.2,0.22,1.2); en.mesh.position.y=0.2;
        mS.vel.y=0.3; addScore(200); showMsg('+200',600);
        spawnParticles(en.mesh.position,0x7a4400,6,false);
      } else if (mS.invincible<=0&&!mS.isDead) { hurtMario(); }
    }
  }
}
<<<<<<< HEAD
// DAÑO / MUERTE
=======
// ── HURT / DIE ────────────────────────────────────────────────────────
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
function hurtMario() {
  if (mS.big) { mS.big=false; mario.scale.set(1,1,1); mS.invincible=130; showMsg('TAKE CARE!'); }
  else dieMario();
}
function dieMario() {
  if (mS.isDead) return;
<<<<<<< HEAD
  mS.isDead=true; mS.starMode=0; mS.vel.set(0,0.42,0); mario.rotation.z=Math.PI;
  if(starTimerEl) starTimerEl.style.display='none';
=======
  mS.isDead=true; mS.vel.set(0,0.42,0); mario.rotation.z=Math.PI;
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  setLives(lives - 1); hudLives.textContent=lives;
  setGameActive(false); clearInterval(timerHandle);
  showBowser(lives <= 0, function() {
    if (lives <= 0) { document.getElementById('gameover').style.display='flex'; }
    else { resetMario(); setGameActive(true); startTimer(); }
  });
}

<<<<<<< HEAD
// MEJORAS
=======
// ── POWERUPS ──────────────────────────────────────────────────────────
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
function updatePowerups() {
  getMarioBox();
  for (var i = 0; i < activePwups.length; i++) {
    var pu = activePwups[i]; if (pu.collected) continue;

<<<<<<< HEAD
=======
    // ── EMERGE ────────────────────────────────────────────────────
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
    if (pu.mesh.userData.emerging) {
      pu.mesh.position.y += 0.025;
      if (pu.mesh.position.y >= pu.mesh.userData.emergeTarget) {
        pu.mesh.position.y = pu.mesh.userData.emergeTarget;
        pu.mesh.userData.emerging = false;
        pu.vel.set(0.04, 0, 0);
      }
      continue;
    }

<<<<<<< HEAD
    pu.vel.y -= 0.02;
    pu.mesh.position.addScaledVector(pu.vel, 1);

=======
    // ── EXACT SAME LOGIC AS ENEMIES ───────────────────────────────
    pu.vel.y -= 0.02;
    pu.mesh.position.addScaledVector(pu.vel, 1);

    // Ground snap
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
    if (pu.mesh.position.y < 0.22) {
      if (isOverGround(pu.mesh.position.x)) { pu.mesh.position.y = 0.22; pu.vel.y = 0; }
      if (pu.mesh.position.y < -6) { pu.collected = true; scene.remove(pu.mesh); continue; }
    }

<<<<<<< HEAD
    var nextX = pu.mesh.position.x + pu.vel.x * 8;
    if (!isOverGround(nextX)) { pu.vel.x *= -1; }

=======
    // Edge detection (no range limit unlike enemies)
    var nextX = pu.mesh.position.x + pu.vel.x * 8;
    if (!isOverGround(nextX)) { pu.vel.x *= -1; }

    // Platform collisions — fixed hitbox to avoid voxel AABB bounce
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
    var pmx = pu.mesh.position.x, pmy = pu.mesh.position.y, pmz = pu.mesh.position.z;
    _b2.min.set(pmx - 0.45, pmy + 0.0,  pmz - 0.45);
    _b2.max.set(pmx + 0.45, pmy + 0.95, pmz + 0.45);
    for (var p = 0; p < collidables.length; p++) {
      var pb = new THREE.Box3().setFromObject(collidables[p]);
      if (!_b2.intersectsBox(pb)) continue;
      var ox3 = Math.min(_b2.max.x,pb.max.x) - Math.max(_b2.min.x,pb.min.x);
      var oy3 = Math.min(_b2.max.y,pb.max.y) - Math.max(_b2.min.y,pb.min.y);
      var oz3 = Math.min(_b2.max.z,pb.max.z) - Math.max(_b2.min.z,pb.min.z);
      if (oy3 < ox3 && oy3 < oz3) {
        if (pu.mesh.position.y > collidables[p].position.y) {
          pu.mesh.position.y += oy3; pu.vel.y = 0;
          _b2.min.y += oy3; _b2.max.y += oy3;
        }
      } else if (ox3 < oz3) { pu.vel.x *= -1; }
    }

<<<<<<< HEAD
    if (pu.mesh.children[0]) pu.mesh.children[0].rotation.y += 0.05;

    // RECOGER
    if (_b1.intersectsBox(_b2)) {
      pu.collected = true; scene.remove(pu.mesh);
      if (pu.mesh.userData.type === 'star') {
        mS.starMode = 480;  // 8 seconds at 60fps
        // Store original colors before rainbow kicks in
        mario.traverse(function(c) {
          if (c.isMesh && c.material) {
            c.userData.origColor = c.material.color.getHex();
            c.userData.origEmissive = c.material.emissive ? c.material.emissive.getHex() : 0x000000;
          }
        });
        addScore(1000); showMsg('STAR GET!', 2000);
        spawnParticles(pu.mesh.position, 0xffeb3b, 16, true);
      } else {
        if (!mS.big) { mS.big = true; mS.growing = true; mS.growTimer = 0; }
        addScore(1000); showMsg('SUPER MARIO!', 2000);
        spawnParticles(pu.mesh.position, 0xe52521, 12, true);
      }
    }
  }
}
// MONEDAS
function updateCoins() {
  getMarioBox();
  var t = Date.now()*0.003;
  var mx = mario.position.x;
  for (var i = 0; i < coinMeshes.length; i++) {
    var c = coinMeshes[i]; if (c.userData.collected) continue;
    // Skip animation + collision for coins far from Mario (> 30 units)
    var dist = Math.abs(c.position.x - mx);
    if (dist > 30) { c.visible = false; continue; }
    c.visible = true;
=======
    // Rotate
    if (pu.mesh.children[0]) pu.mesh.children[0].rotation.y += 0.05;

    // ── COLLECT ───────────────────────────────────────────────────
    // reuse the fixed _b2 from platform check
    if (_b1.intersectsBox(_b2)) {
      pu.collected = true; scene.remove(pu.mesh);
      if (!mS.big) { mS.big = true; mS.growing = true; mS.growTimer = 0; }
      addScore(1000); showMsg('SUPER MARIO!', 2000);
      spawnParticles(pu.mesh.position, 0xe52521, 12, true);
    }
  }
}
// ── COINS ─────────────────────────────────────────────────────────────
function updateCoins() {
  getMarioBox();
  var t = Date.now()*0.003;
  for (var i = 0; i < coinMeshes.length; i++) {
    var c = coinMeshes[i]; if (c.userData.collected) continue;
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
    c.rotation.y += 0.06;
    c.position.y = c.userData.baseY + Math.sin(t+c.position.x*0.5)*0.1;
    _b2.setFromObject(c);
    if (_b1.intersectsBox(_b2)) {
      c.userData.collected=true; scene.remove(c);
      addCoin(); addScore(100); spawnParticles(c.position,0xffd700,5,false);
    }
  }
}

<<<<<<< HEAD
// ACTUALIZAR PARTICULAS
=======
// ── PARTICLES UPDATE ──────────────────────────────────────────────────
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
function updateParticles() {
  for (var i = particles.length-1; i >= 0; i--) {
    var p = particles[i];
    p.userData.pv.y -= 0.009;
    p.position.addScaledVector(p.userData.pv,1);
    if (p.userData.spin) {
      p.rotation.x += p.userData.spin.x;
      p.rotation.y += p.userData.spin.y;
      p.rotation.z += p.userData.spin.z;
    }
    p.userData.life -= 0.03;
    if (!p.material.transparent) { p.material=p.material.clone(); p.material.transparent=true; }
    p.material.opacity = p.userData.life;
    if (p.userData.life <= 0) { scene.remove(p); particles.splice(i,1); }
  }
}

<<<<<<< HEAD
// BANDERA
=======
// ── FLAG ──────────────────────────────────────────────────────────────
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
function checkFlag() {
  if (flagDone) return;
  if (Math.abs(mario.position.x-POLE_X) < 1.6 && mario.position.y < 12) {
    setFlagDone(true); setGameActive(false); clearInterval(timerHandle);
    var bonus=timeLeft*50; addScore(bonus);
    showMsg('SUCCESS!',4000);
    setTimeout(function() {
      document.getElementById('win-pts').textContent='SCORE: '+String(score).padStart(6,'0');
      document.getElementById('win').style.display='flex';
    },4000);
  }
}

<<<<<<< HEAD
// FISICAS MARIO
var GRAVITY=0.024, JUMP=0.44, SPEED=0.055, MAXFALL=-0.6;
var prevJump=false, animT=0;
var starTimerEl = null;
var fpsFrames=0, fpsLast=performance.now(), fpsCurrent=60;
var mode25D = false;
=======
// ── MARIO PHYSICS ─────────────────────────────────────────────────────
var GRAVITY=0.024, JUMP=0.44, SPEED=0.055, MAXFALL=-0.6;
var prevJump=false, animT=0;
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee

function updateMario() {
  var v = mS.vel;
  if (mS.isDead) { v.y-=GRAVITY*0.5; mario.position.add(v); return; }
<<<<<<< HEAD
  if (mS.starMode > 0) {
    mS.starMode--;
    // Rainbow color cycling
    var hue = (Date.now() * 0.005) % 1;
    mario.traverse(function(c) {
      if (c.isMesh && c.material) {
        var col = new THREE.Color().setHSL(hue, 1.0, 0.55);
        c.material = c.material.clone();
        c.material.color.set(col);
        c.material.emissive.set(col).multiplyScalar(0.3);
        hue = (hue + 0.07) % 1;
      }
    });
    mario.visible = true;
    // Update star timer display above Mario
    if (starTimerEl) {
      var secsLeft = Math.ceil(mS.starMode / 60);
      starTimerEl.textContent = '★ ' + secsLeft;
      // Project Mario's head position to screen
      var headWorld = new THREE.Vector3(mario.position.x, mario.position.y + 2.8, mario.position.z);
      headWorld.project(camera);
      var sx = ( headWorld.x * 0.5 + 0.5) * window.innerWidth;
      var sy = (-headWorld.y * 0.5 + 0.5) * window.innerHeight;
      starTimerEl.style.display = 'block';
      starTimerEl.style.left = (sx - starTimerEl.offsetWidth / 2) + 'px';
      starTimerEl.style.top  = (sy - 40) + 'px';
      // Flash when < 3 seconds left
      starTimerEl.style.opacity = (mS.starMode < 180 && Math.floor(mS.starMode/10)%2===0) ? '0.4' : '1';
    }
    if (mS.starMode === 0) {
      // Restore original colors
      mario.traverse(function(c) {
        if (c.isMesh && c.userData.origColor !== undefined) {
          c.material = c.material.clone();
          c.material.color.setHex(c.userData.origColor);
          c.material.emissive.setHex(c.userData.origEmissive || 0x000000);
        }
      });
      if (starTimerEl) starTimerEl.style.display = 'none';
    }
  } else if (mS.invincible>0) { mS.invincible--; mario.visible=Math.floor(mS.invincible/5)%2===0; }
  else mario.visible=true;

  if (mS.growing) {
    mS.growTimer += 1;
    var t = Math.min(mS.growTimer / 35, 1.0);
    var scY = 1.0 + t * 0.38;
=======
  if (mS.invincible>0) { mS.invincible--; mario.visible=Math.floor(mS.invincible/5)%2===0; }
  else mario.visible=true;

  // Smooth grow animation when collecting mushroom
  if (mS.growing) {
    mS.growTimer += 1;
    var t = Math.min(mS.growTimer / 35, 1.0); // 35 frames to full size
    var scY = 1.0 + t * 0.38; // 1.0 → 1.38
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
    mario.scale.set(1, scY, 1);
    if (t >= 1.0) { mario.scale.set(1, 1.38, 1); mS.growing = false; }
  }

<<<<<<< HEAD
  var fwd, right;
  if (mode25D) {
    fwd   = new THREE.Vector3(0, 0, 0);   
    right = new THREE.Vector3(1, 0, 0);   
  } else {
    fwd   = new THREE.Vector3(-Math.sin(camTheta),0,-Math.cos(camTheta));
    right = new THREE.Vector3( Math.cos(camTheta),0,-Math.sin(camTheta));
  }
=======
  var fwd   = new THREE.Vector3(-Math.sin(camTheta),0,-Math.cos(camTheta));
  var right = new THREE.Vector3( Math.cos(camTheta),0,-Math.sin(camTheta));
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var dir   = new THREE.Vector3(); var moving=false;

  if (keys['a']||keys['arrowleft'])  { dir.addScaledVector(right,-1); moving=true; }
  if (keys['d']||keys['arrowright']) { dir.addScaledVector(right, 1); moving=true; }
<<<<<<< HEAD
  if (!mode25D) {
    if (keys['w']||keys['arrowup'])    { dir.addScaledVector(fwd,   1); moving=true; }
    if (keys['s']||keys['arrowdown'])  { dir.addScaledVector(fwd,  -1); moving=true; }
  }
=======
  if (keys['w']||keys['arrowup'])    { dir.addScaledVector(fwd,   1); moving=true; }
  if (keys['s']||keys['arrowdown'])  { dir.addScaledVector(fwd,  -1); moving=true; }
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  if (dir.length()>0) dir.normalize();

  v.x = v.x*0.75 + dir.x*SPEED;
  v.z = v.z*0.75 + dir.z*SPEED;

  if (moving && dir.length()>0.01) {
    var ta=Math.atan2(dir.x,dir.z); var da=ta-mario.rotation.y;
    while(da> Math.PI) da-=Math.PI*2;
    while(da<-Math.PI) da+=Math.PI*2;
    mario.rotation.y += da*0.2;
  }

  var ud = mario.userData;
  var inAir = !mS.canJump;

  if (inAir) {
<<<<<<< HEAD
    // pOSE SALTO
    var riseT = Math.max(0, Math.min(1, mS.vel.y / JUMP));
=======
    // ── JUMP POSE (only active when off ground) ──────────────────────
    var riseT = Math.max(0, Math.min(1, mS.vel.y / JUMP));
    // Right arm up, left arm back
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
    ud.aR.rotation.x = -1.3 + riseT * 0.3;
    ud.aR.rotation.z =  0.12;
    ud.aL.rotation.x =  0.85 - riseT * 0.25;
    ud.aL.rotation.z = -0.12;
<<<<<<< HEAD
    ud.lgL.rotation.x = -0.85 + riseT * 0.25;
    ud.lgR.rotation.x =  0.42 - riseT * 0.18;
  } else if (moving) {
    animT += 0.18;
    var sw = Math.sin(animT) * 0.32;
    ud.lgL.rotation.x =  sw;
    ud.lgR.rotation.x = -sw;
    ud.aL.rotation.x  = -sw * 0.4;
    ud.aR.rotation.x  =  sw * 0.4;
=======
    // Left knee up, right leg down
    ud.lgL.rotation.x = -0.85 + riseT * 0.25;
    ud.lgR.rotation.x =  0.42 - riseT * 0.18;
  } else if (moving) {
    // ── WALK CYCLE (only legs + arms swing forward/back, NO z opening) ─
    animT += 0.18;
    var sw = Math.sin(animT) * 0.32; // reduced swing amplitude
    ud.lgL.rotation.x =  sw;
    ud.lgR.rotation.x = -sw;
    ud.aL.rotation.x  = -sw * 0.4;  // arms swing opposite to legs
    ud.aR.rotation.x  =  sw * 0.4;
    // CRITICAL: always zero z-rotation during walk (no arm spreading)
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
    ud.aL.rotation.z  = 0;
    ud.aR.rotation.z  = 0;
    ud.lgL.rotation.z = 0;
    ud.lgR.rotation.z = 0;
  } else {
<<<<<<< HEAD
=======
    // ── IDLE: smooth lerp back to neutral ────────────────────────────
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
    ud.lgL.rotation.x *= 0.75;
    ud.lgR.rotation.x *= 0.75;
    ud.aL.rotation.x  *= 0.75;
    ud.aR.rotation.x  *= 0.75;
    ud.aL.rotation.z  *= 0.75;
    ud.aR.rotation.z  *= 0.75;
    ud.lgL.rotation.z *= 0.75;
    ud.lgR.rotation.z *= 0.75;
  }

<<<<<<< HEAD
  setPrevVelY(v.y);
=======
  setPrevVelY(v.y); // store BEFORE gravity so we know if Mario was moving upward
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  v.y-=GRAVITY; if(v.y<MAXFALL) v.y=MAXFALL;
  mario.position.add(v);
  mS.canJump=false;

<<<<<<< HEAD
=======
  // Check block hits BEFORE resolvePlayer so vel.y is still positive when Mario hits block from below
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  checkBlockHits();

  for (var i=0; i<collidables.length; i++) {
    var res=resolvePlayer(collidables[i]);
    if (res==='top') mS.canJump=true;
  }

<<<<<<< HEAD
  if (mode25D) {
    mario.position.z = 0; v.z = 0;
  } else {
    if (mario.position.z > 4)  { mario.position.z= 4; v.z=0; }
    if (mario.position.z < -4) { mario.position.z=-4; v.z=0; }
  }
=======
  if (mario.position.z > 4)  { mario.position.z= 4; v.z=0; }
  if (mario.position.z < -4) { mario.position.z=-4; v.z=0; }
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee

  var jumpNow=keys[' '];
  if (jumpNow && !prevJump && mS.canJump) { v.y=JUMP*(mS.big?1.06:1.0); mS.canJump=false; }
  prevJump=jumpNow;

  if (mario.position.y < -6) dieMario();
}

<<<<<<< HEAD
// CAMARA
function updateCamera() {
  var p=mario.position;
  sun.position.set(p.x + 40, 80, 20);
=======
// ── CAMERA ────────────────────────────────────────────────────────────
function updateCamera() {
  var p=mario.position;
  // Move shadow light with Mario so shadows work across the entire level
  sun.position.set(p.x + 40, 80, 20);
  // Fill light follows camera so Mario is always front-lit regardless of camera angle
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  fillLight.position.set(
    camera.position.x,
    camera.position.y + 5,
    camera.position.z
  );
  sun.target.position.set(p.x, 0, 0);
  sun.target.updateMatrixWorld();
<<<<<<< HEAD
  if (fpsFrames % 3 === 0) sun.shadow.camera.updateProjectionMatrix();
  if (mode25D) {
    camera.position.set(p.x, p.y + 4, 15);
    camera.lookAt(p.x, p.y + 1, 0);
  } else {
    camera.position.set(
      p.x+camRadius*Math.sin(camTheta)*Math.cos(camPhi),
      p.y+camRadius*Math.sin(camPhi),
      p.z+camRadius*Math.cos(camTheta)*Math.cos(camPhi)
    );
    camera.lookAt(p.x, p.y+0.9, p.z);
  }
}

// TIEMPO
=======
  sun.shadow.camera.updateProjectionMatrix();
  camera.position.set(
    p.x+camRadius*Math.sin(camTheta)*Math.cos(camPhi),
    p.y+camRadius*Math.sin(camPhi),
    p.z+camRadius*Math.cos(camTheta)*Math.cos(camPhi)
  );
  camera.lookAt(p.x, p.y+0.9, p.z);
}

// ── TIMER ─────────────────────────────────────────────────────────────
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
function startTimer() {
  setTimerHandle(setInterval(function() {
    if (!gameActive) return;
    setTimeLeft(timeLeft - 1); hudTime.textContent=timeLeft;
    if (timeLeft<=100) hudTime.style.color='#f55';
    if (timeLeft<=0) dieMario();
  },1000));
}

<<<<<<< HEAD
// BUCLE MAIN
function loop() {
  requestAnimationFrame(loop);

  // CONTADOR FPS
  fpsFrames++;
  var now = performance.now();
  if (now - fpsLast >= 500) {
    fpsCurrent = Math.round(fpsFrames * 1000 / (now - fpsLast));
    if (fpsEl) fpsEl.textContent = fpsCurrent + ' FPS';
    fpsFrames = 0; fpsLast = now;
  }

=======
// ── MAIN LOOP ─────────────────────────────────────────────────────────
function loop() {
  requestAnimationFrame(loop);
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  if (gameActive) {
    updateMario(); updateEnemies(); updateCoins();
    updatePowerups(); checkFlag(); updateParticles();
  }
  updateCamera();
  renderer.render(scene,camera);
}

<<<<<<< HEAD
starTimerEl = document.getElementById('star-timer');

=======
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
document.getElementById('startBtn').addEventListener('click',function() {
  document.getElementById('overlay').style.display='none';
  setGameActive(true); startTimer();
});

<<<<<<< HEAD
document.getElementById('mode-btn').addEventListener('click', function() {
  mode25D = !mode25D;
  this.textContent = mode25D ? '3D' : '2.5D';
  this.classList.toggle('active', mode25D);
});

=======
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
loop();
