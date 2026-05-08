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

Single-page React 19 app built with Vite. No routing, no backend, no external state management.

**Current structure:**

- `src/App.jsx` — transaction state, `categories` constant, form state + inline form UI, orchestrates child components
- `src/Summary.jsx` — displays income/expense/balance totals; derives values from `transactions` prop
- `src/TransactionList.jsx` — renders transaction table with type/category filter UI (own `useState` for filter state)
- `src/TransactionForm.jsx` — standalone form component with own state; accepts `categories` and `onAdd` props — **created but not yet wired into App.jsx**
- `src/App.css` — component styles
- `src/index.css` — global styles
- `src/main.jsx` — React entry point

**State:** `transactions` array lives in `App.jsx`. Filter state lives in `TransactionList.jsx`. Form state is duplicated — `App.jsx` has inline form state AND `TransactionForm.jsx` manages its own state (pending integration).

**Data shape per transaction:**

```js
{ id: number, description: string, amount: number, type: 'income'|'expense', category: string, date: string }
```

**Categories** (defined in `App.jsx`, passed as prop to form and list):
`food`, `housing`, `utilities`, `transport`, `entertainment`, `salary`, `other`

**No persistence** — state resets on page refresh.

**Known bugs:**

- Transaction IDs use `Date.now()` — can collide if two added in same millisecond
- `TransactionForm.jsx` exists but `App.jsx` still uses inline form; migration incomplete

## Git history context

Previous commits show TanStack Router, React Query, and an RPC/server setup — all removed in commit `b4a3ee2`. Monolithic `App.jsx` is being split into components (`Summary`, `TransactionList`, `TransactionForm`).
