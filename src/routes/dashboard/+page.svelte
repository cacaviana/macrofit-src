<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Card, Button, ProgressCircle, Badge } from '$lib/components/ui';
  
  // AuthGuard - Protege a página
  import { useAuthGuard } from '$lib/auth/authGuard.js';
  
  // Services
  import { MealsService } from '$lib/services/meals.service.js';
  import { UserService } from '$lib/services/user.service.js';

  // Estados da página
  let nutritionData = null;
  let waterStats = null;
  let isLoading = true;
  let error = '';

  // AuthGuard
  const { isAuthenticated, isChecking } = useAuthGuard();

  // Services
  const mealsService = new MealsService();
  const userService = new UserService();

  /**
   * Carrega dados do dashboard
   */
  async function loadDashboardData() {
    try {
      isLoading = true;
      error = '';

      // Carrega dados em paralelo
      const [nutritionResult, waterResult] = await Promise.all([
        mealsService.getDailyNutritionSummary(),
        userService.getWaterStats()
      ]);

      nutritionData = nutritionResult.nutrition;
      waterStats = waterResult.stats;

    } catch (err) {
      error = err.message || 'Erro ao carregar dados';
      console.error('Erro no dashboard:', err);
    } finally {
      isLoading = false;
    }
  }

  /**
   * Navega para registro de refeição
   */
  function goToMealRegistration() {
    goto('/registro');
  }

  /**
   * Adiciona água rapidamente
   */
  async function addWaterQuick(amount) {
    try {
      // Importa DTO dinamicamente
      const { AddWaterRequest } = await import('$lib/dto/user/requests.js');
      
      // A UI cria o DTO
      const waterDto = new AddWaterRequest({
        amount: amount
      });

      // Service recebe o DTO pronto
      const result = await userService.addWater(waterDto);
      
      if (result.success) {
        // Atualiza estatísticas localmente
        waterStats = result.dailyStats;
      }

    } catch (err) {
      console.error('Erro ao adicionar água:', err);
    }
  }

  /**
   * Navega para exercícios
   */
  function goToExercises() {
    goto('/exercicios');
  }

  // Carrega dados quando a página monta
  onMount(() => {
    loadDashboardData();
  });

  // Cores para os gráficos nutricionais
  const nutritionColors = {
    calories: '#EF4444',
    protein: '#10B981',
    carbs: '#F59E0B',
    fat: '#8B5CF6'
  };
</script>

<svelte:head>
  <title>Dashboard - MacroFit</title>
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
  <!-- AuthGuard bloqueia renderização se não autenticado -->
  <div></div>
{:else}
  <!-- Dashboard Principal -->
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="flex items-center">
              <svg class="w-8 h-8 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              <h1 class="text-xl font-bold text-gray-900">MacroFit</h1>
            </div>
            <span class="ml-2 text-sm text-gray-500">AI Nutricional</span>
          </div>

          <!-- Data e Usuário -->
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900">Hoje</p>
              <p class="text-xs text-gray-500">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>
            
            <!-- Avatar do usuário -->
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-medium">M</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Conteúdo Principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {#if isLoading}
        <!-- Loading State -->
        <div class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p class="text-gray-600">Carregando seus dados...</p>
        </div>
      
      {:else if error}
        <!-- Error State -->
        <Card padding="lg" class="text-center">
          <div class="text-red-500 mb-4">
            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Erro ao carregar dados</h3>
          <p class="text-gray-600 mb-4">{error}</p>
          <Button on:click={loadDashboardData}>Tentar novamente</Button>
        </Card>
      
      {:else}
        <!-- Dashboard Content -->
        <div class="space-y-8">
          <!-- Resumo Nutricional -->
          {#if nutritionData}
            <section>
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Resumo Nutricional</h2>
              
              <!-- Gráficos Circulares -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <ProgressCircle
                  percentage={nutritionData.percentages.calories}
                  color={nutritionColors.calories}
                  label="Calorias"
                  value={nutritionData.totalCalories.toLocaleString()}
                  unit={`de ${nutritionData.goals.calories.toLocaleString()}`}
                />
                
                <ProgressCircle
                  percentage={nutritionData.percentages.protein}
                  color={nutritionColors.protein}
                  label="Proteínas"
                  value={`${nutritionData.totalProtein}g`}
                  unit={`de ${nutritionData.goals.protein}g`}
                />
                
                <ProgressCircle
                  percentage={nutritionData.percentages.carbs}
                  color={nutritionColors.carbs}
                  label="Carboidratos"
                  value={`${nutritionData.totalCarbs}g`}
                  unit={`de ${nutritionData.goals.carbs}g`}
                />
                
                <ProgressCircle
                  percentage={nutritionData.percentages.fat}
                  color={nutritionColors.fat}
                  label="Gorduras"
                  value={`${nutritionData.totalFat}g`}
                  unit={`de ${nutritionData.goals.fat}g`}
                />
              </div>

              <!-- Resumo do Dia -->
              <div class="grid md:grid-cols-2 gap-6">
                <!-- Calorias Restantes -->
                <Card>
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Resumo do Dia</h3>
                  <div class="space-y-3">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Calorias restantes</span>
                      <span class="font-semibold text-green-600">{nutritionData.remaining.calories} kcal</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Proteína restante</span>
                      <span class="font-semibold">{nutritionData.remaining.protein}g</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Carboidratos restantes</span>
                      <span class="font-semibold">{nutritionData.remaining.carbs}g</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Gordura restante</span>
                      <span class="font-semibold">{nutritionData.remaining.fat}g</span>
                    </div>
                  </div>
                </Card>

                <!-- Meta de Hoje -->
                <Card class="bg-gradient-to-r from-green-50 to-blue-50">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Meta de hoje</h3>
                  <p class="text-gray-600 mb-4">Você está no caminho certo! Faltam apenas 30g de proteína para bater sua meta diária.</p>
                  
                  <!-- Conquista desbloqueada -->
                  <div class="bg-green-100 border border-green-200 rounded-lg p-3">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm font-medium text-green-800">Conquista desbloqueada!</p>
                        <p class="text-sm text-green-600">7 dias consecutivos registrando refeições 🔥</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>
          {/if}

          <!-- Ações Rápidas -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
            
            <div class="grid md:grid-cols-3 gap-6">
              <!-- Registrar Refeição -->
              <Card hover clickable on:click={goToMealRegistration} class="text-center">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Registrar Refeição</h3>
                <p class="text-sm text-gray-600">Foto, voz ou texto</p>
              </Card>

              <!-- Adicionar Água -->
              <Card class="text-center">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900 mb-4">Adicionar Água</h3>
                
                <!-- Botões de quantidade -->
                <div class="grid grid-cols-3 gap-2">
                  <Button size="sm" variant="outline" on:click={() => addWaterQuick(250)}>250ml</Button>
                  <Button size="sm" variant="outline" on:click={() => addWaterQuick(500)}>500ml</Button>
                  <Button size="sm" variant="outline" on:click={() => addWaterQuick(1000)}>1L</Button>
                </div>
                
                {#if waterStats}
                  <div class="mt-3 text-sm text-gray-600">
                    {waterStats.total}ml de {waterStats.goal}ml hoje
                  </div>
                {/if}
              </Card>

              <!-- Registrar Exercício -->
              <Card hover clickable on:click={goToExercises} class="text-center">
                <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Registrar Exercício</h3>
                <p class="text-sm text-gray-600">Manual ou sincronizar</p>
              </Card>
            </div>
          </section>

          <!-- Dica do Coach IA -->
          <section>
            <Card class="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold mb-2">Dica do Coach</h3>
                  <p class="mb-4">Ótimo progresso hoje! Para completar suas proteínas, que tal um iogurte grego com granola? Isso adicionaria 15g de proteína e ficaria dentro das suas calorias restantes.</p>
                  
                  <div class="flex space-x-3">
                    <Button variant="outline" size="sm" class="text-white border-white hover:bg-white hover:text-purple-600">
                      Ver Sugestão Agora
                    </Button>
                    <Button variant="outline" size="sm" class="text-white border-white hover:bg-white hover:text-purple-600">
                      Conversar com Coach
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <!-- Agenda de Hoje -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Agenda de Hoje</h2>
            
            <Card>
              <div class="space-y-4">
                <!-- Café da manhã -->
                <div class="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg">
                  <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">Café da manhã</p>
                    <p class="text-sm text-gray-600">08:00 - Concluído</p>
                  </div>
                  <Badge variant="success">Concluído</Badge>
                </div>

                <!-- Almoço -->
                <div class="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">Almoço</p>
                    <p class="text-sm text-gray-600">12:30 - Concluído</p>
                  </div>
                  <Badge variant="success">Concluído</Badge>
                </div>

                <!-- Lanche da tarde -->
                <div class="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">Lanche da tarde</p>
                    <p class="text-sm text-gray-600">15:30 - Pendente</p>
                  </div>
                  <Badge variant="warning">Pendente</Badge>
                </div>

                <!-- Jantar -->
                <div class="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
                  <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">Jantar</p>
                    <p class="text-sm text-gray-600">19:00 - Planejado</p>
                  </div>
                  <Badge variant="default">Planejado</Badge>
                </div>

                <!-- Lembrete: Água -->
                <div class="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div class="w-6 h-6 text-blue-500">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">Lembrete: Água</p>
                    <p class="text-sm text-gray-600">A cada 2 horas</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </div>
      {/if}
    </main>
  </div>
{/if}
