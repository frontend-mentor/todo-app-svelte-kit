<script>
	import { fetchTodosFulfilled, useAppDispatch } from '../state';
	import TodoApp from '../components/todo-app/index.svelte';

	const dispatch = useAppDispatch();
	dispatch(
		fetchTodosFulfilled([
			{
				userId: 1,
				id: 1,
				title: 'Complete online JavaScript course',
				completed: true
			},
			{
				userId: 1,
				id: 2,
				title: 'Jog around the park 3x',
				completed: false
			},
			{
				userId: 1,
				id: 3,
				title: '10 minutes meditation',
				completed: false
			},
			{
				userId: 1,
				id: 4,
				title: 'Read for 1 hour',
				completed: false
			},
			{
				userId: 1,
				id: 5,
				title: 'Pick up groceries',
				completed: false
			},
			{
				userId: 1,
				id: 6,
				title: 'Complete Todo App on Frontend Mentor',
				completed: false
			}
		])
	);
</script>

<TodoApp />
