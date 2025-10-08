/**
 * Auth DTOs - Request objects
 * MacroFit Authentication Data Transfer Objects
 */

/**
 * DTO para login de usuário
 */
export class LoginRequest {
  constructor(data = {}) {
    this.email = data.email || '';
    this.password = data.password || '';
    this.rememberMe = data.rememberMe || false;
  }

  /**
   * Valida se os dados obrigatórios estão presentes
   */
  isValid() {
    return this.email.trim() !== '' && 
           this.password.trim() !== '' &&
           this.isValidEmail(this.email);
  }

  /**
   * Valida formato do email
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Converte para objeto para envio
   */
  toPayload() {
    return {
      email: this.email.trim().toLowerCase(),
      password: this.password,
      rememberMe: this.rememberMe
    };
  }
}

/**
 * DTO para registro de usuário
 */
export class RegisterRequest {
  constructor(data = {}) {
    this.name = data.name || '';
    this.email = data.email || '';
    this.password = data.password || '';
    this.confirmPassword = data.confirmPassword || '';
    this.acceptTerms = data.acceptTerms || false;
  }

  /**
   * Valida se os dados obrigatórios estão presentes
   */
  isValid() {
    return this.name.trim() !== '' &&
           this.email.trim() !== '' &&
           this.password.trim() !== '' &&
           this.confirmPassword.trim() !== '' &&
           this.acceptTerms &&
           this.isValidEmail(this.email) &&
           this.isValidPassword(this.password) &&
           this.password === this.confirmPassword;
  }

  /**
   * Valida formato do email
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valida força da senha
   */
  isValidPassword(password) {
    // Mínimo 8 caracteres, pelo menos 1 letra e 1 número
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  }

  /**
   * Converte para objeto para envio
   */
  toPayload() {
    return {
      name: this.name.trim(),
      email: this.email.trim().toLowerCase(),
      password: this.password
    };
  }
}

/**
 * DTO para recuperação de senha
 */
export class ForgotPasswordRequest {
  constructor(data = {}) {
    this.email = data.email || '';
  }

  /**
   * Valida se os dados obrigatórios estão presentes
   */
  isValid() {
    return this.email.trim() !== '' && this.isValidEmail(this.email);
  }

  /**
   * Valida formato do email
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Converte para objeto para envio
   */
  toPayload() {
    return {
      email: this.email.trim().toLowerCase()
    };
  }
}
