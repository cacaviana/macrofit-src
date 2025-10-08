<script>
  import { goto } from '$app/navigation';
  import { Button, Input, Card } from '$lib/components/ui';
  
  // DTOs - A UI é a fábrica de DTOs
  import { RegisterRequest } from '$lib/dto/auth/requests.js';
  
  // Services - Apenas instanciamos e executamos ações
  import { AuthService } from '$lib/services/auth.service.js';

  // Estados da página
  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let acceptTerms = false;
  let isLoading = false;
  let error = '';

  // Instância do service
  const authService = new AuthService();

  /**
   * Executa registro
   * ⚠️ IMPORTANTE: A UI cria o DTO e passa pronto para o Service
   */
  async function handleRegister() {
    if (isLoading) return;

    error = '';
    isLoading = true;

    try {
      // 🏭 A UI é a FÁBRICA de DTOs - cria o objeto com os dados do formulário
      const registerDto = new RegisterRequest({
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        acceptTerms: acceptTerms
      });

      // 🔄 O Service recebe o DTO pronto e não conhece seus campos internos
      const result = await authService.register(registerDto);

      if (result.success) {
        // Redireciona para login após registro bem-sucedido
        goto('/auth/login?message=Conta criada com sucesso!');
      }

    } catch (err) {
      error = err.message || 'Erro ao criar conta';
    } finally {
      isLoading = false;
    }
  }

  function goToLogin() {
    goto('/auth/login');
  }
</script>

<svelte:head>
  <title>Criar Conta - MacroFit</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
  <div class="w-full max-w-md">
    <!-- Logo -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
        <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      </div>
      <h1 class="text-3xl font-bold text-white mb-2">MacroFit</h1>
      <p class="text-blue-100">Crie sua conta gratuita</p>
    </div>

    <!-- Card de Registro -->
    <Card padding="lg" class="backdrop-blur-sm bg-white/95">
      <div class="space-y-6">
        <div class="text-center">
          <h2 class="text-2xl font-semibold text-gray-900">Criar conta</h2>
          <p class="text-gray-600 mt-2">Comece sua jornada nutricional hoje</p>
        </div>

        <!-- Formulário -->
        <form on:submit|preventDefault={handleRegister} class="space-y-4">
          <!-- Nome -->
          <Input
            type="text"
            label="Nome completo"
            placeholder="Seu nome"
            bind:value={name}
            required
            disabled={isLoading}
          />

          <!-- Email -->
          <Input
            type="email"
            label="E-mail"
            placeholder="seu@email.com"
            bind:value={email}
            required
            disabled={isLoading}
          />

          <!-- Senha -->
          <Input
            type="password"
            label="Senha"
            placeholder="Mínimo 8 caracteres"
            bind:value={password}
            required
            disabled={isLoading}
          />

          <!-- Confirmar Senha -->
          <Input
            type="password"
            label="Confirmar senha"
            placeholder="Digite a senha novamente"
            bind:value={confirmPassword}
            required
            disabled={isLoading}
          />

          <!-- Termos -->
          <div class="flex items-start">
            <input
              type="checkbox"
              bind:checked={acceptTerms}
              disabled={isLoading}
              class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              required
            />
            <label class="ml-2 text-sm text-gray-600">
              Aceito os <a href="/termos" class="text-blue-600 hover:text-blue-500">Termos de Uso</a> 
              e <a href="/privacidade" class="text-blue-600 hover:text-blue-500">Política de Privacidade</a>
            </label>
          </div>

          <!-- Erro -->
          {#if error}
            <div class="bg-red-50 border border-red-200 rounded-lg p-3">
              <p class="text-sm text-red-600">{error}</p>
            </div>
          {/if}

          <!-- Botão de Registro -->
          <Button
            type="submit"
            variant="primary"
            size="lg"
            full
            loading={isLoading}
            disabled={isLoading}
          >
            {#if isLoading}
              Criando conta...
            {:else}
              Criar conta gratuita
            {/if}
          </Button>
        </form>

        <!-- Link para Login -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Já tem uma conta?
            <button
              type="button"
              on:click={goToLogin}
              disabled={isLoading}
              class="text-blue-600 hover:text-blue-500 font-medium disabled:opacity-50"
            >
              Fazer login
            </button>
          </p>
        </div>
      </div>
    </Card>
  </div>
</div>
