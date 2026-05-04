# Full-Stack Interview — Product Catalog

A monorepo containing a **React + MUI** frontend and a **NestJS** backend, scaffolded with pnpm workspaces.

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 9 (`corepack enable` to activate)

### Install & Run

```bash
# Install all dependencies
pnpm install

# Start both frontend and backend in dev mode
pnpm dev

# Run all tests
pnpm test
```

| App      | URL                       |
| -------- | ------------------------- |
| Frontend | http://localhost:5173     |
| Backend  | http://localhost:3000/api |

---

## The Challenge

You have **1 hour** to build a product catalog with wishlist functionality. We are not expecting a fully polished product, so please don't feel that you need to complete everything.

The backend serves product data from a JSON file, and the frontend displays it. Your job is to build out both sides.

### What's Already Built

- **Backend**: A single `GET /api/store-name` route that returns `{ "name": "The Tech Library" }`. CORS is configured for the frontend origin.
- **Frontend**: Fetches the store name on mount and displays it in a Material-UI `AppBar`. A placeholder area below reads _"Product Library will go here"_.
- **Data**: `apps/backend/src/data/products.json` contains 10 mock products with `id`, `name`, `type`, and `price` fields.
- **Tests**: Passing unit tests for the existing store-name endpoint and App component.

---

### What Are We Expecting?

We're looking for **production-ready code**, not a finished product. If time runs out before you complete every feature, that's perfectly fine — we'd much rather see well-structured, thoughtful code for fewer features than rushed code that ticks every box.

In practice, that means:

- **Clean, readable code** — clear naming, small focused functions/components, and consistent style.
- **Proper error handling** — don't let things fail silently; surface meaningful feedback.
- **Sensible project structure** — organise files and modules in a way that scales.
- **Type safety** — leverage TypeScript the way it's intended.
- **Testing** — write tests that give you confidence the code works, not just coverage for the sake of it.
- **Good API design** — appropriate status codes, validation, and predictable behaviour.

Think of it as: _"If this were going into a real codebase, would I be happy to open a PR with this?"_

---

### Core Requirements

Build a UI that displays the product catalog and allows users to add items to a wishlist. The wishlist can be managed in-memory on the backend. You will need to add appropriate API endpoints to support this functionality. The product list can be filtered by type, and each product should have an "Add to Wishlist" button. You are able to design the UI as you see fit, but it should be clear and user-friendly.

You can add any additional packages or tools you think are necessary to complete the task. Focus on writing clean, maintainable code and demonstrating your understanding of full-stack development principles.

---

### Extension Tasks

_If you finish the core requirements early, pick from these:_

1. **Wishlist page** — Add endpoints and a separate view that displays all wishlisted items.
2. **Remove from wishlist** — Allow items to be removed from the wishlist.
3. **Search** — Allow the product list to be filtered by a search term.
4. **Duplicate prevention** — Return an appropriate error if a product is already in the wishlist.

---

## Can I Use AI?

Yes, you can use AI tools to assist you! However, we want to see your understanding and problem-solving skills. If you use AI-generated code, please make sure to:

- Understand the code you're using and be able to explain it.
- Modify and adapt it to fit the requirements of the challenge.
- Document any AI assistance in your README, including any prompts you used.

---

## Submission

Please submit your completed code as a GitHub repository link. Include a README with:

- Instructions to run the project.
- Any assumptions or decisions you made.
- If you used AI, a brief note on how you used it.
- Any additional features you implemented beyond the core requirements.

---

## Project Structure

```
├── apps/
│   ├── backend/          # NestJS API
│   │   └── src/
│   │       ├── data/products.json   # Product data (10 items)
│   │       ├── app.controller.ts    # Existing: GET /api/store-name
│   │       ├── app.service.ts
│   │       └── *.spec.ts            # Vitest unit tests
│   └── frontend/         # React + Vite + MUI
│       └── src/
│           ├── App.tsx              # Main component with AppBar
│           └── App.test.tsx         # Vitest + Testing Library tests
├── tsconfig.base.json    # Shared strict TypeScript config
└── pnpm-workspace.yaml
```

## Scripts

| Script        | Description                           |
| ------------- | ------------------------------------- |
| `pnpm dev`    | Start frontend & backend concurrently |
| `pnpm test`   | Run all workspace tests               |
| `pnpm build`  | Build all workspaces                  |
| `pnpm lint`   | Lint all workspaces                   |
| `pnpm format` | Format code with Prettier             |

---

## Submission

### How to run the project

```bash
pnpm install
pnpm dev
pnpm test
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000/api

### Assumptions & decisions

- The wishlist is stored in-memory as an array of product IDs, as allowed by the brief
- Product IDs are used instead of full objects to avoid duplicating data and maintain a single source of truth
- Filtering is handled on the frontend due to the small dataset; for larger datasets, this would be moved to the backend
- Duplicate prevention is enforced on the backend to ensure business rules are not dependent on frontend behaviour
- The backend structure is kept within a single controller/service due to the time constraint, but can be easily extended into modules
- Frontend state is synchronised with the backend wishlist on load

### Additional features

- Product filtering by type
- Duplicate wishlist prevention (backend validation)
- Disabled “Add to Wishlist” button for already added items
- Frontend and backend error handling
- Tests covering key user-facing behaviours (filtering, wishlist, duplicates)

### Testing
- Backend tests cover core service and controller behaviour, including:
  - product retrieval
  - wishlist retrieval
  - duplicate prevention
  - error handling (invalid product, duplicates)
- Frontend tests use React Testing Library to validate user-facing behaviour:
  - store name is fetched and rendered
  - products are displayed after API calls
  - clicking “Add to Wishlist” updates UI state (button disabled)
- API calls are mocked using vi.fn() to ensure tests are deterministic and do not depend on a running backend
- Tests focus on behaviour rather than implementation details, aligning with user interactions and expected UI outcomes
- Due to time constraints, tests prioritise core flows; with more time, I would expand coverage to include error states, filtering behaviour, and edge cases

### AI usage
- AI tools were used to clarify requirements and review implementation approaches.
- All code was written, adapted, and fully understood by me, and I am able to explain all design decisions and trade-offs.

### What I would improve with more time

- Add DTO validation using class-validator to enforce request structure at runtime
- Persist wishlist data using a database instead of in-memory storage
- Introduce loading states in the frontend for improved user experience
- Refactor the frontend into smaller reusable components
- Expand test coverage to include error states and edge cases