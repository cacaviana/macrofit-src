<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Card, Button, Badge, Input } from '$lib/components/ui';
  
  // AuthGuard
  import { useAuthGuard } from '$lib/auth/authGuard.js';
  
  // Services - Apenas instanciamos e executamos ações
  import { MealsService } from '$lib/services/meals.service.js';

  // Estados da página
  let meals = [];
  let selectedDate = new Date().toISOString().split('T')[0];
  let isLoading = true;
  let error = '';
  let nutritionSummary = null;

  // AuthGuard
  const { isAuthenticated, isChecking } = useAuthGuard();

  // Service
  const mealsService = new MealsService();

  // Tipos de refeição com ícones
  const mealTypeIcons = {
    breakfast: '☀️',
    lunch: '🍽️',
    dinner: '🌙',
    snack: '🍎'
  };

  const mealTypeLabels = {
    breakfast: 'Café da manhã',
    lunch: 'Almoço',
    dinner: 'Jantar',
    snack: 'Lanche'
  };

  /**
   * Carrega histórico de refeições
   */
  async function loadMealsHistory() {
    try {
      isLoading = true;
      error = '';

      // Carrega refeições e resumo nutricional em paralelo
      const [mealsResult, nutritionResult] = await Promise.all([
        mealsService.getMealsHistory(selectedDate),
        mealsService.getDailyNutritionSummary(selectedDate)
      ]);

      meals = mealsResult.meals || [];
      nutritionSummary = nutritionResult.nutrition || null;

    } catch (err) {
      error = err.message || 'Erro ao carregar histórico';
      console.error('Erro no histórico:', err);
    } finally {
      isLoading = false;
    }
  }

  /**
   * Deleta uma refeição
   */
  async function deleteMeal(mealId) {
    if (!confirm('Tem certeza que deseja excluir esta refeição?')) return;

    try {
      const result = await mealsService.deleteMeal(mealId);
      
      if (result.success) {
        // Remove da lista local
        meals = meals.filter(meal => meal.id !== mealId);
        
        // Recarrega resumo nutricional
        const nutritionResult = await mealsService.getDailyNutritionSummary(selectedDate);
        nutritionSummary = nutritionResult.nutrition;
      }

    } catch (err) {
      console.error('Erro ao deletar refeição:', err);
      alert('Erro ao excluir refeição');
    }
  }

  /**
   * Formata horário
   */
  function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Formata data para exibição
   */
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  }

  /**
   * Navega para registro de refeição
   */
  function goToMealRegistration() {
    goto('/registro');
  }

  // Carrega dados quando a página monta ou data muda
  onMount(() => {
    loadMealsHistory();
  });

  $: if (selectedDate) {
    loadMealsHistory();
  }
</script>

<svelte:head>
  <title>Histórico de Refeições - MacroFit</title>
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
  <!-- Página de Histórico -->
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <button on:click={() => goto('/dashboard')} class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 class="text-xl font-semibold text-gray-900">Histórico de Refeições</h1>
          </div>
          
          <Button variant="primary" on:click={goToMealRegistration}>
            + Nova Refeição
          </Button>
        </div>
      </div>
    </header>

    <!-- Conteúdo Principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Seletor de Data -->
      <div class="mb-8">
        <Card>
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">Selecionar Data</h2>
              <p class="text-sm text-gray-600">{formatDate(selectedDate)}</p>
            </div>
            
            <Input
              type="date"
              bind:value={selectedDate}
              class="w-auto"
            />
          </div>
        </Card>
      </div>

      {#if isLoading}
        <!-- Loading State -->
        <div class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p class="text-gray-600">Carregando histórico...</p>
        </div>
      
      {:else if error}
        <!-- Error State -->
        <Card padding="lg" class="text-center">
          <div class="text-red-500 mb-4">
            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Erro ao carregar histórico</h3>
          <p class="text-gray-600 mb-4">{error}</p>
          <Button on:click={loadMealsHistory}>Tentar novamente</Button>
        </Card>
      
      {:else}
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Lista de Refeições -->
          <div class="lg:col-span-2 space-y-6">
            {#if meals.length === 0}
              <!-- Empty State -->
              <Card padding="lg" class="text-center">
                <div class="text-gray-400 mb-4">
                  <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhuma refeição registrada</h3>
                <p class="text-gray-600 mb-4">Você ainda não registrou refeições para esta data.</p>
                <Button variant="primary" on:click={goToMealRegistration}>
                  Registrar primeira refeição
                </Button>
              </Card>
            {:else}
              <!-- Refeições -->
              {#each meals as meal}
                <Card hover>
                  <div class="flex items-start justify-between">
                    <div class="flex items-start space-x-4 flex-1">
                      <!-- Ícone do tipo de refeição -->
                      <div class="flex-shrink-0">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span class="text-2xl">{mealTypeIcons[meal.mealType]}</span>
                        </div>
                      </div>

                      <!-- Informações da refeição -->
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center space-x-2 mb-1">
                          <h3 class="text-lg font-medium text-gray-900">
                            {mealTypeLabels[meal.mealType]}
                          </h3>
                          <Badge variant="outline">{formatTime(meal.timestamp)}</Badge>
                          {#if meal.source}
                            <Badge variant="secondary">
                              {meal.source === 'text' ? '📝' : meal.source === 'photo' ? '📷' : '🎤'}
                            </Badge>
                          {/if}
                        </div>
                        
                        <p class="text-gray-600 mb-3">{meal.description}</p>
                        
                        <!-- Alimentos -->
                        <div class="space-y-1 mb-3">
                          {#each meal.foods as food}
                            <div class="text-sm text-gray-600">
                              • {food.name} - {food.quantity}{food.unit} ({food.calories} kcal)
                            </div>
                          {/each}
                        </div>

                        <!-- Resumo nutricional -->
                        <div class="flex items-center space-x-4 text-sm">
                          <span class="text-red-600 font-medium">{meal.totalCalories} kcal</span>
                          <span class="text-green-600">{meal.totalProtein}g proteína</span>
                          <span class="text-yellow-600">{meal.totalCarbs}g carbs</span>
                          <span class="text-purple-600">{meal.totalFat}g gordura</span>
                        </div>
                      </div>
                    </div>

                    <!-- Ações -->
                    <div class="flex-shrink-0 ml-4">
                      <button
                        on:click={() => deleteMeal(meal.id)}
                        class="text-gray-400 hover:text-red-500 transition-colors"
                        title="Excluir refeição"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Card>
              {/each}
            {/if}
          </div>

          <!-- Resumo Nutricional -->
          <div class="space-y-6">
            {#if nutritionSummary}
              <Card>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Resumo do Dia</h3>
                
                <div class="space-y-4">
                  <!-- Calorias -->
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span>Calorias</span>
                      <span>{nutritionSummary.totalCalories} / {nutritionSummary.goals.calories}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        class="bg-red-500 h-2 rounded-full transition-all"
                        style="width: {Math.min(nutritionSummary.percentages.calories, 100)}%"
                      ></div>
                    </div>
                  </div>

                  <!-- Proteína -->
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span>Proteína</span>
                      <span>{nutritionSummary.totalProtein}g / {nutritionSummary.goals.protein}g</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        class="bg-green-500 h-2 rounded-full transition-all"
                        style="width: {Math.min(nutritionSummary.percentages.protein, 100)}%"
                      ></div>
                    </div>
                  </div>

                  <!-- Carboidratos -->
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span>Carboidratos</span>
                      <span>{nutritionSummary.totalCarbs}g / {nutritionSummary.goals.carbs}g</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        class="bg-yellow-500 h-2 rounded-full transition-all"
                        style="width: {Math.min(nutritionSummary.percentages.carbs, 100)}%"
                      ></div>
                    </div>
                  </div>

                  <!-- Gorduras -->
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span>Gorduras</span>
                      <span>{nutritionSummary.totalFat}g / {nutritionSummary.goals.fat}g</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        class="bg-purple-500 h-2 rounded-full transition-all"
                        style="width: {Math.min(nutritionSummary.percentages.fat, 100)}%"
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>

              <!-- Calorias Restantes -->
              <Card class="bg-gradient-to-r from-blue-50 to-green-50">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Calorias Restantes</h3>
                <div class="text-3xl font-bold text-green-600 mb-1">
                  {nutritionSummary.remaining.calories}
                </div>
                <p class="text-sm text-gray-600">
                  {nutritionSummary.remaining.calories > 0 ? 'Você ainda pode consumir' : 'Você excedeu em'} 
                  {Math.abs(nutritionSummary.remaining.calories)} calorias hoje
                </p>
              </Card>
            {/if}

            <!-- Ações Rápidas -->
            <Card>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
              <div class="space-y-3">
                <Button variant="primary" size="sm" full on:click={goToMealRegistration}>
                  + Adicionar Refeição
                </Button>
                <Button variant="outline" size="sm" full on:click={() => goto('/relatorios')}>
                  📊 Ver Relatórios
                </Button>
                <Button variant="outline" size="sm" full on:click={() => goto('/insights')}>
                  💡 Insights da IA
                </Button>
              </div>
            </Card>
          </div>
        </div>
      {/if}
    </main>
  </div>
{/if}
