// controles.js
export var keys = {};
export var camTheta = 0, camPhi = 0.38, camRadius = 15;

// CONTROLES
var mouseDown = false;

window.addEventListener('keydown', function(e) {
  keys[e.key.toLowerCase()] = true;
  if (e.key === ' ' || e.key.startsWith('Arrow')) e.preventDefault();
});
window.addEventListener('keyup', function(e) { keys[e.key.toLowerCase()] = false; });

window.addEventListener('mousedown', function(e) { if (e.button === 0) mouseDown = true; });
window.addEventListener('mouseup',   function()  { mouseDown = false; });
window.addEventListener('mousemove', function(e) {
  if (!mouseDown) return;
  camTheta -= e.movementX * 0.006;
  camPhi   += e.movementY * 0.006;
  camPhi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, camPhi));
});
window.addEventListener('wheel', function(e) {
  camRadius += e.deltaY * 0.015;
  camRadius = Math.max(5, Math.min(28, camRadius));
});
