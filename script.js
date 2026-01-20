const STORAGE_KEY = "countScores";
let scores = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [21, 3, 4, 2, 2, 2];

const limits = [
  { min: 0, max: 21 }, // HP
  { min: 0, max: 3 },  // Hit dice
  { min: 0, max: 4 },  // 1st level slots
  { min: 0, max: 2 },  // 2nd level slots
  { min: 0, max: 2 },  // Bladesong
  { min: 0, max: 2 }   // Raven Queen
];

function updateDisplay() {
  scores.forEach((score, index) => {
    const el = document.getElementById(`score-${index}`);
    if (el) el.textContent = score;
  });
}

function changeScore(index, change) {
  const { min, max } = limits[index];

  scores[index] = Math.min(
    max,
    Math.max(min, scores[index] + change)
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  updateDisplay();
}

document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();

  document.querySelectorAll('.btn-increase').forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.dataset.count, 10);
      changeScore(index, 1);
    });
  });

  document.querySelectorAll('.btn-decrease').forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.dataset.count, 10);
      changeScore(index, -1);
    });
  });
});
