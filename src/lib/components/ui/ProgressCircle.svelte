<script>
  // Props
  export let percentage = 0; // 0-100
  export let size = 80; // tamanho em pixels
  export let strokeWidth = 8;
  export let color = '#3B82F6'; // cor da barra de progresso
  export let backgroundColor = '#E5E7EB'; // cor de fundo
  export let showPercentage = true;
  export let label = '';
  export let value = '';
  export let unit = '';

  // Cálculos do círculo
  $: radius = (size - strokeWidth) / 2;
  $: circumference = 2 * Math.PI * radius;
  $: strokeDasharray = circumference;
  $: strokeDashoffset = circumference - (percentage / 100) * circumference;
  $: center = size / 2;
</script>

<div class="flex flex-col items-center space-y-2">
  <!-- Círculo SVG -->
  <div class="relative">
    <svg width={size} height={size} class="transform -rotate-90">
      <!-- Círculo de fundo -->
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={backgroundColor}
        stroke-width={strokeWidth}
        fill="none"
      />
      
      <!-- Círculo de progresso -->
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={color}
        stroke-width={strokeWidth}
        fill="none"
        stroke-dasharray={strokeDasharray}
        stroke-dashoffset={strokeDashoffset}
        stroke-linecap="round"
        class="transition-all duration-300 ease-in-out"
      />
    </svg>
    
    <!-- Conteúdo central -->
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      {#if showPercentage}
        <span class="text-lg font-bold text-gray-900">{Math.round(percentage)}%</span>
      {/if}
      {#if value}
        <span class="text-sm font-semibold text-gray-900">{value}</span>
        {#if unit}
          <span class="text-xs text-gray-500">{unit}</span>
        {/if}
      {/if}
    </div>
  </div>
  
  <!-- Label -->
  {#if label}
    <span class="text-sm font-medium text-gray-700 text-center">{label}</span>
  {/if}
</div>
