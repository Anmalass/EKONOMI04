/* =========================================================
   EKONOMI — APBN & APBD — Ujian SMA Kelas XII
   (soal, durasi, dan daftar kelas diatur di config.js)
   ========================================================= */

/* ---------- isi dropdown kelas dari config.js ---------- */
const classSelect = document.getElementById('studentClass');
CLASS_OPTIONS.forEach(cls => {
  const opt = document.createElement('option');
  opt.textContent = cls;
  classSelect.appendChild(opt);
});

/* ---------- decorative floating economic terms ---------- */
const floatTerms = ["Rp","%","APBN","APBD","PAD","DAU","DAK","SURPLUS","DEFISIT","PENDAPATAN","BELANJA"];
const field = document.getElementById('floatField');
floatTerms.forEach((term, i) => {
  const el = document.createElement('div');
  el.className = 'float-el' + (i % 2 === 0 ? '' : ' green');
  el.textContent = term;
  const size = term.length <= 2 ? 3.2 : (term.length <= 4 ? 1.4 : 0.9);
  el.style.fontSize = size + 'rem';
  el.style.top = (Math.random() * 80 + 5) + '%';
  el.style.left = (Math.random() * 85 + 3) + '%';
  el.style.setProperty('--fd', (Math.random() * 1.2) + 's');
  el.style.animationDuration = '1s, ' + (14 + Math.random() * 10) + 's';
  field.appendChild(el);
});

const EXAM_DURATION_SECONDS = EXAM_DURATION_MINUTES * 60;

let current = 0;
let answers = new Array(questions.length).fill(null);
let timerInterval = null;
let secondsLeft = EXAM_DURATION_SECONDS;
let studentName = '';
let studentClass = '';
let examDate = '';
let reviewCurrent = 0;

/* Default tanggal pengerjaan = hari ini, tetap bisa diubah lewat kalender. */
const examDateInput = document.getElementById('examDate');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
examDateInput.value = localToday;

/* ---------- screen switching ---------- */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active', 'fade-in');
    s.hidden = true;
  });
  const target = document.getElementById(id);
  target.hidden = false;
  target.classList.add('active', 'fade-in');
  window.scrollTo({top: 0, behavior: 'instant'});
}

/* ---------- initial screen visibility ---------- */
document.querySelectorAll('.screen').forEach(s => {
  s.hidden = !s.classList.contains('active');
});

/* ---------- biodata validation + start ---------- */
function startExam() {
  const nameInput = document.getElementById('studentName');
  const classInput = document.getElementById('studentClass');
  const dateInput = document.getElementById('examDate');
  const dateGroup = dateInput.closest('.field-group');
  const nameGroup = nameInput.closest('.field-group');
  const classGroup = classInput.closest('.field-group');

  const nameVal = nameInput.value.trim();
  const classVal = classInput.value;
  const dateVal = dateInput.value;

  nameGroup.classList.toggle('invalid', nameVal === '');
  classGroup.classList.toggle('invalid', classVal === '');
  dateGroup.classList.toggle('invalid', dateVal === '');

  if (nameVal === '' || classVal === '' || dateVal === '') {
    if (nameVal === '') nameInput.focus();
    else if (classVal === '') classInput.focus();
    else dateInput.focus();
    return;
  }

  studentName = nameVal;
  studentClass = classVal;
  examDate = dateVal;
  const formattedDate = new Date(`${examDate}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  document.getElementById('examStudentInfo').innerHTML = `${studentName} — Kelas ${studentClass}<span class="exam-date">${formattedDate}</span>`;
  document.getElementById('resStudentInfo').innerHTML = `${studentName} — Kelas ${studentClass}<span class="exam-date">${formattedDate}</span>`;

  current = 0;
  answers = new Array(questions.length).fill(null);
  secondsLeft = EXAM_DURATION_SECONDS;

  const timerBox = document.getElementById('timerDisplay');
  timerBox.classList.remove('warning');

  showScreen('exam');
  renderQuestion();
  startTimer();
}

/* ---------- timer ---------- */
function startTimer() {
  clearInterval(timerInterval);
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    secondsLeft--;
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      secondsLeft = 0;
      updateTimerDisplay();
      finishExam(true);
      return;
    }
    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
  const s = (secondsLeft % 60).toString().padStart(2, '0');
  const timerBox = document.getElementById('timerDisplay');
  timerBox.textContent = `${m}:${s}`;
  timerBox.classList.toggle('warning', secondsLeft <= WARNING_THRESHOLD_SECONDS);
}

/* ---------- question rendering ---------- */
function renderQuestion() {
  const q = questions[current];
  const num = (current + 1).toString().padStart(2, '0');

  document.getElementById('qNumber').textContent = `SOAL ${num}`;
  document.getElementById('qText').textContent = q.q;
  document.getElementById('progressText').textContent = `SOAL ${num} / ${questions.length}`;

  const pct = Math.round(((current + 1) / questions.length) * 100);
  document.getElementById('progressPercent').textContent = pct + '%';
  document.getElementById('progressFill').style.width = pct + '%';

  const optionsWrap = document.getElementById('qOptions');
  optionsWrap.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D', 'E'];
  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'option' + (answers[current] === i ? ' selected' : '');
    div.innerHTML = `<span class="opt-letter">${letters[i]}</span><span class="opt-text">${opt}</span>`;
    div.addEventListener('click', () => {
      answers[current] = i;
      renderQuestion();
    });
    optionsWrap.appendChild(div);
  });

  // retrigger the question-card entrance animation
  const card = document.getElementById('questionCard');
  card.style.animation = 'none';
  void card.offsetWidth;
  card.style.animation = '';

  document.getElementById('btnPrev').disabled = current === 0;
  document.getElementById('btnNext').textContent = current === questions.length - 1 ? 'Selesai' : 'Selanjutnya';
}

function prevQuestion() {
  if (current > 0) {
    current--;
    renderQuestion();
  }
}

function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    finishExam(false);
  }
}

/* ---------- count-up number animation ---------- */
function animateCount(el, from, to, duration) {
  if (from === to) { el.textContent = to; return; }
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.round(from + (to - from) * eased);
    el.textContent = value;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = to;
  }
  requestAnimationFrame(tick);
}

/* ---------- celebratory particle burst on results ---------- */
function spawnBurst() {
  const burstField = document.getElementById('burstField');
  burstField.innerHTML = '';
  const colors = ['#4de3ff', '#55e39b', '#eaf2fb'];
  const count = 22;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'burst-el';
    const size = 4 + Math.random() * 6;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = (10 + Math.random() * 80) + '%';
    el.style.background = colors[i % colors.length];
    el.style.animationDelay = (Math.random() * 0.5) + 's';
    el.style.animationDuration = (1.1 + Math.random() * 0.8) + 's';
    burstField.appendChild(el);
  }
}

/* ---------- results ---------- */
function finishExam(force = false) {
  if (!force) {
    const unanswered = answers.map((a, i) => a === null ? i : -1).filter(i => i !== -1);
    if (unanswered.length > 0) {
      showIncompleteNotice(unanswered);
      return;
    }
  }

  clearInterval(timerInterval);

  let correct = 0, wrong = 0, empty = 0;
  answers.forEach((a, i) => {
    if (a === null) empty++;
    else if (a === questions[i].answer) correct++;
    else wrong++;
  });
  const score = Math.round((correct / questions.length) * 100);

  const statCorrectEl = document.getElementById('statCorrect');
  const statWrongEl = document.getElementById('statWrong');
  const statEmptyEl = document.getElementById('statEmpty');
  const scoreValEl = document.getElementById('scoreVal');

  const circle = document.getElementById('scoreCircle');
  const circumference = 2 * Math.PI * 94;
  circle.style.transition = 'none';
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;

  const ringWrap = document.querySelector('.score-ring-wrap');
  ringWrap.classList.remove('ring-glow');

  showScreen('results');
  spawnBurst();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      circle.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(.19,1,.22,1)';
      const offset = circumference - (score / 100) * circumference;
      circle.style.strokeDashoffset = offset;

      animateCount(scoreValEl, 0, score, 1100);
      animateCount(statCorrectEl, 0, correct, 900);
      animateCount(statWrongEl, 0, wrong, 900);
      animateCount(statEmptyEl, 0, empty, 900);

      setTimeout(() => ringWrap.classList.add('ring-glow'), 1000);
    });
  });
}

function openReview() {
  reviewCurrent = 0;
  const formattedDate = examDate
    ? new Date(`${examDate}T00:00:00`).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})
    : '';
  document.getElementById('reviewMeta').textContent = `${studentName} — Kelas ${studentClass}${formattedDate ? ' • ' + formattedDate : ''}`;
  showScreen('review');
  renderReview();
}

function renderReview() {
  const q = questions[reviewCurrent];
  const letters = ['A','B','C','D','E'];
  const selected = answers[reviewCurrent];
  const correct = q.answer;
  const statusEl = document.getElementById('reviewStatus');
  const status = selected === null ? 'TIDAK DIJAWAB' : (selected === correct ? 'BENAR' : 'SALAH');
  statusEl.textContent = status === 'BENAR' ? '✓ BENAR' : status === 'SALAH' ? '✕ SALAH' : '— TIDAK DIJAWAB';
  statusEl.className = status === 'BENAR' ? 'review-status correct' : status === 'SALAH' ? 'review-status wrong' : 'review-status empty';

  const num = String(reviewCurrent + 1).padStart(2,'0');
  document.getElementById('reviewProgressText').textContent = `SOAL ${num} / ${questions.length}`;
  document.getElementById('reviewProgressFill').style.width = `${Math.round(((reviewCurrent+1)/questions.length)*100)}%`;
  document.getElementById('reviewTopic').textContent = q.topic || 'MATERI EKONOMI';
  document.getElementById('reviewQNumber').textContent = `SOAL ${num}`;
  document.getElementById('reviewQText').textContent = q.q;
  const answerSummary = document.getElementById('answerSummary');
  if (selected === null) {
    answerSummary.innerHTML = `<div class="summary-line empty"><span>Jawaban kamu</span><strong>Belum dijawab</strong></div><div class="summary-line correct-key"><span>Kunci jawaban</span><strong>${letters[correct]} — ${q.options[correct]}</strong></div>`;
  } else if (selected === correct) {
    answerSummary.innerHTML = `<div class="summary-line correct-key"><span>Jawaban kamu</span><strong>${letters[selected]} — ${q.options[selected]}</strong></div><div class="summary-line correct-key"><span>Kunci jawaban</span><strong>${letters[correct]} — ${q.options[correct]}</strong></div>`;
  } else {
    answerSummary.innerHTML = `<div class="summary-line wrong-key"><span>Jawaban kamu</span><strong>${letters[selected]} — ${q.options[selected]}</strong></div><div class="summary-line correct-key"><span>Kunci jawaban</span><strong>${letters[correct]} — ${q.options[correct]}</strong></div>`;
  }
  document.getElementById('reviewExplanation').textContent = q.explanation || 'Belum ada penjelasan untuk soal ini.';

  const options = document.getElementById('reviewOptions');
  options.innerHTML = '';
  q.options.forEach((opt, i) => {
    const row = document.createElement('div');
    let cls = 'review-option';
    if (i === correct) cls += ' correct-answer';
    if (i === selected && selected !== correct) cls += ' wrong-answer';
    if (i === selected) cls += ' selected-answer';
    row.className = cls;
    const marker = i === correct ? '<span class="answer-badge correct-badge">✓ BENAR</span>' :
                   (i === selected ? '<span class="answer-badge wrong-badge">✕ JAWABANMU</span>' : '');
    row.innerHTML = `<span class="opt-letter">${letters[i]}</span><span class="opt-text">${opt}</span>${marker}`;
    options.appendChild(row);
  });

  const index = document.getElementById('reviewIndex');
  index.innerHTML = '';
  questions.forEach((_, i) => {
    const b = document.createElement('button');
    const a = answers[i];
    b.className = 'index-btn ' + (i === reviewCurrent ? 'active ' : '') + (a === null ? 'empty' : (a === questions[i].answer ? 'correct' : 'wrong'));
    b.textContent = String(i+1).padStart(2,'0');
    b.title = `Lihat soal ${i+1}`;
    b.addEventListener('click', () => { reviewCurrent = i; renderReview(); });
    index.appendChild(b);
  });

  document.getElementById('btnReviewPrev').disabled = reviewCurrent === 0;
  document.getElementById('btnReviewNext').textContent = reviewCurrent === questions.length - 1 ? 'Selesai Melihat' : 'Soal Berikutnya';

  const card = document.querySelector('.review-card');
  card.style.animation = 'none'; void card.offsetWidth; card.style.animation = '';
}

function reviewPrev() {
  if (reviewCurrent > 0) { reviewCurrent--; renderReview(); }
}
function reviewNext() {
  if (reviewCurrent < questions.length - 1) { reviewCurrent++; renderReview(); }
  else showScreen('results');
}

function showIncompleteNotice(unanswered) {
  const modal = document.getElementById('incompleteModal');
  const list = document.getElementById('incompleteList');
  const message = document.getElementById('incompleteMessage');

  message.textContent = `Masih ada ${unanswered.length} soal yang belum dijawab. Kerjakan semua soal terlebih dahulu sebelum ujian dapat diselesaikan.`;
  list.innerHTML = '';
  unanswered.forEach(i => {
    const b = document.createElement('button');
    b.className = 'incomplete-item';
    b.textContent = `Soal ${String(i + 1).padStart(2, '0')}`;
    b.addEventListener('click', () => {
      current = i;
      renderQuestion();
      closeIncompleteNotice();
    });
    list.appendChild(b);
  });

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

function closeIncompleteNotice() {
  const modal = document.getElementById('incompleteModal');
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}


/* ---------- wire up events ---------- */
document.getElementById('btnStart').addEventListener('click', startExam);
document.getElementById('btnPrev').addEventListener('click', prevQuestion);
document.getElementById('btnNext').addEventListener('click', nextQuestion);
document.getElementById('btnReview').addEventListener('click', openReview);
document.getElementById('btnBackResult').addEventListener('click', () => showScreen('results'));
document.getElementById('btnReviewPrev').addEventListener('click', reviewPrev);
document.getElementById('btnReviewNext').addEventListener('click', reviewNext);

document.getElementById('incompleteOk').addEventListener('click', () => {
  const first = answers.findIndex(a => a === null);
  if (first !== -1) { current = first; renderQuestion(); }
  closeIncompleteNotice();
});
document.getElementById('incompleteBackdrop').addEventListener('click', closeIncompleteNotice);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeIncompleteNotice(); });
