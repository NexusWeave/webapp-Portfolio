FROM node:24-bookworm

WORKDIR /app

ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=development

COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000
CMD ["npx", "nuxt", "dev", "--host", "0.0.0.0"]