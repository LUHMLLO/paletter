<script lang="ts">
	import { paletteSelectedColor } from '$lib/stores';
	import { fade } from 'svelte/transition';
</script>

<x-flex class="toast" in:fade out:fade>
	<i style={`background-color: ${$paletteSelectedColor};`}></i>
	<x-group>
		<p>Copied to clipboard</p>
		<span>{$paletteSelectedColor}</span>
	</x-group>
</x-flex>

<style lang="css">
	.toast {
		align-items: center;
		background-color: hsla(from var(--clr-background) h s l / 50%);
		backdrop-filter: blur(var(--xs, 5px));
		border-radius: var(--xs, 5px);
		box-shadow: 0 var(--md, 15px) var(--md, 15px) calc(var(--md, 15px) * -1)
			hsl(from var(--clr-background) h s l / 50%);
		gap: var(--md, 15px);
		inset: 0 0 auto auto;
		margin: var(--xs, 5px);
		max-height: calc(100% - var(--xs, 5px));
		max-width: calc(100% - var(--xs, 5px));
		min-height: 0;
		min-width: 0;
		outline: solid 2px hsla(from var(--clr-text) h s l / 15%);
		outline-offset: -2px;
		padding: var(--sm, 10px) var(--md, 15px) var(--sm, 10px) var(--sm, 10px);
		position: fixed;
		transition-property: opacity;
		transition-duration: var(--animDuration);
		transition-timing-function: var(--animTiming);

		i {
			aspect-ratio: 1/1;
			border-radius: var(--xs);
			display: inline-block;
			flex-shrink: 0;
			height: 75px;
			outline: solid 1px hsla(from var(--clr-text) h s l / 15%);
		}

		& > x-group {
			gap: var(--xs, 5px);

			span {
				background-color: hsla(from var(--clr-background) h s l / 50%);
				border-radius: var(--xs, 5px);
				font-size: var(--md, 10px);
				padding: var(--xs, 5px) var(--sm, 10px);
				width: fit-content;
			}
		}
	}
</style>
