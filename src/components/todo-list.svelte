<script lang="ts">
	import type { AppState } from '../state';
	import { selectFilteredTodos, selectIsDarkMode, useAppDispatch } from '../state';
	import NewTodoForm from './new-todo-form.svelte';
	import TodoFilters from './todo-filters.svelte';
	import TodoSummary from './todo-summary.svelte';
	import TodoItem from './todo-item.svelte';
	import { onDestroy, onMount } from 'svelte';

	export let state: AppState;

	$: darkMode = selectIsDarkMode(state);
	$: inlineFilterVisible = false;
	$: filteredTodos = selectFilteredTodos(state);

	const dispatch = useAppDispatch();

	let media: MediaQueryList;
	const onMediaChange = (e: MediaQueryListEvent) => {
		inlineFilterVisible = e.matches;
	};

	onMount(() => {
		media = window.matchMedia('(min-width: 592px)');
		media.addEventListener('change', onMediaChange);
		inlineFilterVisible = media.matches;
	});
	onDestroy(() => {
		if (media) media.removeEventListener('change', onMediaChange);
	});
</script>

<NewTodoForm {state} />

<div class="items-container" class:dark={darkMode}>
	<div class="scroll-container">
		{#each filteredTodos as item (item.id)}
			<TodoItem {state} todo={item} />
		{/each}
	</div>
	<TodoSummary {state}>
		{#if inlineFilterVisible}
			<TodoFilters {state} />
		{/if}
	</TodoSummary>
</div>

<div class="drag-hint">Drag and drop to reorder list</div>

<style>
	.items-container {
		margin: 0 24px 16px;

		min-height: 100px;

		overflow-x: hidden;
		overflow-y: auto;

		background-color: white;

		border-radius: 5px;
		box-shadow: 0 35px 50px -15px rgba(194, 195, 214, 0.5);
	}

	.scroll-container {
		overflow-y: auto;
		max-height: 312px;
	}

	.drag-hint {
		margin-top: 49px;

		color: #9495a5;
		text-align: center;
		font: 400 14px/1 Josefin Sans, sans-serif;
	}

	/*Dark theme*/
	.dark.items-container {
		box-shadow: none;
		background-color: #25273d;
	}

	.dark .drag-hint {
		color: #5b5e7e;
	}

	/*Media*/
	@media (min-width: 592px) {
		.scroll-container {
			max-height: calc(100vh - 380px);
		}

		.items-container {
			margin-left: 0;
			margin-right: 0;
		}
	}
</style>
