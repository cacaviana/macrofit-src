<script>
  import { createEventDispatcher } from 'svelte';

  // Props
  export let type = 'text';
  export let value = '';
  export let placeholder = '';
  export let disabled = false;
  export let required = false;
  export let readonly = false;
  export let error = '';
  export let label = '';
  export let id = '';
  export let name = '';
  export let autocomplete = '';
  export let size = 'md'; // 'sm' | 'md' | 'lg'
  export let full = true; // largura total por padrão

  // Classes de tamanho
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  // Classes base
  const baseClasses = 'border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:bg-gray-50 disabled:text-gray-500';
  
  // Classes de erro
  const errorClasses = error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : '';
  
  // Classes de largura
  const widthClasses = full ? 'w-full' : '';

  // Combinar classes
  $: inputClasses = [
    baseClasses,
    sizeClasses[size],
    errorClasses,
    widthClasses,
    $$props.class || ''
  ].filter(Boolean).join(' ');

  // Event dispatcher
  const dispatch = createEventDispatcher();

  function handleInput(event) {
    value = event.target.value;
    dispatch('input', event);
  }

  function handleChange(event) {
    dispatch('change', event);
  }

  function handleFocus(event) {
    dispatch('focus', event);
  }

  function handleBlur(event) {
    dispatch('blur', event);
  }

  // Gerar ID único se não fornecido
  $: inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
</script>

<div class="space-y-1">
  {#if label}
    <label for={inputId} class="block text-sm font-medium text-gray-700">
      {label}
      {#if required}
        <span class="text-red-500">*</span>
      {/if}
    </label>
  {/if}
  
  {#if type === 'textarea'}
    <textarea
      {placeholder}
      {disabled}
      {required}
      {readonly}
      {name}
      {autocomplete}
      id={inputId}
      class={inputClasses}
      bind:value
      on:input={handleInput}
      on:change={handleChange}
      on:focus={handleFocus}
      on:blur={handleBlur}
      {...$$restProps}
    ></textarea>
  {:else if type === 'email'}
    <input
      type="email"
      {placeholder}
      {disabled}
      {required}
      {readonly}
      {name}
      {autocomplete}
      id={inputId}
      class={inputClasses}
      bind:value
      on:input={handleInput}
      on:change={handleChange}
      on:focus={handleFocus}
      on:blur={handleBlur}
      {...$$restProps}
    />
  {:else if type === 'password'}
    <input
      type="password"
      {placeholder}
      {disabled}
      {required}
      {readonly}
      {name}
      {autocomplete}
      id={inputId}
      class={inputClasses}
      bind:value
      on:input={handleInput}
      on:change={handleChange}
      on:focus={handleFocus}
      on:blur={handleBlur}
      {...$$restProps}
    />
  {:else if type === 'number'}
    <input
      type="number"
      {placeholder}
      {disabled}
      {required}
      {readonly}
      {name}
      {autocomplete}
      id={inputId}
      class={inputClasses}
      bind:value
      on:input={handleInput}
      on:change={handleChange}
      on:focus={handleFocus}
      on:blur={handleBlur}
      {...$$restProps}
    />
  {:else}
    <input
      type="text"
      {placeholder}
      {disabled}
      {required}
      {readonly}
      {name}
      {autocomplete}
      id={inputId}
      class={inputClasses}
      bind:value
      on:input={handleInput}
      on:change={handleChange}
      on:focus={handleFocus}
      on:blur={handleBlur}
      {...$$restProps}
    />
  {/if}
  
  {#if error}
    <p class="text-sm text-red-600">{error}</p>
  {/if}
</div>
