<script lang="ts">
  // Props
  export let waves: number = 8;
  export let radius: number = 40;
  export let waveDepth: number = 8;
  export let strokeColor: string = "#9ca3af";
  export let fillColor: string = "#ffffff";
  export let iconColor: string = "#111827";
  
  let isHovered: boolean = false;

  function generateWavyPath(waves: number, radius: number, waveDepth: number): string {
    const centerX: number = 50;
    const centerY: number = 50;
    const points: number = waves * 8;
    let pathData: string = '';

    for (let i = 0; i <= points; i++) {
      const angle: number = (i / points) * Math.PI * 2;
      const waveAngle: number = (i / points) * waves * Math.PI * 2;
      const waveOffset: number = Math.sin(waveAngle) * waveDepth;
      const r: number = radius + waveOffset;
      
      const x: number = centerX + r * Math.cos(angle);
      const y: number = centerY + r * Math.sin(angle);

      if (i === 0) {
        pathData += `M ${x} ${y}`;
      } else {
        const prevAngle: number = ((i - 1) / points) * Math.PI * 2;
        const prevWaveAngle: number = ((i - 1) / points) * waves * Math.PI * 2;
        const prevWaveOffset: number = Math.sin(prevWaveAngle) * waveDepth;
        const prevR: number = radius + prevWaveOffset;
        const prevX: number = centerX + prevR * Math.cos(prevAngle);
        const prevY: number = centerY + prevR * Math.sin(prevAngle);
        
        const cpX: number = (prevX + x) / 2;
        const cpY: number = (prevY + y) / 2;
        
        pathData += ` Q ${cpX} ${cpY} ${x} ${y}`;
      }
    }
    
    pathData += ' Z';
    return pathData;
  }

  $: wavyPath = generateWavyPath(waves, radius, waveDepth);
</script>

<div 
  class="inline-block group"
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
  role="button"
  tabindex="0"
>
  <svg 
    class="w-24 h-24 transition-all duration-200"
    class:scale-105={isHovered}
    viewBox="0 0 100 100"
    style="filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) {isHovered ? 'drop-shadow(0 4px 6px rgb(0 0 0 / 0.1))' : ''}"
  >
    <path
      d={wavyPath}
      fill={fillColor}
      stroke={strokeColor}
      stroke-width="1"
      class="transition-all duration-200"
    />
    
    <g stroke={iconColor} stroke-width="2.5" stroke-linecap="round">
      <line x1="50" y1="35" x2="50" y2="65" />
      <line x1="35" y1="50" x2="65" y2="50" />
    </g>
  </svg>
</div>

<style>
  div[role="button"] {
    cursor: pointer;
  }
</style>