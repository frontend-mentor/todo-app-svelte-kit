<script lang="ts">
	import type { AppState } from '../state';
	import { changeTheme, selectIsDarkMode, SupportedTheme, useAppDispatch } from '../state';

	import IconMoon from './icons/icon-moon.svelte';
	import IconSun from './icons/icon-sun.svelte';

	export let state: AppState;
	const dispatch = useAppDispatch();

	$: darkMode = selectIsDarkMode(state);

	const onToggleTheme = () => {
		dispatch(changeTheme(darkMode ? SupportedTheme.Light : SupportedTheme.Dark));
	};
</script>

<button class="theme-switch" on:click={onToggleTheme}>
	{#if darkMode}
		<IconSun />
	{:else}
		<IconMoon />
	{/if}
</button>

<style>
	.theme-switch {
		border: none;
		background: none;
		outline: none;
		cursor: pointer;
		padding: 0;
		line-height: 0;
		width: 20px;
		height: 20px;
	}

	@media all and (min-width: 592px) {
		.theme-switch {
			width: 26px;
			height: 26px;
		}
	}
</style>
