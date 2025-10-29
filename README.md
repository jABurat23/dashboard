# Messenger Bot Management Dashboard 🚀🤖

A clean, responsive React dashboard for monitoring and configuring a Facebook Messenger bot. Built with Vite and Tailwind CSS for fast development and a modern UI.

Highlights
- Lightweight mock authentication (email/password)
- Dark Mode by default, light mode toggle 🌗
- Real-time monitoring panels (Messages, Response Time, Errors, Uptime)
- Command management (Create, Read, Update, Delete)
- Activity log with detailed inspection panel
- Settings page for bot prefix and response length
- Non-removable developer attribution link remains in the UI 🔗

Tech stack
- Frontend: React
- Bundler: Vite
- Styling: Tailwind CSS
- Dev container: Ubuntu 24.04 LTS

Prerequisites ✅
- Node.js (LTS recommended) and npm or yarn
- Git (if cloning)

Quick setup (dev)
1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Start dev server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open the app (Vite default):
   ```
   http://localhost:5173
   ```
   (In this dev container, you can run: "$BROWSER" http://localhost:5173 to open the host browser)

Usage notes
- Sign in with any non-empty email and password (e.g., `test@bot.com` / `password123`) — authentication is mocked.
- Toggle theme with the Sun/Moon icon in the navbar.
- Explore pages: Dashboard, Commands, Activity Log, Settings.

Scripts
- `npm run dev` — start dev server
- `npm run build` — build production bundle
- `npm run preview` — preview production build locally

Configuration & extension
- This project uses mock stores and authentication. Replace mocks with real APIs for production.
- Tailwind configuration and Vite settings are typical — update classnames or build targets as needed.

Troubleshooting
- Port collision: if 5173 is in use, Vite will prompt for another port — follow the terminal instruction.
- Missing deps: run `npm ci` or remove node_modules and reinstall.

Testing
- No tests are included by default. Add unit/integration tests per your preferred framework (Jest, Vitest, React Testing Library).

Contributing 🤝
- Contributions are welcome. Open an issue or submit a PR.
- Keep changes small and document behavior changes.

License
- Add your chosen license (e.g., MIT). This README does not ship a license by default — add LICENSE file if needed.

Acknowledgements
- Built as a front-end demo; replace mocks with real services for production use.

Developer note
- The UI contains a required developer attribution link that must remain visible and non-removable per project requirements. 🔒