# 🚀 CEIControl — Front-End Estático

<p align="center">
  <img src="assests/ceicontrol.png" height="120"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="assests/jemtech.png" height="120"/>
</p>

<p align="center">
  <b>Sistema de Gestão para Centros de Educação Infantil Públicos</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow" />
  <img src="https://img.shields.io/badge/version-0.3--frontend-blue" />
  <img src="https://img.shields.io/badge/license-MIT-green" />
  <img src="https://img.shields.io/badge/HTML5-Estrutura-orange" />
  <img src="https://img.shields.io/badge/CSS3-Estilo-blue" />
  <img src="https://img.shields.io/badge/JavaScript-Interatividade-yellow" />
</p>

---

## 📌 Sobre o Projeto

O **CEIControl** é uma plataforma web desenvolvida para **modernizar e simplificar a gestão de Centros de Educação Infantil (CEIs) públicos**.

Esta versão é uma **interface front-end estática**, construída exclusivamente com HTML5, CSS3 e JavaScript puro, com CRUD simulado em memória — sem dependência de servidor ou banco de dados.

A proposta é centralizar em um único sistema:

- 👥 Gestão de usuários  
- 📦 Controle de recursos  
- 📅 Agenda digital  
- 💬 Comunicação entre escola e responsáveis  

> 💡 Projeto desenvolvido pela **JEMTech**, focada em soluções digitais para o setor público.

---

## 📎 Links do Projeto

* **🌐 Deploy Online (Front-End):** [Vizualizar Front-End](https://eduardomartins-tech.github.io/CEIControl-Front/)
* **🌐 Deploy Online (Full-Stack):** [Vizualizar FullStack](https://ceicontrol.up.railway.app)
* **Repositório Oficial (Alpha 0.3):** [GitHub - CEIControl Alpha 0.3](https://github.com/EduardoMartins-tech/CEIControl-Alpha-0.3)
* **Wireframe e Protótipo:** [Visualizar Protótipo no Figma](https://www.figma.com/design/Ik8DcPkOuDatNVvMvnUDYq/CCsite?node-id=0-1&p=f)

---

## 👨‍💻 Desenvolvedores

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/EduardoMartins-tech">
        <img src="https://github.com/EduardoMartins-tech.png" width="100px;" /><br>
        <sub><b>Eduardo Ferreira Martins</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/JVCod1ng">
        <img src="https://github.com/JVCod1ng.png" width="100px;" /><br>
        <sub><b>João Vitor</b></sub>
      </a>
    </td>
  </tr>
</table>

---

## 🎯 Objetivos

### 🔹 Objetivo Geral
Criar uma plataforma gratuita, eficiente e acessível para a gestão de CEIs, promovendo **organização, comunicação e transparência**.

### 🔹 Objetivos Específicos

- 📊 Centralizar dados administrativos  
- 💬 Melhorar comunicação com responsáveis  
- 🔐 Garantir segurança com controle de acesso por perfil  
- ⚙️ Utilizar tecnologias modernas  
- 🌍 Promover inclusão digital  

---

## 🌟 Funcionalidades

- ✅ CRUD completo simulado em JS (Usuários, Produtos, Fornecedores, Eventos)
- 💬 Chat interno simulado com resposta automática
- 📅 Agenda digital integrada
- 🔐 Sistema de autenticação por perfil (Admin, Educador, Responsável)
- 🌙 Modo escuro (Dark Mode)
- 📱 Interface responsiva com menu hamburguer mobile

---

## 🧰 Tecnologias

<p align="center">

| Tecnologia | Uso |
|-----------|-----|
| HTML5 | Estrutura semântica |
| CSS3 | Estilo e responsividade |
| JavaScript | Interatividade, validações e CRUD simulado |
| FontAwesome | Ícones |
| GitHub Pages | Hospedagem estática |

</p>

---

## 🔐 Perfis de Acesso

| Perfil | E-mail | Senha | Painel |
|--------|--------|-------|--------|
| **Admin (Gestor Escolar)** | admin@cei.com | 12345 | `dashboard.html` |
| **Usuário (Educador)** | usuario@cei.com | 12345 | `dashboard_usuario.html` |
| **Cliente (Responsável)** | cliente@cei.com | 12345 | `dashboard_cliente.html` |

---

## 🚀 Implementações desta versão (Front-End Estático)

### ✅ O que foi entregue:
* **Landing Page** (`index.html`): Apresentação do sistema com carrossel de imagens, funcionalidades e formulário de contato simulado.
* **Página Sobre** (`sobre.html`): Missão, Visão, Valores e compromisso com os ODS da ONU.
* **Login Simulado** (`login.html`): Autenticação por e-mail, senha e perfil com validações JavaScript e redirecionamento para o painel correto.
* **Painel Admin** (`dashboard.html`): CRUD completo de Usuários, Produtos, Fornecedores e Agenda com modal de cadastro/edição e chat simulado.
* **Painel Educador** (`dashboard_usuario.html`): Visualização de Agenda Escolar, Materiais e Chat.
* **Painel Responsável** (`dashboard_cliente.html`): Visualização da Agenda da CEI, próximo evento e Chat.
* **Responsividade Mobile**: Sidebar transformada em drawer lateral com botão hamburguer.
* **Dark Mode**: Alternância de tema persistida via localStorage.
* **Validações JavaScript**: Campos obrigatórios, formato de e-mail, senha mínima e duplicidade de e-mail.

---

## 📁 Estrutura de Arquivos

```
├── index.html              ← Landing page
├── sobre.html              ← Página sobre a JEMTech
├── login.html              ← Tela de login simulado
├── dashboard.html          ← Painel Admin (CRUD completo)
├── dashboard_usuario.html  ← Painel Educador
├── dashboard_cliente.html  ← Painel Responsável
├── style.css               ← Estilos globais
├── mobile.css              ← Responsividade mobile
├── dashboard.css           ← Estilos do dashboard e modal
├── script.js               ← Dark mode e sidebar
├── dashboard.js            ← CRUD simulado e lógica dos painéis
└── assests/                ← Imagens e ícones
```

---

## 💻 Como rodar localmente

Por ser uma versão estática, basta abrir o arquivo `index.html` no navegador — não é necessário servidor ou banco de dados.

1. Clone o repositório:
   ```bash
   git clone https://github.com/EduardoMartins-tech/CEIControl-Alpha-0.3.git
   ```
2. Abra o arquivo `index.html` no navegador.
3. Clique em **Login** e use as credenciais de demonstração acima.

---

<p align="center">Desenvolvido pela <b>JEMTech</b> para a FATEC Ferraz de Vasconcelos</p>
