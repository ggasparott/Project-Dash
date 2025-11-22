# 🚀 Deploy no Easypanel (VPS Hostinger)

## Pré-requisitos
- VPS Hostinger com Easypanel instalado
- Domínio `dash.fastdevdigital.com.br` configurado
- Credenciais do Supabase

## 📋 Passo a Passo

### 1. Configurar Variáveis de Ambiente

#### Backend (.env.production)
```bash
NODE_ENV=production
PORT=3000
SUPABASE_URL=sua_url_supabase
SUPABASE_ANON_KEY=sua_chave_anon
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service
JWT_SECRET=seu_secret_jwt_forte
FRONTEND_URL=https://dash.fastdevdigital.com.br
```

#### Frontend (.env.production)
```bash
VITE_API_URL=https://dash.fastdevdigital.com.br/api
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon
```

### 2. Deploy no Easypanel

#### Opção A: Deploy via GitHub (Recomendado)

1. **Push para GitHub**
   ```bash
   git add .
   git commit -m "feat: configurações de produção para deploy"
   git push origin main
   ```

2. **No Easypanel:**
   - Criar novo projeto "CRM Dashboard"
   - Conectar ao repositório GitHub
   - Configurar 2 serviços:

   **Serviço 1: Backend**
   - Nome: `crm-backend`
   - Tipo: `Web Service`
   - Build: `Docker`
   - Dockerfile Path: `backend/Dockerfile`
   - Context: `backend`
   - Port: `3000`
   - Health Check: `/health`
   - Variáveis de ambiente: (copiar do .env.production)

   **Serviço 2: Frontend**
   - Nome: `crm-frontend`
   - Tipo: `Web Service`
   - Build: `Docker`
   - Dockerfile Path: `frontend/Dockerfile`
   - Context: `frontend`
   - Port: `80`
   - Domínio: `dash.fastdevdigital.com.br`
   - SSL: Ativar (Let's Encrypt automático)

3. **Configurar Roteamento:**
   - Frontend: `dash.fastdevdigital.com.br` → porta 80
   - Backend via proxy: `/api/*` → `crm-backend:3000`

#### Opção B: Deploy Manual via Docker

1. **Conectar na VPS via SSH**
   ```bash
   ssh usuario@seu-ip-vps
   ```

2. **Clonar o repositório**
   ```bash
   cd /home
   git clone https://github.com/ggasparott/Project-Dash.git
   cd Project-Dash
   ```

3. **Configurar variáveis**
   ```bash
   cp backend/.env.production.example backend/.env.production
   cp frontend/.env.production.example frontend/.env.production
   nano backend/.env.production  # Editar com suas credenciais
   nano frontend/.env.production # Editar com suas credenciais
   ```

4. **Build e Deploy**
   ```bash
   docker-compose up -d --build
   ```

### 3. Verificar Deploy

```bash
# Verificar containers rodando
docker ps

# Ver logs do backend
docker logs crm-backend -f

# Ver logs do frontend
docker logs crm-frontend -f

# Testar endpoints
curl https://dash.fastdevdigital.com.br
curl https://dash.fastdevdigital.com.br/api/health
```

### 4. Configurar SSL (se não automático)

```bash
# No Easypanel, ativar SSL automático para o domínio
# Ou manualmente via Certbot:
certbot --nginx -d dash.fastdevdigital.com.br
```

### 5. Configurar Auto-Deploy (Opcional)

No Easypanel:
- Ativar "Auto Deploy on Git Push"
- Webhook será configurado automaticamente no GitHub

## 🔄 Atualizações Futuras

### Via Easypanel (Auto)
```bash
git add .
git commit -m "feat: nova feature"
git push origin main
# Easypanel faz deploy automático
```

### Via SSH Manual
```bash
ssh usuario@vps
cd /home/Project-Dash
git pull
docker-compose down
docker-compose up -d --build
```

## 📊 Monitoramento

### Logs em tempo real
```bash
# Backend
docker logs -f crm-backend

# Frontend
docker logs -f crm-frontend
```

### Status dos containers
```bash
docker ps
docker stats
```

## 🐛 Troubleshooting

### Backend não inicia
```bash
# Verificar variáveis de ambiente
docker exec crm-backend env

# Verificar logs
docker logs crm-backend --tail 100

# Testar conexão com Supabase
docker exec crm-backend node -e "console.log(process.env.SUPABASE_URL)"
```

### Frontend não carrega
```bash
# Verificar build
docker exec crm-frontend ls -la /usr/share/nginx/html

# Testar Nginx
docker exec crm-frontend nginx -t

# Ver logs
docker logs crm-frontend
```

### Erro de CORS
- Verificar `FRONTEND_URL` no backend/.env.production
- Deve ser: `https://dash.fastdevdigital.com.br` (sem barra no final)

### SSL não funciona
- Verificar DNS apontando corretamente
- Aguardar propagação DNS (até 24h)
- Verificar firewall VPS (portas 80 e 443 abertas)

## 🔐 Segurança

- ✅ Variáveis de ambiente nunca commitadas (usar .env)
- ✅ SSL/HTTPS obrigatório
- ✅ Headers de segurança no Nginx
- ✅ CORS configurado apenas para domínio específico
- ✅ JWT com secret forte

## 📱 Próximos Passos

1. Configurar backup automático do Supabase
2. Configurar monitoramento (UptimeRobot, Sentry)
3. Configurar alertas via email/Telegram
4. Implementar CI/CD completo com testes
5. Configurar CDN (Cloudflare)

---

**Domínios:**
- Dashboard: https://dash.fastdevdigital.com.br
- API: https://dash.fastdevdigital.com.br/api
- N8N: (interno) n8n_n8n:5678

**Repositório:** https://github.com/ggasparott/Project-Dash
