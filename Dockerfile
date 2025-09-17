# Dockerfile para VoxDem Frontend
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Argumentos de build para variáveis de ambiente
ARG NEXT_PUBLIC_VOXDEM_API_URL=https://demovoxdem.com.br/api
ENV NEXT_PUBLIC_VOXDEM_API_URL=$NEXT_PUBLIC_VOXDEM_API_URL

# Copiar arquivos de dependência
COPY package*.json ./

# Instalar todas as dependências (incluindo devDependencies para o build)
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação (agora com a variável de ambiente correta)
RUN npm run build

# Limpar devDependencies após o build para reduzir o tamanho
RUN npm prune --production

# Estágio de produção
FROM node:18-alpine AS runner

WORKDIR /app

# Criar usuário não-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar arquivos necessários do builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Definir owner correto
RUN chown -R nextjs:nodejs /app

USER nextjs

# Expor porta
EXPOSE 3000

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
