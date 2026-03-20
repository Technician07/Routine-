const habits = [
    { name: "Wake up early (5–6 AM)", icon: "🌅" },
    { name: "Morning Exercise", icon: "💪" },
    { name: "Daily Cricket Practice", icon: "🏏" },
    { name: "Eat Clean & Protein", icon: "🍗" },
    { name: "Drink 3–4L Water", icon: "💧" },
    { name: "Study 1–2 hours (CS)", icon: "💻" },
    { name: "Limit Social Media", icon: "📱" },
    { name: "Learn New Skill", icon: "🎓" },
    { name: "Night Self-Review", icon: "📖" },
    { name: "Sleep 7–8 hours", icon: "😴" }
];

const grid = document.getElementById('habit-grid');
const progressFill = document.getElementById('main-progress-fill');
const completionText = document.getElementById('completion-text');

// Render Habits
habits.forEach((habit, index) => {
    const row = document.createElement('div');
    row.className = 'habit-row';
    row.innerHTML = `
        <div class="habit-name"><span>${habit.icon}</span> ${habit.name}</div>
        <div class="checkbox-wrapper">
            <input type="checkbox" class="habit-check" onchange="updateProgress()">
        </div>
    `;
    grid.appendChild(row);
});

function updateProgress() {
    const total = habits.length;
    const checked = document.querySelectorAll('.habit-check:checked').length;
    const percentage = Math.round((checked / total) * 100);
    
    // Update UI
    progressFill.style.width = `${percentage}%`;
    completionText.innerText = `${percentage}% Complete`;
    
    // Logic for Level Up (Example: Every 100% day adds to level progress)
    if(percentage === 100) {
        completionText.style.color = "#39ff14";
        completionText.innerText = "MISSION ACCOMPLISHED!";
    } else {
        completionText.style.color = "#e2e8f0";
    }
}
