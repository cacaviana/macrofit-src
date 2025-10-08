/**
 * Meals DTOs - Request objects
 * MacroFit Meals Data Transfer Objects
 */

/**
 * DTO para registro de refeição via texto
 */
export class CreateMealTextRequest {
  constructor(data = {}) {
    this.description = data.description || '';
    this.mealType = data.mealType || 'breakfast'; // breakfast, lunch, dinner, snack
    this.timestamp = data.timestamp || new Date().toISOString();
    this.userId = data.userId || null;
  }

  /**
   * Valida se os dados obrigatórios estão presentes
   */
  isValid() {
    return this.description.trim() !== '' && 
           this.mealType.trim() !== '' &&
           this.isValidMealType(this.mealType);
  }

  /**
   * Valida tipo de refeição
   */
  isValidMealType(type) {
    const validTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    return validTypes.includes(type);
  }

  /**
   * Converte para objeto para envio
   */
  toPayload() {
    return {
      description: this.description.trim(),
      mealType: this.mealType,
      timestamp: this.timestamp,
      userId: this.userId,
      source: 'text'
    };
  }
}

/**
 * DTO para registro de refeição via foto
 */
export class CreateMealPhotoRequest {
  constructor(data = {}) {
    this.imageFile = data.imageFile || null;
    this.mealType = data.mealType || 'breakfast';
    this.timestamp = data.timestamp || new Date().toISOString();
    this.userId = data.userId || null;
    this.description = data.description || ''; // descrição opcional
  }

  /**
   * Valida se os dados obrigatórios estão presentes
   */
  isValid() {
    return this.imageFile !== null && 
           this.mealType.trim() !== '' &&
           this.isValidMealType(this.mealType) &&
           this.isValidImageFile(this.imageFile);
  }

  /**
   * Valida tipo de refeição
   */
  isValidMealType(type) {
    const validTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    return validTypes.includes(type);
  }

  /**
   * Valida arquivo de imagem
   */
  isValidImageFile(file) {
    if (!file || typeof file !== 'object') return false;
    
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    return validTypes.includes(file.type) && file.size <= maxSize;
  }

  /**
   * Converte para objeto para envio
   */
  toPayload() {
    return {
      mealType: this.mealType,
      timestamp: this.timestamp,
      userId: this.userId,
      description: this.description.trim(),
      source: 'photo',
      hasImage: true
    };
  }
}

/**
 * DTO para registro de refeição via áudio
 */
export class CreateMealAudioRequest {
  constructor(data = {}) {
    this.audioBlob = data.audioBlob || null;
    this.mealType = data.mealType || 'breakfast';
    this.timestamp = data.timestamp || new Date().toISOString();
    this.userId = data.userId || null;
  }

  /**
   * Valida se os dados obrigatórios estão presentes
   */
  isValid() {
    return this.audioBlob !== null && 
           this.mealType.trim() !== '' &&
           this.isValidMealType(this.mealType) &&
           this.isValidAudioBlob(this.audioBlob);
  }

  /**
   * Valida tipo de refeição
   */
  isValidMealType(type) {
    const validTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    return validTypes.includes(type);
  }

  /**
   * Valida blob de áudio
   */
  isValidAudioBlob(blob) {
    if (!blob || typeof blob !== 'object') return false;
    
    const maxSize = 50 * 1024 * 1024; // 50MB
    return blob.size > 0 && blob.size <= maxSize;
  }

  /**
   * Converte para objeto para envio
   */
  toPayload() {
    return {
      mealType: this.mealType,
      timestamp: this.timestamp,
      userId: this.userId,
      source: 'audio',
      hasAudio: true
    };
  }
}

/**
 * DTO para busca de alimentos
 */
export class SearchFoodRequest {
  constructor(data = {}) {
    this.query = data.query || '';
    this.limit = data.limit || 20;
    this.offset = data.offset || 0;
  }

  /**
   * Valida se os dados obrigatórios estão presentes
   */
  isValid() {
    return this.query.trim() !== '' && 
           this.limit > 0 && 
           this.offset >= 0;
  }

  /**
   * Converte para objeto para envio
   */
  toPayload() {
    return {
      query: this.query.trim(),
      limit: this.limit,
      offset: this.offset
    };
  }
}
