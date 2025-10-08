<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';

  // Props
  export let open = false;
  export let title = '';
  export let size = 'md'; // 'sm' | 'md' | 'lg' | 'xl'
  export let closable = true;
  export let closeOnBackdrop = true;

  // Classes de tamanho
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  // Event dispatcher
  const dispatch = createEventDispatcher();

  function handleClose() {
    if (closable) {
      open = false;
      dispatch('close');
    }
  }

  function handleBackdropClick(event) {
    if (closeOnBackdrop && event.target === event.currentTarget) {
      handleClose();
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Escape' && closable) {
      handleClose();
    }
  }
</script>

{#if open}
  <!-- Backdrop -->
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    on:click={handleBackdropClick}
    on:keydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    aria-labelledby={title ? 'modal-title' : undefined}
  >
    <!-- Modal -->
    <div class="bg-white rounded-lg shadow-xl w-full {sizeClasses[size]} max-h-[90vh] overflow-hidden">
      <!-- Header -->
      {#if title || closable}
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          {#if title}
            <h2 id="modal-title" class="text-lg font-semibold text-gray-900">{title}</h2>
          {:else}
            <div></div>
          {/if}
          
          {#if closable}
            <button
              type="button"
              class="text-gray-400 hover:text-gray-600 transition-colors"
              on:click={handleClose}
              aria-label="Fechar modal"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          {/if}
        </div>
      {/if}

      <!-- Body -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <slot />
      </div>

      <!-- Footer -->
      <slot name="footer" />
    </div>
  </div>
{/if}
