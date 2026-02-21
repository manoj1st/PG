# Kwality Jewellers-style Platform Blueprint (React + Node)

This repo contains a practical fullstack starter for a professional jewellery storefront experience.

## Frontend delivered

- React + Vite scaffold with routing and shared styling.
- Fully composed pages:
  - Home page
  - Product listing page
  - Product details page
  - Cart page
  - Checkout page
  - Login / Signup flow
- Shared auth/cart state and API service layers.
- Test setup with Vitest + Testing Library.

## Backend delivered

- Node.js + Express API with multi-tenant SaaS-style design.
- Two route groups:
  - `public` routes for org discovery, catalog browsing, signup/login, OTP verification.
  - `secure` routes for authenticated profile, users, and customers.
- Tenant isolation via `x-org-id` header (or `orgId` query fallback).
- JSON file (`backend/src/data/sample-db.json`) currently acts as data store for multiple organizations.
- Added additional tenant data for `shivshankar-jewelers` (ShivShankar Jewelers) in sample DB.
- Frontend can switch active organization by opening routes with `?orgId=<tenant-id>` (for example `http://localhost:5173/shop/gold?orgId=shivshankar-jewelers`) while backend runs on `http://localhost:5000`.
- Backward-compatible `/api/products*` routes retained for current frontend integration.

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
