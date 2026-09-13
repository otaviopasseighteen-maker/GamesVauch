const games = [
  { title: 'Persona 5 Royal', genre: 'JRPG', status: 'completed', hours: 142 },
  { title: 'Persona 4 Golden', genre: 'JRPG', status: 'playing', hours: 58 },
  { title: 'Persona 3 Reload', genre: 'JRPG', status: 'backlog', hours: 0 },
  { title: 'Elden Ring', genre: 'Action RPG', status: 'completed', hours: 121 },
  { title: 'Hades', genre: 'Roguelike', status: 'playing', hours: 37 },
  { title: 'The Legend of Zelda: Tears of the Kingdom', genre: 'Adventure', status: 'backlog', hours: 0 }
];

const grid = document.querySelector('#gameGrid');
const search = document.querySelector('#searchInput');
const filter = document.querySelector('#statusFilter');
const count = document.querySelector('#gameCount');

function render() {
  const term = search.value.trim().toLowerCase();
  const status = filter.value;
  const visible = games.filter((game) => {
    const matchesText = game.title.toLowerCase().includes(term) || game.genre.toLowerCase().includes(term);
    const matchesStatus = status === 'all' || game.status === status;
    return matchesText && matchesStatus;
  });

  count.textContent = games.length;
  grid.innerHTML = visible.map((game) => `
    <article class="game-card">
      <div>
        <span class="badge">${game.status}</span>
        <h3>${game.title}</h3>
        <span class="muted">${game.genre}</span>
      </div>
      <div class="game-meta"><span>${game.hours}h played</span><span>★ —</span></div>
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
document.querySelector('#loginButton').addEventListener('click', () => {
  alert('Authentication is coming in Phase 2.');
});

render();
