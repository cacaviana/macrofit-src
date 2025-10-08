<script>
  import { createEventDispatcher } from 'svelte';

  // Props principais
  export let variant = 'primary';   // 'primary' | 'secondary' | 'success' | 'danger' | 'outline'
  export let size = 'md';           // 'sm' | 'md' | 'lg'
  export let disabled = false;
  export let loading = false;
  export let type = 'button';
  export let href = null;
  export let full = false;          // largura total
  export let rounded = true;        // bordas arredondadas

  // Variants do MacroFit
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-500'
  };

  // Tamanhos
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  // Classes base
  const baseClasses = 'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  // Combinar classes
  $: classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    rounded ? 'rounded-lg' : '',
    full ? 'w-full' : '',
    $$props.class || ''
  ].filter(Boolean).join(' ');

  // Event dispatcher
  const dispatch = createEventDispatcher();
  
  function handleClick(event) {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }
    dispatch('click', event);
  }
</script>

{#if href}
  <a
    {href}
    class={classes}
    class:pointer-events-none={disabled}
    on:click={handleClick}
    {...$$restProps}
  >
    {#if loading}
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {/if}
    <slot />
  </a>
{:else}
  <button
    {type}
    {disabled}
    class={classes}
    on:click={handleClick}
    {...$$restProps}
  >
    {#if loading}
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {/if}
    <slot />
  </button>
{/if}
