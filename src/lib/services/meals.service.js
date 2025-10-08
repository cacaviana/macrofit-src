/**
 * Meals Service - MacroFit
 * Gerencia operações relacionadas a refeições
 */

import { environment } from '$lib/config/environment.js';
import mealsRepository from '../data/repositories/meals.repository.js';

export class MealsService {
  constructor() {
    this.repository = mealsRepository;
    
    if (environment.enableLogs) {
      console.log('🍽️ MealsService: Serviço de refeições inicializado');
    }
  }

  /**
   * Registra refeição via texto
   * ⚠️ IMPORTANTE: Recebe DTO já criado pela UI
   * @param {CreateMealTextRequest} mealDto - DTO já instanciado pela UI
   * @returns {Promise<Object>}
   */
  async createMealFromText(mealDto) {
    // O Service não conhece os campos do DTO, apenas usa seus métodos
    if (!mealDto.isValid()) {
      throw new Error('Dados da refeição inválidos');
    }

    try {
      if (environment.enableLogs) {
        console.log('🍽️ MealsService: Registrando refeição via texto...');
      }

      // O Service passa o DTO completo para o Repository
      const result = await this.repository.createMealFromText(mealDto);

      if (environment.enableLogs) {
        console.log('✅ MealsService: Refeição registrada com sucesso');
      }

      return result;

    } catch (error) {
      console.error('❌ MealsService: Erro ao registrar refeição:', error);
      throw error;
    }
  }

  /**
   * Registra refeição via foto
   * ⚠️ IMPORTANTE: Recebe DTO já criado pela UI
   * @param {CreateMealPhotoRequest} mealDto - DTO já instanciado pela UI
   * @returns {Promise<Object>}
   */
  async createMealFromPhoto(mealDto) {
    // O Service não conhece os campos do DTO, apenas usa seus métodos
    if (!mealDto.isValid()) {
      throw new Error('Dados da refeição inválidos');
    }

    try {
      if (environment.enableLogs) {
        console.log('🍽️ MealsService: Registrando refeição via foto...');
      }

      // O Service passa o DTO completo para o Repository
      const result = await this.repository.createMealFromPhoto(mealDto);

      if (environment.enableLogs) {
        console.log('✅ MealsService: Refeição registrada com sucesso');
      }

      return result;

    } catch (error) {
      console.error('❌ MealsService: Erro ao registrar refeição:', error);
      throw error;
    }
  }

  /**
   * Registra refeição via áudio
   * ⚠️ IMPORTANTE: Recebe DTO já criado pela UI
   * @param {CreateMealAudioRequest} mealDto - DTO já instanciado pela UI
   * @returns {Promise<Object>}
   */
  async createMealFromAudio(mealDto) {
    // O Service não conhece os campos do DTO, apenas usa seus métodos
    if (!mealDto.isValid()) {
      throw new Error('Dados da refeição inválidos');
    }

    try {
      if (environment.enableLogs) {
        console.log('🍽️ MealsService: Registrando refeição via áudio...');
      }

      // O Service passa o DTO completo para o Repository
      const result = await this.repository.createMealFromAudio(mealDto);

      if (environment.enableLogs) {
        console.log('✅ MealsService: Refeição registrada com sucesso');
      }

      return result;

    } catch (error) {
      console.error('❌ MealsService: Erro ao registrar refeição:', error);
      throw error;
    }
  }

  /**
   * Busca alimentos
   * ⚠️ IMPORTANTE: Recebe DTO já criado pela UI
   * @param {SearchFoodRequest} searchDto - DTO já instanciado pela UI
   * @returns {Promise<Object>}
   */
  async searchFood(searchDto) {
    // O Service não conhece os campos do DTO, apenas usa seus métodos
    if (!searchDto.isValid()) {
      throw new Error('Parâmetros de busca inválidos');
    }

    try {
      if (environment.enableLogs) {
        console.log('🍽️ MealsService: Buscando alimentos...');
      }

      // O Service passa o DTO completo para o Repository
      const result = await this.repository.searchFood(searchDto);

      if (environment.enableLogs) {
        console.log('✅ MealsService: Busca realizada com sucesso');
      }

      return result;

    } catch (error) {
      console.error('❌ MealsService: Erro na busca de alimentos:', error);
      throw error;
    }
  }

  /**
   * Obtém histórico de refeições
   * @param {string} date - Data no formato YYYY-MM-DD
   * @returns {Promise<Object>}
   */
  async getMealsHistory(date = null) {
    try {
      if (environment.enableLogs) {
        console.log('🍽️ MealsService: Obtendo histórico de refeições...');
      }

      const result = await this.repository.getMealsHistory(date);

      if (environment.enableLogs) {
        console.log('✅ MealsService: Histórico obtido com sucesso');
      }

      return result;

    } catch (error) {
      console.error('❌ MealsService: Erro ao obter histórico:', error);
      throw error;
    }
  }

  /**
   * Obtém resumo nutricional do dia
   * @param {string} date - Data no formato YYYY-MM-DD
   * @returns {Promise<Object>}
   */
  async getDailyNutritionSummary(date = null) {
    try {
      if (environment.enableLogs) {
        console.log('🍽️ MealsService: Obtendo resumo nutricional...');
      }

      const result = await this.repository.getDailyNutritionSummary(date);

      if (environment.enableLogs) {
        console.log('✅ MealsService: Resumo obtido com sucesso');
      }

      return result;

    } catch (error) {
      console.error('❌ MealsService: Erro ao obter resumo nutricional:', error);
      throw error;
    }
  }

  /**
   * Deleta uma refeição
   * @param {string} mealId - ID da refeição
   * @returns {Promise<Object>}
   */
  async deleteMeal(mealId) {
    if (!mealId) {
      throw new Error('ID da refeição é obrigatório');
    }

    try {
      if (environment.enableLogs) {
        console.log('🍽️ MealsService: Deletando refeição...');
      }

      const result = await this.repository.deleteMeal(mealId);

      if (environment.enableLogs) {
        console.log('✅ MealsService: Refeição deletada com sucesso');
      }

      return result;

    } catch (error) {
      console.error('❌ MealsService: Erro ao deletar refeição:', error);
      throw error;
    }
  }
}
