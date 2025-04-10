<script lang="ts">
	import { paletteSelectedColor } from '$lib/stores';
	import { colorToHex } from '$lib/utils';

	let timeOut: number | undefined;

	function copyToClipboard(e: MouseEvent): void {
		if ($paletteSelectedColor) clearTimeout(timeOut);

		const target = e.currentTarget;

		if (!(target instanceof HTMLElement)) return;

		paletteSelectedColor.set(
			colorToHex(getComputedStyle(target).backgroundColor),
		);

		$paletteSelectedColor
			? navigator.clipboard.writeText($paletteSelectedColor)
			: console.warn('selected color is undefined, cannot copy to clipboard.');

		timeOut = setTimeout(() => {
			paletteSelectedColor.set(undefined);
		}, 3500);
	}
</script>

<x-row class="palette">
	{#each { length: 10 } as _, i}
		<button
			class="swatch"
			style={`background-color: var(--${i})`}
			on:click={copyToClipboard}
		>
			<span>{i}</span>
		</button>
	{/each}
</x-row>

<style lang="css">
	x-row {
		--base: #d7b587;
		--step: 2.125;

		--0: hsl(from var(--base) h s calc(l + calc(var(--step) * 5)));
		--1: hsl(from var(--base) h s calc(l + calc(var(--step) * 4)));
		--2: hsl(from var(--base) h s calc(l + calc(var(--step) * 3)));
		--3: hsl(from var(--base) h s calc(l + calc(var(--step) * 2)));
		--4: hsl(from var(--base) h s calc(l + var(--step)));
		--5: var(--base);
		--6: hsl(from var(--base) h s calc(l - var(--step)));
		--7: hsl(from var(--base) h s calc(l - calc(var(--step) * 2)));
		--8: hsl(from var(--base) h s calc(l - calc(var(--step) * 3)));
		--9: hsl(from var(--base) h s calc(l - calc(var(--step) * 4)));
		--10: hsl(from var(--base) h s calc(l - calc(var(--step) * 5)));
	}

	.palette {
		height: 300px;
		overflow: clip;
		width: 100%;

		.swatch {
			align-items: start;
			border-radius: 0;
			flex: 1 1 100%;
			height: auto;
			padding: var(--md, 15px);
		}
	}
</style>
