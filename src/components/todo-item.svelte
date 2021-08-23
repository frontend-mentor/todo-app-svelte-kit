<script lang="ts">
	import { selectIsDarkMode, useAppDispatch, removeTodo, toggleTodo, updateTodo } from '../state';
	import type { AppState, Todo } from '../state';
	import TodoCheckmark from './todo-checkmark.svelte';
	import IconCross from './icons/icon-cross.svelte';

	export let state: AppState;
	export let todo: Todo;

	$: darkMode = selectIsDarkMode(state);

	const dispatch = useAppDispatch();
	$: editableTodoTitle = todo.title;
	$: previousTodoTitle = todo.title;

	const onUpdateTodo = (newTitle: string) => {
		dispatch(updateTodo(todo.id, { title: newTitle }));
	};

	const onToggleTodo = () => {
		dispatch(toggleTodo(todo.id, !todo.completed));
	};

	const onDeleteTodo = () => {
		dispatch(removeTodo(todo.id));
	};

	const onTodoTitleKeyDown = (e: KeyboardEvent) => {
		if (e.key.startsWith('Esc')) {
			editableTodoTitle = previousTodoTitle;
		}
	};

	const onInputValueChanged = () => {
		const value = editableTodoTitle.trim();

		if (value) {
			onUpdateTodo(value);
		} else {
			editableTodoTitle = previousTodoTitle;
		}
	};
</script>

<div class="todo-container" class:dark={darkMode}>
	<TodoCheckmark {state} checked={todo.completed} onClick={onToggleTodo} />

	<input
		class="todo-title"
		required
		class:completed={todo.completed}
		bind:value={editableTodoTitle}
		placeholder="Create a new todo..."
		on:keydown={onTodoTitleKeyDown}
		on:focus={(e) => e.currentTarget.select()}
		on:change={onInputValueChanged}
	/>
	<div class="delete-icon">
		<IconCross size="12" color={darkMode ? '#5B5E7E' : '#494C6B'} onClick={onDeleteTodo} />
	</div>
</div>

<style>
	.todo-container {
		height: 52px;
		padding: 16px 24px;

		display: flex;
		align-items: center;
		gap: 12px;

		border-bottom: 1px solid #e3e4f1;
	}

	.todo-title {
		font: 400 12px/1 'Josefin Sans', sans-serif;
		letter-spacing: -0.166667px;
		flex: 1;

		border: none;
		background: none;
		outline: none;
	}

	.todo-title.completed {
		color: #4d5067;
		text-decoration: line-through;
	}

	.dark.todo-container {
		background-color: #25273d;
		border-bottom-color: #393a4b;
	}

	.dark .todo-title {
		color: #c8cbe7;
	}

	.dark .todo-title.completed {
		color: #4d5067;
	}

	@media all and (min-width: 592px) {
		.todo-container {
			height: 64px;
			gap: 24px;
		}

		.todo-title {
			font-size: 18px;
		}

		.todo-container:not(:hover) .delete-icon {
			display: none;
		}
	}
</style>
