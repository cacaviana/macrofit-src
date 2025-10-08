/**
 * User DTOs - Request objects
 * MacroFit User Configuration Data Transfer Objects
 */

/**
 * DTO para configuração inicial do usuário
 */
export class UserSetupRequest {
  constructor(data = {}) {
    this.currentWeight = data.currentWeight || 0;
    this.targetWeight = data.targetWeight || 0;
    this.height = data.height || 0;
    this.age = data.age || 0;
    this.gender = data.gender || ''; // 'male' | 'female'
    this.activityLevel = data.activityLevel || ''; // 'sedentary' | 'light' | 'moderate' | 'active'
    this.goal = data.goal || ''; // 'lose_weight' | 'maintain' | 'gain_weight'
  }

  /**
   * Valida se os dados obrigatórios estão presentes
   */
  isValid() {
    return this.currentWeight > 0 &&
           this.targetWeight > 0 &&
           this.height > 0 &&
           this.age > 0 &&
           this.isValidGender(this.gender) &&
           this.isValidActivityLevel(this.activityLevel) &&
           this.isValidGoal(this.goal);
  }

  /**
   * Valida gênero
   */
  isValidGender(gender) {
    const validGenders = ['male', 'female'];
    return validGenders.includes(gender);
  }

  /**
   * Valida nível de atividade
   */
  isValidActivityLevel(level) {
    const validLevels = ['sedentary', 'light', 'moderate', 'active'];
    return validLevels.includes(level);
  }

  /**
   * Valida objetivo
   */
  isValidGoal(goal) {
    const validGoals = ['lose_weight', 'maintain', 'gain_weight'];
    return validGoals.includes(goal);
  }

  /**
   * Converte para objeto para envio
   */
  toPayload() {
    return {
      currentWeight: this.currentWeight,
      targetWeight: this.targetWeight,
      height: this.height,
      age: this.age,
      gender: this.gender,
      activityLevel: this.activityLevel,
      goal: this.goal
    };
  }
}

/**
 * DTO para atualização de peso
 */
export class UpdateWeightRequest {
  constructor(data = {}) {
    this.weight = data.weight || 0;
    this.date = data.date || new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    this.notes = data.notes || '';
  }

  /**
   * Valida se os dados obrigatórios estão presentes
   */
  isValid() {
    return this.weight > 0 && 
           this.date.trim() !== '' &&
           this.isValidDate(this.date);
  }

  /**
   * Valida formato da data
   */
  isValidDate(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return false;
    
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj);
  }

  /**
   * Converte para objeto para envio
   */
  toPayload() {
    return {
      weight: this.weight,
      date: this.date,
      notes: this.notes.trim()
    };
  }
}

/**
 * DTO para registro de hidratação
 */
export class AddWaterRequest {
  constructor(data = {}) {
    this.amount = data.amount || 0; // em ml
    this.timestamp = data.timestamp || new Date().toISOString();
  }

  /**
   * Valida se os dados obrigatórios estão presentes
   */
  isValid() {
    return this.amount > 0 && this.amount <= 2000; // máximo 2L por registro
  }

  /**
   * Converte para objeto para envio
   */
  toPayload() {
    return {
      amount: this.amount,
      timestamp: this.timestamp
    };
  }
}

/**
 * DTO para registro de exercício
 */
export class AddExerciseRequest {
  constructor(data = {}) {
    this.name = data.name || '';
    this.duration = data.duration || 0; // em minutos
    this.intensity = data.intensity || ''; // 'low' | 'moderate' | 'high'
    this.caloriesBurned = data.caloriesBurned || 0;
    this.timestamp = data.timestamp || new Date().toISOString();
    this.notes = data.notes || '';
  }

  /**
   * Valida se os dados obrigatórios estão presentes
   */
  isValid() {
    return this.name.trim() !== '' &&
           this.duration > 0 &&
           this.isValidIntensity(this.intensity);
  }

  /**
   * Valida intensidade do exercício
   */
  isValidIntensity(intensity) {
    const validIntensities = ['low', 'moderate', 'high'];
    return validIntensities.includes(intensity);
  }

  /**
   * Converte para objeto para envio
   */
  toPayload() {
    return {
      name: this.name.trim(),
      duration: this.duration,
      intensity: this.intensity,
      caloriesBurned: this.caloriesBurned,
      timestamp: this.timestamp,
      notes: this.notes.trim()
    };
  }
}
