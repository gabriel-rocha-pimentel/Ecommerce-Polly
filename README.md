# E-commerce Polly

![Logo Polly](./assets/logo.png)

## Descrição

O **E-commerce Polly** é uma plataforma de comércio eletrônico completa, focada em oferecer uma experiência de compra intuitiva, performática e escalável. O projeto foi desenhado para atender a pequenos e médios varejistas que desejam gerenciar produtos, categorias, lojas físicas e presença online de forma integrada.

Principais funcionalidades:

* Catálogo de produtos com filtros por categoria, estilo e faixa de preço
* Busca em tempo real com sugestões
* Sistema de localização de lojas físicas com mapa interativo
* Área administrativa para gerenciamento de produtos, categorias e estoques
* Integração com gateway de pagamento
* Newsletter e integração com redes sociais

## Tecnologias Utilizadas

**Front-end:**

* [Next.js](https://nextjs.org/) (React + TypeScript)
* [Tailwind CSS](https://tailwindcss.com/) para estilização utilitária
* [SWR](https://swr.vercel.app/) para fetch e cache de dados
* [Framer Motion](https://www.framer.com/motion/) para animações suaves

**Back-end:**

* [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/) ou [NestJS](https://nestjs.com/) (TypeScript)
* [Prisma ORM](https://www.prisma.io/) para modelagem e acesso ao banco
* Autenticação via JWT
* Documentação de API com [Swagger](https://swagger.io/)

**Banco de Dados:**

* PostgreSQL ou MySQL

**Infraestrutura & DevOps:**

* Versionamento com [Git](https://git-scm.com/) e GitHub
* CI/CD com GitHub Actions
* Deploy em Vercel (front-end) e Heroku/AWS Elastic Beanstalk (back-end)
* Monitoramento com Sentry e LogRocket

**APIs Externas e Serviços:**

* Google Maps API para busca e rotas de lojas físicas
* Stripe/Pagar.me para processamento de pagamentos
* Mailchimp para envio de newsletter

## Estrutura de Pastas

```bash
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   └── styles
│   └── tailwind.config.js
├── backend
│   ├── src
│   │   ├── modules
│   │   ├── controllers
│   │   ├── services
│   │   └── prisma
│   ├── prisma.schema
│   └── main.ts
└── README.md
```

## Instalação e Setup

### Pré-requisitos

* Node.js >= 16.x
* Yarn ou npm
* Docker (opcional, para banco de dados)

### Clonar repositório

```bash
git clone https://github.com/gabriel-rocha-pimentel/polly-ecommerce.git
cd polly-ecommerce
```

### Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz de cada parte (`frontend` e `backend`) com as variáveis necessárias. Exemplo para o backend:

```
DATABASE_URL=postgresql://user:password@localhost:5432/polly
JWT_SECRET=seu_segredo_aqui
STRIPE_API_KEY=sua_chave_stripe
GOOGLE_MAPS_KEY=sua_chave_google
```

### Instalar dependências e rodar localmente

#### Frontend

```bash
cd frontend
yarn install # ou npm install
yarn dev # ou npm run dev
```

#### Backend

```bash
cd backend
yarn install # ou npm install
yarn prisma migrate dev # criar e aplicar migrations
yarn start:dev # ou npm run start:dev
```

## Scripts Disponíveis

No diretório **frontend**:

```bash
yarn dev       # inicia ambiente de desenvolvimento
yarn build     # gera build de produção
yarn start     # inicia o build de produção
```

No diretório **backend**:

```bash
yarn start:dev    # inicia o servidor em modo de desenvolvimento
yarn build        # compila TypeScript
yarn start        # inicia o servidor compilado
yarn prisma:generate # gera cliente Prisma
yarn prisma:migrate  # aplica migrations
```

## Contribuindo

1. Faça um fork deste repositório
2. Crie uma branch para sua feature: `git checkout -b feature/MinhaFeature`
3. Commit suas mudanças: \`git commit -m 'Adiciona MinhaFeature'
4. Push na branch: `git push origin feature/MinhaFeature`
5. Abra um Pull Request

Antes de enviar, garanta que:

* O código segue o padrão lint (ESLint/Prettier)
* Há testes cobrindo as novas funcionalidades
* A documentação foi atualizada

## Deploy

1. Configure as variáveis de ambiente na plataforma de deploy
2. Configure o CI/CD para build automático em push na branch `main`
3. Acesse as URLs de produção:

   * Front-end: `https://polly-ecommerce.vercel.app`
   * API: `https://api.polly-ecommerce.com`

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Desenvolvido por Gabriel Rocha Pimentel.

* GitHub: [gabriel-rocha-pimentel](https://github.com/gabriel-rocha-pimentel)
* Email: [gabrielrochapimentel.dev@gmail.com](mailto:gabrielrochapimentel.dev@gmail.com)

---

Seja bem-vindo(a) à **Polly**! 🎉
