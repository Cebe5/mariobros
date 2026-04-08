// hud.js
import { scene } from './escena.js';

export var score = 0, coinCount = 0, lives = 3, timeLeft = 400;
export var gameActive = false, timerHandle = null, flagDone = false;

export var hudScore  = null;
export var hudCoins  = null;
export var hudTime   = null;
export var hudLives  = null;
export var msgEl     = null;
export var bowserEl  = null;
export var bowserTxt = null;
export var fpsEl     = null;


export function setLives(v) { lives = v; }
export function setGameActive(v) { gameActive = v; }
export function setTimerHandle(v) { timerHandle = v; }
export function setTimeLeft(v) { timeLeft = v; }
export function setFlagDone(v) { flagDone = v; }
export function setScore(v) { score = v; }

// HUD
hudCoins  = document.getElementById('coin-val');
fpsEl     = document.getElementById('fps-counter');
hudTime   = document.getElementById('clock-time-val');
hudLives  = document.getElementById('lives-val');
msgEl     = document.getElementById('msg');
bowserEl  = document.getElementById('bowser-screen');
bowserTxt = document.getElementById('bowser-txt');


export function addScore(n) { score += n; if (hudScore) hudScore.textContent = String(score).padStart(6,'0'); }
export function addCoin() {
  coinCount++; hudCoins.textContent = 'x' + String(coinCount).padStart(2,'0');
  if (coinCount >= 100) { coinCount = 0; lives++; hudLives.textContent = lives; showMsg('1UP!'); }
}
var msgTimer;
export function showMsg(t, dur) {
  if (!dur) dur = 1300;
  msgEl.textContent = t; msgEl.style.opacity = '1';
  clearTimeout(msgTimer);
  msgTimer = setTimeout(function() { msgEl.style.opacity = '0'; }, dur);
}

export function showBowser(isGameOver, cb) {
  bowserTxt.textContent = isGameOver ? 'GAME OVER' : 'YOU LOST A LIFE!';
  var img = document.getElementById('bowser-img');
  img.style.animation = 'none'; img.offsetHeight; img.style.animation = '';
  bowserEl.style.display = 'flex';
  setTimeout(function() { bowserEl.style.display = 'none'; if (cb) cb(); },
    isGameOver ? 3000 : 2200);
}

