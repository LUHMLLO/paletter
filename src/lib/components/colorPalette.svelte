<script lang="ts">
	import { paletteSelectedColor } from '$lib/stores';
	import { colorToHex } from '$lib/utils';

	function copyToClipboard(e: MouseEvent): void {
		const target = e.currentTarget;

		if (!(target instanceof HTMLElement)) return;

		paletteSelectedColor.set(
			colorToHex(getComputedStyle(target).backgroundColor),
		);

		$paletteSelectedColor
			? navigator.clipboard.writeText($paletteSelectedColor)
			: console.warn('selected color is undefined, cannot copy to clipboard.');
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
		--base: #cea56c;

		--0: hsl(from var(--base) h s calc(l + 11));
		--1: hsl(from var(--base) h s calc(l + 9));
		--2: hsl(from var(--base) h s calc(l + 7));
		--3: hsl(from var(--base) h s calc(l + 5));
		--4: hsl(from var(--base) h s calc(l + 3));
		--5: var(--base);
		--6: hsl(from var(--base) h s calc(l - 3));
		--7: hsl(from var(--base) h s calc(l - 5));
		--8: hsl(from var(--base) h s calc(l - 7));
		--9: hsl(from var(--base) h s calc(l - 9));
		--10: hsl(from var(--base) h s calc(l - 11));
	}

	.palette {
		border-radius: var(--xs, 5px);
		height: 150px;
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
