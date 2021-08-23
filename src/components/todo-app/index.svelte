<script lang="ts">
	import { onDestroy } from 'svelte';

	import TodoApp from './todo-app.svelte';
	import { store, useAppDispatch } from '../../state';
	import type { AppState } from '../../state';

	const dispatch = useAppDispatch();
	let state: AppState = store.getState();

	const storeUnsubscribe = store.subscribe(() => {
		state = store.getState();
	});

	onDestroy(storeUnsubscribe);
</script>

<TodoApp {dispatch} {state} />
