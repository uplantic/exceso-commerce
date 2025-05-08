# EXCESO Commerce Monorepo

This is the full-stack commerce platform for **EXCESO**, built with [MedusaJS](https://medusajs.com) and [Next.js](https://nextjs.org).
The repository contains both the backend (Medusa) and the storefront (Next.js).

---

## 📁 Project Structure

```
Shop/
├── exceso/                # Medusa backend
├── exceso-storefront/     # Next.js storefront
```

---

## ⚙️ Local Development

### Backend (Medusa)

```bash
cd exceso
npm install
npm run dev
```

Make sure PostgreSQL and Redis are running locally.

### Frontend (Next.js)

```bash
cd exceso-storefront
npm install
npm run dev
```

The storefront expects the Medusa backend to be available at `http://localhost:9000`.

---

## 🧪 Requirements

* Node.js ≥ 18
* PostgreSQL ≥ 14
* Redis
* Stripe (Test keys)
* [Medusa CLI](https://docs.medusajs.com)

---

## 📄 Environment Variables

Backend: `exceso/.env`
Frontend: `exceso-storefront/.env.local`

---

## 📦 Features

* Product catalog & product detail pages
* Shopping cart & checkout flow
* Stripe integration
* Modular Medusa backend
* API key authentication
* Monorepo-friendly structure

---

## 📤 Deployment

Deployment planned via [Kamal](https://kamal-deploy.org) or Docker Compose.

---

## License

MIT