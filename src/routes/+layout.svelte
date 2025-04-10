<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<script type="module">
		import { all } from 'https://esm.sh/jsr/@luhmllo/lilycat@0.1.25';

		const sheet = new CSSStyleSheet();
		sheet.replaceSync(all);
		document.adoptedStyleSheets = [sheet, ...document.adoptedStyleSheets];
	</script>
</svelte:head>

{@render children()}
