import { e as environment } from "./environment.js";
import { m as mockUsers } from "./users.js";
class AuthRepository {
  constructor() {
    this.baseUrl = environment.apiUrl;
    this.useMock = environment.useMock;
    {
      console.log("🔐 AuthRepository: Repository de autenticação inicializado");
      console.log("🔐 AuthRepository: Modo mock:", this.useMock);
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
   * Realiza login
   * @param {LoginRequest} loginDto - DTO de login
   * @returns {Promise<Object>}
   */
  async login(loginDto) {
    if (this.useMock) {
      return this.mockLogin(loginDto);
    }
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
    if (payload.email === "maria@macrofit.com" && payload.password === "123456") {
      const user = mockUsers[0];
      let token = null;
      return {
        success: true,
        user,
        token,
        message: "Login realizado com sucesso"
      };
    }
    throw new Error("Email ou senha inválidos");
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
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
    if (payload.email === "maria@macrofit.com") {
      throw new Error("Email já está em uso");
    }
    const newUser = {
      id: "user-" + Date.now(),
      email: payload.email,
      name: payload.name,
      premium: false,
      profile: null,
      // Será configurado depois
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return {
      success: true,
      user: newUser,
      message: "Conta criada com sucesso"
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
    const response = await fetch(`${this.baseUrl}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
      message: "Email de recuperação enviado com sucesso"
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
    const response = await fetch(`${this.baseUrl}/auth/logout`, {
      method: "POST",
      credentials: "include"
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
    return {
      success: true,
      message: "Logout realizado com sucesso"
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
    const response = await fetch(`${this.baseUrl}/auth/verify`, {
      method: "GET",
      credentials: "include"
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
    {
      return {
        success: true,
        user: mockUsers[0]
      };
    }
  }
  /**
   * Obtém usuário atual
   * @returns {Promise<Object>}
   */
  async getCurrentUser() {
    if (this.useMock) {
      return this.mockGetCurrentUser();
    }
    const response = await fetch(`${this.baseUrl}/auth/me`, {
      method: "GET",
      credentials: "include"
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
const authRepository = new AuthRepository();
class AuthService {
  constructor() {
    this.repository = authRepository;
    {
      console.log("🔐 AuthService: Serviço de autenticação inicializado");
    }
  }
  /**
   * Realiza login do usuário
   * ⚠️ IMPORTANTE: Recebe DTO já criado pela UI
   * @param {LoginRequest} loginDto - DTO já instanciado pela UI
   * @returns {Promise<Object>}
   */
  async login(loginDto) {
    if (!loginDto.isValid()) {
      throw new Error("Dados de login inválidos");
    }
    try {
      if (environment.enableLogs) {
        console.log("🔐 AuthService: Realizando login...");
      }
      const result = await this.repository.login(loginDto);
      if (environment.enableLogs) {
        console.log("✅ AuthService: Login realizado com sucesso");
      }
      return result;
    } catch (error) {
      console.error("❌ AuthService: Erro no login:", error);
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
    if (!registerDto.isValid()) {
      throw new Error("Dados de registro inválidos");
    }
    try {
      if (environment.enableLogs) {
        console.log("🔐 AuthService: Realizando registro...");
      }
      const result = await this.repository.register(registerDto);
      if (environment.enableLogs) {
        console.log("✅ AuthService: Registro realizado com sucesso");
      }
      return result;
    } catch (error) {
      console.error("❌ AuthService: Erro no registro:", error);
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
    if (!forgotPasswordDto.isValid()) {
      throw new Error("Email inválido");
    }
    try {
      if (environment.enableLogs) {
        console.log("🔐 AuthService: Solicitando recuperação de senha...");
      }
      const result = await this.repository.forgotPassword(forgotPasswordDto);
      if (environment.enableLogs) {
        console.log("✅ AuthService: Solicitação de recuperação enviada");
      }
      return result;
    } catch (error) {
      console.error("❌ AuthService: Erro na recuperação de senha:", error);
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
        console.log("🔐 AuthService: Realizando logout...");
      }
      await this.repository.logout();
      if (environment.enableLogs) {
        console.log("✅ AuthService: Logout realizado com sucesso");
      }
    } catch (error) {
      console.error("❌ AuthService: Erro no logout:", error);
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
      console.error("❌ AuthService: Erro na verificação de autenticação:", error);
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
      console.error("❌ AuthService: Erro ao obter usuário atual:", error);
      throw error;
    }
  }
}
export {
  AuthService as A
};
