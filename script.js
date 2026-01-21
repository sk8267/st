// ================================
// Config
// ================================
const STORAGE_KEY = "countScores";
const DEFAULT_SCORES = [21, 3, 4, 2, 2, 2];

const limits = [
  { min: 0, max: 21 }, // HP
  { min: 0, max: 3 },  // Hit dice
  { min: 0, max: 4 },  // 1st level slots
  { min: 0, max: 2 },  // 2nd level slots
  { min: 0, max: 2 },  // Bladesong
  { min: 0, max: 2 }   // Raven Queen
];

// ================================
// State (safe load)
// ================================
let scores;

try {
  const saved = localStorage.getItem(STORAGE_KEY);
  scores = saved ? JSON.parse(saved) : [...DEFAULT_SCORES];
} catch (e) {
  scores = [...DEFAULT_SCORES];
}

// ================================
// UI Update
// ================================
function updateDisplay() {
  scores.forEach((score, index) => {
    const el = document.getElementById(`score-${index}`);
    if (el) {
      el.textContent = score;
    }
  });
}

// ================================
// Score Change
// ================================
function changeScore(index, delta) {
  const limit = limits[index];
  if (!limit) return;

  scores[index] = Math.min(
    limit.max,
    Math.max(limit.min, scores[index] + delta)
  );

  updateDisplay();

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch (e) {
    console.warn("localStorage unavailable");
  }
}

// ================================
// Reset
// ================================
function resetScores() {
  scores = [...DEFAULT_SCORES];
  updateDisplay();

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch (e) {
    console.warn("localStorage unavailable");
  }
}

// ================================
// Init
// ================================
document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();

  // + buttons
  document.querySelectorAll(".btn-increase").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.count);
      if (!Number.isNaN(index)) {
        changeScore(index, 1);
      }
    });
  });

  // - buttons
  document.querySelectorAll(".btn-decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.count);
      if (!Number.isNaN(index)) {
        changeScore(index, -1);
      }
    });
  });

  // Reset button
  const resetBtn = document.getElementById("reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetScores);
  }
});
