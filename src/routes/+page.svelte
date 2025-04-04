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

	let notification: HTMLDialogElement | null = null;
	let hex: string = '';
	let timeOut: number | undefined;

	// Inject styles once
	if (
		typeof window !== 'undefined' &&
		!document.querySelector('style[data-lilycat]')
	) {
		const style = document.createElement('style');
		style.setAttribute('data-lilycat', 'true');
		style.textContent = `${tokens}${reset}${normalize}${customs}${icons}${props}`;
		document.head.appendChild(style);
	}

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
		}, 5000);
	}
</script>

<x-stack id="app">
	{#each [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as shade}
		<button
			type="button"
			class="w-full"
			style="background-color: var(--{shade});"
			on:click={copyToClipboard}
		>
			{shade}
		</button>
	{/each}
</x-stack>

<x-surlayer>
	<dialog id="notification">
		<h6>copied to clipboard</h6>
		<var>{hex}</var>
	</dialog>
</x-surlayer>

<style lang="css">
	@property --base {
		syntax: '<color>';
		inherits: false;
		initial-value: hsl(50, 50%, 50%);
	}
	:root {
		--50: hsl(from var(--base) h s calc(l + 25));
		--100: hsl(from var(--base) h s calc(l + 20));
		--200: hsl(from var(--base) h s calc(l + 15));
		--300: hsl(from var(--base) h s calc(l + 10));
		--400: hsl(from var(--base) h s calc(l + 5));
		--500: var(--base);
		--600: hsl(from var(--base) h s calc(l - 5));
		--700: hsl(from var(--base) h s calc(l - 10));
		--800: hsl(from var(--base) h s calc(l - 15));
		--900: hsl(from var(--base) h s calc(l - 20));
		--950: hsl(from var(--base) h s calc(l - 25));
	}

	#app {
		height: 100dvh;
		button {
			border-radius: 0;
			flex-grow: 1;
      user-select: none;
		}
	}

	#notification {
		background-color: hsla(from var(--50) h s l / 50%);
		backdrop-filter: blur(var(--xs, 5px));
		color: var(--950);
		inset: 0 0 auto auto;
		margin: var(--md);
		max-height: calc(100% - var(--md));
		max-width: calc(100% - var(--md));
		min-height: 0;
		min-width: 0;
		padding: var(--xl);
		position: fixed;

		h6 {
			margin-bottom: var(--xs);
      user-select: none;
		}

		var {
			font-size: var(--xl);
			font-style: normal;
			font-weight: 600;
			text-transform: uppercase;
		}
	}
</style>
