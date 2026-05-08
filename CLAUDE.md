# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Architecture

This is a single-page React 19 app built with Vite. There is no routing, no backend, and no external state management library.

**Current structure:**
- `src/App.jsx` — the entire application: all state, logic, and UI in one component
- `src/App.css` — component styles
- `src/index.css` — global styles
- `src/main.jsx` — React entry point

**State:** Managed with `useState` directly in `App.jsx`. Transactions are stored in local component state and reset on page refresh (no persistence).

**Known bugs in the current code:**
- `amount` is stored as a string, so `totalIncome` and `totalExpenses` use string concatenation instead of numeric addition (the `reduce` adds strings, not numbers)
- Transaction IDs use `Date.now()` which can collide if two are added in the same millisecond

## Git history context

Previous commits show TanStack Router, React Query, and an RPC/server setup — all removed in commit `b4a3ee2`. The current codebase is intentionally a fresh single-component baseline, likely being rebuilt.
