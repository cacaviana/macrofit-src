const environment = {
  // Modo de desenvolvimento
  isDev: false,
  isProd: true,
  // URLs da API
  apiUrl: "http://localhost:3000",
  // Configurações de autenticação
  authMode: "dev",
  // 'dev' | 'accp' | 'prod'
  // Configurações de mock
  useMock: true,
  // Configurações de logs
  enableLogs: true,
  // Configurações de IA
  aiApiUrl: "http://localhost:3001",
  // Configurações de upload
  uploadUrl: "http://localhost:3002",
  // Configurações de integrações
  integrations: {
    appleHealth: false,
    googleFit: false,
    garmin: false
  }
};
export {
  environment as e
};
