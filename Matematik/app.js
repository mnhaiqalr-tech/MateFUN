/* ══════════════════════════════════════════════
   MatikFun! — app.js
   Matematik Tahun 5 KSSR Semakan
   Wang & Masa Interaktif
   ══════════════════════════════════════════════ */

'use strict';

// ────────────────────────────────────────────
// NAVIGATION
// ────────────────────────────────────────────
function showSection(id) {
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector(`[data-section="${id}"]`).classList.add('active');
  // Stop games when navigating away
  if (id !== 'permainan') {
    stopAllGames();
  }
}

function showTopic(topic) {
  document.querySelectorAll('.topic-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.topic-tab').forEach(b => b.classList.remove('active'));
  document.getElementById('topic-' + topic).classList.add('active');
  event.target.classList.add('active');
}

// ────────────────────────────────────────────
// FLASHCARD DATA
// ────────────────────────────────────────────
const FLASH_DECKS = {
  wang: [
    { q: 'Berapakah 1 Ringgit dalam sen?', a: '1 Ringgit Malaysia (RM) = 100 Sen' },
    { q: 'RM 345.50 + RM 214.75 = ?', a: 'RM 560.25' },
    { q: 'RM 1 000.00 – RM 487.60 = ?', a: 'RM 512.40' },
    { q: 'RM 35.00 × 8 = ?', a: 'RM 280.00' },
    { q: 'RM 480.00 ÷ 12 = ?', a: 'RM 40.00' },
    { q: 'RM 25 × 100 = ?', a: 'RM 2 500.00\n(alih titik perpuluhan 2 ke kanan)' },
    { q: 'RM 3 000 ÷ 1 000 = ?', a: 'RM 3.00\n(alih titik perpuluhan 3 ke kiri)' },
    { q: 'Apakah maksud simpanan?', a: 'Wang yang disimpan untuk kegunaan masa depan. Contoh: Akaun bank, tabung.' },
    { q: 'Apakah beza faedah mudah dan faedah kompaun?', a: 'Faedah Mudah: dikira dari jumlah asal sahaja.\nFaedah Kompaun: dikira dari jumlah asal + faedah terkumpul.' },
    { q: 'Mengapa harga kredit lebih mahal daripada tunai?', a: 'Kerana pembelian kredit dikenakan faedah (bunga) ke atas pinjaman.' },
    { q: 'RM 50 + (RM 20 × 3) = ?', a: 'RM 50 + RM 60 = RM 110\n(darab dahulu, baru tambah!)' },
    { q: 'Apakah langkah 1 Model Polya?', a: 'Faham masalah: Baca soalan, kenal pasti maklumat yang diberi dan yang ditanya.' },
  ],
  masa: [
    { q: 'Berapa minit dalam 1 jam?', a: '1 jam = 60 minit' },
    { q: 'Berapa jam dalam 1 hari?', a: '1 hari = 24 jam' },
    { q: 'Berapa tahun dalam 1 dekad?', a: '1 Dekad = 10 Tahun' },
    { q: 'Berapa tahun dalam 1 abad?', a: '1 Abad = 100 Tahun' },
    { q: 'Apakah tahun lompat?', a: 'Tahun dengan 366 hari. Berlaku setiap 4 tahun. Februari ada 29 hari. Contoh: 2024, 2028.' },
    { q: '½ jam = ? minit', a: '½ × 60 = 30 minit' },
    { q: '¾ hari = ? jam', a: '¾ × 24 = 18 jam' },
    { q: '0.5 tahun = ? bulan', a: '0.5 × 12 = 6 bulan' },
    { q: '2 dekad = ? tahun', a: '2 × 10 = 20 tahun' },
    { q: '3 jam 45 min + 1 jam 30 min = ?', a: '5 jam 15 min\n(45+30=75 min → 1j 15min, tambah 1j)' },
    { q: '4 hari 5 jam – 1 hari 9 jam = ?', a: '2 hari 20 jam\n(pinjam 1 hari = 24j, 5+24-9=20j, 4-1-1=2h)' },
    { q: '1 abad = ? dekad', a: '1 Abad = 10 Dekad' },
  ]
};

let currentDeck = 'wang';
let fcIndex = 0;

function setFlashDeck(deck) {
  currentDeck = deck;
  fcIndex = 0;
  document.querySelectorAll('.flashcard-controls .topic-tab').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('fc-topic-badge').textContent = deck === 'wang' ? '💰 Wang' : '⏰ Masa';
  renderFlashcard();
}

function renderFlashcard() {
  const deck = FLASH_DECKS[currentDeck];
  const card = deck[fcIndex];
  const fc = document.getElementById('flashcard-el');
  fc.classList.remove('flipped');
  document.getElementById('fc-question').textContent = card.q;
  document.getElementById('fc-answer').textContent = card.a;
  document.getElementById('fc-current').textContent = fcIndex + 1;
  document.getElementById('fc-total').textContent = deck.length;
}

function flipCard() {
  document.getElementById('flashcard-el').classList.toggle('flipped');
}

function nextCard() {
  const deck = FLASH_DECKS[currentDeck];
  fcIndex = (fcIndex + 1) % deck.length;
  renderFlashcard();
}

function prevCard() {
  const deck = FLASH_DECKS[currentDeck];
  fcIndex = (fcIndex - 1 + deck.length) % deck.length;
  renderFlashcard();
}

// init flashcard
document.addEventListener('DOMContentLoaded', () => { renderFlashcard(); initSusun(); });

// ────────────────────────────────────────────
// GAME NAVIGATION
// ────────────────────────────────────────────
function backToMenu() {
  stopAllGames();
  document.getElementById('game-menu').classList.remove('hidden');
  ['game-masalah','game-bom','game-tangkap','game-susun'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
}

function launchGame(name) {
  document.getElementById('game-menu').classList.add('hidden');
  document.getElementById('game-' + name).classList.remove('hidden');
  if (name === 'masalah') initPM();
  if (name === 'bom')     initBom();
  if (name === 'tangkap') initTangkap();
  if (name === 'susun')   initSusun();
}

function stopAllGames() {
  stopBom();
  stopTangkap();
}

// ────────────────────────────────────────────
// GAME 1: PENYELESAIAN MASALAH
// ────────────────────────────────────────────
const PM_QUESTIONS = [
  {
    level: 'Tahap 1 – Mudah',
    q: 'Amirah membeli sebuah buku seharga RM 12.50 dan sebatang pen seharga RM 3.25. Berapa jumlah harga yang perlu dibayar oleh Amirah?',
    answer: 'RM 15.75',
    hint: 'Tambah kedua-dua harga.',
    explanation: 'RM 12.50 + RM 3.25 = RM 15.75'
  },
  {
    level: 'Tahap 2 – Mudah',
    q: 'Daniel mempunyai RM 100. Dia membelanjakan RM 67.80 untuk membeli baju. Berapa baki wang Daniel?',
    answer: 'RM 32.20',
    hint: 'Tolak harga baju dari wang asal.',
    explanation: 'RM 100.00 – RM 67.80 = RM 32.20'
  },
  {
    level: 'Tahap 3 – Sederhana',
    q: 'Sebuah restoran menjual 15 hidangan nasi lemak pada harga RM 5.50 setiap satu. Berapa jumlah hasil jualan?',
    answer: 'RM 82.50',
    hint: 'Darab bilangan hidangan dengan harga.',
    explanation: 'RM 5.50 × 15 = RM 82.50'
  },
  {
    level: 'Tahap 4 – Sederhana',
    q: 'Ali menyimpan RM 2 400 untuk dibahagikan sama rata kepada 8 orang anak. Berapa wang yang diterima setiap anak?',
    answer: 'RM 300',
    hint: 'Bahagi jumlah wang dengan bilangan anak.',
    explanation: 'RM 2 400 ÷ 8 = RM 300'
  },
  {
    level: 'Tahap 5 – Susah',
    q: 'Harga sebuah basikal ialah RM 450. Razif membeli basikal tersebut secara kredit dengan membayar RM 50 pendahuluan dan RM 40 sebulan selama 12 bulan. Berapa lebihan yang Razif bayar berbanding harga tunai?',
    answer: 'RM 80',
    hint: 'Kira jumlah kredit: RM50 + (RM40×12). Tolak dari RM 450.',
    explanation: 'Bayaran kredit: RM 50 + (RM 40 × 12) = RM 50 + RM 480 = RM 530\nLebihan: RM 530 – RM 450 = RM 80'
  },
  {
    level: 'Tahap 6 – Susah',
    q: 'Ibu membeli 3 beg tangan pada harga RM 125.50 setiap satu dan 2 pasang kasut pada harga RM 89.90 sepasang. Berapa jumlah belanja ibu?',
    answer: 'RM 556.30',
    hint: 'Kira harga beg dan kasut berasingan, kemudian tambah.',
    explanation: '3 × RM 125.50 = RM 376.50\n2 × RM 89.90 = RM 179.80\nJumlah: RM 376.50 + RM 179.80 = RM 556.30'
  }
];

let pmIndex = 0;
let pmScore = 0;

function initPM() {
  pmIndex = 0;
  pmScore = 0;
  document.getElementById('pm-score').textContent = 0;
  loadPM();
}

function loadPM() {
  if (pmIndex >= PM_QUESTIONS.length) {
    document.getElementById('pm-question').textContent = '🎉 Tahniah! Kamu telah menjawab semua soalan!';
    document.getElementById('pm-given').value = '';
    document.getElementById('pm-asked').value = '';
    document.getElementById('pm-answer').value = '';
    document.getElementById('pm-level-badge').textContent = 'Selesai!';
    return;
  }
  const q = PM_QUESTIONS[pmIndex];
  document.getElementById('pm-level-badge').textContent = q.level;
  document.getElementById('pm-question').textContent = q.q;
  document.getElementById('pm-given').value = '';
  document.getElementById('pm-asked').value = '';
  document.getElementById('pm-answer').value = '';
  hideFeedback('pm-feedback');
}

function checkPM() {
  const userAns = document.getElementById('pm-answer').value.trim().toUpperCase().replace(/\s/g,'');
  const q = PM_QUESTIONS[pmIndex];
  const correctAns = q.answer.toUpperCase().replace(/\s/g,'');
  const fb = document.getElementById('pm-feedback');
  fb.classList.remove('hidden','correct','wrong');

  // flexible matching
  const isCorrect = userAns === correctAns ||
    userAns === correctAns.replace('RM','') ||
    userAns.includes(correctAns.replace('RM',''));

  if (isCorrect) {
    pmScore += 10;
    document.getElementById('pm-score').textContent = pmScore;
    fb.classList.add('correct');
    fb.innerHTML = `✅ Betul! ${q.explanation}`;
  } else {
    fb.classList.add('wrong');
    fb.innerHTML = `❌ Belum tepat. Petua: ${q.hint}<br><strong>Jawapan: ${q.answer}</strong><br><em>${q.explanation}</em>`;
  }
  fb.classList.remove('hidden');
}

function nextPM() {
  pmIndex++;
  loadPM();
}

// ────────────────────────────────────────────
// GAME 2: BOM MASA
// ────────────────────────────────────────────
const BOM_QUESTIONS = [
  { q: 'RM 25 + RM 35 = ?',         opts: ['RM 50','RM 60','RM 70','RM 55'], ans: 1 },
  { q: 'RM 100 – RM 43.50 = ?',     opts: ['RM 56.50','RM 57.50','RM 46.50','RM 56.00'], ans: 0 },
  { q: 'RM 12 × 6 = ?',             opts: ['RM 60','RM 72','RM 68','RM 78'], ans: 1 },
  { q: 'RM 240 ÷ 8 = ?',            opts: ['RM 25','RM 30','RM 35','RM 28'], ans: 1 },
  { q: '1 dekad = ? tahun',          opts: ['5','8','10','12'], ans: 2 },
  { q: '1 abad = ? tahun',           opts: ['50','75','100','200'], ans: 2 },
  { q: '½ jam = ? minit',            opts: ['20','25','30','45'], ans: 2 },
  { q: '¾ hari = ? jam',             opts: ['12','16','18','20'], ans: 2 },
  { q: 'RM 50 × 100 = ?',            opts: ['RM 500','RM 5 000','RM 50 000','RM 5 00'], ans: 1 },
  { q: '2 jam 30 min + 1 jam 45 min = ?', opts: ['3j 15min','4j 15min','3j 75min','4j 5min'], ans: 1 },
  { q: 'RM 1 000 ÷ 1 000 = ?',       opts: ['RM 10','RM 1','RM 100','RM 0.10'], ans: 1 },
  { q: '0.5 tahun = ? bulan',         opts: ['3','4','6','8'], ans: 2 },
  { q: 'RM 75 + (RM 5 × 4) = ?',     opts: ['RM 95','RM 300','RM 80','RM 100'], ans: 0 },
  { q: '3 tahun 4 bulan + 1 tahun 10 bulan = ?', opts: ['4t 14b','5t 2b','4t 2b','5t 4b'], ans: 1 },
  { q: 'RM 500 – RM 123.45 = ?',     opts: ['RM 376.55','RM 377.55','RM 376.45','RM 366.55'], ans: 0 },
];

let bomIndex = 0;
let bomScore = 0;
let bomTimer = null;
let bomTimeLeft = 10;
let bomActive = false;
let bomUsed = [];

function initBom() {
  bomScore = 0;
  bomUsed = [];
  document.getElementById('bom-score').textContent = 0;
  document.getElementById('bom-start-screen').classList.remove('hidden');
  document.getElementById('bom-result').classList.add('hidden');
  document.getElementById('bom-question').textContent = 'Sedia?';
  document.getElementById('bom-options').innerHTML = '';
  hideFeedback('bom-feedback');
}

function startBom() {
  document.getElementById('bom-start-screen').classList.add('hidden');
  bomScore = 0;
  bomUsed = [];
  bomActive = true;
  loadBomQ();
}

function loadBomQ() {
  if (!bomActive) return;
  hideFeedback('bom-feedback');

  // pick unused question
  const remaining = BOM_QUESTIONS.map((_, i) => i).filter(i => !bomUsed.includes(i));
  if (remaining.length === 0 || bomUsed.length >= 10) {
    endBom();
    return;
  }
  bomIndex = remaining[Math.floor(Math.random() * remaining.length)];
  bomUsed.push(bomIndex);

  const q = BOM_QUESTIONS[bomIndex];
  document.getElementById('bom-question').textContent = q.q;

  const optContainer = document.getElementById('bom-options');
  optContainer.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'bom-option';
    btn.textContent = opt;
    btn.onclick = () => selectBomOpt(i);
    optContainer.appendChild(btn);
  });

  startBomTimer();
}

function startBomTimer() {
  clearInterval(bomTimer);
  bomTimeLeft = 10;
  updateTimerDisplay(10);
  bomTimer = setInterval(() => {
    bomTimeLeft--;
    updateTimerDisplay(bomTimeLeft);
    if (bomTimeLeft <= 0) {
      clearInterval(bomTimer);
      // time out
      showBomFeedback(false, '⏰ Masa habis! ' + BOM_QUESTIONS[bomIndex].opts[BOM_QUESTIONS[bomIndex].ans]);
      disableBomOpts();
      highlightBomCorrect();
      setTimeout(loadBomQ, 1800);
    }
  }, 1000);
}

function updateTimerDisplay(t) {
  document.getElementById('bom-time').textContent = t;
  const circle = document.getElementById('timer-circle');
  const fill = document.getElementById('timer-fill');
  const offset = 314 * (1 - t / 10);
  circle.style.strokeDashoffset = offset;
  if (t > 6)      fill.style.stroke = 'var(--green)';
  else if (t > 3) fill.style.stroke = 'var(--yellow)';
  else             fill.style.stroke = 'var(--red)';
  document.getElementById('bom-emoji').textContent = t <= 3 ? '💥' : '💣';
}

function selectBomOpt(i) {
  clearInterval(bomTimer);
  disableBomOpts();
  const correct = BOM_QUESTIONS[bomIndex].ans === i;
  const opts = document.querySelectorAll('.bom-option');
  opts[i].classList.add(correct ? 'correct' : 'wrong');
  if (correct) {
    bomScore += 10;
    document.getElementById('bom-score').textContent = bomScore;
    showBomFeedback(true, '✅ Betul! +10 markah');
  } else {
    showBomFeedback(false, '❌ Salah! Jawapan: ' + BOM_QUESTIONS[bomIndex].opts[BOM_QUESTIONS[bomIndex].ans]);
    highlightBomCorrect();
  }
  setTimeout(loadBomQ, 1600);
}

function highlightBomCorrect() {
  const opts = document.querySelectorAll('.bom-option');
  opts[BOM_QUESTIONS[bomIndex].ans].classList.add('correct');
}

function disableBomOpts() {
  document.querySelectorAll('.bom-option').forEach(b => {
    b.style.pointerEvents = 'none';
  });
}

function showBomFeedback(ok, msg) {
  const fb = document.getElementById('bom-feedback');
  fb.className = 'feedback-box ' + (ok ? 'correct' : 'wrong');
  fb.textContent = msg;
  fb.classList.remove('hidden');
}

function endBom() {
  bomActive = false;
  clearInterval(bomTimer);
  document.getElementById('bom-question').textContent = '';
  document.getElementById('bom-options').innerHTML = '';
  hideFeedback('bom-feedback');
  const result = document.getElementById('bom-result');
  result.classList.remove('hidden');
  const total = bomUsed.length * 10;
  const pct = Math.round((bomScore / total) * 100);
  result.innerHTML = `
    <h3>🎉 Tamat!</h3>
    <p style="font-size:2rem;font-weight:900;color:var(--yellow)">${bomScore} / ${total}</p>
    <p>${pct >= 80 ? '🌟 Cemerlang!' : pct >= 60 ? '👍 Bagus!' : '💪 Cuba lagi!'}</p>
    <button class="btn-lego btn-red" style="margin-top:.8rem" onclick="startBom()">🔄 Main Lagi</button>
    <button class="btn-lego btn-blue" style="margin:.4rem" onclick="backToMenu()">← Menu</button>
  `;
}

function stopBom() {
  bomActive = false;
  clearInterval(bomTimer);
}

// ────────────────────────────────────────────
// GAME 3: TANGKAP JAWAPAN
// ────────────────────────────────────────────
const TK_QUESTIONS = [
  { q: 'RM 20 + RM 35 = ?',    correct: 'RM 55',  wrongs: ['RM 45','RM 60','RM 50'] },
  { q: 'RM 80 – RM 23 = ?',    correct: 'RM 57',  wrongs: ['RM 47','RM 67','RM 53'] },
  { q: '½ jam = ? minit',      correct: '30',     wrongs: ['20','25','45'] },
  { q: '1 dekad = ? tahun',    correct: '10',     wrongs: ['5','8','12'] },
  { q: 'RM 15 × 4 = ?',        correct: 'RM 60',  wrongs: ['RM 45','RM 55','RM 70'] },
  { q: 'RM 120 ÷ 6 = ?',       correct: 'RM 20',  wrongs: ['RM 18','RM 24','RM 15'] },
  { q: '1 abad = ? tahun',     correct: '100',    wrongs: ['50','75','200'] },
  { q: '¾ jam = ? minit',      correct: '45',     wrongs: ['30','40','50'] },
  { q: 'RM 200 × 100 = ?',     correct: 'RM 20 000', wrongs: ['RM 2 000','RM 200 000','RM 200'] },
  { q: '2 dekad = ? tahun',    correct: '20',     wrongs: ['10','15','25'] },
];

let tkScore = 0;
let tkLives = 3;
let tkQIndex = 0;
let tkActive = false;
let tkFallingItems = [];
let tkAnimFrame = null;
let tkBasketX = 50; // percent
let tkLeftPressed = false;
let tkRightPressed = false;
let tkSpawnTimer = null;

function initTangkap() {
  tkScore = 0;
  tkLives = 3;
  tkQIndex = 0;
  tkActive = false;
  document.getElementById('tk-score').textContent = 0;
  document.getElementById('tk-lives').textContent = '❤️❤️❤️';
  document.getElementById('tk-start-screen').classList.remove('hidden');
  document.getElementById('tk-game-area').classList.add('hidden');
  document.getElementById('tk-result').classList.add('hidden');
}

function startTangkap() {
  document.getElementById('tk-start-screen').classList.add('hidden');
  document.getElementById('tk-game-area').classList.remove('hidden');
  tkScore = 0;
  tkLives = 3;
  tkQIndex = 0;
  tkActive = true;
  tkFallingItems = [];
  tkBasketX = 45;
  updateTKDisplay();
  loadTKQuestion();
  startTKLoop();
  setupTKControls();
}

function updateTKDisplay() {
  document.getElementById('tk-score').textContent = tkScore;
  document.getElementById('tk-lives').textContent = '❤️'.repeat(Math.max(0, tkLives));
}

function loadTKQuestion() {
  if (tkQIndex >= TK_QUESTIONS.length) {
    endTangkap();
    return;
  }
  const q = TK_QUESTIONS[tkQIndex];
  document.getElementById('tk-question-display').textContent = q.q;
  clearTKFalling();
  // Spawn answers after 800ms
  setTimeout(() => {
    if (!tkActive) return;
    spawnTKAnswers(q);
  }, 800);
}

function spawnTKAnswers(q) {
  const arena = document.getElementById('tk-arena');
  const allAnswers = [
    { text: q.correct, isCorrect: true },
    ...q.wrongs.slice(0, 3).map(w => ({ text: w, isCorrect: false }))
  ].sort(() => Math.random() - 0.5);

  allAnswers.forEach((ans, i) => {
    const el = document.createElement('div');
    el.className = 'tk-falling ' + (ans.isCorrect ? 'tk-correct' : 'tk-wrong');
    el.textContent = ans.text;
    el.dataset.correct = ans.isCorrect;
    const startX = 5 + (i * 22) + Math.random() * 5;
    el.style.left = startX + '%';
    el.style.top = '-40px';
    el.dataset.speed = (0.4 + Math.random() * 0.5).toFixed(2);
    el.dataset.x = startX;
    el.dataset.y = -40;
    arena.appendChild(el);
    tkFallingItems.push(el);
  });
}

function startTKLoop() {
  const arena = document.getElementById('tk-arena');
  const basket = document.getElementById('tk-basket');

  function loop() {
    if (!tkActive) return;

    // Move basket
    const speed = 1.5;
    if (tkLeftPressed) tkBasketX = Math.max(2, tkBasketX - speed);
    if (tkRightPressed) tkBasketX = Math.min(88, tkBasketX + speed);
    basket.style.left = tkBasketX + '%';

    // Move falling items
    const arenaH = arena.clientHeight;
    const basketY = arenaH - 56;

    tkFallingItems.forEach(el => {
      if (!el.parentNode) return;
      let y = parseFloat(el.dataset.y) + parseFloat(el.dataset.speed) * 1.4;
      el.dataset.y = y;
      el.style.top = y + 'px';

      // Collision check
      const elX = parseFloat(el.style.left);
      const bX = tkBasketX;
      const hitX = Math.abs(elX - bX) < 14;
      const hitY = y > basketY - 20 && y < basketY + 20;

      if (hitX && hitY) {
        const correct = el.dataset.correct === 'true';
        el.remove();
        tkFallingItems = tkFallingItems.filter(e => e !== el);
        if (correct) {
          tkScore += 10;
          updateTKDisplay();
          clearTKFalling();
          tkQIndex++;
          setTimeout(loadTKQuestion, 600);
        } else {
          tkLives--;
          updateTKDisplay();
          if (tkLives <= 0) { endTangkap(); return; }
        }
      }

      // Missed correct answer
      if (y > arenaH + 20) {
        const correct = el.dataset.correct === 'true';
        el.remove();
        tkFallingItems = tkFallingItems.filter(e => e !== el);
        if (correct) {
          tkLives--;
          updateTKDisplay();
          clearTKFalling();
          if (tkLives <= 0) { endTangkap(); return; }
          tkQIndex++;
          setTimeout(loadTKQuestion, 600);
        }
      }
    });

    tkAnimFrame = requestAnimationFrame(loop);
  }
  tkAnimFrame = requestAnimationFrame(loop);
}

function clearTKFalling() {
  const arena = document.getElementById('tk-arena');
  tkFallingItems.forEach(el => { if (el.parentNode) el.remove(); });
  tkFallingItems = [];
}

function setupTKControls() {
  const leftBtn = document.getElementById('tk-left-btn');
  const rightBtn = document.getElementById('tk-right-btn');

  leftBtn.addEventListener('mousedown',  () => tkLeftPressed  = true);
  leftBtn.addEventListener('touchstart', () => tkLeftPressed  = true, {passive:true});
  leftBtn.addEventListener('mouseup',    () => tkLeftPressed  = false);
  leftBtn.addEventListener('touchend',   () => tkLeftPressed  = false);

  rightBtn.addEventListener('mousedown',  () => tkRightPressed = true);
  rightBtn.addEventListener('touchstart', () => tkRightPressed = true, {passive:true});
  rightBtn.addEventListener('mouseup',    () => tkRightPressed = false);
  rightBtn.addEventListener('touchend',   () => tkRightPressed = false);

  document.addEventListener('keydown', tkKeyDown);
  document.addEventListener('keyup',   tkKeyUp);
}

function tkKeyDown(e) {
  if (e.key === 'ArrowLeft')  tkLeftPressed  = true;
  if (e.key === 'ArrowRight') tkRightPressed = true;
}
function tkKeyUp(e) {
  if (e.key === 'ArrowLeft')  tkLeftPressed  = false;
  if (e.key === 'ArrowRight') tkRightPressed = false;
}

function stopTangkap() {
  tkActive = false;
  tkLeftPressed = false;
  tkRightPressed = false;
  cancelAnimationFrame(tkAnimFrame);
  clearTKFalling();
  document.removeEventListener('keydown', tkKeyDown);
  document.removeEventListener('keyup',   tkKeyUp);
}

function endTangkap() {
  stopTangkap();
  document.getElementById('tk-game-area').classList.add('hidden');
  const result = document.getElementById('tk-result');
  result.classList.remove('hidden');
  const maxScore = TK_QUESTIONS.length * 10;
  result.innerHTML = `
    <h3>🎮 Tamat!</h3>
    <p style="font-size:2rem;font-weight:900;color:var(--yellow)">${tkScore} / ${maxScore}</p>
    <p>${tkScore >= 80 ? '🌟 Hebat!' : tkScore >= 50 ? '👍 Bagus!' : '💪 Cuba lagi!'}</p>
    <button class="btn-lego btn-blue" style="margin-top:.8rem" onclick="startTangkap()">🔄 Main Lagi</button>
    <button class="btn-lego btn-red" style="margin:.4rem" onclick="backToMenu()">← Menu</button>
  `;
}

// ────────────────────────────────────────────
// GAME 4: SUSUN & PADANKAN
// ────────────────────────────────────────────
const SP_ROUNDS = [
  {
    title: 'Wang: Operasi Asas',
    pairs: [
      { q: 'RM 45 + RM 32', a: 'RM 77' },
      { q: 'RM 100 – RM 67.50', a: 'RM 32.50' },
      { q: 'RM 15 × 6', a: 'RM 90' },
      { q: 'RM 200 ÷ 8', a: 'RM 25' },
    ]
  },
  {
    title: 'Wang: Konsep',
    pairs: [
      { q: 'Wang simpan untuk masa depan', a: 'Simpanan' },
      { q: 'Wang digunakan untuk mendapat lebih wang', a: 'Pelaburan' },
      { q: 'Faedah dari jumlah asal sahaja', a: 'Faedah Mudah' },
      { q: 'Beli tanpa bayar terus', a: 'Kredit' },
    ]
  },
  {
    title: 'Masa: Unit Asas',
    pairs: [
      { q: '1 Dekad', a: '10 Tahun' },
      { q: '1 Abad', a: '100 Tahun' },
      { q: '½ Jam', a: '30 Minit' },
      { q: '¾ Hari', a: '18 Jam' },
    ]
  },
  {
    title: 'Masa: Penukaran',
    pairs: [
      { q: '0.5 Tahun', a: '6 Bulan' },
      { q: '2.5 Jam', a: '150 Minit' },
      { q: '3 Dekad', a: '30 Tahun' },
      { q: '0.25 Hari', a: '6 Jam' },
    ]
  },
  {
    title: 'Operasi Masa',
    pairs: [
      { q: '2j 45min + 1j 30min', a: '4j 15min' },
      { q: '3j 10min – 1j 45min', a: '1j 25min' },
      { q: '1 tahun 8 bulan + 2 tahun 7 bulan', a: '4 tahun 3 bulan' },
      { q: '5 tahun 3 bulan – 2 tahun 8 bulan', a: '2 tahun 7 bulan' },
    ]
  },
];

let spRound = 0;
let spScore = 0;
let spSelectedQ = null;
let spSelectedA = null;
let spMatched = [];

function initSusun() {
  spRound = 0;
  spScore = 0;
  spMatched = [];
  document.getElementById('sp-score').textContent = 0;
  loadSPRound();
}

function loadSPRound() {
  if (spRound >= SP_ROUNDS.length) {
    endSusun();
    return;
  }
  spSelectedQ = null;
  spSelectedA = null;
  spMatched = [];
  hideFeedback('sp-feedback');
  document.getElementById('sp-round').textContent = spRound + 1;

  const round = SP_ROUNDS[spRound];
  const shuffledAs = [...round.pairs].sort(() => Math.random() - 0.5);

  const qCol = document.getElementById('sp-questions-col');
  const aCol = document.getElementById('sp-answers-col');
  qCol.innerHTML = '';
  aCol.innerHTML = '';

  round.pairs.forEach((pair, i) => {
    const qEl = document.createElement('div');
    qEl.className = 'sp-item';
    qEl.textContent = pair.q;
    qEl.dataset.index = i;
    qEl.onclick = () => selectSPQ(qEl, i);
    qCol.appendChild(qEl);
  });

  shuffledAs.forEach(pair => {
    const aEl = document.createElement('div');
    aEl.className = 'sp-item';
    aEl.textContent = pair.a;
    aEl.dataset.answer = pair.a;
    aEl.onclick = () => selectSPA(aEl, pair.a);
    aCol.appendChild(aEl);
  });
}

function selectSPQ(el, idx) {
  if (el.classList.contains('matched')) return;
  document.querySelectorAll('#sp-questions-col .sp-item').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  spSelectedQ = { el, idx };
  tryMatchSP();
}

function selectSPA(el, ans) {
  if (el.classList.contains('matched')) return;
  document.querySelectorAll('#sp-answers-col .sp-item').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  spSelectedA = { el, ans };
  tryMatchSP();
}

function tryMatchSP() {
  if (!spSelectedQ || !spSelectedA) return;
  const round = SP_ROUNDS[spRound];
  const correctAns = round.pairs[spSelectedQ.idx].a;
  if (spSelectedA.ans === correctAns) {
    spSelectedQ.el.classList.remove('selected');
    spSelectedA.el.classList.remove('selected');
    spSelectedQ.el.classList.add('matched');
    spSelectedA.el.classList.add('matched');
    spMatched.push(spSelectedQ.idx);
    spScore += 5;
    document.getElementById('sp-score').textContent = spScore;

    if (spMatched.length === round.pairs.length) {
      // All matched
      const fb = document.getElementById('sp-feedback');
      fb.className = 'feedback-box correct';
      fb.textContent = '🎉 Semua padanan betul! Pusingan seterus bermula...';
      fb.classList.remove('hidden');
      setTimeout(() => {
        spRound++;
        loadSPRound();
      }, 1800);
    }
  } else {
    // Wrong
    spSelectedQ.el.classList.add('shake');
    spSelectedA.el.classList.add('shake');
    setTimeout(() => {
      spSelectedQ.el.classList.remove('selected','shake');
      spSelectedA.el.classList.remove('selected','shake');
    }, 500);
  }
  spSelectedQ = null;
  spSelectedA = null;
}

function checkSusun() {
  const fb = document.getElementById('sp-feedback');
  const round = SP_ROUNDS[spRound];
  if (spMatched.length === round.pairs.length) {
    fb.className = 'feedback-box correct';
    fb.textContent = '✅ Semua sudah dipadankan dengan betul!';
  } else {
    fb.className = 'feedback-box wrong';
    fb.textContent = `❗ Masih ada ${round.pairs.length - spMatched.length} padanan yang belum selesai.`;
  }
  fb.classList.remove('hidden');
}

function endSusun() {
  const qCol = document.getElementById('sp-questions-col');
  const aCol = document.getElementById('sp-answers-col');
  const maxScore = SP_ROUNDS.reduce((sum,r) => sum + r.pairs.length * 5, 0);
  qCol.innerHTML = `<div class="feedback-box correct" style="display:block">🏆 Tamat! Markah: ${spScore}/${maxScore}</div>`;
  aCol.innerHTML = `<button class="btn-lego btn-green" onclick="initSusun()">🔄 Main Semula</button>`;
  document.getElementById('sp-round-info').textContent = '✅ Semua pusingan selesai!';
}

// ────────────────────────────────────────────
// KUIZ
// ────────────────────────────────────────────
const KUIZ_BANK = {
  wang: [
    { q: 'RM 125.50 + RM 74.30 = ?',           opts: ['RM 199.80','RM 200.80','RM 198.80','RM 199.00'], ans: 0 },
    { q: 'RM 500 – RM 238.75 = ?',              opts: ['RM 261.25','RM 262.25','RM 261.75','RM 260.25'], ans: 0 },
    { q: 'RM 45 × 7 = ?',                       opts: ['RM 295','RM 305','RM 315','RM 325'], ans: 2 },
    { q: 'RM 360 ÷ 9 = ?',                      opts: ['RM 30','RM 35','RM 40','RM 45'], ans: 2 },
    { q: 'RM 25 × 100 = ?',                     opts: ['RM 250','RM 2 500','RM 25 000','RM 2 250'], ans: 1 },
    { q: 'RM 8 000 ÷ 1 000 = ?',               opts: ['RM 80','RM 8','RM 0.8','RM 800'], ans: 1 },
    { q: 'RM 30 + (RM 15 × 2) = ?',            opts: ['RM 90','RM 60','RM 45','RM 75'], ans: 1 },
    { q: '(RM 100 – RM 40) ÷ 3 = ?',           opts: ['RM 15','RM 20','RM 25','RM 30'], ans: 1 },
    { q: 'Apakah maksud simpanan?',              opts: ['Wang untuk berhutang','Wang simpan untuk masa depan','Wang untuk melabur','Wang untuk berbelanja'], ans: 1 },
    { q: 'Manakah cara beli yang lebih mahal?', opts: ['Tunai','Kredit','Kedua-duanya sama','Bergantung produk'], ans: 1 },
    { q: 'Faedah kompaun dikira berdasarkan?',  opts: ['Jumlah asal sahaja','Jumlah asal + faedah terkumpul','Faedah sahaja','Dividen sahaja'], ans: 1 },
    { q: 'Berapakah baki jika RM 1 000 ditolak RM 456.80?', opts: ['RM 543.20','RM 544.20','RM 543.80','RM 542.20'], ans: 0 },
  ],
  masa: [
    { q: '1 Dekad = ? Tahun',                   opts: ['5','8','10','12'], ans: 2 },
    { q: '1 Abad = ? Dekad',                    opts: ['5','10','20','100'], ans: 1 },
    { q: '½ jam = ? minit',                     opts: ['20','25','30','45'], ans: 2 },
    { q: '¼ hari = ? jam',                      opts: ['3','6','8','12'], ans: 1 },
    { q: '0.5 tahun = ? bulan',                 opts: ['3','4','6','8'], ans: 2 },
    { q: '3 dekad = ? tahun',                   opts: ['13','20','30','40'], ans: 2 },
    { q: '2 jam 30 min + 1 jam 45 min = ?',    opts: ['3j 75min','4j 15min','3j 15min','4j 5min'], ans: 1 },
    { q: '5 hari 6 jam – 2 hari 14 jam = ?',   opts: ['3d 8j','2d 16j','3d 16j','2d 8j'], ans: 1 },
    { q: 'Tahun lompat berlaku setiap?',         opts: ['2 tahun','3 tahun','4 tahun','5 tahun'], ans: 2 },
    { q: 'Februari ada berapa hari pada tahun lompat?', opts: ['27','28','29','30'], ans: 2 },
    { q: '0.25 jam = ? minit',                  opts: ['10','15','20','25'], ans: 1 },
    { q: '2 abad = ? tahun',                    opts: ['20','100','200','2000'], ans: 2 },
  ]
};

let kuizQs = [];
let kuizIdx = 0;
let kuizScore = 0;
let kuizTimer = null;
let kuizTimeLeft = 60;
let kuizName = '';
let kuizClass = '';
let kuizAnswers = [];

function startKuiz() {
  kuizName = document.getElementById('kuiz-name').value.trim() || 'Murid';
  kuizClass = document.getElementById('kuiz-class').value.trim() || '-';
  const topic = document.getElementById('kuiz-topic').value;

  let pool = [];
  if (topic === 'all') pool = [...KUIZ_BANK.wang, ...KUIZ_BANK.masa];
  else if (topic === 'wang') pool = [...KUIZ_BANK.wang];
  else pool = [...KUIZ_BANK.masa];

  // shuffle and pick 20 (or all if fewer)
  kuizQs = pool.sort(() => Math.random() - 0.5).slice(0, Math.min(20, pool.length));
  kuizIdx = 0;
  kuizScore = 0;
  kuizAnswers = [];

  document.getElementById('kuiz-setup').classList.add('hidden');
  document.getElementById('kuiz-result').classList.add('hidden');
  document.getElementById('leaderboard-box').classList.add('hidden');
  document.getElementById('kuiz-area').classList.remove('hidden');
  document.getElementById('kuiz-q-total').textContent = kuizQs.length;
  loadKuizQ();
}

function loadKuizQ() {
  if (kuizIdx >= kuizQs.length) {
    endKuiz();
    return;
  }
  const q = kuizQs[kuizIdx];
  document.getElementById('kuiz-q-num').textContent = kuizIdx + 1;
  document.getElementById('kuiz-current-score').textContent = kuizScore;
  document.getElementById('kuiz-progress-inner').style.width = (kuizIdx / kuizQs.length * 100) + '%';
  document.getElementById('kuiz-question').textContent = q.q;
  document.getElementById('kuiz-next-btn').classList.add('hidden');
  hideFeedback('kuiz-feedback');

  const optDiv = document.getElementById('kuiz-options');
  optDiv.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'kuiz-option';
    btn.textContent = opt;
    btn.onclick = () => answerKuiz(i);
    optDiv.appendChild(btn);
  });

  startKuizTimer();
}

function startKuizTimer() {
  clearInterval(kuizTimer);
  kuizTimeLeft = 60;
  document.getElementById('kuiz-timer').textContent = kuizTimeLeft;
  kuizTimer = setInterval(() => {
    kuizTimeLeft--;
    document.getElementById('kuiz-timer').textContent = kuizTimeLeft;
    if (kuizTimeLeft <= 0) {
      clearInterval(kuizTimer);
      answerKuiz(-1); // time out = wrong
    }
  }, 1000);
}

function answerKuiz(idx) {
  clearInterval(kuizTimer);
  const q = kuizQs[kuizIdx];
  const correct = idx === q.ans;
  const opts = document.querySelectorAll('.kuiz-option');
  opts.forEach(b => b.classList.add('disabled'));
  if (idx >= 0) opts[idx].classList.add(correct ? 'correct' : 'wrong');
  opts[q.ans].classList.add('correct');

  if (correct) kuizScore += 5;
  kuizAnswers.push({ q: q.q, userAns: idx >= 0 ? q.opts[idx] : 'Tamat masa', correctAns: q.opts[q.ans], correct });
  document.getElementById('kuiz-current-score').textContent = kuizScore;

  const fb = document.getElementById('kuiz-feedback');
  fb.className = 'feedback-box ' + (correct ? 'correct' : 'wrong');
  fb.textContent = correct
    ? `✅ Betul! +5 markah`
    : `❌ ${idx === -1 ? '⏰ Tamat masa!' : 'Salah!'} Jawapan: ${q.opts[q.ans]}`;
  fb.classList.remove('hidden');

  document.getElementById('kuiz-next-btn').classList.remove('hidden');
}

function nextKuizQ() {
  kuizIdx++;
  loadKuizQ();
}

function endKuiz() {
  clearInterval(kuizTimer);
  document.getElementById('kuiz-area').classList.add('hidden');
  const result = document.getElementById('kuiz-result');
  result.classList.remove('hidden');

  const maxScore = kuizQs.length * 5;
  const pct = Math.round((kuizScore / maxScore) * 100);
  const correct = kuizAnswers.filter(a => a.correct).length;

  let grade, gradeColor;
  if (pct >= 90) { grade = 'A+ 🌟 Cemerlang!'; gradeColor = '#00A650'; }
  else if (pct >= 80) { grade = 'A 🎉 Bagus!'; gradeColor = '#00A650'; }
  else if (pct >= 70) { grade = 'B+ 👍 Baik!'; gradeColor = '#006CB7'; }
  else if (pct >= 60) { grade = 'B 😊 Memuaskan'; gradeColor = '#006CB7'; }
  else if (pct >= 50) { grade = 'C 💪 Cuba Lagi'; gradeColor = '#E6B800'; }
  else { grade = 'D 📚 Perlu Usaha'; gradeColor = '#E3000B'; }

  document.getElementById('result-name').textContent = `Tahniah, ${kuizName}!`;
  document.getElementById('result-score-display').textContent = `${kuizScore} / ${maxScore}`;
  document.getElementById('result-grade').textContent = grade;
  document.getElementById('result-grade').style.background = gradeColor;
  document.getElementById('result-summary').textContent =
    `Betul: ${correct} soalan | Salah: ${kuizQs.length - correct} soalan | ${pct}%`;

  // Save to leaderboard
  saveToLeaderboard({ name: kuizName, class: kuizClass, score: kuizScore, max: maxScore, pct, date: new Date().toLocaleString('ms-MY') });
}

function downloadRecord() {
  const maxScore = kuizQs.length * 5;
  const pct = Math.round((kuizScore / maxScore) * 100);
  let csv = `Rekod Kuiz MatikFun!\n`;
  csv += `Nama:,${kuizName}\n`;
  csv += `Kelas:,${kuizClass}\n`;
  csv += `Tarikh:,${new Date().toLocaleString('ms-MY')}\n`;
  csv += `Markah:,${kuizScore}/${maxScore} (${pct}%)\n\n`;
  csv += `No,Soalan,Jawapan Kamu,Jawapan Betul,Status\n`;
  kuizAnswers.forEach((a, i) => {
    csv += `${i+1},"${a.q}","${a.userAns}","${a.correctAns}","${a.correct ? 'Betul' : 'Salah'}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Rekod_Kuiz_${kuizName}_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function saveToLeaderboard(entry) {
  try {
    const key = 'matikfun_leaderboard';
    let data = JSON.parse(localStorage.getItem(key) || '[]');
    data.push(entry);
    data.sort((a, b) => b.pct - a.pct);
    data = data.slice(0, 20); // keep top 20
    localStorage.setItem(key, JSON.stringify(data));
  } catch(e) {}
}

function showLeaderboard() {
  const key = 'matikfun_leaderboard';
  let data = [];
  try { data = JSON.parse(localStorage.getItem(key) || '[]'); } catch(e) {}

  const box = document.getElementById('leaderboard-box');
  const list = document.getElementById('leaderboard-list');
  box.classList.remove('hidden');

  if (data.length === 0) {
    list.innerHTML = '<p style="text-align:center;color:#888">Belum ada rekod lagi.</p>';
    return;
  }

  const medals = ['🥇','🥈','🥉'];
  list.innerHTML = data.map((entry, i) => `
    <div class="lb-row">
      <span class="lb-rank">${medals[i] || (i+1)}</span>
      <div class="lb-name">
        <strong>${entry.name}</strong>
        <div class="lb-meta">${entry.class || ''} · ${entry.date || ''}</div>
      </div>
      <span class="lb-score">${entry.score}/${entry.max}</span>
      <span class="lb-meta">${entry.pct}%</span>
    </div>
  `).join('');
}

function clearLeaderboard() {
  if (confirm('Padam semua rekod markah?')) {
    localStorage.removeItem('matikfun_leaderboard');
    showLeaderboard();
  }
}

function resetKuiz() {
  document.getElementById('kuiz-result').classList.add('hidden');
  document.getElementById('leaderboard-box').classList.add('hidden');
  document.getElementById('kuiz-setup').classList.remove('hidden');
}

// ────────────────────────────────────────────
// UTILITIES
// ────────────────────────────────────────────
function hideFeedback(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}
