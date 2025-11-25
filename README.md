# titan-observatory-dynamic

Next.js, Tailwind, Prisma, NextAuth

## copy the .env.example and fill out the real info

```bash
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run dev
```

## Deploy Notes
Use Node 20+, a running PostgreSQL, and reverse-proxy with Nginx. Run `npm run build` then `npm start` (or use PM2).
