<script lang="ts">
	import { paletteSelectedColor } from '$lib/stores';
</script>

<x-flex id="notification">
	<i style={`background-color: ${paletteSelectedColor};`}></i>
	<var>{$paletteSelectedColor}</var>
</x-flex>

<style lang="css">
	#notification {
		align-items: center;
		background-color: hsla(from var(--0) h s l / 50%);
		backdrop-filter: blur(var(--xs, 5px));
		box-shadow: 0 var(--md, 15px) var(--md, 15px) calc(var(--md, 15px) * -1)
			hsl(from var(--10) h s l / 50%);
		color: var(--10);
		gap: var(--lg, 25px);
		inset: 0 0 auto auto;
		margin: var(--xs, 5px);
		max-height: calc(100% - var(--xs, 5px));
		max-width: calc(100% - var(--xs, 5px));
		min-height: 0;
		min-width: 0;
		outline: solid 2px hsla(from var(--5) h s l / 50%);
		outline-offset: -2px;
		padding: var(--md, 15px) var(--lg, 25px) var(--md, 15px) var(--md, 15px);
		pointer-events: none;
		position: fixed;
		transition-property: opacity;
		transition-duration: var(--animDuration);
		transition-timing-function: var(--animTiming);

		i {
			aspect-ratio: 1/1;
			border-radius: var(--xs);
			display: inline-block;
			flex-shrink: 0;
			height: calc(var(--xl) * 2);
			outline: inherit;
			outline-offset: inherit;
		}

		var {
			font-size: var(--xl);
			font-style: normal;
			text-transform: uppercase;
		}
	}
</style>
