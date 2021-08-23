<script lang="ts">
	import type { AppState } from '../../state';
	import { selectIsDarkMode } from '../../state';

	// Components
	import ThemeSwitch from '../theme-switch.svelte';
	import TodoList from '../todo-list.svelte';

	export let state: AppState;

	$: darkMode = selectIsDarkMode(state);
</script>

<div class="container" class:dark={darkMode}>
	<header class="header">
		<div class="title-wrapper">
			<span class="title">TODO</span>
			<ThemeSwitch {state} />
		</div>
	</header>
	<main class="todo-list-wrapper">
		<TodoList {state} />
	</main>
</div>

<style>
	.container {
		max-width: 1440px;
		min-height: 100vh;

		margin: 0 auto;

		background-color: #fafafa;
	}

	.todo-list-wrapper {
		max-width: 540px;
		margin: 0 auto;
	}

	.title-wrapper {
		margin: 48px 24px 40px;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title-wrapper .title {
		font-size: 20px;
		font-weight: 700;
		line-height: 100%;
		letter-spacing: 12px;
	}

	.header {
		display: flex;
		flex-direction: column;
		height: 200px;

		background: transparent url(../../../static/assets/bg-mobile-light.jpg) 0 0 / cover no-repeat;
		color: white;
	}

	.dark .header {
		background-image: url(../../../static/assets/bg-mobile-dark.jpg);
	}

	.dark.container {
		background-color: #161721;
	}

	@media all and (min-width: 592px) {
		.header {
			height: 300px;
			background: transparent url(../../../static/assets/bg-desktop-light.jpg) 0 0 / cover no-repeat;
		}

		.dark .header {
			background-image: url(../../../static/assets/bg-desktop-dark.jpg);
		}

		.title-wrapper {
			width: 540px;

			margin-left: auto;
			margin-right: auto;
			margin-top: 70px;

			display: flex;
			justify-content: space-between;
		}

		.title-wrapper .title {
			font-size: 40px;
			letter-spacing: 15px;
		}
	}
</style>
