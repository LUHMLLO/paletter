<script lang="ts">
	import ColorPalette from '$lib/components/colorPalette.svelte';
	import Toast from '$lib/components/toast.svelte';
	import { paletteSelectedColor } from '$lib/stores';
</script>

<aside></aside>
<x-stack>
	<ColorPalette />
</x-stack>

{#if $paletteSelectedColor}
	<Toast />
{/if}

<style>
	:global(body) {
		display: grid;
		grid-template-columns: 200px 1fr;
		grid-template-rows: 1fr;
	}
</style>
