/**
 * Auth Service - MacroFit
 * Gerencia operações de autenticação
 */

import { environment } from '$lib/config/environment.js';
import authRepository from '../data/repositories/auth.repository.js';

export class AuthService {
  constructor() {
    this.repository = authRepository;
    
    if (environment.enableLogs) {
      console.log('🔐 AuthService: Serviço de autenticação inicializado');
    }
  }

  /**
   * Realiza login do usuário
   * ⚠️ IMPORTANTE: Recebe DTO já criado pela UI
   * @param {LoginRequest} loginDto - DTO já instanciado pela UI
   * @returns {Promise<Object>}
   */
  async login(loginDto) {
    // O Service não conhece os campos do DTO, apenas usa seus métodos
    if (!loginDto.isValid()) {
      throw new Error('Dados de login inválidos');
    }

    try {
      if (environment.enableLogs) {
        console.log('🔐 AuthService: Realizando login...');
      }

      // O Service passa o DTO completo para o Repository
      const result = await this.repository.login(loginDto);

      if (environment.enableLogs) {
        console.log('✅ AuthService: Login realizado com sucesso');
      }

      return result;

    } catch (error) {
      console.error('❌ AuthService: Erro no login:', error);
      throw error;
    }
  }

  /**
   * Realiza registro de novo usuário
   * ⚠️ IMPORTANTE: Recebe DTO já criado pela UI
   * @param {RegisterRequest} registerDto - DTO já instanciado pela UI
   * @returns {Promise<Object>}
   */
  async register(registerDto) {
    // O Service não conhece os campos do DTO, apenas usa seus métodos
    if (!registerDto.isValid()) {
      throw new Error('Dados de registro inválidos');
    }

    try {
      if (environment.enableLogs) {
        console.log('🔐 AuthService: Realizando registro...');
      }

      // O Service passa o DTO completo para o Repository
      const result = await this.repository.register(registerDto);

      if (environment.enableLogs) {
        console.log('✅ AuthService: Registro realizado com sucesso');
      }

      return result;

    } catch (error) {
      console.error('❌ AuthService: Erro no registro:', error);
      throw error;
    }
  }

  /**
   * Solicita recuperação de senha
   * ⚠️ IMPORTANTE: Recebe DTO já criado pela UI
   * @param {ForgotPasswordRequest} forgotPasswordDto - DTO já instanciado pela UI
   * @returns {Promise<Object>}
   */
  async forgotPassword(forgotPasswordDto) {
    // O Service não conhece os campos do DTO, apenas usa seus métodos
    if (!forgotPasswordDto.isValid()) {
      throw new Error('Email inválido');
    }

    try {
      if (environment.enableLogs) {
        console.log('🔐 AuthService: Solicitando recuperação de senha...');
      }

      // O Service passa o DTO completo para o Repository
      const result = await this.repository.forgotPassword(forgotPasswordDto);

      if (environment.enableLogs) {
        console.log('✅ AuthService: Solicitação de recuperação enviada');
      }

      return result;

    } catch (error) {
      console.error('❌ AuthService: Erro na recuperação de senha:', error);
      throw error;
    }
  }

  /**
   * Realiza logout do usuário
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      if (environment.enableLogs) {
        console.log('🔐 AuthService: Realizando logout...');
      }

      await this.repository.logout();

      if (environment.enableLogs) {
        console.log('✅ AuthService: Logout realizado com sucesso');
      }

    } catch (error) {
      console.error('❌ AuthService: Erro no logout:', error);
      throw error;
    }
  }

  /**
   * Verifica se o usuário está autenticado
   * @returns {Promise<Object>}
   */
  async verifyAuth() {
    try {
      const result = await this.repository.verifyAuth();
      return result;
    } catch (error) {
      console.error('❌ AuthService: Erro na verificação de autenticação:', error);
      throw error;
    }
  }

  /**
   * Obtém dados do usuário atual
   * @returns {Promise<Object>}
   */
  async getCurrentUser() {
    try {
      const result = await this.repository.getCurrentUser();
      return result;
    } catch (error) {
      console.error('❌ AuthService: Erro ao obter usuário atual:', error);
      throw error;
    }
  }
}
