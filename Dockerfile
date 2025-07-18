# Build do Frontend (Next.js)
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY marmitify-frontend/package*.json ./
RUN npm ci
COPY marmitify-frontend/ ./
RUN npm run build

# Build do Backend (NestJS)
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY marmitify-backend/package*.json ./
RUN npm ci
COPY marmitify-backend/ ./
RUN npm run build

# Imagem de desenvolvimento
FROM node:20-alpine AS development

WORKDIR /app

# Instalar dependências de produção do backend
COPY --from=backend-builder /app/backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci --only=production && npm cache clean --force

# Copiar build do backend
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/node_modules ./node_modules

# Instalar dependências de produção do frontend
WORKDIR /app/frontend
COPY --from=frontend-builder /app/frontend/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copiar build do frontend
COPY --from=frontend-builder /app/frontend/.next ./.next
COPY --from=frontend-builder /app/frontend/public ./public
COPY --from=frontend-builder /app/frontend/next.config.ts ./

# Voltar ao diretório raiz
WORKDIR /app

# Instalar netcat para verificação de saúde
RUN apk add --no-cache netcat-openbsd

# Script otimizado para Docker Compose
RUN echo '#!/bin/sh' > start.sh && \
    echo 'echo "🍱 Iniciando Marmitify via Docker Compose..."' >> start.sh && \
    echo '' >> start.sh && \
    echo '# Aguardar PostgreSQL estar disponível' >> start.sh && \
    echo 'echo "⏳ Aguardando PostgreSQL..."' >> start.sh && \
    echo 'while ! nc -z postgres 5432; do' >> start.sh && \
    echo '  echo "🔄 PostgreSQL ainda não está pronto..."' >> start.sh && \
    echo '  sleep 2' >> start.sh && \
    echo 'done' >> start.sh && \
    echo 'echo "✅ PostgreSQL está pronto!"' >> start.sh && \
    echo '' >> start.sh && \
    echo 'echo "📡 Iniciando Backend..."' >> start.sh && \
    echo 'cd /app/backend && node dist/main.js &' >> start.sh && \
    echo 'BACKEND_PID=$!' >> start.sh && \
    echo '' >> start.sh && \
    echo 'echo "🎨 Iniciando Frontend..."' >> start.sh && \
    echo 'cd /app/frontend && npm start &' >> start.sh && \
    echo 'FRONTEND_PID=$!' >> start.sh && \
    echo '' >> start.sh && \
    echo 'echo "🚀 Marmitify iniciado com sucesso!"' >> start.sh && \
    echo 'echo "🌐 Frontend: http://localhost:3000"' >> start.sh && \
    echo 'echo "🔗 Backend: http://localhost:3001"' >> start.sh && \
    echo 'echo "🗃️ PostgreSQL: postgres://postgres@localhost:5432/marmitify"' >> start.sh && \
    echo '' >> start.sh && \
    echo '# Tratamento de sinais' >> start.sh && \
    echo 'trap "echo \"🛑 Parando serviços...\"; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" TERM INT' >> start.sh && \
    echo '' >> start.sh && \
    echo '# Aguardar processos' >> start.sh && \
    echo 'wait' >> start.sh && \
    chmod +x start.sh

# Expor as portas
EXPOSE 3000 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD nc -z localhost 3000 && nc -z localhost 3001 || exit 1

# Comando de inicialização
CMD ["./start.sh"]