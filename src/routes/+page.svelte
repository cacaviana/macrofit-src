<script>
  import { goto } from '$app/navigation';
</script>

<svelte:head>
  <title>MacroFit - Bem-vindo</title>
</svelte:head>

<!-- Página de Boas-Vindas -->
<div class="container mx-auto px-4 py-12">
  <div class="max-w-4xl mx-auto text-center">
    <!-- Hero Section -->
    <div class="mb-12">
      <div class="mb-6">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-6">
          <span class="text-3xl text-white font-bold">M</span>
        </div>
      </div>
      
      <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
        Bem-vindo ao <span class="text-blue-500">MacroFit</span>
      </h1>
      
      <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Seu coach nutricional com inteligência artificial para uma vida mais saudável
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          on:click={() => goto('/dashboard')}
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          🏠 Ir para Dashboard
        </button>
        
        <button 
          on:click={() => goto('/registro')}
          class="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          📝 Registrar Refeição
        </button>
      </div>
    </div>
    
    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="text-4xl mb-4">📊</div>
        <h3 class="text-xl font-semibold mb-2">Acompanhamento</h3>
        <p class="text-gray-600">Monitore suas refeições, exercícios e progresso</p>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="text-4xl mb-4">🤖</div>
        <h3 class="text-xl font-semibold mb-2">IA Personalizada</h3>
        <p class="text-gray-600">Recomendações inteligentes baseadas em seus objetivos</p>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="text-4xl mb-4">🏆</div>
        <h3 class="text-xl font-semibold mb-2">Conquistas</h3>
        <p class="text-gray-600">Gamificação para manter você motivado</p>
      </div>
    </div>
    
    <!-- Quick Access -->
    <div class="bg-white rounded-lg shadow-md p-8">
      <h3 class="text-2xl font-semibold mb-6">Acesso Rápido</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          on:click={() => goto('/exercicios')}
          class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span class="text-2xl mb-2">💪</span>
          <span class="text-sm font-medium">Exercícios</span>
        </button>
        
        <button 
          on:click={() => goto('/hidratacao')}
          class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span class="text-2xl mb-2">💧</span>
          <span class="text-sm font-medium">Hidratação</span>
        </button>
        
        <button 
          on:click={() => goto('/historico')}
          class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span class="text-2xl mb-2">📈</span>
          <span class="text-sm font-medium">Histórico</span>
        </button>
        
        <button 
          on:click={() => goto('/perfil')}
          class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span class="text-2xl mb-2">👤</span>
          <span class="text-sm font-medium">Perfil</span>
        </button>
      </div>
    </div>
  </div>
</div>
