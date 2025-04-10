<script lang="ts">
	import ColorPalette from '$lib/components/colorPalette.svelte';
	import Toast from '$lib/components/toast.svelte';
	import { paletteSelectedColor } from '$lib/stores';
</script>

<ColorPalette base="#0088DC" />
<ColorPalette base="#008080" />
<ColorPalette base="#9ACD32" />
<ColorPalette base="#FFD300" />
<ColorPalette base="#FF6600" />
<ColorPalette base="#ED2939" />

{#if $paletteSelectedColor}
	<Toast />
{/if}
