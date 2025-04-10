<script lang="ts">
	import ColorPalette from '$lib/components/colorPalette.svelte';
	import ToastNotification from '$lib/components/toastNotification.svelte';
</script>

<aside></aside>
<x-stack>
	<ColorPalette />
	<ColorPalette />
	<ColorPalette />
	<ColorPalette />
	<ColorPalette />
</x-stack>

<ToastNotification />

<style>
	:global(body) {
		display: grid;
		grid-template-columns: 200px 1fr;
		grid-template-rows: 1fr;
	}
</style>
