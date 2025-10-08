<script>
  // Props
  export let padding = 'default'; // 'none', 'sm', 'default', 'lg'
  export let shadow = 'default'; // 'none', 'sm', 'default', 'lg'
  export let hover = false;
  export let clickable = false;
  export let rounded = true;
  
  // Classes baseadas no padding
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };
  
  // Classes baseadas na sombra
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow',
    lg: 'shadow-lg'
  };
  
  // Classes base
  const baseClasses = 'bg-white border border-gray-200';
  
  // Classes de hover
  const hoverClasses = hover ? 'hover:shadow-md transition-shadow duration-200' : '';
  
  // Classes de clickable
  const clickableClasses = clickable ? 'cursor-pointer' : '';
  
  // Classes de arredondamento
  const roundedClasses = rounded ? 'rounded-lg' : '';
  
  // Combinar todas as classes
  $: classes = [
    baseClasses,
    paddingClasses[padding],
    shadowClasses[shadow],
    hoverClasses,
    clickableClasses,
    roundedClasses,
    $$props.class || ''
  ].filter(Boolean).join(' ');
</script>

<div class={classes} on:click on:keydown role={clickable ? 'button' : undefined} tabindex={clickable ? 0 : undefined}>
  <slot />
</div>
