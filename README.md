# GamesVauch

A full-stack personal video game library and discovery platform.

## Vision

GamesVauch is being developed as a college project with a five-star scope: a polished frontend, REST API, relational database, authentication, game-library management, search and filtering, statistics, reviews, favorites, and future integrations with external game databases.

## Planned stack

- Frontend: HTML5, CSS3, JavaScript (ES Modules)
- Backend: Node.js + Express
- Database: MySQL
- API: REST + JSON
- Authentication: JWT + bcrypt
- Validation/security: express-validator, helmet, CORS, rate limiting

## Initial modules

1. User registration and authentication
2. Personal game library
3. Game CRUD
4. Status tracking: Backlog, Playing, Completed, Dropped
5. Ratings, notes and playtime
6. Favorites and custom lists
7. Search, filters and sorting
8. Dashboard and statistics
9. Public profile
10. Admin-ready architecture

## Project structure

```text
GamesVauch/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.js
│   └── package.json
├── database/
│   └── schema.sql
├── frontend/
│   ├── css/
│   ├── js/
│   ├── pages/
│   └── index.html
├── .gitignore
└── README.md
```

## Development roadmap

### Phase 1 — Foundation
- Project structure
- Database schema
- Express server
- Health endpoint
- Responsive landing page

### Phase 2 — Core library
- Authentication
- Games CRUD
- User library
- Search/filter/sort

### Phase 3 — Experience
- Dashboard
- Reviews and ratings
- Favorites
- Statistics and charts
- Responsive/mobile UX

### Phase 4 — Advanced
- External game API integration
- Recommendations
- Custom lists
- Achievements
- Admin panel
- Production deployment and hardening

## Status

🚧 Initial architecture in progress.
