<<<<<<< HEAD
// hud_canvas.js
// RELOJ HUD
=======
// hud_canvas.js — pixel art HUD icons (clock, cap, coin)
// ── PIXEL CLOCK IN HUD ────────────────────────────────────────────────
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
(function() {
  var canvas = document.getElementById('clock-canvas');
  if (!canvas) return;
  var dpr   = window.devicePixelRatio || 1;
    var ctx   = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
<<<<<<< HEAD
  var SZ = 2.4;
=======
  var SZ = 2.4; // pixel size
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee

  var M = [
    [0,0,0,0,2,2,2,2,2,0,0,0,0],
    [0,0,2,2,1,1,1,1,1,2,2,0,0],
    [0,2,1,1,1,1,1,1,1,1,1,2,0],
    [0,2,1,1,1,1,2,1,1,1,1,2,0],
    [2,1,1,1,1,1,2,1,1,1,1,1,2],
    [2,1,1,1,1,1,2,1,1,1,1,1,2],
    [2,1,1,1,1,1,2,2,2,2,1,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,2],
    [0,2,1,1,1,1,1,1,1,1,1,2,0],
    [0,2,1,1,1,1,1,1,1,1,1,2,0],
    [0,0,2,2,1,1,1,1,1,2,2,0,0],
    [0,0,0,0,2,2,2,2,2,0,0,0,0]
  ];

  var colors = {
    1: '#ffffff',
    2: '#000000'
  };

<<<<<<< HEAD
=======
  // Resize canvas to fit grid
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var _szr = SZ * dpr;
  canvas.width  = M[0].length * _szr;
  canvas.height = M.length    * _szr;
  canvas.style.width  = (M[0].length * SZ) + "px";
  canvas.style.height = (M.length    * SZ) + "px";
  function drawClock() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
<<<<<<< HEAD
=======
    // Transparent background — pixels 0 are clear
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
    for (var row = 0; row < M.length; row++) {
      for (var col = 0; col < M[row].length; col++) {
        var v = M[row][col];
        if (v === 0) continue;
        ctx.fillStyle = colors[v];
        ctx.fillRect(col * _szr, row * _szr, _szr, _szr);
      }
    }
  }

  drawClock();

<<<<<<< HEAD
  // GORRA HUD
=======
  // ── CAP CANVAS ─────────────────────────────────────────────────────
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var capCanvas = document.getElementById('cap-canvas');
  if (capCanvas) {
    var ctxC = capCanvas.getContext('2d');
    ctxC.imageSmoothingEnabled = false;
    var SZC = 1.8;
    var dprC = window.devicePixelRatio || 1;
    var SZCr = SZC * dprC;

    var MC2 = [
      [0,0,0,0,3,3,3,3,3,3,3,3,3,0,0,0,0],
      [0,0,0,3,2,2,2,2,2,2,2,2,2,3,0,0,0],
      [0,0,3,2,2,2,2,2,2,2,2,2,2,2,3,0,0],
      [0,3,2,2,2,2,1,1,1,1,1,2,2,2,2,3,0],
      [3,2,2,2,2,1,1,2,1,2,1,1,2,2,2,2,3],
      [3,2,2,2,2,1,2,1,2,1,2,1,2,2,2,2,3],
      [3,2,2,2,2,1,2,1,1,1,2,1,2,2,2,2,3],
      [3,2,2,2,3,3,3,3,3,3,3,3,3,2,2,2,3],
      [0,3,3,3,2,2,2,2,2,2,2,2,2,3,3,3,0],
      [0,3,2,2,2,2,2,2,2,2,2,2,2,2,2,3,0],
      [0,3,2,2,2,3,3,3,3,3,3,3,2,2,2,3,0],
      [0,3,3,3,0,0,0,0,0,0,0,0,0,3,3,3,0]
    ];

    var capColors = { 1: '#ffffff', 2: '#e52521', 3: '#000000', 4: '#b71c1c' };

    capCanvas.width  = MC2[0].length * SZCr;
    capCanvas.height = MC2.length    * SZCr;
    capCanvas.style.width  = (MC2[0].length * SZC) + 'px';
    capCanvas.style.height = (MC2.length    * SZC) + 'px';

    for (var cr2 = 0; cr2 < MC2.length; cr2++) {
      for (var cc2 = 0; cc2 < MC2[cr2].length; cc2++) {
        var cv2 = MC2[cr2][cc2];
        if (cv2 === 0) continue;
        ctxC.fillStyle = capColors[cv2];
        ctxC.fillRect(cc2 * SZCr, cr2 * SZCr, SZCr, SZCr);
      }
    }
  }

<<<<<<< HEAD
  // MONEDA HUD
=======
  // ── COIN CANVAS ────────────────────────────────────────────────────
>>>>>>> 3983404a5c57a83b4495cd90c60dfb77815a7eee
  var coinCanvas = document.getElementById('coin-canvas');
  if (coinCanvas) {
    var dpr2  = window.devicePixelRatio || 1;
    var ctx2  = coinCanvas.getContext('2d');
    ctx2.imageSmoothingEnabled = false;
    var SZ2 = 2.6 * dpr2;

    var MC = [
      [0,0,0,0,3,3,3,3,3,3,0,0,0,0],
      [0,0,3,3,3,1,1,1,3,3,3,3,0,0],
      [0,3,3,1,1,2,2,2,2,2,3,3,0,0],
      [0,3,1,2,2,1,1,1,3,2,2,3,3,0],
      [3,3,1,2,2,1,2,2,3,2,2,3,3,0],
      [3,1,2,2,2,1,2,2,3,2,2,2,3,3],
      [3,1,2,2,2,1,2,2,3,2,2,2,3,3],
      [3,1,2,2,2,1,2,2,3,2,2,2,3,3],
      [3,1,2,2,2,1,2,2,3,2,2,2,3,3],
      [3,1,2,2,2,1,2,2,3,2,2,2,3,3],
      [3,1,2,2,2,1,2,2,3,2,2,2,3,3],
      [3,3,1,2,2,1,2,2,3,2,2,3,3,0],
      [0,3,1,2,2,3,3,3,3,2,2,3,3,0],
      [0,3,3,1,2,2,2,2,2,2,3,3,0,0],
      [0,0,3,3,3,2,2,2,3,3,3,3,0,0],
      [0,0,0,0,3,3,3,3,3,3,0,0,0,0]
    ];

    var coinColors = { 1: '#ffffff', 2: '#ffeb3b', 3: '#000000', 4: '#d4af37' };

    coinCanvas.width  = MC[0].length * SZ2;
    coinCanvas.height = MC.length    * SZ2;
    coinCanvas.style.width  = (MC[0].length * 1.3) + 'px';
    coinCanvas.style.height = (MC.length    * 1.3) + 'px';

    for (var cr = 0; cr < MC.length; cr++) {
      for (var cc = 0; cc < MC[cr].length; cc++) {
        var cv = MC[cr][cc];
        if (cv === 0) continue;
        ctx2.fillStyle = coinColors[cv];
        ctx2.fillRect(cc * SZ2, cr * SZ2, SZ2, SZ2);
      }
    }
  }
})();