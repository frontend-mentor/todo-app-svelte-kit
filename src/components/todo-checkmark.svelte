<script lang="ts">
	import type { AppState } from '../state';
	import IconCheck from './icons/icon-check.svelte';
	import { selectIsDarkMode } from '../state';

	export let size: string | number = 20;
	export let checked = false;
	export let state: AppState;
	export let onClick: () => void;

	$: darkMode = selectIsDarkMode(state);
	const inlineStyle = `width: ${size}px; height: ${size}px; flex: 0 0 ${size}px`;
</script>

<div class="container" class:checked class:dark={darkMode} style={inlineStyle} on:click={() => onClick?.()}>
	<div class="inner">
		{#if checked}<IconCheck />{/if}
	</div>
</div>

<style>
	.container {
		user-select: none;
		cursor: pointer;

		background: #e3e4f1;
		border-radius: 50%;

		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1px;
	}

	.container.dark {
		background-color: #393a4b;
	}

	.container.checked {
		background: linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%));
	}

	.container:hover:not(.checked) {
		background: linear-gradient(135deg, #55ddff 0%, #c058f3 100%);
	}

	.inner {
		background: white;
		border-radius: 50%;

		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.dark .inner {
		background-color: #25273d;
	}

	.container.checked .inner {
		background: transparent;
	}
</style>
