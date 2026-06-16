# 📧 Gerador de E-mail Fiscal

Aplicação web desenvolvida para automatizar a criação de e-mails de solicitação de configuração fiscal para clientes da Stor Sistemas.

O sistema permite selecionar os módulos fiscais utilizados pelo cliente, informar os dados da empresa e gerar automaticamente um e-mail padronizado para envio ao contador responsável.

---

## 🚀 Funcionalidades

### 📄 Dados da Empresa
- Razão Social
- CNPJ com máscara automática
- Formatação padrão:
  ```
  XX.XXX.XXX/XXXX-00
  ```

### 📋 Seleção de Escopos Fiscais

Permite incluir no e-mail a solicitação dos seguintes anexos:

#### Produtos
- NF-e (Nota Fiscal Eletrônica)
- NFC-e (Nota Fiscal de Consumidor Eletrônica)

Anexo solicitado:
```
Escopo Fiscal Produtos.xlsx
```

#### Serviços
- NFS-e (Nota Fiscal de Serviço Eletrônica)

Anexo solicitado:
```
Escopo Fiscal Serviço.xlsx
```

#### Transporte
- CT-e (Conhecimento de Transporte Eletrônico)

Anexo solicitado:
```
Escopo Fiscal CTE.xlsx
```

#### Troca de CNPJ
Anexo solicitado:
```
Escopo Fiscal Troca de CNPJ.xlsx
```

---

## 🔐 Informações Incluídas Automaticamente

Todo e-mail gerado contém a solicitação de:

- Certificado Digital
- Senha do Certificado

---

## 👤 Assinatura Automática

O sistema permite configurar:

- Nome
- Cargo
- Telefone
- E-mail

Essas informações são armazenadas localmente no navegador utilizando:

```javascript
localStorage
```

Assim, não é necessário preencher novamente a cada acesso.

---

## 🌙 Tema Claro e Escuro

A aplicação possui suporte a:

- Light Mode
- Dark Mode

### Comportamento

Ao abrir o sistema:

1. Verifica se existe um tema salvo.
2. Caso não exista:
   - Utiliza a preferência do sistema operacional.
3. Salva automaticamente a escolha do usuário.

---

## 📋 Copiar E-mail

Após a geração do conteúdo:

- O botão **"Copiar E-mail"** é exibido.
- O texto é copiado diretamente para a área de transferência.
- Exibe feedback visual:

```text
✅ Copiado!
```

---

## 🛠️ Estrutura do Projeto

```text
/
├── index.html
├── styles.css
└── script.js
```

### index.html

Responsável pela estrutura da interface:

- Dados da empresa
- Seleção de módulos fiscais
- Assinatura
- Área de visualização do e-mail

---

### styles.css

Responsável pela estilização:

- Sistema de temas
- Layout responsivo
- Componentes visuais
- Cards
- Inputs
- Botões
- Área de pré-visualização

---

### script.js

Responsável pelas funcionalidades:

#### Tema
```javascript
initTheme()
toggleTheme()
applyTheme()
```

#### Máscara de CNPJ
```javascript
maskCNPJ()
```

#### Geração do e-mail
```javascript
update()
```

#### Copiar conteúdo
```javascript
copyEmail()
```

#### Persistência local
```javascript
salvarDados()
carregarDados()
```

---

## 📝 Exemplo de E-mail Gerado

```text
Prezado(a) contador(a),

Solicito o apoio referente à configuração fiscal da empresa Empresa Exemplo Ltda (CNPJ: 12.345.678/0001-90).

Solicito o preenchimento do anexo "Escopo Fiscal Produtos.xlsx".

Informo ainda que o cliente realizará emissões de Nota Fiscal de Serviço. Solicito, portanto, o preenchimento do anexo "Escopo Fiscal Serviço.xlsx".

Adicionalmente, peço o envio do certificado digital e respectiva senha para inclusão no sistema destinado às emissões fiscais.

Atenciosamente,

João Silva
Consultor de Implantação | Stor Sistemas
📞 (65) 99999-9999
✉️ joao@storsistemas.com.br
🌐 www.storsistemas.com.br
```

---

## 💻 Como Executar

Basta abrir o arquivo:

```text
index.html
```

em qualquer navegador moderno.

Não há dependências externas, instalação de pacotes ou necessidade de servidor.

---

## 🔧 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- Local Storage API
- Clipboard API

---

## 📌 Objetivo

Padronizar e agilizar o envio de solicitações fiscais durante os processos de implantação da Stor Sistemas, reduzindo erros operacionais e garantindo que todos os documentos necessários sejam solicitados ao contador do cliente.
