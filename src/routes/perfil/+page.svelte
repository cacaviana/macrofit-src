<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Card, Button, Input } from '$lib/components/ui';
  
  // AuthGuard
  import { useAuthGuard } from '$lib/auth/authGuard.js';
  
  // Services
  import { UserService } from '$lib/services/user.service.js';

  // Estados da página
  let user = {
    name: 'Usuário IDemo',
    email: 'usuario@macrofit.com',
    currentWeight: 70,
    targetWeight: 65,
    height: 175,
    age: 30,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'lose_weight'
  };
  
  let isLoading = false;
  let isEditing = false;
  let error = '';
  let success = '';

  // AuthGuard
  const { isAuthenticated, isChecking } = useAuthGuard();

  // Service
  const userService = new UserService();

  // Opções para exibição
  const genderLabels = {
    'male': '👨 Masculino',
    'female': '👩 Feminino'
  };

  const activityLabels = {
    'sedentary': 'Sedentário',
    'light': 'Leve',
    'moderate': 'Moderado',
    'active': 'Ativo'
  };

  const goalLabels = {
    'lose_weight': '📉 Perder peso',
    'maintain_weight': '⚖️ Manter peso',
    'gain_weight': '📈 Ganhar peso'
  };

  // Calcular IMC
  $: imc = user.height ? (user.currentWeight / Math.pow(user.height / 100, 2)).toFixed(1) : 0;
  
  // Classificação do IMC
  $: imcClass = imc < 18.5 ? 'Abaixo do peso' : 
                imc < 25 ? 'Peso normal' : 
                imc < 30 ? 'Sobrepeso' : 'Obesidade';
  
  // Cor do IMC
  $: imcColor = imc < 18.5 ? 'text-blue-600' : 
                imc < 25 ? 'text-green-600' : 
                imc < 30 ? 'text-yellow-600' : 'text-red-600';

  onMount(async () => {
    // Carregar dados do usuário
    await loadUserProfile();
  });

  async function loadUserProfile() {
    try {
      isLoading = true;
      // Em modo mock, usar dados fictícios
      // const result = await userService.getUserProfile();
      // user = result.data;
    } catch (err) {
      error = 'Erro ao carregar perfil do usuário';
    } finally {
      isLoading = false;
    }
  }

  async function saveProfile() {
    try {
      isLoading = true;
      error = '';
      success = '';

      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      success = 'Perfil atualizado com sucesso!';
      isEditing = false;
      
      setTimeout(() => {
        success = '';
      }, 3000);
    } catch (err) {
      error = 'Erro ao salvar perfil';
    } finally {
      isLoading = false;
    }
  }

  function toggleEdit() {
    isEditing = !isEditing;
    error = '';
    success = '';
  }
</script>

<svelte:head>
  <title>Perfil - MacroFit</title>
</svelte:head>

{#if $isChecking}
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p class="text-gray-600">Verificando autenticação...</p>
    </div>
  </div>
{:else if !$isAuthenticated}
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h2>
      <p class="text-gray-600 mb-4">Você precisa estar logado para acessar esta página.</p>
      <Button on:click={() => goto('/auth/login')}>Fazer Login</Button>
    </div>
  </div>
{:else}

<div class="container mx-auto px-4 py-8">
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">👤 Meu Perfil</h1>
          <p class="text-gray-600">Visualize e edite suas informações pessoais</p>
        </div>
        
        <div class="flex space-x-2">
          {#if !isEditing}
            <Button on:click={toggleEdit} class="bg-blue-500 hover:bg-blue-600">
              ✏️ Editar Perfil
            </Button>
          {:else}
            <Button on:click={toggleEdit} class="bg-gray-500 hover:bg-gray-600">
              ❌ Cancelar
            </Button>
            <Button on:click={saveProfile} disabled={isLoading} class="bg-green-500 hover:bg-green-600">
              {#if isLoading}
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {/if}
              💾 Salvar
            </Button>
          {/if}
        </div>
      </div>
      
      <!-- Mensagens -->
      {#if error}
        <div class="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      {/if}
      
      {#if success}
        <div class="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      {/if}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Informações Básicas -->
      <div class="lg:col-span-2">
        <Card class="p-6">
          <h2 class="text-xl font-semibold mb-6">Informações Pessoais</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome</label>
              {#if isEditing}
                <Input bind:value={user.name} placeholder="Digite seu nome" />
              {:else}
                <p class="text-gray-900 font-medium">{user.name}</p>
              {/if}
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              {#if isEditing}
                <Input bind:value={user.email} type="email" placeholder="Digite seu email" />
              {:else}
                <p class="text-gray-900">{user.email}</p>
              {/if}
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Idade</label>
              {#if isEditing}
                <Input bind:value={user.age} type="number" placeholder="Digite sua idade" />
              {:else}
                <p class="text-gray-900">{user.age} anos</p>
              {/if}
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Gênero</label>
              {#if isEditing}
                <select bind:value={user.gender} class="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="male">👨 Masculino</option>
                  <option value="female">👩 Feminino</option>
                </select>
              {:else}
                <p class="text-gray-900">{genderLabels[user.gender]}</p>
              {/if}
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
              {#if isEditing}
                <Input bind:value={user.height} type="number" placeholder="Digite sua altura" />
              {:else}
                <p class="text-gray-900">{user.height} cm</p>
              {/if}
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Peso Atual (kg)</label>
              {#if isEditing}
                <Input bind:value={user.currentWeight} type="number" step="0.1" placeholder="Digite seu peso" />
              {:else}
                <p class="text-gray-900">{user.currentWeight} kg</p>
              {/if}
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Peso Meta (kg)</label>
              {#if isEditing}
                <Input bind:value={user.targetWeight} type="number" step="0.1" placeholder="Digite seu peso meta" />
              {:else}
                <p class="text-gray-900">{user.targetWeight} kg</p>
              {/if}
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nível de Atividade</label>
              {#if isEditing}
                <select bind:value={user.activityLevel} class="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="sedentary">Sedentário</option>
                  <option value="light">Leve</option>
                  <option value="moderate">Moderado</option>
                  <option value="active">Ativo</option>
                </select>
              {:else}
                <p class="text-gray-900">{activityLabels[user.activityLevel]}</p>
              {/if}
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Objetivo</label>
              {#if isEditing}
                <select bind:value={user.goal} class="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="lose_weight">📉 Perder peso</option>
                  <option value="maintain_weight">⚖️ Manter peso</option>
                  <option value="gain_weight">📈 Ganhar peso</option>
                </select>
              {:else}
                <p class="text-gray-900">{goalLabels[user.goal]}</p>
              {/if}
            </div>
          </div>
        </Card>
      </div>

      <!-- Estatísticas -->
      <div class="space-y-6">
        <!-- IMC -->
        <Card class="p-6">
          <h3 class="text-lg font-semibold mb-4">📊 Estatísticas</h3>
          
          <div class="space-y-4">
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700">IMC</span>
                <span class="text-2xl font-bold {imcColor}">{imc}</span>
              </div>
              <p class="text-sm text-gray-600">{imcClass}</p>
            </div>
            
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700">Para perder</span>
                <span class="text-lg font-semibold text-red-600">
                  {(user.currentWeight - user.targetWeight).toFixed(1)} kg
                </span>
              </div>
            </div>
          </div>
        </Card>

        <!-- Ações Rápidas -->
        <Card class="p-6">
          <h3 class="text-lg font-semibold mb-4">⚡ Ações Rápidas</h3>
          
          <div class="space-y-3">
            <Button 
              on:click={() => goto('/configuracao')} 
              class="w-full bg-blue-500 hover:bg-blue-600 text-left justify-start"
            >
              ⚙️ Configurações Avançadas
            </Button>
            
            <Button 
              on:click={() => goto('/historico')} 
              class="w-full bg-green-500 hover:bg-green-600 text-left justify-start"
            >
              📊 Ver Histórico
            </Button>
            
            <Button 
              on:click={() => goto('/relatorios')} 
              class="w-full bg-purple-500 hover:bg-purple-600 text-left justify-start"
            >
              📈 Relatórios
            </Button>
          </div>
        </Card>
      </div>
    </div>
  </div>
</div>

{/if}