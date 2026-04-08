// colisiones.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.149/build/three.module.js';
import { box, brickTex, qblockTex, hitBlockTex } from './utils.js';
import { scene } from './escena.js';
import { mario, mS } from './jugador.js';
import { collidables } from './nivel.js';
import { addCoin, addScore, showMsg } from './hud.js';
import { spawnMushroom, spawnStar } from './enemigos.js';

export var particles = [];
export var _b1 = new THREE.Box3(), _b2 = new THREE.Box3();
export var prevVelY = 0;
export function setPrevVelY(v) { prevVelY = v; }

// PARTICULAS
export function spawnParticles(pos, color, n, big) {
  if (!n) n = 8;
  for (var i = 0; i < n; i++) {
    var sz = big ? (0.22+Math.random()*0.18) : 0.14;
    var m = box(sz,sz,sz,color);
    m.position.copy(pos);
    var a = (i/n)*Math.PI*2;
    var spd = big ? (0.1+Math.random()*0.12) : (0.06+Math.random()*0.08);
    var up  = big ? (0.15+Math.random()*0.15) : (0.08+Math.random()*0.1);
    m.userData.pv = new THREE.Vector3(Math.cos(a)*spd, up, Math.sin(a)*spd*0.35);
    m.userData.spin = new THREE.Vector3(
      (Math.random()-0.5)*0.22, (Math.random()-0.5)*0.22, (Math.random()-0.5)*0.22
    );
    m.userData.life = 1.0;
    scene.add(m); particles.push(m);
  }
}

// COLISION
var _b1 = new THREE.Box3(), _b2 = new THREE.Box3();

export function getMarioBox() {
  var sy   = mario.scale.y;
  var hw   = 0.36;
  var hd   = 0.22;
  var yBot = -0.62 * sy;   // feet bottom
  var yTop =  2.23 * sy;   // hat top (was wrong at 1.58)
  var p    = mario.position;
  _b1.min.set(p.x - hw, p.y + yBot, p.z - hd);
  _b1.max.set(p.x + hw, p.y + yTop, p.z + hd);
  return _b1;
}

export function resolvePlayer(plat) {
  getMarioBox(); _b2.setFromObject(plat);
  if (!_b1.intersectsBox(_b2)) return null;
  var ox = Math.min(_b1.max.x,_b2.max.x) - Math.max(_b1.min.x,_b2.min.x);
  var oy = Math.min(_b1.max.y,_b2.max.y) - Math.max(_b1.min.y,_b2.min.y);
  var oz = Math.min(_b1.max.z,_b2.max.z) - Math.max(_b1.min.z,_b2.min.z);
  if (oy < ox && oy < oz) {
    if (mario.position.y > plat.position.y) {
      mario.position.y += oy; mS.vel.y = Math.max(0,mS.vel.y); return 'top';
    } else {
      mario.position.y -= oy; mS.vel.y = Math.min(0,mS.vel.y); return 'bottom';
    }
  } else if (ox < oz) {
    mario.position.x += mario.position.x > plat.position.x ? ox : -ox; return 'sideX';
  } else {
    mario.position.z += mario.position.z > plat.position.z ? oz : -oz; return 'sideZ';
  }
}

// GOLPEO DE BLOQUES
export function checkBlockHits() {
  getMarioBox();
  var marioTop = _b1.max.y;
  var marioCX  = ((_b1.min.x + _b1.max.x) / 2);
  var marioCZ  = ((_b1.min.z + _b1.max.z) / 2);
  var marioHalfW = (_b1.max.x - _b1.min.x) / 2 * 0.85; // slight shrink for forgiveness
  var marioHalfD = (_b1.max.z - _b1.min.z) / 2 * 0.85;

  for (var i = 0; i < collidables.length; i++) {
    var blk = collidables[i];
    var t = blk.userData.type;
    if (t !== 'qblock' && t !== 'brick') continue;
    if (t === 'qblock' && blk.userData.hit) continue;

    _b2.setFromObject(blk);
    var blkBot = _b2.min.y;
    var blkTop = _b2.max.y;
    var blkCX  = ((_b2.min.x + _b2.max.x) / 2);
    var blkCZ  = ((_b2.min.z + _b2.max.z) / 2);

    var overlapX = Math.abs(marioCX - blkCX) < (marioHalfW + (_b2.max.x - _b2.min.x) / 2 * 0.9);
    var overlapZ = Math.abs(marioCZ - blkCZ) < (marioHalfD + (_b2.max.z - _b2.min.z) / 2 * 0.9);

    if (!overlapX || !overlapZ) continue;
    var headNearBottom = marioTop > blkBot - 0.05 && marioTop < blkBot + 0.5;

    if (prevVelY > 0 && headNearBottom) {
      mario.position.y = blkBot - (2.23 * mario.scale.y) - 0.01;
      mS.vel.y = -0.05;

      if (t === 'qblock' && !blk.userData.hit) {
        blk.userData.hit = true;
        blk.material = new THREE.MeshStandardMaterial({ map: hitBlockTex, roughness: 0.85, metalness: 0 });
        if (blk.userData.content === 'coin') {
          addCoin(); addScore(200);
          spawnParticles(blk.position, 0xffd700, 8, false);
        } else if (blk.userData.content === 'mushroom') {
          (function(){
            var msh = spawnMushroom(blk.position.x, blk.position.y + 0.5);
            msh.userData.emerging = true;
            msh.userData.emergeTarget = blk.position.y + 1.5;
            msh.userData.baseY = blk.position.y + 1.5;
          })();
          showMsg('MUSHROOM!');
        } else if (blk.userData.content === 'star') {
          (function(){
            var str = spawnStar(blk.position.x, blk.position.y + 0.5);
            str.userData.emerging = true;
            str.userData.emergeTarget = blk.position.y + 1.5;
            str.userData.baseY = blk.position.y + 1.5;
          })();
          showMsg('STAR!');
        }
      } else if (t === 'brick') {
        spawnParticles(blk.position, 0xc8622a, 14, true);
        spawnParticles(blk.position, 0x997755,  5, false);
        scene.remove(blk);
        collidables.splice(i, 1);
        i--;
        addScore(50);
      }
    }


  }
}

