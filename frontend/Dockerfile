# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# --- DEFININDO VARIÁVEIS DIRETAMENTE AQUI (Bypass Easypanel UI) ---
ENV VITE_API_URL=https://dash.fastdevdigital.com.br/api
ENV VITE_SUPABASE_URL=https://qibzrtoeuuduvwicfidx.supabase.co
ENV VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpYnpydG9ldXVkdXZ3aWNmaWR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMzkzMzYsImV4cCI6MjA3ODgxNTMzNn0.hd0KayR_7PklB1APyc8oa1zoP7c_sOg54flF23zqf8w
# ------------------------------------------------------------------

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

# Criar diretório de logs
RUN mkdir -p /var/log/nginx

# Expor porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
