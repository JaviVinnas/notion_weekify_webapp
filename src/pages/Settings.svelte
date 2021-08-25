<script>
  import { Theme } from "carbon-components-svelte";
</script>

<h2>Apariencia</h2>

<Theme
  render="toggle"
  toggle={{ themes: ["white", "g100"], labelA: 'Activar modo oscuro', labelB: 'Desactivar modo oscuro', hideLabel: true, size: 'sm' }}
/>
