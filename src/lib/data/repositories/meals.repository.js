/**
 * Meals Repository - MacroFit
 * Simula chamadas de API externa para refeições
 */

import { environment } from '$lib/config/environment.js';
import { mockMeals, mockFoodDatabase, mockDailyNutrition } from '../mockData/meals.js';

class MealsRepository {
  constructor() {
    this.baseUrl = environment.apiUrl;
    this.useMock = environment.useMock;
    
    if (environment.enableLogs) {
      console.log('🍽️ MealsRepository: Repository de refeições inicializado');
      console.log('🍽️ MealsRepository: Modo mock:', this.useMock);
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
   * Cria refeição via texto
   * @param {CreateMealTextRequest} mealDto - DTO de refeição
   * @returns {Promise<Object>}
   */
  async createMealFromText(mealDto) {
    if (this.useMock) {
      return this.mockCreateMealFromText(mealDto);
    }

    // Implementação real da API
    const response = await fetch(`${this.baseUrl}/meals/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mealDto.toPayload())
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar refeição: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Mock da criação de refeição via texto
   */
  async mockCreateMealFromText(mealDto) {
    await this.simulateNetworkDelay();

    const payload = mealDto.toPayload();
    
    // Simula análise de IA da descrição
    const analyzedMeal = {
      id: 'meal-' + Date.now(),
      userId: payload.userId,
      mealType: payload.mealType,
      timestamp: payload.timestamp,
      source: payload.source,
      description: payload.description,
      foods: [
        {
          id: 'food-analyzed-1',
          name: 'Alimento identificado pela IA',
          quantity: 100,
          unit: 'g',
          calories: 150,
          protein: 8,
          carbs: 20,
          fat: 5
        }
      ],
      totalCalories: 150,
      totalProtein: 8,
      totalCarbs: 20,
      totalFat: 5,
      aiAnalysis: {
        confidence: 0.85,
        suggestions: ['Adicione mais proteína', 'Considere incluir vegetais']
      }
    };

    return {
      success: true,
      meal: analyzedMeal,
      message: 'Refeição registrada e analisada com sucesso'
    };
  }

  /**
   * Cria refeição via foto
   * @param {CreateMealPhotoRequest} mealDto - DTO de refeição
   * @returns {Promise<Object>}
   */
  async createMealFromPhoto(mealDto) {
    if (this.useMock) {
      return this.mockCreateMealFromPhoto(mealDto);
    }

    // Implementação real da API com upload de imagem
    const formData = new FormData();
    formData.append('image', mealDto.imageFile);
    formData.append('mealType', mealDto.mealType);
    formData.append('timestamp', mealDto.timestamp);
    formData.append('description', mealDto.description);

    const response = await fetch(`${this.baseUrl}/meals/photo`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar refeição: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Mock da criação de refeição via foto
   */
  async mockCreateMealFromPhoto(mealDto) {
    await this.simulateNetworkDelay();

    const payload = mealDto.toPayload();
    
    // Simula reconhecimento de imagem pela IA
    const analyzedMeal = {
      id: 'meal-' + Date.now(),
      userId: payload.userId,
      mealType: payload.mealType,
      timestamp: payload.timestamp,
      source: payload.source,
      description: payload.description || 'Prato identificado pela IA',
      foods: [
        {
          id: 'food-photo-1',
          name: 'Frango grelhado',
          quantity: 120,
          unit: 'g',
          calories: 198,
          protein: 37.2,
          carbs: 0,
          fat: 4.3
        },
        {
          id: 'food-photo-2',
          name: 'Arroz branco',
          quantity: 80,
          unit: 'g',
          calories: 104,
          protein: 2.4,
          carbs: 22.4,
          fat: 0.8
        }
      ],
      totalCalories: 302,
      totalProtein: 39.6,
      totalCarbs: 22.4,
      totalFat: 5.1,
      aiAnalysis: {
        confidence: 0.92,
        recognizedItems: ['Frango grelhado', 'Arroz branco'],
        suggestions: ['Excelente fonte de proteína!']
      }
    };

    return {
      success: true,
      meal: analyzedMeal,
      message: 'Foto analisada e refeição registrada com sucesso'
    };
  }

  /**
   * Cria refeição via áudio
   * @param {CreateMealAudioRequest} mealDto - DTO de refeição
   * @returns {Promise<Object>}
   */
  async createMealFromAudio(mealDto) {
    if (this.useMock) {
      return this.mockCreateMealFromAudio(mealDto);
    }

    // Implementação real da API com upload de áudio
    const formData = new FormData();
    formData.append('audio', mealDto.audioBlob);
    formData.append('mealType', mealDto.mealType);
    formData.append('timestamp', mealDto.timestamp);

    const response = await fetch(`${this.baseUrl}/meals/audio`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar refeição: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Mock da criação de refeição via áudio
   */
  async mockCreateMealFromAudio(mealDto) {
    await this.simulateNetworkDelay();

    const payload = mealDto.toPayload();
    
    // Simula transcrição e análise de áudio
    const analyzedMeal = {
      id: 'meal-' + Date.now(),
      userId: payload.userId,
      mealType: payload.mealType,
      timestamp: payload.timestamp,
      source: payload.source,
      description: 'Salada de atum com tomate e cebola',
      transcription: 'Comi uma salada de atum com tomate e cebola',
      foods: [
        {
          id: 'food-audio-1',
          name: 'Atum em conserva',
          quantity: 100,
          unit: 'g',
          calories: 116,
          protein: 25.5,
          carbs: 0,
          fat: 0.8
        },
        {
          id: 'food-audio-2',
          name: 'Tomate',
          quantity: 80,
          unit: 'g',
          calories: 14,
          protein: 0.7,
          carbs: 3.0,
          fat: 0.2
        }
      ],
      totalCalories: 130,
      totalProtein: 26.2,
      totalCarbs: 3.0,
      totalFat: 1.0,
      aiAnalysis: {
        confidence: 0.88,
        transcriptionAccuracy: 0.95,
        suggestions: ['Ótima escolha de proteína magra!']
      }
    };

    return {
      success: true,
      meal: analyzedMeal,
      message: 'Áudio transcrito e refeição registrada com sucesso'
    };
  }

  /**
   * Busca alimentos
   * @param {SearchFoodRequest} searchDto - DTO de busca
   * @returns {Promise<Object>}
   */
  async searchFood(searchDto) {
    if (this.useMock) {
      return this.mockSearchFood(searchDto);
    }

    // Implementação real da API
    const params = new URLSearchParams(searchDto.toPayload());
    const response = await fetch(`${this.baseUrl}/foods/search?${params}`);

    if (!response.ok) {
      throw new Error(`Erro na busca: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Mock da busca de alimentos
   */
  async mockSearchFood(searchDto) {
    await this.simulateNetworkDelay();

    const payload = searchDto.toPayload();
    const query = payload.query.toLowerCase();
    
    // Filtra alimentos baseado na query
    const filteredFoods = mockFoodDatabase.filter(food => 
      food.name.toLowerCase().includes(query)
    );

    // Aplica paginação
    const startIndex = payload.offset;
    const endIndex = startIndex + payload.limit;
    const paginatedFoods = filteredFoods.slice(startIndex, endIndex);

    return {
      success: true,
      foods: paginatedFoods,
      total: filteredFoods.length,
      offset: payload.offset,
      limit: payload.limit,
      hasMore: endIndex < filteredFoods.length
    };
  }

  /**
   * Obtém histórico de refeições
   * @param {string} date - Data no formato YYYY-MM-DD
   * @returns {Promise<Object>}
   */
  async getMealsHistory(date = null) {
    if (this.useMock) {
      return this.mockGetMealsHistory(date);
    }

    // Implementação real da API
    const params = date ? `?date=${date}` : '';
    const response = await fetch(`${this.baseUrl}/meals/history${params}`);

    if (!response.ok) {
      throw new Error(`Erro ao obter histórico: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Mock do histórico de refeições
   */
  async mockGetMealsHistory(date = null) {
    await this.simulateNetworkDelay();

    // Se não especificar data, usa hoje
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    // Filtra refeições por data
    const filteredMeals = mockMeals.filter(meal => 
      meal.timestamp.startsWith(targetDate)
    );

    return {
      success: true,
      meals: filteredMeals,
      date: targetDate,
      totalMeals: filteredMeals.length
    };
  }

  /**
   * Obtém resumo nutricional do dia
   * @param {string} date - Data no formato YYYY-MM-DD
   * @returns {Promise<Object>}
   */
  async getDailyNutritionSummary(date = null) {
    if (this.useMock) {
      return this.mockGetDailyNutritionSummary(date);
    }

    // Implementação real da API
    const params = date ? `?date=${date}` : '';
    const response = await fetch(`${this.baseUrl}/meals/nutrition/daily${params}`);

    if (!response.ok) {
      throw new Error(`Erro ao obter resumo: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Mock do resumo nutricional
   */
  async mockGetDailyNutritionSummary(date = null) {
    await this.simulateNetworkDelay();

    const targetDate = date || new Date().toISOString().split('T')[0];
    
    return {
      success: true,
      nutrition: {
        ...mockDailyNutrition,
        date: targetDate
      }
    };
  }

  /**
   * Deleta uma refeição
   * @param {string} mealId - ID da refeição
   * @returns {Promise<Object>}
   */
  async deleteMeal(mealId) {
    if (this.useMock) {
      return this.mockDeleteMeal(mealId);
    }

    // Implementação real da API
    const response = await fetch(`${this.baseUrl}/meals/${mealId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar refeição: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Mock da deleção de refeição
   */
  async mockDeleteMeal(mealId) {
    await this.simulateNetworkDelay();

    return {
      success: true,
      message: 'Refeição deletada com sucesso',
      deletedMealId: mealId
    };
  }
}

export default new MealsRepository();
