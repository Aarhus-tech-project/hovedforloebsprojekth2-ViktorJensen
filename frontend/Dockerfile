# FROM node:20-alpine AS builder
# WORKDIR /app

# COPY package*.json ./
# COPY prisma ./prisma
# COPY prisma.config.ts ./

# RUN npm install

# # DATABASE_URL needed at generate time
# ARG DATABASE_URL
# ENV DATABASE_URL=${DATABASE_URL}

# RUN npx prisma generate

# COPY . .
# RUN npm run build

# # --- Production stage ---
# FROM node:20-alpine
# WORKDIR /app

# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/node_modules ./node_modules

# EXPOSE 3000
# ENV NODE_ENV=production
# CMD ["npm", "start"]

FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN npm install

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate

COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "start"]