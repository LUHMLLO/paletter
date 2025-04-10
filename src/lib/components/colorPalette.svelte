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

	const { base = '#808080', steps = 3 } = $props();
</script>

<x-row class="palette" style={`--base: ${base}; --steps: ${steps};`}>
	<x-stack>
		<h6>controls</h6>
    <input type="range" name="" id="">
		<p>
			Lanam delectus molestias assu menda modi dolrum magni laborum incidunt qua
			erat eum.
		</p>
	</x-stack>
	{#each { length: 10 } as _, i}
		<button
			class="swatch"
			style={`background-color: var(--${i})`}
			onclick={copyToClipboard}
		>
			<span>{i}</span>
		</button>
	{/each}
</x-row>

<style lang="css">
	x-row {
		--0: hsl(from var(--base) h s calc(l + calc(var(--steps) * 5)));
		--1: hsl(from var(--base) h s calc(l + calc(var(--steps) * 4)));
		--2: hsl(from var(--base) h s calc(l + calc(var(--steps) * 3)));
		--3: hsl(from var(--base) h s calc(l + calc(var(--steps) * 2)));
		--4: hsl(from var(--base) h s calc(l + var(--steps)));
		--5: var(--base);
		--6: hsl(from var(--base) h s calc(l - var(--steps)));
		--7: hsl(from var(--base) h s calc(l - calc(var(--steps) * 2)));
		--8: hsl(from var(--base) h s calc(l - calc(var(--steps) * 3)));
		--9: hsl(from var(--base) h s calc(l - calc(var(--steps) * 4)));
		--10: hsl(from var(--base) h s calc(l - calc(var(--steps) * 5)));
	}

	.palette {
		height: 300px;
		overflow: clip;
		width: 100%;

		& > x-stack {
			padding: var(--md, 15px);
			width: 200px;
		}

		.swatch {
			align-items: start;
			border-radius: 0;
			flex: 1 1;
			height: auto;
			padding: var(--md, 15px);
		}
	}
</style>
