const games = window.GamesVauchMock?.mockGames || [];

const grid = document.querySelector('#gameGrid');
const search = document.querySelector('#searchInput');
const filter = document.querySelector('#statusFilter');
const count = document.querySelector('#gameCount');
const completedPercent = document.querySelector('#completedPercent');
const totalHours = document.querySelector('#totalHours');
const progressBar = document.querySelector('#progressBar');

const normalizeStatus = (status) => status.toLowerCase();

function updateStats() {
  const completed = games.filter((game) => normalizeStatus(game.status) === 'completed').length;
  const percentage = games.length ? Math.round((completed / games.length) * 100) : 0;
  const hours = games.reduce((sum, game) => sum + Number(game.hours || 0), 0);

  count.textContent = games.length;
  completedPercent.textContent = `${percentage}%`;
  totalHours.textContent = `${hours}h`;
  progressBar.style.width = `${percentage}%`;
}

function render() {
  const term = search.value.trim().toLowerCase();
  const status = filter.value;
  const visible = games.filter((game) => {
    const matchesText = game.title.toLowerCase().includes(term) || game.genre.toLowerCase().includes(term) || game.platform.toLowerCase().includes(term);
    const matchesStatus = status === 'all' || normalizeStatus(game.status) === status;
    return matchesText && matchesStatus;
  });

  grid.innerHTML = visible.map((game) => `
    <article class="game-card">
      <div>
        <span class="badge">${game.status}</span>
        <h3>${game.title}</h3>
        <span class="muted">${game.genre} · ${game.platform}</span>
      </div>
      <div class="game-meta"><span>${game.hours}h played</span><span>★ ${game.rating || '—'}</span></div>
    </article>
  `).join('') || '<p class="muted">No games found.</p>';
}

search.addEventListener('input', render);
filter.addEventListener('change', render);

document.querySelector('#demoButton').addEventListener('click', () => {
  search.value = '';
  filter.value = 'all';
  render();
  document.querySelector('#library').scrollIntoView({ behavior: 'smooth' });
});

updateStats();
render();
