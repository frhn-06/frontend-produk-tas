# 1. Gunakan image Node.js yang ringan
FROM node:20-alpine AS builder
WORKDIR /app

# 2. Install dependencies (gunakan package-lock.json jika ada)
COPY package*.json ./
RUN npm ci

# 3. Copy seluruh kode frontend dan lakukan build Next.js
COPY . .
RUN npm run build

# 4. Tahap menjalankan aplikasi (Production/Runner)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy file hasil build dari tahap builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]