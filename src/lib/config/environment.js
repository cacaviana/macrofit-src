/**
 * Configuração de Ambiente - MacroFit
 * 
 * Centraliza todas as configurações da aplicação baseadas no ambiente
 */

const environment = {
  // Modo de desenvolvimento
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  
  // URLs da API
  apiUrl: import.meta.env.VITE_API_URL || 'https://api.macrofit.com',
  
  // Configurações de autenticação
  authMode: import.meta.env.VITE_AUTH_MODE || 'dev', // 'dev' | 'accp' | 'prod'
  
  // Configurações de mock
  useMock: import.meta.env.VITE_USE_MOCK === 'true' || import.meta.env.DEV,
  
  // Configurações de logs
  enableLogs: import.meta.env.VITE_ENABLE_LOGS === 'true' || import.meta.env.DEV,
  
  // Configurações de IA
  aiApiUrl: import.meta.env.VITE_AI_API_URL || 'https://ai.macrofit.com',
  
  // Configurações de upload
  uploadUrl: import.meta.env.VITE_UPLOAD_URL || 'https://upload.macrofit.com',
  
  // Configurações de integrações
  integrations: {
    appleHealth: import.meta.env.VITE_APPLE_HEALTH_ENABLED === 'true',
    googleFit: import.meta.env.VITE_GOOGLE_FIT_ENABLED === 'true',
    garmin: import.meta.env.VITE_GARMIN_ENABLED === 'true'
  }
};

export { environment };
export default environment;
