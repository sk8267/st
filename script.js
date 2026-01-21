const STORAGE_KEY = "countScores";

// Load scores safely
let scores;
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  scores = saved ? JSON.parse(saved) : [21, 3, 4, 2, 2, 2];
} catch (e) {
  scores = [21, 3, 4, 2, 2, 2];
}

// Min / max limits
const limits = [
  { min: 0, max: 21 }, // HP
  { min: 0, max: 3 },  // Hit dice
  { min: 0, max: 4 },  // 1st level slots
  { min: 0, max: 2 },  // 2nd level slots
  { min: 0, max: 2 },  // Bladesong
  { min: 0, max: 2 }   // Raven Queen
];

// Update UI
function updateDisplay() {
  scores.forEach((score, index) => {
    const el = document.getElementById(`score-${index}`);
    if (el) {
      el.textContent = score;
    }
  });
}

// Change score safely
function changeScore(index, change) {
  const limit = limits[index];
  if (!limit) return;

  scores[index] = Math.min(
    limit.max,
    Math.max(limit.min, scores[index] + change)
  );

  // Update UI FIRST (never blocked)
  updateDisplay();

  // Persist if possible
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch (e) {
    console.warn("localStorage unavailable");
  }
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();

  document.querySelectorAll(".btn-increase").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.count);
      if (!Number.isNaN(index)) {
        changeScore(index, 1);
      }
    });
  });

  document.querySelectorAll(".btn-decrease").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.count);
      if (!Number.isNaN(index)) {
        changeScore(index, -1);
      }
    });
  });
});
