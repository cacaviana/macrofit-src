/**
 * User Service - MacroFit
 * Gerencia operações relacionadas ao usuário
 */

import { environment } from '$lib/config/environment.js';
import userRepository from '../data/repositories/user.repository.js';

export class UserService {
  constructor() {
    this.repository = userRepository;
    
    if (environment.enableLogs) {
      console.log('👤 UserService: Serviço de usuário inicializado');
    }
  }

  /**
   * Configura dados iniciais do usuário
   * ⚠️ IMPORTANTE: Recebe DTO já criado pela UI
   * @param {UserSetupRequest} setupDto - DTO já instanciado pela UI
   * @returns {Promise<Object>}
   */
  async setupUser(setupDto) {
    // O Service não conhece os campos do DTO, apenas usa seus métodos
    if (!setupDto.isValid()) {
      throw new Error('Dados de configuração inválidos');
    }

    try {
      if (environment.enableLogs) {
        console.log('👤 UserService: Configurando usuário...');
      }

      // O Service passa o DTO completo para o Repository
      const result = await this.repository.setupUser(setupDto);

      if (environment.enableLogs) {
        console.log('✅ UserService: Usuário configurado com sucesso');
      }

      return result;

    } catch (error) {
      console.error('❌ UserService: Erro na configuração do usuário:', error);
      throw error;
    }
  }

  /**
   * Atualiza peso do usuário
   * ⚠️ IMPORTANTE: Recebe DTO já criado pela UI
   * @param {UpdateWeightRequest} weightDto - DTO já instanciado pela UI
   * @returns {Promise<Object>}
   */
  async updateWeight(weightDto) {
    // O Service não conhece os campos do DTO, apenas usa seus métodos
    if (!weightDto.isValid()) {
      throw new Error('Dados de peso inválidos');
    }

    try {
      if (environment.enableLogs) {
        console.log('👤 UserService: Atualizando peso...');
      }

      // O Service passa o DTO completo para o Repository
      const result = await this.repository.updateWeight(weightDto);

      if (environment.enableLogs) {
        console.log('✅ UserService: Peso atualizado com sucesso');
      }

      return result;

    } catch (error) {
      console.error('❌ UserService: Erro ao atualizar peso:', error);
      throw error;
    }
  }

  /**
   * Adiciona registro de hidratação
   * ⚠️ IMPORTANTE: Recebe DTO já criado pela UI
   * @param {AddWaterRequest} waterDto - DTO já instanciado pela UI
   * @returns {Promise<Object>}
   */
  async addWater(waterDto) {
    // O Service não conhece os campos do DTO, apenas usa seus métodos
    if (!waterDto.isValid()) {
      throw new Error('Dados de hidratação inválidos');
    }

    try {
      if (environment.enableLogs) {
        console.log('👤 UserService: Adicionando água...');
      }

      // O Service passa o DTO completo para o Repository
      const result = await this.repository.addWater(waterDto);

      if (environment.enableLogs) {
        console.log('✅ UserService: Água adicionada com sucesso');
      }

      return result;

    } catch (error) {
      console.error('❌ UserService: Erro ao adicionar água:', error);
      throw error;
    }
  }

  /**
   * Adiciona registro de exercício
   * ⚠️ IMPORTANTE: Recebe DTO já criado pela UI
   * @param {AddExerciseRequest} exerciseDto - DTO já instanciado pela UI
   * @returns {Promise<Object>}
   */
  async addExercise(exerciseDto) {
    // O Service não conhece os campos do DTO, apenas usa seus métodos
    if (!exerciseDto.isValid()) {
      throw new Error('Dados de exercício inválidos');
    }

    try {
      if (environment.enableLogs) {
        console.log('👤 UserService: Adicionando exercício...');
      }

      // O Service passa o DTO completo para o Repository
      const result = await this.repository.addExercise(exerciseDto);

      if (environment.enableLogs) {
        console.log('✅ UserService: Exercício adicionado com sucesso');
      }

      return result;

    } catch (error) {
      console.error('❌ UserService: Erro ao adicionar exercício:', error);
      throw error;
    }
  }

  /**
   * Obtém perfil do usuário
   * @returns {Promise<Object>}
   */
  async getUserProfile() {
    try {
      if (environment.enableLogs) {
        console.log('👤 UserService: Obtendo perfil do usuário...');
      }

      const result = await this.repository.getUserProfile();

      if (environment.enableLogs) {
        console.log('✅ UserService: Perfil obtido com sucesso');
      }

      return result;

    } catch (error) {
      console.error('❌ UserService: Erro ao obter perfil:', error);
      throw error;
    }
  }

  /**
   * Obtém estatísticas de hidratação
   * @param {string} date - Data no formato YYYY-MM-DD
   * @returns {Promise<Object>}
   */
  async getWaterStats(date = null) {
    try {
      if (environment.enableLogs) {
        console.log('👤 UserService: Obtendo estatísticas de hidratação...');
      }

      const result = await this.repository.getWaterStats(date);

      if (environment.enableLogs) {
        console.log('✅ UserService: Estatísticas obtidas com sucesso');
      }

      return result;

    } catch (error) {
      console.error('❌ UserService: Erro ao obter estatísticas de hidratação:', error);
      throw error;
    }
  }

  /**
   * Obtém histórico de exercícios
   * @param {string} date - Data no formato YYYY-MM-DD
   * @returns {Promise<Object>}
   */
  async getExerciseHistory(date = null) {
    try {
      if (environment.enableLogs) {
        console.log('👤 UserService: Obtendo histórico de exercícios...');
      }

      const result = await this.repository.getExerciseHistory(date);

      if (environment.enableLogs) {
        console.log('✅ UserService: Histórico obtido com sucesso');
      }

      return result;

    } catch (error) {
      console.error('❌ UserService: Erro ao obter histórico de exercícios:', error);
      throw error;
    }
  }
}
