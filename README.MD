# E-commerce Full Stack

Este é um projeto de e-commerce completo desenvolvido com Next.js 15, TypeScript, Tailwind CSS, Drizzle ORM e Stripe para pagamentos.

## Funcionalidades

- 🛍️ **Catálogo de Produtos**: Navegação por categorias e produtos
- 🛒 **Carrinho de Compras**: Adicionar, remover e gerenciar produtos
- 💳 **Checkout com Stripe**: Processamento de pagamentos seguro
- 🔐 **Autenticação**: Sistema de login e cadastro
- 📦 **Gestão de Pedidos**: Acompanhamento de status dos pedidos
- 📱 **Design Responsivo**: Interface otimizada para todos os dispositivos

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Database
DATABASE_URL=postgresql://...

# Auth
AUTH_SECRET=...
```

### Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure o banco de dados:
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Getting Started

## Tecnologias Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Drizzle ORM
- **Banco de Dados**: PostgreSQL
- **Autenticação**: Better Auth
- **Pagamentos**: Stripe
- **Estado**: TanStack Query (React Query)
- **UI Components**: Radix UI, shadcn/ui

## Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── api/               # API Routes
│   ├── authentication/     # Páginas de autenticação
│   ├── cart/              # Páginas do carrinho
│   ├── category/          # Páginas de categoria
│   ├── checkout/          # Páginas de checkout
│   ├── my-orders/         # Páginas de pedidos
│   └── product-variant/   # Páginas de produto
├── components/             # Componentes reutilizáveis
├── db/                    # Configuração do banco de dados
├── hooks/                 # Custom hooks
├── lib/                   # Utilitários e configurações
└── providers/             # Providers do React
```

## Learn More

Para aprender mais sobre as tecnologias utilizadas:

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Better Auth](https://auth.better-auth.com/)

## Deploy

O projeto pode ser facilmente deployado na [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.
