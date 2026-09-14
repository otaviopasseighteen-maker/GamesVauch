const mockGames = [
  { id: 1, title: 'Persona 5 Royal', genre: 'JRPG', platform: 'PC', status: 'Completed', hours: 142, rating: 10, favorite: true, cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.jpg', description: 'A stylish turn-based JRPG about a group of students who rebel against corruption.', tags: ['JRPG', 'Story Rich', 'Turn-Based'] },
  { id: 2, title: 'Persona 4 Golden', genre: 'JRPG', platform: 'PC', status: 'Playing', hours: 58, rating: 9, favorite: true, cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r8e.jpg', description: 'Investigate a mysterious small-town murder case while building bonds with your friends.', tags: ['JRPG', 'Mystery', 'Social Sim'] },
  { id: 3, title: 'Persona 3 Reload', genre: 'JRPG', platform: 'PC', status: 'Backlog', hours: 0, rating: 0, favorite: false, cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co7l9k.jpg', description: 'A modern remake of the acclaimed Persona 3 experience.', tags: ['JRPG', 'Dungeon Crawler', 'Story Rich'] },
  { id: 4, title: 'Elden Ring', genre: 'Action RPG', platform: 'PC', status: 'Completed', hours: 121, rating: 10, favorite: true, cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg', description: 'Explore a vast dark-fantasy world filled with challenging combat and discovery.', tags: ['Open World', 'Soulslike', 'Fantasy'] },
  { id: 5, title: 'Hades', genre: 'Roguelike', platform: 'PC', status: 'Playing', hours: 37, rating: 9, favorite: false, cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2i4m.jpg', description: 'Battle through the Underworld in this fast-paced action roguelike.', tags: ['Roguelike', 'Action', 'Indie'] },
  { id: 6, title: 'The Legend of Zelda: Tears of the Kingdom', genre: 'Adventure', platform: 'Switch', status: 'Backlog', hours: 0, rating: 0, favorite: false, cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.jpg', description: 'Explore the skies and lands of Hyrule in an expansive adventure.', tags: ['Adventure', 'Open World', 'Fantasy'] },
  { id: 7, title: 'Cyberpunk 2077', genre: 'Action RPG', platform: 'PC', status: 'Completed', hours: 96, rating: 9, favorite: false, cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2l2l.jpg', description: 'A futuristic open-world RPG set in Night City.', tags: ['Open World', 'Sci-Fi', 'RPG'] },
  { id: 8, title: 'Stardew Valley', genre: 'Simulation', platform: 'PC', status: 'Playing', hours: 84, rating: 8, favorite: false, cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1y5r.jpg', description: 'Build a new life, farm the land, and become part of a welcoming community.', tags: ['Simulation', 'Indie', 'Relaxing'] }
];

const mockUser = {
  id: 1,
  username: 'Otavio',
  displayName: 'Otavio',
  bio: 'JRPG enthusiast • Completionist • Always building the backlog',
  joined: '2026',
  avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=OV&backgroundColor=6d28d9'
};

const mockLists = [
  { id: 1, name: 'My Favorites', description: 'Games I would recommend without hesitation.', gameIds: [1, 2, 4] },
  { id: 2, name: 'JRPG Backlog', description: 'The next adventures waiting for me.', gameIds: [3] },
  { id: 3, name: 'Weekend Games', description: 'Perfect for a free weekend.', gameIds: [5, 8] }
];

const mockReviews = [
  { gameId: 1, rating: 10, text: 'One of the best RPG experiences in my library.', date: '2026-08-21' },
  { gameId: 4, rating: 10, text: 'Massive world, incredible exploration and unforgettable fights.', date: '2026-07-12' },
  { gameId: 5, rating: 9, text: 'Fast, addictive and incredibly polished.', date: '2026-08-03' }
];

window.GamesVauchMock = { mockGames, mockUser, mockLists, mockReviews };
