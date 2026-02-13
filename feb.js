/* ================= GLOBAL ================= */
let step = 0;
let quizIndex = 0;
let heartInterval;

/* ================= QUESTIONS ================= */
const questions = [
  "Will you be mine 🥺?",
  "Think again 😭",
  "Are you sure 😡?",
  "See this 🥹❤️"
];

/* ================= QUIZ DATA ================= */
const quizData = [
  {
    q: "Who is the boss in this relationship? 😏",
    options: ["Obviously You", "Me", "My Mom"],
    correct: 0
  },
  {
    q: "What fights a lot in this relationship? 😂",
    options: ["Always You", "No One", "Me"],
    correct: 1
  },
  {
    q: "Where do I plan to spend my life? 💕",
    options: ["Paris", "In Your Heart", "On Mars"],
    correct: 1
  }
];

/* ================= HELPERS ================= */
function hideAll() {
  document.querySelectorAll(".card").forEach(c => c.classList.add("hidden"));
}

/* ================= LOGIN ================= */
function login() {
  if (password.value === "akashmahi") {
    hideAll();
    questionBox.classList.remove("hidden");
    startHearts();
  } else {
    error.innerText = "Wrong password 😢";
  }
}

/* ================= YES / NO ================= */
function moveNo() {
  step++;
  if (step < questions.length) {
    question.innerText = questions[step];
    noBtn.style.transform =
      `translate(${Math.random()*120-60}px, ${Math.random()*120-60}px)`;
  } else {
    noBtn.style.display = "none";
  }
}

function yes() {
  hideAll();
  finalYes.classList.remove("hidden");
}

/* ================= NAVIGATION ================= */
function showValentine() {
  hideAll();
  valentine.classList.remove("hidden");
}

function showGifts() {
  hideAll();
  gifts.classList.remove("hidden");
}

/* ================= GIFTS (ONLY ONE VERSION) ================= */
function openGift(num) {
  if (num === 1) {
    showQuiz();
  } else if (num === 2) {
    hideAll();
    resetLetter();
    envelopePage.classList.remove("hidden");
  } else if (num === 3) {
    hideAll();
    document.getElementById("memories").classList.remove("hidden");
  }
}

/* ================= QUIZ ================= */
function showQuiz() {
  hideAll();
  quizIndex = 0;
  quiz.classList.remove("hidden");
  loadQuiz();
}

function loadQuiz() {
  quizQuestion.innerText = quizData[quizIndex].q;
  options.innerHTML = "";

  quizData[quizIndex].options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.style.opacity = "1";

    if (i === quizData[quizIndex].correct) {
      btn.onclick = () => checkAnswer(btn);
    }

    options.appendChild(btn);
  });
}

function checkAnswer(btn) {
  btn.classList.add("correct");

  setTimeout(() => {
    quizIndex++;
    if (quizIndex < quizData.length) {
      loadQuiz();
    } else {
      hideAll();
      quizResult.classList.remove("hidden");
    }
  }, 700);
}

/* ================= LETTER ================= */
const letterText = `My Love Akash,

From the moment you came into my life,
everything became brighter.
You are my happiness, my comfort,
and my forever.

I promise to choose you,
today and always ❤️

Forever yours 💕`;

let letterIndex = 0;
let typingSound;

function resetLetter() {
  letterIndex = 0;
  typedLetter.innerHTML = "";
  envelope.style.display = "block";
  envelope.classList.remove("open");
  letterPaper.classList.add("hidden");
}

function openEnvelope() {
  typingSound = new Audio(
    "https://assets.mixkit.co/sfx/preview/mixkit-typewriter-soft-1123.mp3"
  );
  typingSound.volume = 0.5;

  envelope.classList.add("open");

  setTimeout(() => {
    envelope.style.display = "none";
    letterPaper.classList.remove("hidden");
    typeLetter();
  }, 600);
}

function typeLetter() {
  if (letterIndex < letterText.length) {
    typedLetter.innerHTML += letterText.charAt(letterIndex);
    typingSound.currentTime = 0;
    typingSound.play().catch(() => {});
    letterIndex++;
    setTimeout(typeLetter, 40);
  }
}

/* ================= FINAL OVERLAY + PAGE ================= */
function playFinalAnimation(callback) {
  const overlay = document.getElementById("finalOverlay");

  overlay.classList.add("active");

  setTimeout(() => {
    overlay.classList.remove("active");
    callback();
  }, 700);
}

function showFinalPage() {
  hideAll();
  document.getElementById("finalPage").classList.remove("hidden");
}

/* ================= HEARTS ================= */
function startHearts() {
  if (heartInterval) return;

  heartInterval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }, 300);
}
