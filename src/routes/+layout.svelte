<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  let menuOpen = false;
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Registro', path: '/registro', icon: '📝' },
    { name: 'Exercícios', path: '/exercicios', icon: '💪' },
    { name: 'Hidratação', path: '/hidratacao', icon: '💧' },
    { name: 'Histórico', path: '/historico', icon: '📊' },
    { name: 'Insights', path: '/insights', icon: '🧠' },
    { name: 'Conquistas', path: '/conquistas', icon: '🏆' },
    { name: 'Perfil', path: '/perfil', icon: '👤' },
    { name: 'Configurações', path: '/configuracao', icon: '⚙️' },
    { name: 'Relatórios', path: '/relatorios', icon: '📈' },
    { name: 'Ajuda', path: '/ajuda', icon: '❓' }
  ];
  
  function toggleMenu() {
    menuOpen = !menuOpen;
  }
  
  function navigateTo(path) {
    goto(path);
    menuOpen = false;
  }
  
  // Configurações globais da aplicação
  onMount(() => {
    if (browser) {
      // Configurações de tema
      const theme = localStorage.getItem('macrofit-theme') || 'light';
      document.documentElement.setAttribute('data-theme', theme);
      
      // Configurações de acessibilidade
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduce-motion');
      }
      
      // Service Worker (desabilitado para desenvolvimento simples)
      // if ('serviceWorker' in navigator) {
      //   navigator.serviceWorker.register('/sw.js').catch(console.error);
      // }
    }
  });
</script>

<svelte:head>
  <title>MacroFit - Coach Nutricional IA</title>
</svelte:head>

<!-- Navigation Bar -->
<nav class="bg-white shadow-lg border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <!-- Logo -->
      <div class="flex items-center">
        <button on:click={() => navigateTo('/dashboard')} class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">M</span>
          </div>
          <span class="text-xl font-bold text-gray-800">MacroFit</span>
        </button>
      </div>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-4">
        {#each menuItems as item}
          <button
            on:click={() => navigateTo(item.path)}
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors
              {$page.url.pathname === item.path 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}"
          >
            <span class="mr-1">{item.icon}</span>
            {item.name}
          </button>
        {/each}
      </div>
      
      <!-- Mobile menu button -->
      <div class="md:hidden flex items-center">
        <button
          on:click={toggleMenu}
          class="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition-colors"
        >
          <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {#if menuOpen}
              <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
            {:else}
              <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
            {/if}
          </svg>
        </button>
      </div>
    </div>
  </div>
  
  <!-- Mobile Menu -->
  {#if menuOpen}
    <div class="md:hidden bg-white border-t border-gray-200">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {#each menuItems as item}
          <button
            on:click={() => navigateTo(item.path)}
            class="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors
              {$page.url.pathname === item.path 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}"
          >
            <span class="mr-2">{item.icon}</span>
            {item.name}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</nav>

<!-- Layout Principal -->
<main class="min-h-screen bg-gray-50">
  <slot />
</main>

<!-- Estilos globais específicos -->
<style>
  :global(html) {
    scroll-behavior: smooth;
  }
  
  :global(.reduce-motion *) {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  :global([data-theme="dark"]) {
    color-scheme: dark;
  }
</style>
