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

// Update score display
function updateDisplay() {
  scores.forEach((score, index) => {
    document.getElementById(`score-${index}`).textContent = score;
  });
}

// Change score logic (add or subtract 100 points)
function changeScore(countIndex, change) {
  scores[countIndex] += change * 1; // Adds or subtracts 100 points
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  updateDisplay();
}

// Initialize the score display
document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();

  document.querySelectorAll('.btn-increase').forEach(button => {
    button.addEventListener('click', () => {
      const countIndex = parseInt(button.getAttribute('data-count'), 10);
      changeScore(countIndex, 1); // Add 100 points
    });
  });

  document.querySelectorAll('.btn-decrease').forEach(button => {
    button.addEventListener('click', () => {
      const countIndex = parseInt(button.getAttribute('data-count'), 10);
      changeScore(countIndex, -1); // Subtract 100 points
    });
  });
  
function changeScore(index, change) {
  const { min, max } = limits[index];

  scores[index] = Math.min(
    max,
    Math.max(min, scores[index] + change)
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  updateDisplay();
}
});
