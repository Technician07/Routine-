const defaultHabits = [
    "Wake up early (5–6 AM)", "Morning exercise", "Daily cricket practice", 
    "Eat clean & protein", "Drink 3–4L water", "Study 1–2 hours (CS)", 
    "Limit social media", "Learn one new skill", "Night self-review", "Sleep 7–8 hours"
];

let state = JSON.parse(localStorage.getItem('mrtechnician_v2')) || {
    date: new Date().toLocaleDateString(),
    activeHabits: defaultHabits.map(h => ({ name: h, completed: false }))
};

function init() {
    checkDateReset();
    renderHabits();
    updateUI();
    document.getElementById('current-date').innerText = state.date;
}

function checkDateReset() {
    const today = new Date().toLocaleDateString();
    if (state.date !== today) {
        // Archive old data if needed, then reset
        state.date = today;
        state.activeHabits.forEach(h => h.completed = false);
        save();
    }
}

function renderHabits() {
    const list = document.getElementById('habit-list');
    list.innerHTML = '';
    state.activeHabits.forEach((habit, index) => {
        const div = document.createElement('div');
        div.className = `habit-item ${habit.completed ? 'completed' : ''}`;
        div.innerHTML = `
            <span>${habit.name}</span>
            <input type="checkbox" class="checkbox-custom" 
                   ${habit.completed ? 'checked' : ''} 
                   onclick="toggleHabit(${index})">
        `;
        list.appendChild(div);
    });
}

function toggleHabit(index) {
    state.activeHabits[index].completed = !state.activeHabits[index].completed;
    save();
    renderHabits();
    updateUI();
}

function updateUI() {
    const total = state.activeHabits.length;
    const completed = state.activeHabits.filter(h => h.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    document.getElementById('percent-text').innerText = percent + '%';
    document.getElementById('progress-circle').setAttribute('stroke-dasharray', `${percent}, 100`);
}

function save() {
    localStorage.setItem('mrtechnician_v2', JSON.stringify(state));
}

function togglePlanningMode() {
    const modal = document.getElementById('planning-modal');
    modal.style.display = 'block';
    const options = document.getElementById('planning-options');
    options.innerHTML = defaultHabits.map(h => `
        <div style="margin-bottom:10px">
            <input type="checkbox" checked id="p-${h}"> ${h}
        </div>
    `).join('');
}

function saveNightlyPlan() {
    // Collect only the habits you want for tomorrow
    const selected = defaultHabits.filter(h => document.getElementById(`p-${h}`).checked);
    state.activeHabits = selected.map(h => ({ name: h, completed: false }));
    save();
    location.reload(); // Refresh to start the "New Day"
}

init();




