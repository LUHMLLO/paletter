<script lang="ts">
	import {
		customs,
		icons,
		normalize,
		props,
		reset,
		tokens,
	} from '@luhmllo/lilycat';
	import { onMount } from 'svelte';

	let basecolor = $state('');
	let notification: HTMLDialogElement | null = null;
	let hex: string = $state('');
	let timeOut: number | undefined;

	// Inject styles once
	$effect.pre(() => {
		if (
			typeof window !== 'undefined' &&
			!document.querySelector('style[data-lilycat]')
		) {
			const style = document.createElement('style');
			style.setAttribute('data-lilycat', 'true');
			style.textContent = `${tokens}${reset}${normalize}${customs}${icons}${props}`;
			document.head.appendChild(style);
		}

		document?.documentElement?.style.setProperty('--base', basecolor);
	});

	onMount(() => {
		notification = document.querySelector<HTMLDialogElement>('#notification');
	});

	/**
	 * Converts RGB string to hex.
	 */
	function rgbToHex(rgb: string): string {
		const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		if (!match) return 'invalid';
		return `#${parseInt(match[1]).toString(16).padStart(2, '0')}${parseInt(match[2]).toString(16).padStart(2, '0')}${parseInt(match[3]).toString(16).padStart(2, '0')}`;
	}

	/**
	 * Converts color(srgb ...) to hex.
	 */
	function srgbToHex(color: string): string {
		color = color.replace('color(srgb ', '').replace(')', '');
		const values = color.split(' ');
		const hexValues = values.map((value) => {
			const n = parseFloat(value);
			const hex = Math.round(n * 255).toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		});
		return '#' + hexValues.join('');
	}

	/**
	 * Resolves a computed color into a real CSS color.
	 */
	function resolveColor(color: string): string {
		const ctx = document.createElement('canvas').getContext('2d');
		if (!ctx) return 'invalid';
		ctx.fillStyle = color;
		return ctx.fillStyle;
	}

	/**
	 * Handles color copying.
	 */
	function copyToClipboard(e: MouseEvent): void {
		if (hex) clearTimeout(timeOut);

		const target = e.currentTarget as HTMLElement;
		if (!target) return;

		let computed = getComputedStyle(target).backgroundColor;
		if (computed.includes('color-mix') || computed.includes('var(')) {
			// Try resolving fallback manually
			const bg = getComputedStyle(target).getPropertyValue('background-color');
			computed = resolveColor(bg.trim());
		}

		if (computed.startsWith('rgb')) {
			hex = rgbToHex(computed);
		} else if (computed.startsWith('color(srgb')) {
			hex = srgbToHex(computed);
		} else {
			hex = resolveColor(computed);
		}

		navigator.clipboard.writeText(hex);

		if (notification) {
			const varElement = notification.querySelector('var');
			if (varElement) varElement.innerText = hex;
			notification.show();
		}

		timeOut = setTimeout(() => {
			notification?.close();
			hex = '';
		}, 3500);
	}
</script>

<x-stack id="app">
	<x-group>
		{#each [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as shade}
			<button
				type="button"
				class="w-full"
				style="background-color: var(--{shade});"
				onclick={copyToClipboard}
			>
				<span>{shade}</span>
			</button>
		{/each}
	</x-group>

	<x-flex id="toolbar">
		<button type="button">
			pick color <input
				type="color"
				name="basecolor"
				id="basecolor"
				bind:value={basecolor}
			/>
		</button>
		<!-- <button type="button"> export <i class="icon">download</i> </button> -->
	</x-flex>
</x-stack>

<x-surlayer>
	<dialog id="notification">
		<i style={`background-color: ${hex};`}></i>
		<var>{hex}</var>
	</dialog>
</x-surlayer>

<style lang="css">
	/* @property --base {
		syntax: '<color>';
		inherits: false;
		initial-value: hsl(24, 64%, 69%);
	} */

	:root {
		--50: hsl(from var(--base) h s calc(l + 11));
		--100: hsl(from var(--base) h s calc(l + 9));
		--200: hsl(from var(--base) h s calc(l + 7));
		--300: hsl(from var(--base) h s calc(l + 5));
		--400: hsl(from var(--base) h s calc(l + 3));
		--500: var(--base);
		--600: hsl(from var(--base) h s calc(l - 3));
		--700: hsl(from var(--base) h s calc(l - 5));
		--800: hsl(from var(--base) h s calc(l - 7));
		--900: hsl(from var(--base) h s calc(l - 9));
		--950: hsl(from var(--base) h s calc(l - 11));
	}

	:global(body) {
		background-color: var(--50);
	}

	#app {
		gap: var(--md, 15px);
		height: 100dvh;
		padding: var(--md, 15px) var(--md, 15px) var(--md, 15px);

		& > x-group {
			backdrop-filter: blur(var(--xs, 5px));
			border-radius: var(--md, 15px);
			box-shadow: 0 var(--md, 15px) var(--md, 15px) calc(var(--md, 15px) * -1)
				hsl(from var(--950) h s l / 50%);
			flex-grow: 1;
			outline: solid 2px hsla(from var(--500) h s l / 50%);
			outline-offset: -2px;
			overflow: clip;

			button {
				border-radius: 0;
				flex-grow: 1;
				padding: 0 var(--xl, 35px);
				user-select: none;

				span {
					mix-blend-mode: difference;
				}
			}
		}
	}

	#notification {
		align-items: center;
		background-color: hsla(from var(--50) h s l / 50%);
		backdrop-filter: blur(var(--xs, 5px));
		box-shadow: 0 var(--md, 15px) var(--md, 15px) calc(var(--md, 15px) * -1)
			hsl(from var(--950) h s l / 50%);
		color: var(--950);
		display: flex;
		gap: var(--lg, 25px);
		inset: 0 0 auto auto;
		margin: var(--xs, 5px);
		max-height: calc(100% - var(--xs, 5px));
		max-width: calc(100% - var(--xs, 5px));
		min-height: 0;
		min-width: 0;
		opacity: 0;
		outline-color: hsla(from var(--500) h s l / 50%);
		padding: var(--md, 15px) var(--lg, 25px) var(--md, 15px) var(--md, 15px);
		pointer-events: none;
		position: fixed;
		transition-property: opacity;
		transition-duration: var(--animDuration);
		transition-timing-function: var(--animTiming);
		transition-behavior: allow-discrete;

		@starting-style {
			opacity: 0;
		}

		&[open] {
			opacity: 1;
		}

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

	#toolbar {
		gap: var(--md, 15px);
		height: max-content;
		inset: auto 0 0 0;
		padding: var(--xs, 5px);
		place-content: center;

		button {
			flex-grow: 1;
			overflow: clip;
			place-content: space-between;
			position: relative;

			input {
				border-radius: inherit;
				height: 100%;
				inset: 0;
				position: absolute;
				width: 100%;
			}
		}
	}
</style>
