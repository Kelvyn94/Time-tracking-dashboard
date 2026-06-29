// ============================================
// DATA (from data.json)
// ============================================
const DATA = [
  {
    title: "Work",
    timeframes: {
      daily: { current: 5, previous: 7 },
      weekly: { current: 32, previous: 36 },
      monthly: { current: 103, previous: 128 },
    },
  },
  {
    title: "Play",
    timeframes: {
      daily: { current: 1, previous: 2 },
      weekly: { current: 10, previous: 8 },
      monthly: { current: 23, previous: 29 },
    },
  },
  {
    title: "Study",
    timeframes: {
      daily: { current: 0, previous: 1 },
      weekly: { current: 4, previous: 7 },
      monthly: { current: 13, previous: 19 },
    },
  },
  {
    title: "Exercise",
    timeframes: {
      daily: { current: 1, previous: 1 },
      weekly: { current: 4, previous: 5 },
      monthly: { current: 11, previous: 18 },
    },
  },
  {
    title: "Social",
    timeframes: {
      daily: { current: 1, previous: 3 },
      weekly: { current: 5, previous: 10 },
      monthly: { current: 21, previous: 23 },
    },
  },
  {
    title: "Self Care",
    timeframes: {
      daily: { current: 0, previous: 1 },
      weekly: { current: 2, previous: 2 },
      monthly: { current: 7, previous: 11 },
    },
  },
];

// ============================================
// STATE
// ============================================
let currentPeriod = "weekly";

// ============================================
// DOM REFS
// ============================================
const activityGrid = document.querySelector(".activity-grid");
const periodBtns = document.querySelectorAll(".period-btn");

// ============================================
// PERIOD LABEL HELPER
// ============================================
function getPeriodLabel(period) {
  const labels = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };
  return labels[period] || "Last Week";
}

// ============================================
// RENDER ACTIVITY CARDS
// ============================================
function renderCards(period) {
  const periodLabel = getPeriodLabel(period);

  // Build HTML string from data
  const cardsHTML = DATA.map((item) => {
    const timeframe = item.timeframes[period];
    const current = timeframe.current;
    const previous = timeframe.previous;
    // Convert title to kebab-case for icon filename
    const iconName = item.title.toLowerCase().replace(" ", "-");

    return `
      <article class="activity-card" data-activity="${item.title}">
        <div class="card-icon">
          <img src="./images/icon-${iconName}.svg" alt="" aria-hidden="true" />
        </div>
        <div class="card-content">
          <div class="card-header">
            <h2 class="card-title">${item.title}</h2>
            <button class="card-menu-btn" aria-label="More options">⋯</button>
          </div>
          <p class="card-current">${current}hrs</p>
          <p class="card-previous">${periodLabel} - ${previous}hrs</p>
        </div>
      </article>
    `;
  }).join("");

  activityGrid.innerHTML = cardsHTML;
}

// ============================================
// UPDATE ACTIVE PERIOD BUTTON
// ============================================
function setActivePeriod(period) {
  periodBtns.forEach((btn) => {
    const isActive = btn.dataset.period === period;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive);
  });
}

// ============================================
// HANDLE PERIOD CHANGE
// ============================================
function changePeriod(period) {
  currentPeriod = period;
  setActivePeriod(period);
  renderCards(period);
}

// ============================================
// EVENT LISTENERS
// ============================================
periodBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const period = btn.dataset.period;
    changePeriod(period);
  });
});

// ============================================
// INITIAL RENDER
// ============================================
renderCards(currentPeriod);
