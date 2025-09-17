#!/bin/bash

# Script de deploy unificado para VoxDem Frontend
# Uso: ./deploy-frontend.sh [server-ip]

set -e

# Configurações
SERVER_IP=${1:-"localhost"}
SERVER_USER="root"
FRONTEND_PORT=3002
BACKEND_URL="http://${SERVER_IP}:3001/api"

echo "🚀 Iniciando deploy do VoxDem Frontend"
echo "📍 Servidor: ${SERVER_IP}"
echo "🔗 Backend URL: ${BACKEND_URL}"
echo "📱 Frontend Port: ${FRONTEND_PORT}"

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado"
    exit 1
fi

# Atualizar variável de ambiente para o backend correto
echo "🔧 Configurando variáveis de ambiente..."
cat > .env.production << EOF
# Configurações de produção do VoxDem Frontend
NEXT_PUBLIC_VOXDEM_API_URL=${BACKEND_URL}
NODE_ENV=production
PORT=3000

# Informações do deploy
DEPLOY_DATE=$(date)
DEPLOY_VERSION=latest
DEPLOY_SERVER=${SERVER_IP}
EOF

echo "✅ Arquivo .env.production criado:"
cat .env.production

# Atualizar docker-compose com a URL correta do backend
echo "📝 Atualizando docker-compose..."
sed -i "s|NEXT_PUBLIC_VOXDEM_API_URL=.*|NEXT_PUBLIC_VOXDEM_API_URL=${BACKEND_URL}|g" docker-compose.frontend.yml

# Build da aplicação
echo "🔨 Fazendo build da aplicação..."
docker build -t voxdem-frontend:latest .

# Se for deploy local
if [ "$SERVER_IP" = "localhost" ]; then
    echo "🏠 Deploy local detectado"
    
    # Parar containers existentes
    docker compose -f docker-compose.frontend.yml down 2>/dev/null || true
    
    # Verificar se rede existe
    if ! docker network ls | grep -q "voxdem-network"; then
        echo "🔗 Criando rede voxdem-network"
        docker network create voxdem-network
    fi
    
    # Iniciar containers
    docker compose -f docker-compose.frontend.yml up -d
    
    echo "✅ Deploy local concluído!"
    echo "📍 Frontend disponível em: http://localhost:${FRONTEND_PORT}"
    
else
    echo "🌐 Deploy remoto para ${SERVER_IP}"
    
    # Salvar imagem
    docker save voxdem-frontend:latest > voxdem-frontend.tar
    
    # Transferir arquivos
    echo "📦 Transferindo arquivos..."
    ssh ${SERVER_USER}@${SERVER_IP} "mkdir -p /opt/voxdem-frontend"
    scp voxdem-frontend.tar ${SERVER_USER}@${SERVER_IP}:/opt/voxdem-frontend/
    scp docker-compose.frontend.yml ${SERVER_USER}@${SERVER_IP}:/opt/voxdem-frontend/
    scp .env.production ${SERVER_USER}@${SERVER_IP}:/opt/voxdem-frontend/.env
    
    # Deploy no servidor
    echo "🚀 Executando deploy no servidor..."
    ssh ${SERVER_USER}@${SERVER_IP} "cd /opt/voxdem-frontend && \
        docker compose -f docker-compose.frontend.yml down 2>/dev/null || true && \
        docker rmi voxdem-frontend:latest 2>/dev/null || true && \
        docker load < voxdem-frontend.tar && \
        SERVER_IP_VAR=\$(hostname -I | awk '{print \$1}') && \
        echo '# Configurações de produção do VoxDem Frontend' > .env && \
        echo \"NEXT_PUBLIC_VOXDEM_API_URL=http://\${SERVER_IP_VAR}:3001/api\" >> .env && \
        echo 'NODE_ENV=production' >> .env && \
        echo 'PORT=3000' >> .env && \
        echo \"# Deploy em \$(date)\" >> .env && \
        echo 'DEPLOY_VERSION=latest' >> .env && \
        echo \"DEPLOY_SERVER=\${SERVER_IP_VAR}\" >> .env && \
        echo '✅ Arquivo .env criado:' && cat .env && \
        (docker network ls | grep -q 'voxdem-network' || docker network create voxdem-network) && \
        docker compose -f docker-compose.frontend.yml up -d && \
        echo '⏳ Aguardando aplicação...' && sleep 30 && \
        docker compose -f docker-compose.frontend.yml ps && \
        rm -f voxdem-frontend.tar && \
        echo '✅ Deploy remoto concluído!'"
    
    # Limpar arquivo local
    rm -f voxdem-frontend.tar
    
    echo "📍 Frontend disponível em: http://${SERVER_IP}:${FRONTEND_PORT}"
fi

# Health check
echo "🔍 Verificando saúde da aplicação..."
sleep 10

if curl -f http://${SERVER_IP}:${FRONTEND_PORT} &>/dev/null; then
    echo "✅ Frontend está funcionando!"
else
    echo "⚠️  Frontend pode estar ainda inicializando, verifique os logs"
fi

echo "🎉 Deploy concluído!"
echo "📍 URL do Frontend: http://${SERVER_IP}:${FRONTEND_PORT}"
echo "🔗 Backend configurado: ${BACKEND_URL}"
