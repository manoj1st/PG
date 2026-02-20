# Kwality Jewellers-style Platform Blueprint (React + Node)

<<<<<<< codex/analyze-website-and-create-react-components-gb5mh5
This repo contains a practical fullstack starter for a professional jewellery storefront experience.

## Frontend delivered

- React + Vite scaffold with routing and shared styling.
- Fully composed pages:
  - Home page
  - Product listing page
  - Product details page
  - Cart page
  - Checkout page
- Product grid now shows pricing and an **Add to cart** action on every card.
- Shared cart state using React context.
- Test setup with Vitest + Testing Library.

## Backend delivered

- Node.js + Express modular API skeleton with health/meta routes.
=======
This repo now contains a practical fullstack starter for building a professional jewellery website inspired by Kwality-style UX patterns.

## Frontend delivered

- React + Vite application scaffold with routing and global styles.
- Complete page composition for:
  - Home page
  - Product listing page
  - Product details page
- Pages are built using the existing micro-components (`layout`, `common`, `home`, `product`).
- Mock data layer for categories, trust badges, and products.
- Test setup with Vitest + Testing Library and page-level tests.

## Backend delivered

- Node.js + Express modular API skeleton with domain modules and health/meta routes.
>>>>>>> main

## Run locally

```bash
cd frontend
npm install
npm run dev
npm run test
```

```bash
cd backend
npm install
npm run dev
```
