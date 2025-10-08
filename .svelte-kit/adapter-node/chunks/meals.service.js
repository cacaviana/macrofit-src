import { e as environment } from "./environment.js";
const mockMeals = [
  {
    id: "meal-1",
    userId: "user-1",
    mealType: "breakfast",
    timestamp: "2024-10-06T08:15:00Z",
    source: "text",
    description: "Aveia com banana e mel",
    foods: [
      {
        id: "food-1",
        name: "Aveia em flocos",
        quantity: 50,
        unit: "g",
        calories: 190,
        protein: 6.9,
        carbs: 32.8,
        fat: 3.4
      },
      {
        id: "food-2",
        name: "Banana nanica",
        quantity: 120,
        unit: "g",
        calories: 105,
        protein: 1.3,
        carbs: 26.9,
        fat: 0.4
      },
      {
        id: "food-3",
        name: "Mel",
        quantity: 20,
        unit: "g",
        calories: 65,
        protein: 0.1,
        carbs: 17.3,
        fat: 0
      }
    ],
    totalCalories: 360,
    totalProtein: 8.3,
    totalCarbs: 77,
    totalFat: 3.8
  },
  {
    id: "meal-2",
    userId: "user-1",
    mealType: "lunch",
    timestamp: "2024-10-06T12:30:00Z",
    source: "photo",
    description: "Peito de frango grelhado com arroz integral",
    foods: [
      {
        id: "food-4",
        name: "Peito de frango grelhado",
        quantity: 150,
        unit: "g",
        calories: 248,
        protein: 31,
        carbs: 0,
        fat: 12.8
      },
      {
        id: "food-5",
        name: "Arroz integral cozido",
        quantity: 100,
        unit: "g",
        calories: 130,
        protein: 3,
        carbs: 28,
        fat: 1
      },
      {
        id: "food-6",
        name: "Brócolis refogado",
        quantity: 80,
        unit: "g",
        calories: 22,
        protein: 2.4,
        carbs: 4,
        fat: 0.3
      }
    ],
    totalCalories: 400,
    totalProtein: 36.4,
    totalCarbs: 32,
    totalFat: 14.1
  },
  {
    id: "meal-3",
    userId: "user-1",
    mealType: "snack",
    timestamp: "2024-10-06T15:45:00Z",
    source: "text",
    description: "Iogurte grego com granola",
    foods: [
      {
        id: "food-7",
        name: "Iogurte grego natural",
        quantity: 200,
        unit: "ml",
        calories: 200,
        protein: 18,
        carbs: 12,
        fat: 10
      },
      {
        id: "food-8",
        name: "Granola",
        quantity: 30,
        unit: "g",
        calories: 150,
        protein: 4.5,
        carbs: 18,
        fat: 6
      }
    ],
    totalCalories: 350,
    totalProtein: 22.5,
    totalCarbs: 30,
    totalFat: 16
  },
  {
    id: "meal-4",
    userId: "user-1",
    mealType: "dinner",
    timestamp: "2024-10-06T19:20:00Z",
    source: "audio",
    description: "Salmão grelhado com batata doce",
    foods: [
      {
        id: "food-9",
        name: "Salmão grelhado",
        quantity: 100,
        unit: "g",
        calories: 208,
        protein: 25.4,
        carbs: 0,
        fat: 12.4
      },
      {
        id: "food-10",
        name: "Batata doce assada",
        quantity: 100,
        unit: "g",
        calories: 103,
        protein: 2.3,
        carbs: 24.3,
        fat: 0.1
      },
      {
        id: "food-11",
        name: "Aspargos",
        quantity: 80,
        unit: "g",
        calories: 16,
        protein: 1.8,
        carbs: 3.2,
        fat: 0.1
      }
    ],
    totalCalories: 327,
    totalProtein: 29.5,
    totalCarbs: 27.5,
    totalFat: 12.6
  }
];
const mockFoodDatabase = [
  { id: "food-db-1", name: "Banana nanica", calories: 87, protein: 1.1, carbs: 22.8, fat: 0.3, unit: "100g" },
  { id: "food-db-2", name: "Peito de frango grelhado", calories: 165, protein: 31, carbs: 0, fat: 3.6, unit: "100g" },
  { id: "food-db-3", name: "Arroz integral cozido", calories: 130, protein: 3, carbs: 28, fat: 1, unit: "100g" },
  { id: "food-db-4", name: "Aveia em flocos", calories: 380, protein: 13.8, carbs: 65.6, fat: 6.8, unit: "100g" },
  { id: "food-db-5", name: "Iogurte grego natural", calories: 100, protein: 9, carbs: 6, fat: 5, unit: "100ml" },
  { id: "food-db-6", name: "Salmão grelhado", calories: 208, protein: 25.4, carbs: 0, fat: 12.4, unit: "100g" },
  { id: "food-db-7", name: "Batata doce assada", calories: 103, protein: 2.3, carbs: 24.3, fat: 0.1, unit: "100g" },
  { id: "food-db-8", name: "Brócolis refogado", calories: 28, protein: 3, carbs: 5, fat: 0.4, unit: "100g" },
  { id: "food-db-9", name: "Granola", calories: 500, protein: 15, carbs: 60, fat: 20, unit: "100g" },
  { id: "food-db-10", name: "Mel", calories: 325, protein: 0.5, carbs: 86.5, fat: 0, unit: "100g" }
];
const mockDailyNutrition = {
  date: "2024-10-06",
  totalCalories: 1437,
  totalProtein: 96.7,
  totalCarbs: 166.5,
  totalFat: 46.5,
  goals: {
    calories: 1850,
    protein: 140,
    carbs: 185,
    fat: 62
  },
  percentages: {
    calories: 78,
    protein: 69,
    carbs: 90,
    fat: 75
  },
  remaining: {
    calories: 413,
    protein: 43.3,
    carbs: 18.5,
    fat: 15.5
  }
};
class MealsRepository {
  constructor() {
    this.baseUrl = environment.apiUrl;
    this.useMock = environment.useMock;
    {
      console.log("🍽️ MealsRepository: Repository de refeições inicializado");
      console.log("🍽️ MealsRepository: Modo mock:", this.useMock);
    }
  }
  /**
   * Simula delay de rede
   */
  async simulateNetworkDelay() {
    const delay = Math.random() * 1e3 + 500;
    await new Promise((resolve) => setTimeout(resolve, delay));
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
    const response = await fetch(`${this.baseUrl}/meals/text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
    const analyzedMeal = {
      id: "meal-" + Date.now(),
      userId: payload.userId,
      mealType: payload.mealType,
      timestamp: payload.timestamp,
      source: payload.source,
      description: payload.description,
      foods: [
        {
          id: "food-analyzed-1",
          name: "Alimento identificado pela IA",
          quantity: 100,
          unit: "g",
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
        suggestions: ["Adicione mais proteína", "Considere incluir vegetais"]
      }
    };
    return {
      success: true,
      meal: analyzedMeal,
      message: "Refeição registrada e analisada com sucesso"
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
    const formData = new FormData();
    formData.append("image", mealDto.imageFile);
    formData.append("mealType", mealDto.mealType);
    formData.append("timestamp", mealDto.timestamp);
    formData.append("description", mealDto.description);
    const response = await fetch(`${this.baseUrl}/meals/photo`, {
      method: "POST",
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
    const analyzedMeal = {
      id: "meal-" + Date.now(),
      userId: payload.userId,
      mealType: payload.mealType,
      timestamp: payload.timestamp,
      source: payload.source,
      description: payload.description || "Prato identificado pela IA",
      foods: [
        {
          id: "food-photo-1",
          name: "Frango grelhado",
          quantity: 120,
          unit: "g",
          calories: 198,
          protein: 37.2,
          carbs: 0,
          fat: 4.3
        },
        {
          id: "food-photo-2",
          name: "Arroz branco",
          quantity: 80,
          unit: "g",
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
        recognizedItems: ["Frango grelhado", "Arroz branco"],
        suggestions: ["Excelente fonte de proteína!"]
      }
    };
    return {
      success: true,
      meal: analyzedMeal,
      message: "Foto analisada e refeição registrada com sucesso"
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
    const formData = new FormData();
    formData.append("audio", mealDto.audioBlob);
    formData.append("mealType", mealDto.mealType);
    formData.append("timestamp", mealDto.timestamp);
    const response = await fetch(`${this.baseUrl}/meals/audio`, {
      method: "POST",
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
    const analyzedMeal = {
      id: "meal-" + Date.now(),
      userId: payload.userId,
      mealType: payload.mealType,
      timestamp: payload.timestamp,
      source: payload.source,
      description: "Salada de atum com tomate e cebola",
      transcription: "Comi uma salada de atum com tomate e cebola",
      foods: [
        {
          id: "food-audio-1",
          name: "Atum em conserva",
          quantity: 100,
          unit: "g",
          calories: 116,
          protein: 25.5,
          carbs: 0,
          fat: 0.8
        },
        {
          id: "food-audio-2",
          name: "Tomate",
          quantity: 80,
          unit: "g",
          calories: 14,
          protein: 0.7,
          carbs: 3,
          fat: 0.2
        }
      ],
      totalCalories: 130,
      totalProtein: 26.2,
      totalCarbs: 3,
      totalFat: 1,
      aiAnalysis: {
        confidence: 0.88,
        transcriptionAccuracy: 0.95,
        suggestions: ["Ótima escolha de proteína magra!"]
      }
    };
    return {
      success: true,
      meal: analyzedMeal,
      message: "Áudio transcrito e refeição registrada com sucesso"
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
    const filteredFoods = mockFoodDatabase.filter(
      (food) => food.name.toLowerCase().includes(query)
    );
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
    const params = date ? `?date=${date}` : "";
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
    const targetDate = date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const filteredMeals = mockMeals.filter(
      (meal) => meal.timestamp.startsWith(targetDate)
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
    const params = date ? `?date=${date}` : "";
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
    const targetDate = date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
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
    const response = await fetch(`${this.baseUrl}/meals/${mealId}`, {
      method: "DELETE"
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
      message: "Refeição deletada com sucesso",
      deletedMealId: mealId
    };
  }
}
const mealsRepository = new MealsRepository();
class MealsService {
  constructor() {
    this.repository = mealsRepository;
    {
      console.log("🍽️ MealsService: Serviço de refeições inicializado");
    }
  }
  /**
   * Registra refeição via texto
   * ⚠️ IMPORTANTE: Recebe DTO já criado pela UI
   * @param {CreateMealTextRequest} mealDto - DTO já instanciado pela UI
   * @returns {Promise<Object>}
   */
  async createMealFromText(mealDto) {
    if (!mealDto.isValid()) {
      throw new Error("Dados da refeição inválidos");
    }
    try {
      if (environment.enableLogs) {
        console.log("🍽️ MealsService: Registrando refeição via texto...");
      }
      const result = await this.repository.createMealFromText(mealDto);
      if (environment.enableLogs) {
        console.log("✅ MealsService: Refeição registrada com sucesso");
      }
      return result;
    } catch (error) {
      console.error("❌ MealsService: Erro ao registrar refeição:", error);
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
    if (!mealDto.isValid()) {
      throw new Error("Dados da refeição inválidos");
    }
    try {
      if (environment.enableLogs) {
        console.log("🍽️ MealsService: Registrando refeição via foto...");
      }
      const result = await this.repository.createMealFromPhoto(mealDto);
      if (environment.enableLogs) {
        console.log("✅ MealsService: Refeição registrada com sucesso");
      }
      return result;
    } catch (error) {
      console.error("❌ MealsService: Erro ao registrar refeição:", error);
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
    if (!mealDto.isValid()) {
      throw new Error("Dados da refeição inválidos");
    }
    try {
      if (environment.enableLogs) {
        console.log("🍽️ MealsService: Registrando refeição via áudio...");
      }
      const result = await this.repository.createMealFromAudio(mealDto);
      if (environment.enableLogs) {
        console.log("✅ MealsService: Refeição registrada com sucesso");
      }
      return result;
    } catch (error) {
      console.error("❌ MealsService: Erro ao registrar refeição:", error);
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
    if (!searchDto.isValid()) {
      throw new Error("Parâmetros de busca inválidos");
    }
    try {
      if (environment.enableLogs) {
        console.log("🍽️ MealsService: Buscando alimentos...");
      }
      const result = await this.repository.searchFood(searchDto);
      if (environment.enableLogs) {
        console.log("✅ MealsService: Busca realizada com sucesso");
      }
      return result;
    } catch (error) {
      console.error("❌ MealsService: Erro na busca de alimentos:", error);
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
        console.log("🍽️ MealsService: Obtendo histórico de refeições...");
      }
      const result = await this.repository.getMealsHistory(date);
      if (environment.enableLogs) {
        console.log("✅ MealsService: Histórico obtido com sucesso");
      }
      return result;
    } catch (error) {
      console.error("❌ MealsService: Erro ao obter histórico:", error);
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
        console.log("🍽️ MealsService: Obtendo resumo nutricional...");
      }
      const result = await this.repository.getDailyNutritionSummary(date);
      if (environment.enableLogs) {
        console.log("✅ MealsService: Resumo obtido com sucesso");
      }
      return result;
    } catch (error) {
      console.error("❌ MealsService: Erro ao obter resumo nutricional:", error);
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
      throw new Error("ID da refeição é obrigatório");
    }
    try {
      if (environment.enableLogs) {
        console.log("🍽️ MealsService: Deletando refeição...");
      }
      const result = await this.repository.deleteMeal(mealId);
      if (environment.enableLogs) {
        console.log("✅ MealsService: Refeição deletada com sucesso");
      }
      return result;
    } catch (error) {
      console.error("❌ MealsService: Erro ao deletar refeição:", error);
      throw error;
    }
  }
}
export {
  MealsService as M
};
