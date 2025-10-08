<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Card, Button, Input } from '$lib/components/ui';
  
  // AuthGuard
  import { useAuthGuard } from '$lib/auth/authGuard.js';
  
  // DTOs - A UI é a fábrica de DTOs
  import { UserSetupRequest } from '$lib/dto/user/requests.js';
  
  // Services - Apenas instanciamos e executamos ações
  import { UserService } from '$lib/services/user.service.js';

  // Estados da página
  let currentStep = 1;
  let isLoading = false;
  let error = '';
  
  // Dados do formulário
  let currentWeight = '';
  let targetWeight = '';
  let height = '';
  let age = '';
  let gender = '';
  let activityLevel = '';
  let goal = '';

  // AuthGuard
  const { isAuthenticated, isChecking } = useAuthGuard();

  // Service
  const userService = new UserService();

  // Opções do formulário
  const genderOptions = [
    { value: 'male', label: 'Masculino', icon: '👨' },
    { value: 'female', label: 'Feminino', icon: '👩' }
  ];

  const activityOptions = [
    { value: 'sedentary', label: 'Sedentário', description: 'Pouco ou nenhum exercício' },
    { value: 'light', label: 'Leve', description: 'Exercício leve 1-3 dias/semana' },
    { value: 'moderate', label: 'Moderado', description: 'Exercício moderado 3-5 dias/semana' },
    { value: 'active', label: 'Ativo', description: 'Exercício intenso 6-7 dias/semana' }
  ];

  const goalOptions = [
    { value: 'lose_weight', label: 'Perder peso', icon: '📉', color: 'text-red-600' },
    { value: 'maintain_weight', label: 'Manter peso', icon: '⚖️', color: 'text-blue-600' },
    { value: 'gain_weight', label: 'Ganhar peso', icon: '📈', color: 'text-green-600' }
  ];

  /**
   * Avança para próximo passo
   */
  function nextStep() {
    if (currentStep < 4) {
      currentStep++;
    }
  }

  /**
   * Volta para passo anterior
   */
  function prevStep() {
    if (currentStep > 1) {
      currentStep--;
    }
  }

  /**
   * Finaliza configuração
   * ⚠️ IMPORTANTE: A UI cria o DTO e passa pronto para o Service
   */
  async function finishSetup() {
    if (isLoading) return;

    try {
      isLoading = true;
      error = '';

      // 🏭 A UI é a FÁBRICA de DTOs - cria o objeto com os dados do formulário
      const setupDto = new UserSetupRequest({
        currentWeight: parseFloat(currentWeight),
        targetWeight: parseFloat(targetWeight),
        height: parseInt(height),
        age: parseInt(age),
        gender: gender,
        activityLevel: activityLevel,
        goal: goal
      });

      // 🔄 O Service recebe o DTO pronto e não conhece seus campos internos
      const result = await userService.setupUser(setupDto);

      if (result.success) {
        // Redireciona para dashboard após configuração
        goto('/dashboard');
      }

    } catch (err) {
      error = err.message || 'Erro ao salvar configuração';
    } finally {
      isLoading = false;
    }
  }

  /**
   * Verifica se pode avançar no passo atual
   */
  function canProceed() {
    switch (currentStep) {
      case 1:
        return currentWeight && targetWeight && height && age;
      case 2:
        return gender;
      case 3:
        return activityLevel;
      case 4:
        return goal;
      default:
        return false;
    }
  }
</script>

<svelte:head>
  <title>Configuração Inicial - MacroFit</title>
</svelte:head>

<!-- Loading/Auth Check -->
{#if $isChecking}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p class="text-gray-600">Verificando autenticação...</p>
    </div>
  </div>
{:else if !$isAuthenticated}
  <div></div>
{:else}
  <!-- Página de Configuração -->
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
    <div class="w-full max-w-2xl">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Vamos configurar seu perfil</h1>
        <p class="text-blue-100">Isso nos ajudará a personalizar suas metas nutricionais</p>
      </div>

      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex items-center justify-between text-white text-sm mb-2">
          <span>Passo {currentStep} de 4</span>
          <span>{Math.round((currentStep / 4) * 100)}% completo</span>
        </div>
        <div class="w-full bg-white/20 rounded-full h-2">
          <div 
            class="bg-white rounded-full h-2 transition-all duration-300"
            style="width: {(currentStep / 4) * 100}%"
          ></div>
        </div>
      </div>

      <!-- Card Principal -->
      <Card padding="lg" class="backdrop-blur-sm bg-white/95">
        {#if currentStep === 1}
          <!-- Passo 1: Dados Físicos -->
          <div class="space-y-6">
            <div class="text-center">
              <h2 class="text-2xl font-semibold text-gray-900 mb-2">Dados físicos</h2>
              <p class="text-gray-600">Precisamos conhecer suas medidas atuais</p>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <Input
                type="number"
                label="Peso atual (kg)"
                placeholder="70"
                bind:value={currentWeight}
                step="0.1"
                min="30"
                max="300"
                required
              />

              <Input
                type="number"
                label="Peso desejado (kg)"
                placeholder="65"
                bind:value={targetWeight}
                step="0.1"
                min="30"
                max="300"
                required
              />

              <Input
                type="number"
                label="Altura (cm)"
                placeholder="170"
                bind:value={height}
                min="100"
                max="250"
                required
              />

              <Input
                type="number"
                label="Idade (anos)"
                placeholder="25"
                bind:value={age}
                min="13"
                max="120"
                required
              />
            </div>
          </div>

        {:else if currentStep === 2}
          <!-- Passo 2: Gênero -->
          <div class="space-y-6">
            <div class="text-center">
              <h2 class="text-2xl font-semibold text-gray-900 mb-2">Gênero</h2>
              <p class="text-gray-600">Isso afeta o cálculo do seu metabolismo basal</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              {#each genderOptions as option}
                <button
                  on:click={() => gender = option.value}
                  class="p-6 rounded-lg border-2 transition-colors {gender === option.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}"
                >
                  <div class="text-4xl mb-2">{option.icon}</div>
                  <div class="font-medium text-gray-900">{option.label}</div>
                </button>
              {/each}
            </div>
          </div>

        {:else if currentStep === 3}
          <!-- Passo 3: Nível de Atividade -->
          <div class="space-y-6">
            <div class="text-center">
              <h2 class="text-2xl font-semibold text-gray-900 mb-2">Nível de atividade</h2>
              <p class="text-gray-600">Com que frequência você se exercita?</p>
            </div>

            <div class="space-y-3">
              {#each activityOptions as option}
                <button
                  on:click={() => activityLevel = option.value}
                  class="w-full p-4 rounded-lg border-2 text-left transition-colors {activityLevel === option.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}"
                >
                  <div class="font-medium text-gray-900 mb-1">{option.label}</div>
                  <div class="text-sm text-gray-600">{option.description}</div>
                </button>
              {/each}
            </div>
          </div>

        {:else if currentStep === 4}
          <!-- Passo 4: Objetivo -->
          <div class="space-y-6">
            <div class="text-center">
              <h2 class="text-2xl font-semibold text-gray-900 mb-2">Seu objetivo</h2>
              <p class="text-gray-600">O que você quer alcançar?</p>
            </div>

            <div class="space-y-3">
              {#each goalOptions as option}
                <button
                  on:click={() => goal = option.value}
                  class="w-full p-4 rounded-lg border-2 text-left transition-colors {goal === option.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}"
                >
                  <div class="flex items-center">
                    <span class="text-2xl mr-3">{option.icon}</span>
                    <div>
                      <div class="font-medium text-gray-900">{option.label}</div>
                    </div>
                  </div>
                </button>
              {/each}
            </div>

            <!-- Erro -->
            {#if error}
              <div class="bg-red-50 border border-red-200 rounded-lg p-3">
                <p class="text-sm text-red-600">{error}</p>
              </div>
            {/if}
          </div>
        {/if}

        <!-- Botões de Navegação -->
        <div class="flex justify-between mt-8">
          <Button
            variant="outline"
            on:click={prevStep}
            disabled={currentStep === 1}
          >
            Voltar
          </Button>

          {#if currentStep < 4}
            <Button
              variant="primary"
              on:click={nextStep}
              disabled={!canProceed()}
            >
              Próximo
            </Button>
          {:else}
            <Button
              variant="primary"
              on:click={finishSetup}
              loading={isLoading}
              disabled={!canProceed() || isLoading}
            >
              {#if isLoading}
                Salvando...
              {:else}
                Finalizar configuração
              {/if}
            </Button>
          {/if}
        </div>
      </Card>

      <!-- Informações de Segurança -->
      <div class="text-center mt-6 text-blue-100 text-sm">
        <p>🔒 Seus dados são criptografados e mantidos em segurança</p>
      </div>
    </div>
  </div>
{/if}
