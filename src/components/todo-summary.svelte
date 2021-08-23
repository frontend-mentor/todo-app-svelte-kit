<script lang="ts">
	import type { AppState } from '../state';
	import { removeCompletedTodos, selectIsDarkMode, selectItemsRemaining, useAppDispatch } from '../state';

	export let state: AppState;
	$: darkMode = selectIsDarkMode(state);
	$: itemsRemaining = selectItemsRemaining(state);

	const dispatch = useAppDispatch();
	const onClearCompleted = () => {
		dispatch(removeCompletedTodos());
	};
</script>

<div class="container" class:dark={darkMode}>
	<div class="items-remaining">{itemsRemaining} items left</div>
	<slot />
	<button class="clear-completed" on:click={onClearCompleted}>Clear Completed</button>
</div>

<style>
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding: 0 24px;
		height: 50px;
	}

	.items-remaining,
	.clear-completed {
		color: #9495a5;
		font: normal 14px/1 Josefin Sans, sans-serif;
		white-space: nowrap;
	}

	.clear-completed {
		border: none;
		outline: none;
		cursor: pointer;
		padding: 0;

		background: none;

		font-size: 14px;
		line-height: 1;
	}

	.clear-completed:hover {
		color: #494c6b;
	}

	.dark.container {
		background-color: #25273d;
	}

	.dark .items-remaining,
	.dark .clear-completed {
		color: #5b5e7e;
	}

	.dark .clear-completed:hover {
		color: #e3e4f1;
	}
</style>
