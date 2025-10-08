import { e as environment } from "./environment.js";
import { a as mockWaterIntake, m as mockUsers, b as mockExercises } from "./users.js";
class UserRepository {
  constructor() {
    this.baseUrl = environment.apiUrl;
    this.useMock = environment.useMock;
    {
      console.log("👤 UserRepository: Repository de usuário inicializado");
      console.log("👤 UserRepository: Modo mock:", this.useMock);
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
   * Configura dados iniciais do usuário
   * @param {UserSetupRequest} setupDto - DTO de configuração
   * @returns {Promise<Object>}
   */
  async setupUser(setupDto) {
    if (this.useMock) {
      return this.mockSetupUser(setupDto);
    }
    const response = await fetch(`${this.baseUrl}/user/setup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(setupDto.toPayload())
    });
    if (!response.ok) {
      throw new Error(`Erro na configuração: ${response.status}`);
    }
    return response.json();
  }
  /**
   * Mock da configuração do usuário
   */
  async mockSetupUser(setupDto) {
    await this.simulateNetworkDelay();
    const payload = setupDto.toPayload();
    const calculatedGoals = this.calculateNutritionGoals(payload);
    const updatedProfile = {
      ...payload,
      ...calculatedGoals,
      setupCompleted: true,
      setupDate: (/* @__PURE__ */ new Date()).toISOString()
    };
    return {
      success: true,
      profile: updatedProfile,
      message: "Perfil configurado com sucesso",
      aiRecommendations: [
        "Suas metas foram calculadas com base no seu perfil",
        "Recomendamos começar gradualmente",
        "Mantenha-se hidratado durante o dia"
      ]
    };
  }
  /**
   * Calcula metas nutricionais baseado no perfil
   */
  calculateNutritionGoals(profile) {
    let bmr;
    if (profile.gender === "male") {
      bmr = 88.362 + 13.397 * profile.currentWeight + 4.799 * profile.height - 5.677 * profile.age;
    } else {
      bmr = 447.593 + 9.247 * profile.currentWeight + 3.098 * profile.height - 4.33 * profile.age;
    }
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725
    };
    let dailyCalories = bmr * activityMultipliers[profile.activityLevel];
    if (profile.goal === "lose_weight") {
      dailyCalories -= 500;
    } else if (profile.goal === "gain_weight") {
      dailyCalories += 500;
    }
    const dailyProtein = profile.currentWeight * 2;
    const dailyFat = dailyCalories * 0.25 / 9;
    const dailyCarbs = (dailyCalories - dailyProtein * 4 - dailyFat * 9) / 4;
    return {
      dailyCalories: Math.round(dailyCalories),
      dailyProtein: Math.round(dailyProtein),
      dailyCarbs: Math.round(dailyCarbs),
      dailyFat: Math.round(dailyFat),
      dailyWater: 2500
      // 2.5L padrão
    };
  }
  /**
   * Atualiza peso do usuário
   * @param {UpdateWeightRequest} weightDto - DTO de peso
   * @returns {Promise<Object>}
   */
  async updateWeight(weightDto) {
    if (this.useMock) {
      return this.mockUpdateWeight(weightDto);
    }
    const response = await fetch(`${this.baseUrl}/user/weight`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(weightDto.toPayload())
    });
    if (!response.ok) {
      throw new Error(`Erro ao atualizar peso: ${response.status}`);
    }
    return response.json();
  }
  /**
   * Mock da atualização de peso
   */
  async mockUpdateWeight(weightDto) {
    await this.simulateNetworkDelay();
    const payload = weightDto.toPayload();
    return {
      success: true,
      weightEntry: payload,
      message: "Peso atualizado com sucesso",
      progress: {
        change: -0.2,
        // kg perdidos
        trend: "decreasing"
      }
    };
  }
  /**
   * Adiciona registro de hidratação
   * @param {AddWaterRequest} waterDto - DTO de água
   * @returns {Promise<Object>}
   */
  async addWater(waterDto) {
    if (this.useMock) {
      return this.mockAddWater(waterDto);
    }
    const response = await fetch(`${this.baseUrl}/user/water`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(waterDto.toPayload())
    });
    if (!response.ok) {
      throw new Error(`Erro ao adicionar água: ${response.status}`);
    }
    return response.json();
  }
  /**
   * Mock da adição de água
   */
  async mockAddWater(waterDto) {
    await this.simulateNetworkDelay();
    const payload = waterDto.toPayload();
    const todayTotal = mockWaterIntake.reduce((sum, entry) => sum + entry.amount, 0) + payload.amount;
    const goal = 2500;
    const percentage = Math.min(todayTotal / goal * 100, 100);
    return {
      success: true,
      waterEntry: payload,
      dailyStats: {
        total: todayTotal,
        goal,
        percentage: Math.round(percentage),
        remaining: Math.max(goal - todayTotal, 0)
      },
      message: "Hidratação registrada com sucesso"
    };
  }
  /**
   * Adiciona registro de exercício
   * @param {AddExerciseRequest} exerciseDto - DTO de exercício
   * @returns {Promise<Object>}
   */
  async addExercise(exerciseDto) {
    if (this.useMock) {
      return this.mockAddExercise(exerciseDto);
    }
    const response = await fetch(`${this.baseUrl}/user/exercise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(exerciseDto.toPayload())
    });
    if (!response.ok) {
      throw new Error(`Erro ao adicionar exercício: ${response.status}`);
    }
    return response.json();
  }
  /**
   * Mock da adição de exercício
   */
  async mockAddExercise(exerciseDto) {
    await this.simulateNetworkDelay();
    const payload = exerciseDto.toPayload();
    const exerciseEntry = {
      id: "ex-" + Date.now(),
      ...payload
    };
    return {
      success: true,
      exercise: exerciseEntry,
      message: "Exercício registrado com sucesso",
      achievements: ["Primeira atividade da semana!"]
      // Simula conquistas
    };
  }
  /**
   * Obtém perfil do usuário
   * @returns {Promise<Object>}
   */
  async getUserProfile() {
    if (this.useMock) {
      return this.mockGetUserProfile();
    }
    const response = await fetch(`${this.baseUrl}/user/profile`);
    if (!response.ok) {
      throw new Error(`Erro ao obter perfil: ${response.status}`);
    }
    return response.json();
  }
  /**
   * Mock do perfil do usuário
   */
  async mockGetUserProfile() {
    await this.simulateNetworkDelay();
    return {
      success: true,
      user: mockUsers[0]
    };
  }
  /**
   * Obtém estatísticas de hidratação
   * @param {string} date - Data no formato YYYY-MM-DD
   * @returns {Promise<Object>}
   */
  async getWaterStats(date = null) {
    if (this.useMock) {
      return this.mockGetWaterStats(date);
    }
    const params = date ? `?date=${date}` : "";
    const response = await fetch(`${this.baseUrl}/user/water/stats${params}`);
    if (!response.ok) {
      throw new Error(`Erro ao obter estatísticas: ${response.status}`);
    }
    return response.json();
  }
  /**
   * Mock das estatísticas de hidratação
   */
  async mockGetWaterStats(date = null) {
    await this.simulateNetworkDelay();
    const targetDate = date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const dayEntries = mockWaterIntake.filter(
      (entry) => entry.timestamp.startsWith(targetDate)
    );
    const total = dayEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const goal = 2500;
    return {
      success: true,
      stats: {
        date: targetDate,
        total,
        goal,
        percentage: Math.round(total / goal * 100),
        remaining: Math.max(goal - total, 0),
        entries: dayEntries,
        streak: 5
        // dias consecutivos
      }
    };
  }
  /**
   * Obtém histórico de exercícios
   * @param {string} date - Data no formato YYYY-MM-DD
   * @returns {Promise<Object>}
   */
  async getExerciseHistory(date = null) {
    if (this.useMock) {
      return this.mockGetExerciseHistory(date);
    }
    const params = date ? `?date=${date}` : "";
    const response = await fetch(`${this.baseUrl}/user/exercise/history${params}`);
    if (!response.ok) {
      throw new Error(`Erro ao obter histórico: ${response.status}`);
    }
    return response.json();
  }
  /**
   * Mock do histórico de exercícios
   */
  async mockGetExerciseHistory(date = null) {
    await this.simulateNetworkDelay();
    const targetDate = date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const dayExercises = mockExercises.filter(
      (exercise) => exercise.timestamp.startsWith(targetDate)
    );
    const totalCalories = dayExercises.reduce((sum, ex) => sum + ex.caloriesBurned, 0);
    const totalDuration = dayExercises.reduce((sum, ex) => sum + ex.duration, 0);
    return {
      success: true,
      history: {
        date: targetDate,
        exercises: dayExercises,
        summary: {
          totalExercises: dayExercises.length,
          totalCalories,
          totalDuration
        }
      }
    };
  }
}
const userRepository = new UserRepository();
class UserService {
  constructor() {
    this.repository = userRepository;
    {
      console.log("👤 UserService: Serviço de usuário inicializado");
    }
  }
  /**
   * Configura dados iniciais do usuário
   * ⚠️ IMPORTANTE: Recebe DTO já criado pela UI
   * @param {UserSetupRequest} setupDto - DTO já instanciado pela UI
   * @returns {Promise<Object>}
   */
  async setupUser(setupDto) {
    if (!setupDto.isValid()) {
      throw new Error("Dados de configuração inválidos");
    }
    try {
      if (environment.enableLogs) {
        console.log("👤 UserService: Configurando usuário...");
      }
      const result = await this.repository.setupUser(setupDto);
      if (environment.enableLogs) {
        console.log("✅ UserService: Usuário configurado com sucesso");
      }
      return result;
    } catch (error) {
      console.error("❌ UserService: Erro na configuração do usuário:", error);
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
    if (!weightDto.isValid()) {
      throw new Error("Dados de peso inválidos");
    }
    try {
      if (environment.enableLogs) {
        console.log("👤 UserService: Atualizando peso...");
      }
      const result = await this.repository.updateWeight(weightDto);
      if (environment.enableLogs) {
        console.log("✅ UserService: Peso atualizado com sucesso");
      }
      return result;
    } catch (error) {
      console.error("❌ UserService: Erro ao atualizar peso:", error);
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
    if (!waterDto.isValid()) {
      throw new Error("Dados de hidratação inválidos");
    }
    try {
      if (environment.enableLogs) {
        console.log("👤 UserService: Adicionando água...");
      }
      const result = await this.repository.addWater(waterDto);
      if (environment.enableLogs) {
        console.log("✅ UserService: Água adicionada com sucesso");
      }
      return result;
    } catch (error) {
      console.error("❌ UserService: Erro ao adicionar água:", error);
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
    if (!exerciseDto.isValid()) {
      throw new Error("Dados de exercício inválidos");
    }
    try {
      if (environment.enableLogs) {
        console.log("👤 UserService: Adicionando exercício...");
      }
      const result = await this.repository.addExercise(exerciseDto);
      if (environment.enableLogs) {
        console.log("✅ UserService: Exercício adicionado com sucesso");
      }
      return result;
    } catch (error) {
      console.error("❌ UserService: Erro ao adicionar exercício:", error);
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
        console.log("👤 UserService: Obtendo perfil do usuário...");
      }
      const result = await this.repository.getUserProfile();
      if (environment.enableLogs) {
        console.log("✅ UserService: Perfil obtido com sucesso");
      }
      return result;
    } catch (error) {
      console.error("❌ UserService: Erro ao obter perfil:", error);
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
        console.log("👤 UserService: Obtendo estatísticas de hidratação...");
      }
      const result = await this.repository.getWaterStats(date);
      if (environment.enableLogs) {
        console.log("✅ UserService: Estatísticas obtidas com sucesso");
      }
      return result;
    } catch (error) {
      console.error("❌ UserService: Erro ao obter estatísticas de hidratação:", error);
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
        console.log("👤 UserService: Obtendo histórico de exercícios...");
      }
      const result = await this.repository.getExerciseHistory(date);
      if (environment.enableLogs) {
        console.log("✅ UserService: Histórico obtido com sucesso");
      }
      return result;
    } catch (error) {
      console.error("❌ UserService: Erro ao obter histórico de exercícios:", error);
      throw error;
    }
  }
}
export {
  UserService as U
};
