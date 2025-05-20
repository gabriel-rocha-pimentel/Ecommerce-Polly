# Ecommerce Polly

Ecommerce Polly é uma aplicação web de e-commerce desenvolvida em React, com foco em experiência do usuário, gerenciamento de produtos e autenticação de usuários. O projeto utiliza Supabase como backend para autenticação e armazenamento de dados, além de Tailwind CSS para estilização.

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Funcionalidades

- **Catálogo de Produtos:** Visualização de produtos, detalhes e busca.
- **Carrinho de Compras:** Adição, remoção e visualização de itens no carrinho.
- **Autenticação:** Cadastro, login e gerenciamento de sessão de usuários.
- **Área Administrativa:** Dashboard para gerenciamento de produtos, cadastro e edição.
- **Páginas Institucionais:** Sobre, Contato e Lojas.

---

## Tecnologias Utilizadas

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Supabase (Auth e Database)
- **Gerenciamento de Estado:** Context API
- **Outros:** PostCSS, Node.js, NVM

---

## Estrutura de Pastas

```
├── public/
│   └── .htaccess
├── src/
│   ├── components/
│   │   ├── admin/           # Layout e sidebar do admin
│   │   ├── layout/          # Navbar, Footer, TopBar
│   │   └── ui/              # Componentes reutilizáveis (button, card, input, etc)
│   ├── contexts/            # Contextos de autenticação e carrinho
│   ├── lib/                 # Integração com Supabase e utilitários
│   ├── pages/               # Páginas principais e administrativas
│   ├── services/            # Serviços de autenticação e produtos
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── .nvmrc
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## Como Rodar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/Ecommerce-Polly.git
   cd Ecommerce-Polly
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` com as credenciais do Supabase.

4. **Inicie o projeto:**
   ```bash
   npm run dev
   ```

---

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

## Licença

Este projeto está licenciado sob a licença MIT.