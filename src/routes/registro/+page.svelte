<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Card, Button, Input, Modal, Badge } from '$lib/components/ui';
  
  // AuthGuard
  import { useAuthGuard } from '$lib/auth/authGuard.js';
  
  // Services
  import { MealsService } from '$lib/services/meals.service.js';

  // Estados da página
  let activeTab = 'text'; // 'text' | 'photo' | 'voice' | 'barcode'
  let isLoading = false;
  let error = '';
  let success = '';
  
  // Estados do formulário de texto
  let textDescription = '';
  let selectedMealType = 'breakfast';
  
  // Estados da foto
  let photoFile = null;
  let photoPreview = null;
  let isAnalyzing = false;
  
  // Estados do áudio
  let isRecording = false;
  let audioBlob = null;
  let recordingTime = 0;
  let recordingInterval = null;
  
  // Estados da busca
  let searchQuery = '';
  let searchResults = [];
  let isSearching = false;
  let showSearchModal = false;

  // AuthGuard
  const { isAuthenticated, isChecking } = useAuthGuard();

  // Service
  const mealsService = new MealsService();

  // Tipos de refeição
  const mealTypes = [
    { value: 'breakfast', label: 'Café da manhã', icon: '☀️' },
    { value: 'lunch', label: 'Almoço', icon: '🍽️' },
    { value: 'dinner', label: 'Jantar', icon: '🌙' },
    { value: 'snack', label: 'Lanche', icon: '🍎' }
  ];

  /**
   * Registra refeição via texto
   */
  async function handleTextSubmit() {
    if (!textDescription.trim()) return;

    try {
      isLoading = true;
      error = '';

      // Importa DTO dinamicamente
      const { CreateMealTextRequest } = await import('$lib/dto/meals/requests.js');
      
      // A UI cria o DTO
      const mealDto = new CreateMealTextRequest({
        description: textDescription,
        mealType: selectedMealType
      });

      // Service recebe o DTO pronto
      const result = await mealsService.createMealFromText(mealDto);

      if (result.success) {
        success = 'Refeição registrada com sucesso!';
        textDescription = '';
        
        // Redireciona após 2 segundos
        setTimeout(() => {
          goto('/dashboard');
        }, 2000);
      }

    } catch (err) {
      error = err.message || 'Erro ao registrar refeição';
    } finally {
      isLoading = false;
    }
  }

  /**
   * Manipula upload de foto
   */
  function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    photoFile = file;
    
    // Cria preview
    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  /**
   * Analisa foto
   */
  async function analyzePhoto() {
    if (!photoFile) return;

    try {
      isAnalyzing = true;
      error = '';

      // Importa DTO dinamicamente
      const { CreateMealPhotoRequest } = await import('$lib/dto/meals/requests.js');
      
      // A UI cria o DTO
      const mealDto = new CreateMealPhotoRequest({
        imageFile: photoFile,
        mealType: selectedMealType
      });

      // Service recebe o DTO pronto
      const result = await mealsService.createMealFromPhoto(mealDto);

      if (result.success) {
        success = 'Foto analisada e refeição registrada!';
        
        // Limpa estados
        photoFile = null;
        photoPreview = null;
        
        // Redireciona após 2 segundos
        setTimeout(() => {
          goto('/dashboard');
        }, 2000);
      }

    } catch (err) {
      error = err.message || 'Erro ao analisar foto';
    } finally {
      isAnalyzing = false;
    }
  }

  /**
   * Inicia gravação de áudio
   */
  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        audioBlob = new Blob(chunks, { type: 'audio/wav' });
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      isRecording = true;
      recordingTime = 0;

      // Contador de tempo
      recordingInterval = setInterval(() => {
        recordingTime++;
      }, 1000);

      // Para automaticamente após 60 segundos
      setTimeout(() => {
        if (isRecording) {
          stopRecording();
        }
      }, 60000);

    } catch (err) {
      error = 'Erro ao acessar microfone';
    }
  }

  /**
   * Para gravação de áudio
   */
  function stopRecording() {
    isRecording = false;
    if (recordingInterval) {
      clearInterval(recordingInterval);
      recordingInterval = null;
    }
  }

  /**
   * Processa áudio gravado
   */
  async function processAudio() {
    if (!audioBlob) return;

    try {
      isLoading = true;
      error = '';

      // Importa DTO dinamicamente
      const { CreateMealAudioRequest } = await import('$lib/dto/meals/requests.js');
      
      // A UI cria o DTO
      const mealDto = new CreateMealAudioRequest({
        audioBlob: audioBlob,
        mealType: selectedMealType
      });

      // Service recebe o DTO pronto
      const result = await mealsService.createMealFromAudio(mealDto);

      if (result.success) {
        success = 'Áudio processado e refeição registrada!';
        
        // Limpa estados
        audioBlob = null;
        recordingTime = 0;
        
        // Redireciona após 2 segundos
        setTimeout(() => {
          goto('/dashboard');
        }, 2000);
      }

    } catch (err) {
      error = err.message || 'Erro ao processar áudio';
    } finally {
      isLoading = false;
    }
  }

  /**
   * Busca alimentos
   */
  async function searchFood() {
    if (!searchQuery.trim()) return;

    try {
      isSearching = true;

      // Importa DTO dinamicamente
      const { SearchFoodRequest } = await import('$lib/dto/meals/requests.js');
      
      // A UI cria o DTO
      const searchDto = new SearchFoodRequest({
        query: searchQuery,
        limit: 10
      });

      // Service recebe o DTO pronto
      const result = await mealsService.searchFood(searchDto);

      if (result.success) {
        searchResults = result.foods;
      }

    } catch (err) {
      console.error('Erro na busca:', err);
    } finally {
      isSearching = false;
    }
  }

  /**
   * Formata tempo de gravação
   */
  function formatRecordingTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Limpa mensagens após um tempo
  $: if (success) {
    setTimeout(() => {
      success = '';
    }, 5000);
  }

  $: if (error) {
    setTimeout(() => {
      error = '';
    }, 5000);
  }
</script>

<svelte:head>
  <title>Registrar Refeição - MacroFit</title>
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
  <!-- Página de Registro -->
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <button on:click={() => goto('/dashboard')} class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 class="text-xl font-semibold text-gray-900">Registrar Refeição</h1>
          </div>
          
          <p class="text-sm text-gray-500">Capturar via texto, voz, foto ou código</p>
        </div>
      </div>
    </header>

    <!-- Conteúdo Principal -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Mensagens -->
      {#if success}
        <div class="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-green-800">{success}</p>
          </div>
        </div>
      {/if}

      {#if error}
        <div class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p class="text-red-800">{error}</p>
          </div>
        </div>
      {/if}

      <!-- Seletor de Tipo de Refeição -->
      <Card class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Tipo de Refeição</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          {#each mealTypes as mealType}
            <button
              on:click={() => selectedMealType = mealType.value}
              class="p-3 rounded-lg border-2 transition-colors {selectedMealType === mealType.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}"
            >
              <div class="text-2xl mb-1">{mealType.icon}</div>
              <div class="text-sm font-medium text-gray-900">{mealType.label}</div>
            </button>
          {/each}
        </div>
      </Card>

      <!-- Tabs de Métodos de Registro -->
      <Card>
        <!-- Tab Headers -->
        <div class="border-b border-gray-200 mb-6">
          <nav class="-mb-px flex space-x-8">
            <button
              on:click={() => activeTab = 'text'}
              class="py-2 px-1 border-b-2 font-medium text-sm {activeTab === 'text' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
            >
              📝 Texto
            </button>
            <button
              on:click={() => activeTab = 'photo'}
              class="py-2 px-1 border-b-2 font-medium text-sm {activeTab === 'photo' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
            >
              📷 Foto
            </button>
            <button
              on:click={() => activeTab = 'voice'}
              class="py-2 px-1 border-b-2 font-medium text-sm {activeTab === 'voice' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
            >
              🎤 Voz
            </button>
            <button
              on:click={() => activeTab = 'barcode'}
              class="py-2 px-1 border-b-2 font-medium text-sm {activeTab === 'barcode' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
            >
              📊 Código de Barras
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        {#if activeTab === 'text'}
          <!-- Registro por Texto -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Descreva sua refeição
              </label>
              <textarea
                bind:value={textDescription}
                placeholder="Ex: 2 ovos mexidos, 1 fatia de pão integral, 1 xícara de café com leite"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              ></textarea>
              <p class="mt-1 text-xs text-gray-500">
                Seja específico sobre quantidades e ingredientes para uma análise mais precisa
              </p>
            </div>

            <div class="flex justify-between items-center">
              <Button
                variant="outline"
                on:click={() => showSearchModal = true}
                disabled={isLoading}
              >
                🔍 Buscar Alimentos
              </Button>

              <Button
                variant="primary"
                on:click={handleTextSubmit}
                loading={isLoading}
                disabled={!textDescription.trim() || isLoading}
              >
                Analisar com IA
              </Button>
            </div>
          </div>

        {:else if activeTab === 'photo'}
          <!-- Registro por Foto -->
          <div class="space-y-6">
            {#if !photoPreview}
              <!-- Upload de Foto -->
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Fotografe seu prato ou rótulo</h3>
                <p class="text-gray-600 mb-4">A IA identificará os alimentos automaticamente</p>
                
                <input
                  type="file"
                  accept="image/*"
                  on:change={handlePhotoUpload}
                  class="hidden"
                  id="photo-upload"
                  disabled={isAnalyzing}
                />
                <label for="photo-upload">
                  <Button variant="primary" disabled={isAnalyzing}>
                    📷 Tirar Foto
                  </Button>
                </label>
                
                <p class="text-xs text-gray-500 mt-2">
                  Suporta JPG, PNG, WebP até 10MB
                </p>
              </div>
            {:else}
              <!-- Preview da Foto -->
              <div class="space-y-4">
                <div class="relative">
                  <img src={photoPreview} alt="Preview da refeição" class="w-full h-64 object-cover rounded-lg" />
                  <button
                    on:click={() => { photoFile = null; photoPreview = null; }}
                    class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    disabled={isAnalyzing}
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div class="flex justify-between items-center">
                  <p class="text-sm text-gray-600">Foto carregada com sucesso</p>
                  <Button
                    variant="primary"
                    on:click={analyzePhoto}
                    loading={isAnalyzing}
                    disabled={isAnalyzing}
                  >
                    {#if isAnalyzing}
                      Analisando...
                    {:else}
                      🔍 Analisar Foto
                    {/if}
                  </Button>
                </div>
              </div>
            {/if}
          </div>

        {:else if activeTab === 'voice'}
          <!-- Registro por Voz -->
          <div class="space-y-6">
            {#if !isRecording && !audioBlob}
              <!-- Iniciar Gravação -->
              <div class="text-center py-8">
                <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Fale naturalmente sobre sua refeição</h3>
                <p class="text-gray-600 mb-6">Ex: "Comi dois ovos mexidos com uma fatia de pão integral"</p>
                
                <Button variant="primary" size="lg" on:click={startRecording}>
                  🎤 Toque para gravar
                </Button>
                
                <p class="text-xs text-gray-500 mt-2">Máximo 60 segundos</p>
              </div>

            {:else if isRecording}
              <!-- Gravando -->
              <div class="text-center py-8">
                <div class="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Gravando...</h3>
                <p class="text-2xl font-mono text-red-500 mb-6">{formatRecordingTime(recordingTime)}</p>
                
                <Button variant="danger" size="lg" on:click={stopRecording}>
                  ⏹️ Parar Gravação
                </Button>
              </div>

            {:else if audioBlob}
              <!-- Áudio Gravado -->
              <div class="text-center py-8">
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Áudio gravado com sucesso!</h3>
                <p class="text-gray-600 mb-6">Duração: {formatRecordingTime(recordingTime)}</p>
                
                <div class="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    on:click={() => { audioBlob = null; recordingTime = 0; }}
                    disabled={isLoading}
                  >
                    🗑️ Descartar
                  </Button>
                  <Button
                    variant="primary"
                    on:click={processAudio}
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    🔍 Processar Áudio
                  </Button>
                </div>
              </div>
            {/if}
          </div>

        {:else if activeTab === 'barcode'}
          <!-- Código de Barras -->
          <div class="text-center py-8">
            <div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Escaneie o código de barras</h3>
            <p class="text-gray-600 mb-6">Posicione o código dentro da área de captura</p>
            
            <Button variant="primary" size="lg">
              📊 Iniciar Scanner
            </Button>
            
            <p class="text-xs text-gray-500 mt-4">
              Funciona com produtos industrializados e alimentos embalados
            </p>
          </div>
        {/if}
      </Card>

      <!-- Sugestões Inteligentes da IA -->
      <Card class="bg-gradient-to-r from-blue-50 to-purple-50">
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Sugestões Inteligentes da IA</h3>
            <p class="text-gray-600 mb-4">Com base nas suas metas e preferências, a IA pode sugerir correspondências precisas para os alimentos que você registrar.</p>
            
            <div class="grid md:grid-cols-3 gap-4">
              <div class="bg-white rounded-lg p-3 border">
                <div class="flex items-center mb-2">
                  <div class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span class="text-sm font-medium">Reconhecimento Inteligente</span>
                </div>
                <p class="text-xs text-gray-600">Identifica alimentos em fotos e voz</p>
              </div>
              
              <div class="bg-white rounded-lg p-3 border">
                <div class="flex items-center mb-2">
                  <div class="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span class="text-sm font-medium">Ajuste de Macros</span>
                </div>
                <p class="text-xs text-gray-600">Sugestões baseadas nas suas metas</p>
              </div>
              
              <div class="bg-white rounded-lg p-3 border">
                <div class="flex items-center mb-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span class="text-sm font-medium">Aprendizado Contínuo</span>
                </div>
                <p class="text-xs text-gray-600">Melhora com seus hábitos</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </main>
  </div>

  <!-- Modal de Busca de Alimentos -->
  <Modal bind:open={showSearchModal} title="Buscar Alimentos" size="lg">
    <div class="space-y-4">
      <!-- Campo de busca -->
      <div class="flex space-x-2">
        <Input
          bind:value={searchQuery}
          placeholder="Digite para buscar alimentos..."
          class="flex-1"
          on:keydown={(e) => e.key === 'Enter' && searchFood()}
        />
        <Button on:click={searchFood} loading={isSearching}>
          Buscar
        </Button>
      </div>

      <!-- Resultados -->
      {#if searchResults.length > 0}
        <div class="space-y-2 max-h-64 overflow-y-auto">
          {#each searchResults as food}
            <div class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div>
                <p class="font-medium">{food.name}</p>
                <p class="text-sm text-gray-600">{food.calories} kcal por {food.unit}</p>
              </div>
              <Button size="sm" variant="outline">
                Adicionar
              </Button>
            </div>
          {/each}
        </div>
      {:else if searchQuery && !isSearching}
        <p class="text-center text-gray-500 py-8">Nenhum alimento encontrado</p>
      {/if}
    </div>
  </Modal>
{/if}
