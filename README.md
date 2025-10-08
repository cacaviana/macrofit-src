# MacroFit - Coach Nutricional IA

Uma aplicação completa de nutrição com inteligência artificial, desenvolvida seguindo a arquitetura em camadas documentada.

## 🏗️ Arquitetura

Este projeto segue rigorosamente a arquitetura documentada:

### Camadas da Aplicação

1. **UI Layer (Páginas)** - Fábrica de DTOs
2. **Service Layer** - Lógica de negócio
3. **DTO Layer** - Objetos de transferência de dados
4. **Repository Layer** - Simulação de APIs externas
5. **AuthGuard** - Sistema de autenticação injetável

### Regra Fundamental

⚠️ **IMPORTANTE**: O Service nunca deve saber os campos do objeto DTO. A UI é a fábrica de DTOs e os passa prontos para o Service.

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Modo de autenticação: 'dev' | 'accp' | 'prod'
VITE_AUTH_MODE=dev

# URLs da API
VITE_API_URL=https://api.macrofit.com
VITE_AI_API_URL=https://ai.macrofit.com

# Configurações de desenvolvimento
VITE_USE_MOCK=true
VITE_ENABLE_LOGS=true

# Integrações
VITE_APPLE_HEALTH_ENABLED=true
VITE_GOOGLE_FIT_ENABLED=true
VITE_GARMIN_ENABLED=true
```

## 📱 Funcionalidades Implementadas

### Autenticação
- ✅ Login com email/senha
- ✅ AuthGuard injetável
- ✅ Múltiplos modos (dev/accp/prod)

### Dashboard
- ✅ Resumo nutricional com gráficos circulares
- ✅ Ações rápidas (refeição, água, exercício)
- ✅ Dicas do Coach IA
- ✅ Agenda do dia

### Registro de Refeições
- ✅ Registro via texto
- ✅ Registro via foto (com preview)
- ✅ Registro via áudio (com gravação)
- ✅ Scanner de código de barras (UI pronta)
- ✅ Busca de alimentos

### Componentes UI
- ✅ Button, Input, Card, Modal
- ✅ ProgressCircle para gráficos nutricionais
- ✅ Badge, LoadingSpinner
- ✅ Sistema de exportação centralizada

## 🎯 Modos de Autenticação

### Modo DEV
- Acesso livre para desenvolvimento
- Usuário mockado automaticamente
- Sem verificação de token

### Modo ACCP
- Verifica token no localStorage
- Simula ambiente de homologação
- Dados persistidos localmente

### Modo PROD
- Verifica httpOnly cookies via API
- Máxima segurança
- Integração com backend real

## 🔧 Estrutura de Arquivos

```
macrofit-src/
├── lib/
│   ├── auth/
│   │   └── authGuard.js          # Guard de autenticação
│   ├── components/
│   │   ├── ui/                   # Componentes reutilizáveis
│   │   └── pages/                # Componentes específicos
│   ├── config/
│   │   └── environment.js        # Configurações de ambiente
│   ├── dto/                      # Data Transfer Objects
│   │   ├── auth/
│   │   ├── meals/
│   │   └── user/
│   ├── services/                 # Camada de serviços
│   │   ├── auth.service.js
│   │   ├── meals.service.js
│   │   └── user.service.js
│   ├── data/
│   │   ├── repositories/         # Simulação de APIs
│   │   └── mockData/            # Dados de desenvolvimento
│   └── utils/                   # Utilitários
├── routes/                      # Páginas da aplicação
│   ├── auth/login/
│   ├── dashboard/
│   ├── registro/
│   └── ...
└── src/
    ├── app.css                  # Estilos globais
    └── routes/
        └── +layout.svelte       # Layout principal
```

## 🧪 Dados Mock

O projeto inclui dados simulados completos:

- **Usuários**: Perfis com metas nutricionais
- **Refeições**: Histórico completo com análise nutricional
- **Exercícios**: Atividades com calorias queimadas
- **Hidratação**: Registros de consumo de água

## 🎨 Design System

### Cores Principais
- **Primary**: Azul (#3B82F6)
- **Success**: Verde (#10B981)
- **Warning**: Amarelo (#F59E0B)
- **Danger**: Vermelho (#EF4444)

### Componentes
- Todos os componentes seguem o padrão do Tailwind CSS
- Sistema de variantes consistente
- Props padronizadas e documentadas

## 📊 Simulação de IA

O projeto simula funcionalidades de IA:

- **Análise de texto**: Identifica alimentos em descrições
- **Reconhecimento de imagem**: Analisa fotos de pratos
- **Transcrição de áudio**: Converte voz em texto
- **Sugestões inteligentes**: Recomendações personalizadas

## 🔒 Segurança

- AuthGuard configurável por ambiente
- Validação de DTOs antes do envio
- Sanitização de dados de entrada
- Proteção contra XSS e CSRF

## 📱 Responsividade

- Design mobile-first
- Breakpoints otimizados
- Componentes adaptáveis
- Touch-friendly

## 🚀 Deploy

O projeto está pronto para deploy em qualquer plataforma:

- **Vercel**: Configuração automática
- **Netlify**: Build otimizado
- **Docker**: Containerização disponível

## 📝 Próximos Passos

1. Implementar mais páginas (histórico, relatórios, etc.)
2. Adicionar testes unitários
3. Integrar com APIs reais
4. Implementar PWA
5. Adicionar notificações push

## 🤝 Contribuição

Este projeto segue a arquitetura documentada. Ao contribuir:

1. Mantenha a separação de camadas
2. DTOs devem ser criados na UI
3. Services não devem conhecer campos dos DTOs
4. Use o AuthGuard para proteção de rotas
5. Siga os padrões de componentes UI

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.
