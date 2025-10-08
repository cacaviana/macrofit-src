<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Card, Button, ProgressCircle } from '$lib/components/ui';
  
  // AuthGuard
  import { useAuthGuard } from '$lib/auth/authGuard.js';
  
  // DTOs - A UI é a fábrica de DTOs
  import { AddWaterRequest } from '$lib/dto/user/requests.js';
  
  // Services - Apenas instanciamos e executamos ações
  import { UserService } from '$lib/services/user.service.js';

  // Estados da página
  let waterStats = null;
  let isLoading = true;
  let error = '';
  let isAddingWater = false;

  // AuthGuard
  const { isAuthenticated, isChecking } = useAuthGuard();

  // Service
  const userService = new UserService();

  // Opções de quantidade de água
  const waterOptions = [
    { amount: 100, label: '100ml', icon: '🥃' },
    { amount: 250, label: '250ml', icon: '☕' },
    { amount: 500, label: '500ml', icon: '🥤' },
    { amount: 750, label: '750ml', icon: '🍶' },
    { amount: 1000, label: '1L', icon: '💧' }
  ];

  /**
   * Carrega estatísticas de hidratação
   */
  async function loadWaterStats() {
    try {
      isLoading = true;
      error = '';

      const result = await userService.getWaterStats();
      waterStats = result.stats;

    } catch (err) {
      error = err.message || 'Erro ao carregar dados de hidratação';
      console.error('Erro na hidratação:', err);
    } finally {
      isLoading = false;
    }
  }

  /**
   * Adiciona água
   * ⚠️ IMPORTANTE: A UI cria o DTO e passa pronto para o Service
   */
  async function addWater(amount) {
    if (isAddingWater) return;

    try {
      isAddingWater = true;

      // 🏭 A UI é a FÁBRICA de DTOs - cria o objeto com a quantidade
      const waterDto = new AddWaterRequest({
        amount: amount
      });

      // 🔄 O Service recebe o DTO pronto e não conhece seus campos internos
      const result = await userService.addWater(waterDto);

      if (result.success) {
        // Atualiza estatísticas localmente
        waterStats = {
          ...waterStats,
          ...result.dailyStats,
          entries: [...(waterStats.entries || []), result.waterEntry]
        };
      }

    } catch (err) {
      console.error('Erro ao adicionar água:', err);
      alert('Erro ao registrar hidratação');
    } finally {
      isAddingWater = false;
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
   * Calcula cor baseada na porcentagem
   */
  function getProgressColor(percentage) {
    if (percentage >= 100) return '#10B981'; // Verde
    if (percentage >= 75) return '#3B82F6';  // Azul
    if (percentage >= 50) return '#F59E0B';  // Amarelo
    return '#EF4444'; // Vermelho
  }

  // Carrega dados quando a página monta
  onMount(() => {
    loadWaterStats();
  });
</script>

<svelte:head>
  <title>Hidratação - MacroFit</title>
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
  <!-- Página de Hidratação -->
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
            <h1 class="text-xl font-semibold text-gray-900">Hidratação</h1>
          </div>
          
          <div class="text-right">
            <p class="text-sm font-medium text-gray-900">Hoje</p>
            <p class="text-xs text-gray-500">{new Date().toLocaleDateString('pt-BR')}</p>
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
          <p class="text-gray-600">Carregando dados de hidratação...</p>
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
          <Button on:click={loadWaterStats}>Tentar novamente</Button>
        </Card>
      
      {:else if waterStats}
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Progresso Principal -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Gráfico Circular -->
            <Card padding="lg" class="text-center">
              <div class="mb-6">
                <ProgressCircle
                  percentage={waterStats.percentage}
                  color={getProgressColor(waterStats.percentage)}
                  label="Meta Diária"
                  value={`${waterStats.total}ml`}
                  unit={`de ${waterStats.goal}ml`}
                  size="large"
                />
              </div>

              <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div class="text-2xl font-bold text-blue-600">{waterStats.total}ml</div>
                  <div class="text-sm text-gray-600">Consumido</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-green-600">{waterStats.remaining}ml</div>
                  <div class="text-sm text-gray-600">Restante</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-purple-600">{waterStats.streak}</div>
                  <div class="text-sm text-gray-600">Dias seguidos</div>
                </div>
              </div>
            </Card>

            <!-- Adicionar Água -->
            <Card>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Adicionar Água</h3>
              
              <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
                {#each waterOptions as option}
                  <button
                    on:click={() => addWater(option.amount)}
                    disabled={isAddingWater}
                    class="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div class="text-2xl mb-2">{option.icon}</div>
                    <div class="text-sm font-medium text-gray-900">{option.label}</div>
                  </button>
                {/each}
              </div>

              <!-- Quantidade personalizada -->
              <div class="mt-4 pt-4 border-t border-gray-200">
                <div class="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Quantidade (ml)"
                    min="1"
                    max="2000"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    on:keydown={(e) => {
                      if (e.key === 'Enter' && e.target.value) {
                        addWater(parseInt(e.target.value));
                        e.target.value = '';
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    disabled={isAddingWater}
                    on:click={(e) => {
                      const input = e.target.parentElement.querySelector('input');
                      if (input.value) {
                        addWater(parseInt(input.value));
                        input.value = '';
                      }
                    }}
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
            </Card>

            <!-- Histórico do Dia -->
            <Card>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Histórico de Hoje</h3>
              
              {#if waterStats.entries && waterStats.entries.length > 0}
                <div class="space-y-3">
                  {#each waterStats.entries.slice().reverse() as entry}
                    <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <div>
                          <div class="font-medium text-gray-900">{entry.amount}ml</div>
                          <div class="text-sm text-gray-600">{formatTime(entry.timestamp)}</div>
                        </div>
                      </div>
                    </div>
                  {/each}
                </div>
              {:else}
                <div class="text-center py-8 text-gray-500">
                  <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <p>Nenhum registro de hidratação hoje</p>
                </div>
              {/if}
            </Card>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Dicas de Hidratação -->
            <Card class="bg-gradient-to-r from-blue-50 to-cyan-50">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">💡 Dicas de Hidratação</h3>
              
              <div class="space-y-3 text-sm">
                <div class="flex items-start space-x-2">
                  <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">Beba um copo de água ao acordar para ativar o metabolismo</p>
                </div>
                <div class="flex items-start space-x-2">
                  <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">Mantenha uma garrafa de água sempre por perto</p>
                </div>
                <div class="flex items-start space-x-2">
                  <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">Beba água antes, durante e após exercícios</p>
                </div>
                <div class="flex items-start space-x-2">
                  <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">Adicione limão ou hortelã para variar o sabor</p>
                </div>
              </div>
            </Card>

            <!-- Benefícios -->
            <Card>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">🌟 Benefícios da Hidratação</h3>
              
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span class="text-green-600 text-sm">🧠</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Melhora a concentração</div>
                    <div class="text-sm text-gray-600">Cérebro hidratado funciona melhor</div>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 text-sm">💪</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Aumenta a energia</div>
                    <div class="text-sm text-gray-600">Combate a fadiga e cansaço</div>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span class="text-purple-600 text-sm">✨</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Pele mais saudável</div>
                    <div class="text-sm text-gray-600">Hidratação reflete na pele</div>
                  </div>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span class="text-red-600 text-sm">❤️</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Melhora a digestão</div>
                    <div class="text-sm text-gray-600">Facilita processos digestivos</div>
                  </div>
                </div>
              </div>
            </Card>

            <!-- Lembretes -->
            <Card>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">⏰ Configurar Lembretes</h3>
              
              <div class="space-y-3">
                <Button variant="outline" size="sm" full>
                  🔔 Lembrete a cada 2 horas
                </Button>
                <Button variant="outline" size="sm" full>
                  📱 Notificações push
                </Button>
                <Button variant="outline" size="sm" full>
                  📧 Relatório semanal
                </Button>
              </div>
            </Card>

            <!-- Estatísticas Semanais -->
            <Card>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">📊 Esta Semana</h3>
              
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Média diária</span>
                  <span class="font-medium">2.1L</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Melhor dia</span>
                  <span class="font-medium">2.8L</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Dias na meta</span>
                  <span class="font-medium">5/7</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Sequência atual</span>
                  <span class="font-medium text-green-600">{waterStats.streak} dias</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      {/if}
    </main>
  </div>
{/if}
