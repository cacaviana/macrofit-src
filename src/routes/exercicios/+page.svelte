<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Card, Button, Input, Modal, Badge } from '$lib/components/ui';
  
  // AuthGuard
  import { useAuthGuard } from '$lib/auth/authGuard.js';
  
  // DTOs - A UI é a fábrica de DTOs
  import { AddExerciseRequest } from '$lib/dto/user/requests.js';
  
  // Services - Apenas instanciamos e executamos ações
  import { UserService } from '$lib/services/user.service.js';

  // Estados da página
  let exerciseHistory = null;
  let isLoading = true;
  let error = '';
  let showAddModal = false;
  let isAddingExercise = false;

  // Estados do formulário
  let exerciseName = '';
  let duration = '';
  let intensity = 'moderate';
  let notes = '';

  // AuthGuard
  const { isAuthenticated, isChecking } = useAuthGuard();

  // Service
  const userService = new UserService();

  // Tipos de exercício populares
  const popularExercises = [
    { name: 'Corrida', icon: '🏃‍♂️', calories: 280 },
    { name: 'Caminhada', icon: '🚶‍♂️', calories: 150 },
    { name: 'Musculação', icon: '🏋️‍♂️', calories: 320 },
    { name: 'Ciclismo', icon: '🚴‍♂️', calories: 450 },
    { name: 'Natação', icon: '🏊‍♂️', calories: 400 },
    { name: 'Yoga', icon: '🧘‍♀️', calories: 180 },
    { name: 'Pilates', icon: '🤸‍♀️', calories: 200 },
    { name: 'Dança', icon: '💃', calories: 250 }
  ];

  // Níveis de intensidade
  const intensityOptions = [
    { value: 'low', label: 'Baixa', color: 'text-green-600', description: 'Exercício leve, respiração normal' },
    { value: 'moderate', label: 'Moderada', color: 'text-yellow-600', description: 'Exercício moderado, respiração acelerada' },
    { value: 'high', label: 'Alta', color: 'text-red-600', description: 'Exercício intenso, muito suor' }
  ];

  /**
   * Carrega histórico de exercícios
   */
  async function loadExerciseHistory() {
    try {
      isLoading = true;
      error = '';

      const result = await userService.getExerciseHistory();
      exerciseHistory = result.history;

    } catch (err) {
      error = err.message || 'Erro ao carregar histórico de exercícios';
      console.error('Erro nos exercícios:', err);
    } finally {
      isLoading = false;
    }
  }

  /**
   * Adiciona exercício
   * ⚠️ IMPORTANTE: A UI cria o DTO e passa pronto para o Service
   */
  async function addExercise() {
    if (isAddingExercise) return;

    try {
      isAddingExercise = true;

      // 🏭 A UI é a FÁBRICA de DTOs - cria o objeto com os dados do formulário
      const exerciseDto = new AddExerciseRequest({
        name: exerciseName,
        duration: parseInt(duration),
        intensity: intensity,
        notes: notes
      });

      // 🔄 O Service recebe o DTO pronto e não conhece seus campos internos
      const result = await userService.addExercise(exerciseDto);

      if (result.success) {
        // Adiciona à lista local
        if (exerciseHistory) {
          exerciseHistory.exercises = [result.exercise, ...exerciseHistory.exercises];
          exerciseHistory.summary.totalExercises++;
          exerciseHistory.summary.totalCalories += result.exercise.caloriesBurned;
          exerciseHistory.summary.totalDuration += result.exercise.duration;
        }

        // Limpa formulário e fecha modal
        exerciseName = '';
        duration = '';
        intensity = 'moderate';
        notes = '';
        showAddModal = false;
      }

    } catch (err) {
      console.error('Erro ao adicionar exercício:', err);
      alert('Erro ao registrar exercício');
    } finally {
      isAddingExercise = false;
    }
  }

  /**
   * Seleciona exercício popular
   */
  function selectPopularExercise(exercise) {
    exerciseName = exercise.name;
    showAddModal = true;
  }

  /**
   * Formata duração
   */
  function formatDuration(minutes) {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
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
   * Calcula calorias estimadas
   */
  function calculateCalories(name, duration, intensity) {
    const baseCalories = popularExercises.find(ex => ex.name === name)?.calories || 200;
    const intensityMultiplier = {
      low: 0.7,
      moderate: 1.0,
      high: 1.3
    };
    
    return Math.round((baseCalories * (duration / 60)) * intensityMultiplier[intensity]);
  }

  // Carrega dados quando a página monta
  onMount(() => {
    loadExerciseHistory();
  });

  // Calcula calorias em tempo real
  $: estimatedCalories = exerciseName && duration ? 
    calculateCalories(exerciseName, parseInt(duration) || 0, intensity) : 0;
</script>

<svelte:head>
  <title>Exercícios - MacroFit</title>
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
  <!-- Página de Exercícios -->
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
            <h1 class="text-xl font-semibold text-gray-900">Exercícios</h1>
          </div>
          
          <Button variant="primary" on:click={() => showAddModal = true}>
            + Registrar Exercício
          </Button>
        </div>
      </div>
    </header>

    <!-- Conteúdo Principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {#if isLoading}
        <!-- Loading State -->
        <div class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p class="text-gray-600">Carregando exercícios...</p>
        </div>
      
      {:else if error}
        <!-- Error State -->
        <Card padding="lg" class="text-center">
          <div class="text-red-500 mb-4">
            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Erro ao carregar exercícios</h3>
          <p class="text-gray-600 mb-4">{error}</p>
          <Button on:click={loadExerciseHistory}>Tentar novamente</Button>
        </Card>
      
      {:else}
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Conteúdo Principal -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Exercícios Populares -->
            <Card>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">🔥 Exercícios Populares</h3>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                {#each popularExercises as exercise}
                  <button
                    on:click={() => selectPopularExercise(exercise)}
                    class="p-3 rounded-lg border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-colors text-center"
                  >
                    <div class="text-2xl mb-1">{exercise.icon}</div>
                    <div class="text-sm font-medium text-gray-900">{exercise.name}</div>
                    <div class="text-xs text-gray-600">{exercise.calories} kcal/h</div>
                  </button>
                {/each}
              </div>
            </Card>

            <!-- Resumo do Dia -->
            {#if exerciseHistory && exerciseHistory.summary}
              <Card class="bg-gradient-to-r from-orange-50 to-red-50">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">📊 Resumo de Hoje</h3>
                
                <div class="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div class="text-2xl font-bold text-orange-600">{exerciseHistory.summary.totalExercises}</div>
                    <div class="text-sm text-gray-600">Exercícios</div>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-red-600">{exerciseHistory.summary.totalCalories}</div>
                    <div class="text-sm text-gray-600">Calorias</div>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-purple-600">{formatDuration(exerciseHistory.summary.totalDuration)}</div>
                    <div class="text-sm text-gray-600">Duração</div>
                  </div>
                </div>
              </Card>
            {/if}

            <!-- Histórico de Exercícios -->
            <Card>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">📋 Histórico de Hoje</h3>
              
              {#if exerciseHistory && exerciseHistory.exercises.length > 0}
                <div class="space-y-4">
                  {#each exerciseHistory.exercises as exercise}
                    <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <!-- Ícone do exercício -->
                      <div class="flex-shrink-0">
                        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <span class="text-2xl">
                            {popularExercises.find(ex => ex.name === exercise.name)?.icon || '🏃‍♂️'}
                          </span>
                        </div>
                      </div>

                      <!-- Informações do exercício -->
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center space-x-2 mb-1">
                          <h4 class="text-lg font-medium text-gray-900">{exercise.name}</h4>
                          <Badge variant="outline">{formatTime(exercise.timestamp)}</Badge>
                          <Badge 
                            variant={exercise.intensity === 'high' ? 'danger' : exercise.intensity === 'moderate' ? 'warning' : 'success'}
                          >
                            {intensityOptions.find(opt => opt.value === exercise.intensity)?.label}
                          </Badge>
                        </div>
                        
                        <div class="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span>⏱️ {formatDuration(exercise.duration)}</span>
                          <span>🔥 {exercise.caloriesBurned} kcal</span>
                        </div>

                        {#if exercise.notes}
                          <p class="text-sm text-gray-600 italic">"{exercise.notes}"</p>
                        {/if}
                      </div>
                    </div>
                  {/each}
                </div>
              {:else}
                <div class="text-center py-8 text-gray-500">
                  <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p>Nenhum exercício registrado hoje</p>
                  <Button variant="primary" class="mt-4" on:click={() => showAddModal = true}>
                    Registrar primeiro exercício
                  </Button>
                </div>
              {/if}
            </Card>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Motivação -->
            <Card class="bg-gradient-to-r from-purple-50 to-pink-50">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">💪 Motivação</h3>
              
              <div class="space-y-3 text-sm">
                <div class="bg-white rounded-lg p-3 border">
                  <div class="font-medium text-gray-900 mb-1">Meta Semanal</div>
                  <div class="text-gray-600">150 minutos de exercício</div>
                  <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div class="bg-purple-500 h-2 rounded-full" style="width: 60%"></div>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">90/150 minutos</div>
                </div>

                <div class="bg-white rounded-lg p-3 border">
                  <div class="font-medium text-gray-900 mb-1">Sequência</div>
                  <div class="text-2xl font-bold text-purple-600">5 dias</div>
                  <div class="text-xs text-gray-500">Exercitando-se consecutivamente</div>
                </div>
              </div>
            </Card>

            <!-- Benefícios -->
            <Card>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">🌟 Benefícios do Exercício</h3>
              
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span class="text-red-600 text-sm">❤️</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Saúde cardiovascular</div>
                    <div class="text-sm text-gray-600">Fortalece o coração</div>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 text-sm">🧠</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Saúde mental</div>
                    <div class="text-sm text-gray-600">Reduz estresse e ansiedade</div>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span class="text-green-600 text-sm">💪</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Força muscular</div>
                    <div class="text-sm text-gray-600">Desenvolve músculos</div>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span class="text-yellow-600 text-sm">⚡</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Mais energia</div>
                    <div class="text-sm text-gray-600">Aumenta disposição</div>
                  </div>
                </div>
              </div>
            </Card>

            <!-- Integrações -->
            <Card>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">📱 Integrações</h3>
              
              <div class="space-y-3">
                <Button variant="outline" size="sm" full>
                  🍎 Apple Health
                </Button>
                <Button variant="outline" size="sm" full>
                  📊 Google Fit
                </Button>
                <Button variant="outline" size="sm" full>
                  ⌚ Garmin Connect
                </Button>
                <Button variant="outline" size="sm" full>
                  🏃‍♂️ Strava
                </Button>
              </div>
            </Card>
          </div>
        </div>
      {/if}
    </main>
  </div>

  <!-- Modal de Adicionar Exercício -->
  <Modal bind:open={showAddModal} title="Registrar Exercício" size="lg">
    <form on:submit|preventDefault={addExercise} class="space-y-4">
      <!-- Nome do exercício -->
      <Input
        label="Nome do exercício"
        placeholder="Ex: Corrida, Musculação, Yoga..."
        bind:value={exerciseName}
        required
      />

      <!-- Duração -->
      <Input
        type="number"
        label="Duração (minutos)"
        placeholder="30"
        bind:value={duration}
        min="1"
        max="480"
        required
      />

      <!-- Intensidade -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Intensidade</label>
        <div class="space-y-2">
          {#each intensityOptions as option}
            <label class="flex items-center">
              <input
                type="radio"
                bind:group={intensity}
                value={option.value}
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm">
                <span class="font-medium {option.color}">{option.label}</span>
                - {option.description}
              </span>
            </label>
          {/each}
        </div>
      </div>

      <!-- Notas -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Notas (opcional)</label>
        <textarea
          bind:value={notes}
          placeholder="Como foi o treino? Alguma observação..."
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      <!-- Estimativa de calorias -->
      {#if estimatedCalories > 0}
        <div class="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span class="text-sm text-orange-800">
              Estimativa: <strong>{estimatedCalories} calorias</strong> queimadas
            </span>
          </div>
        </div>
      {/if}

      <!-- Botões -->
      <div class="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          on:click={() => showAddModal = false}
          disabled={isAddingExercise}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={isAddingExercise}
          disabled={!exerciseName || !duration || isAddingExercise}
        >
          {#if isAddingExercise}
            Registrando...
          {:else}
            Registrar Exercício
          {/if}
        </Button>
      </div>
    </form>
  </Modal>
{/if}
