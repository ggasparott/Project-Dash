# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build Arguments (variáveis de ambiente para build)
ARG VITE_API_URL
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# Criar .env para o build
RUN echo "VITE_API_URL=${VITE_API_URL}" > .env && \
    echo "VITE_SUPABASE_URL=${VITE_SUPABASE_URL}" >> .env && \
    echo "VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}" >> .env

# Build da aplicação
RUN npm run build

# Verificar se o build foi criado
RUN ls -la /app/dist

# Etapa 2: Produção com Nginx
FROM nginx:alpine

# Copiar arquivos buildados
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
