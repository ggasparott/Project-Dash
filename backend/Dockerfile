FROM node:20-alpine

WORKDIR /app

# Instalar curl para healthcheck
RUN apk add --no-cache curl

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Criar diretório de logs
RUN mkdir -p logs

# Expor porta
EXPOSE 3000

# Healthcheck mais robusto
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -f http://127.0.0.1:3000/health || exit 1

# Comando para iniciar
CMD ["node", "src/server.js"]
