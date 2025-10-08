/**
 * Auth Repository - MacroFit
 * Simula chamadas de API externa para autenticação
 */

import { environment } from '$lib/config/environment.js';
import { mockUsers } from '../mockData/users.js';

class AuthRepository {
  constructor() {
    this.baseUrl = environment.apiUrl;
    this.useMock = environment.useMock;
    
    if (environment.enableLogs) {
      console.log('🔐 AuthRepository: Repository de autenticação inicializado');
      console.log('🔐 AuthRepository: Modo mock:', this.useMock);
    }
  }

  /**
   * Simula delay de rede
   */
  async simulateNetworkDelay() {
    const delay = Math.random() * 1000 + 500; // 500-1500ms
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Realiza login
   * @param {LoginRequest} loginDto - DTO de login
   * @returns {Promise<Object>}
   */
  async login(loginDto) {
    if (this.useMock) {
      return this.mockLogin(loginDto);
    }

    // Implementação real da API
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginDto.toPayload())
    });

    if (!response.ok) {
      throw new Error(`Erro no login: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Mock do login
   */
  async mockLogin(loginDto) {
    await this.simulateNetworkDelay();

    const payload = loginDto.toPayload();
    
    // Simula validação de credenciais
    if (payload.email === 'maria@macrofit.com' && payload.password === '123456') {
      const user = mockUsers[0];
      
      // Simula token baseado no modo de autenticação
      const authMode = environment.authMode;
      let token = null;
      
      if (authMode === 'accp') {
        token = 'mock-jwt-token-' + Date.now();
        // Em ACCP, salvamos no localStorage
        localStorage.setItem('macrofit_access_token', token);
        localStorage.setItem('macrofit_user', JSON.stringify(user));
      }

      return {
        success: true,
        user: user,
        token: token,
        message: 'Login realizado com sucesso'
      };
    }

    // Simula erro de credenciais inválidas
    throw new Error('Email ou senha inválidos');
  }

  /**
   * Realiza registro
   * @param {RegisterRequest} registerDto - DTO de registro
   * @returns {Promise<Object>}
   */
  async register(registerDto) {
    if (this.useMock) {
      return this.mockRegister(registerDto);
    }

    // Implementação real da API
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerDto.toPayload())
    });

    if (!response.ok) {
      throw new Error(`Erro no registro: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Mock do registro
   */
  async mockRegister(registerDto) {
    await this.simulateNetworkDelay();

    const payload = registerDto.toPayload();
    
    // Simula verificação de email já existente
    if (payload.email === 'maria@macrofit.com') {
      throw new Error('Email já está em uso');
    }

    // Simula criação de novo usuário
    const newUser = {
      id: 'user-' + Date.now(),
      email: payload.email,
      name: payload.name,
      premium: false,
      profile: null, // Será configurado depois
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return {
      success: true,
      user: newUser,
      message: 'Conta criada com sucesso'
    };
  }

  /**
   * Recuperação de senha
   * @param {ForgotPasswordRequest} forgotPasswordDto - DTO de recuperação
   * @returns {Promise<Object>}
   */
  async forgotPassword(forgotPasswordDto) {
    if (this.useMock) {
      return this.mockForgotPassword(forgotPasswordDto);
    }

    // Implementação real da API
    const response = await fetch(`${this.baseUrl}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(forgotPasswordDto.toPayload())
    });

    if (!response.ok) {
      throw new Error(`Erro na recuperação: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Mock da recuperação de senha
   */
  async mockForgotPassword(forgotPasswordDto) {
    await this.simulateNetworkDelay();

    return {
      success: true,
      message: 'Email de recuperação enviado com sucesso'
    };
  }

  /**
   * Realiza logout
   * @returns {Promise<Object>}
   */
  async logout() {
    if (this.useMock) {
      return this.mockLogout();
    }

    // Implementação real da API
    const response = await fetch(`${this.baseUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Erro no logout: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Mock do logout
   */
  async mockLogout() {
    await this.simulateNetworkDelay();

    // Limpa dados do localStorage se estiver em modo ACCP
    if (environment.authMode === 'accp') {
      localStorage.removeItem('macrofit_access_token');
      localStorage.removeItem('macrofit_user');
    }

    return {
      success: true,
      message: 'Logout realizado com sucesso'
    };
  }

  /**
   * Verifica autenticação
   * @returns {Promise<Object>}
   */
  async verifyAuth() {
    if (this.useMock) {
      return this.mockVerifyAuth();
    }

    // Implementação real da API
    const response = await fetch(`${this.baseUrl}/auth/verify`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Erro na verificação: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Mock da verificação de autenticação
   */
  async mockVerifyAuth() {
    await this.simulateNetworkDelay();

    const authMode = environment.authMode;
    
    if (authMode === 'dev') {
      return {
        success: true,
        user: mockUsers[0]
      };
    }

    if (authMode === 'accp') {
      const token = localStorage.getItem('macrofit_access_token');
      const userData = localStorage.getItem('macrofit_user');
      
      if (token && userData) {
        return {
          success: true,
          user: JSON.parse(userData)
        };
      }
    }

    throw new Error('Não autenticado');
  }

  /**
   * Obtém usuário atual
   * @returns {Promise<Object>}
   */
  async getCurrentUser() {
    if (this.useMock) {
      return this.mockGetCurrentUser();
    }

    // Implementação real da API
    const response = await fetch(`${this.baseUrl}/auth/me`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Erro ao obter usuário: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Mock do usuário atual
   */
  async mockGetCurrentUser() {
    await this.simulateNetworkDelay();

    return {
      success: true,
      user: mockUsers[0]
    };
  }
}

export default new AuthRepository();
